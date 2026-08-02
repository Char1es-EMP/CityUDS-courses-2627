(function () {
  "use strict";

  let courses = [];
  let searchTerm = "";
  let activeFilter = "all";
  let selections = MSDS.getStoredSelections();
  const grid = document.getElementById("catalog-grid");

  function visibleCourses() {
    return courses.filter((course) => {
      const rec = MSDS.getRecommendation(course);
      const instructors = course.eligible_sections.map((section) => section.instructor).join(" ");
      const haystack = `${course.code} ${course.programme_title} ${instructors}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === "all"
        || (activeFilter === "core" && course.requirement_type === "core")
        || (activeFilter === "strong" && rec.level === "strong")
        || (activeFilter === "no-attendance" && rec.tags.includes("无考勤"))
        || (activeFilter === "no-final" && rec.tags.includes("无期末考"));
      return matchesSearch && matchesFilter;
    });
  }

  function render() {
    const filtered = visibleCourses();
    document.getElementById("catalog-result-count").textContent = `显示 ${filtered.length} / ${courses.length} 门课程`;
    if (!filtered.length) {
      grid.innerHTML = '<div class="empty-list">没有符合条件的课程</div>';
      return;
    }

    grid.innerHTML = filtered.map((course) => {
      const rec = MSDS.getRecommendation(course);
      const primaries = course.eligible_sections.filter((section) => Number(section.credits) > 0);
      const schedule = primaries.map((section) => `${MSDS.DAY_NAMES[section.day]} ${section.time}`).join(" / ");
      const isAdded = Boolean(selections[course.code]);
      return `
        <article class="course-card">
          <div class="course-card-top">
            <div>
              <span class="course-code">${MSDS.escapeHtml(course.code)}</span>
              <h2><a href="course.html?code=${encodeURIComponent(course.code)}">${MSDS.escapeHtml(course.programme_title)}</a></h2>
            </div>
            ${course.requirement_type === "core" ? '<span class="verdict-badge core">必修课</span>' : MSDS.recommendationBadge(rec)}
          </div>
          <p class="course-card-summary">${MSDS.escapeHtml(rec.summary)}</p>
          <div class="tag-list">${rec.tags.map((tag) => `<span class="tag">${MSDS.escapeHtml(tag === "核心课" ? "必修课" : tag)}</span>`).join("")}</div>
          <div class="course-card-footer">
            <span>${course.credits} 学分 · ${primaries.length} 个主课班次<br>${MSDS.escapeHtml(schedule || "时间待定")}</span>
            <button class="button ${isAdded ? "button-quiet" : "button-primary"}" type="button" data-add="${MSDS.escapeHtml(course.code)}">${isAdded ? "已在课表" : "加入课表"}</button>
          </div>
        </article>`;
    }).join("");
  }

  document.getElementById("catalog-search").addEventListener("input", (event) => {
    searchTerm = event.target.value.trim();
    render();
  });

  document.querySelectorAll(".filter-pill").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll(".filter-pill").forEach((item) => item.classList.toggle("active", item === button));
      render();
    });
  });

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");
    if (!button) return;
    const code = button.dataset.add;
    const course = courses.find((item) => item.code === code);
    if (!course) return;
    if (selections[code]) {
      window.location.href = "index.html";
      return;
    }
    selections[code] = MSDS.makeDefaultSelection(course);
    MSDS.saveSelections(selections);
    MSDS.showToast(`已加入 ${code}`);
    render();
  });

  MSDS.loadCourseData().then((data) => {
    courses = data.courses;
    render();
  }).catch((error) => {
    grid.innerHTML = `<div class="error-state">${MSDS.escapeHtml(error.message)}</div>`;
  });
})();
