(function () {
  "use strict";

  const STORAGE_KEY = "MSDS-planner-selections-v1";
  const DAY_NAMES = { M: "周一", T: "周二", W: "周三", R: "周四", F: "周五", S: "周六", U: "周日" };
  let courseDataPromise;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function fetchJson(url) {
    return fetch(url).then((response) => {
      if (!response.ok) throw new Error(`数据读取失败：${url}`);
      return response.json();
    });
  }

  function loadCourseData() {
    if (!courseDataPromise) {
      courseDataPromise = Promise.all([
        fetchJson("data/courses/index.json"),
        fetchJson("data/sources.json")
      ]).then(([index, sources]) => Promise.all([
        Promise.all(index.courses.map((course) => Promise.all([
          fetchJson(`data/sections/${encodeURIComponent(course.code)}.json`),
          fetchJson(`data/reviews/${encodeURIComponent(course.code)}.json`)
        ]).then(([eligibleSections, recommendation]) => ({
          ...course,
          eligible_sections: eligibleSections,
          recommendation
        })))),
        Promise.all(Object.keys(sources).map((sourceId) =>
          fetchJson(`data/source-reviews/${encodeURIComponent(sourceId)}.json`)
            .then((sourceReview) => [sourceId, sourceReview])
        ))
      ]).then(([courses, sourceReviewEntries]) => ({
        ...index,
        sources,
        sourceReviews: Object.fromEntries(sourceReviewEntries),
        courses
      }))).catch((error) => {
        courseDataPromise = undefined;
        throw error;
      });
    }
    return courseDataPromise;
  }

  let changelogPromise;

  function loadChangelog() {
    if (!changelogPromise) {
      changelogPromise = fetchJson("data/changelog.json")
        .catch((error) => {
          changelogPromise = undefined;
          throw error;
        });
    }
    return changelogPromise;
  }

  function getRecommendation(course) {
    return course?.recommendation || {
      level: "unknown",
      verdict: "暂无评价",
      summary: "本地资料没有足够信息，暂不作判断。",
      tags: [],
      source_ids: []
    };
  }

  function getStoredSelections() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveSelections(selections) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
  }

  function sectionKey(section) {
    return String(section.crn || `${section.section}-${section.day}-${section.time}`);
  }

  function splitSections(course) {
    const sections = course?.eligible_sections || [];
    return {
      primaries: sections.filter((section) => Number(section.credits) > 0),
      tutorials: sections.filter((section) => Number(section.credits) === 0)
    };
  }

  function pickTutorial(primary, tutorials) {
    if (!tutorials.length) return null;
    const suffix = primary?.section?.match(/(\d+)$/)?.[1];
    if (suffix) {
      const exact = tutorials.find((item) => item.section.endsWith(suffix));
      if (exact) return exact;
      const family = tutorials.find((item) => item.section.slice(1, 2) === primary.section.slice(1, 2));
      if (family) return family;
    }
    return tutorials[0];
  }

  function makeDefaultSelection(course, primaryCrn) {
    const { primaries, tutorials } = splitSections(course);
    const requestedPrimary = primaryCrn ? findSection(course, primaryCrn) : null;
    const primary = requestedPrimary || primaries[0] || course.eligible_sections[0];
    const tutorial = pickTutorial(primary, tutorials);
    return {
      primaryCrn: primary ? sectionKey(primary) : null,
      tutorialCrn: tutorial ? sectionKey(tutorial) : null
    };
  }

  function findSection(course, key) {
    return course.eligible_sections.find((section) => sectionKey(section) === String(key));
  }

  function formatSection(section) {
    if (!section) return "";
    return `${section.section} · ${DAY_NAMES[section.day] || section.day} ${section.time}`;
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function recommendationBadge(rec, small = false) {
    const className = small ? "mini-badge" : "verdict-badge";
    return `<span class="${className} ${escapeHtml(rec.level)}">${escapeHtml(rec.verdict)}</span>`;
  }

  function aimsMissingBadge(course, small = false) {
    if (!course?.aims_missing) return "";
    const className = small ? "mini-badge" : "verdict-badge";
    return `<span class="${className} aims-missing" title="该课程在当前学期 AIMS Master Class Schedule 中未找到">aims中未找到</span>`;
  }

  window.MSDS = {
    DAY_NAMES,
    STORAGE_KEY,
    escapeHtml,
    aimsMissingBadge,
    findSection,
    formatSection,
    getRecommendation,
    getStoredSelections,
    loadChangelog,
    loadCourseData,
    makeDefaultSelection,
    recommendationBadge,
    saveSelections,
    sectionKey,
    showToast,
    splitSections
  };
})();
