# 课程时间冲突修复记录

> 生成时间：2026-08-06
> 对比基准：AIMS Master Class Schedule（Semester A 2026/27）
> 仓库：https://github.com/Char1es-EMP/CityUDS-courses-2627

## 一、背景

本地选课网站（`cityu-ds-courses-2627`）中的部分课程班次数据与 AIMS 系统实际课表存在差异，包括时间、教室、教师、日期范围等信息不一致。本次任务通过外部浏览器查询 AIMS 系统的 Master Class Schedule，逐项比对后修正了存在冲突的课程数据，并将修改推送至 GitHub 仓库。

## 二、修改文件清单

本次共修改 4 个班次数据文件，均位于 `data/sections/` 目录下：

| 文件 | 课程名称 | 修改类型 |
| --- | --- | --- |
| `CS5285.json` | Applied Deep Learning | 班次整体替换 |
| `DSC5001.json` | Data Mining | 日期与教室备注修正 |
| `DSC6008.json` | Recommender Systems | 教师信息更新 |
| `DSC6018.json` | Privacy-preserving Data Analysis | 教师信息更新 |

## 三、具体修改内容

### 1. CS5285.json — 班次整体替换

**问题**：原数据中的班次与 AIMS 系统中 MSDS1 专属班次严重不符。

**修改**：替换为 AIMS 实际的 MSDS1 专属班次 CA1 和 CA2。

修改后内容：

```json
[
  {
    "crn": "13297",
    "section": "CA1",
    "credits": 3,
    "web": "Y",
    "available": "30",
    "capacity": "30",
    "date": "31/08/2026 - 28/11/2026",
    "day": "F",
    "time": "15:00 - 17:50",
    "building": "YEUNG",
    "room": "LT-2",
    "instructor": "HANCKE Gerhard Petrus, LU Zhenliang",
    "medium": "English",
    "notes": ["only for Programme: MSDS1"]
  },
  {
    "crn": "15358",
    "section": "CA2",
    "credits": 3,
    "web": "Y",
    "available": "30",
    "capacity": "30",
    "date": "31/08/2026 - 28/11/2026",
    "day": "F",
    "time": "19:00 - 21:50",
    "building": "BOC",
    "room": "R4057",
    "instructor": "HANCKE Gerhard Petrus, LU Zhenliang",
    "medium": "English",
    "notes": ["only for Programme: MSDS1"]
  }
]
```

**关键变化**：
- 班次由原 C61/C62 等改为 MSDS1 专属的 CA1/CA2
- CRN 更新为 13297 / 15358
- 上课时间统一为周五（F），CA1 为 15:00-17:50，CA2 为 19:00-21:50
- 教师更新为 HANCKE Gerhard Petrus, LU Zhenliang
- 班次备注明确标注 `only for Programme: MSDS1`

### 2. DSC5001.json — 日期与教室备注修正

**问题**：C62 班次日期范围与 AIMS 不一致，且未体现最后一周的教室更换信息。

**修改**：将 C62 的 `date` 由 `31/08/2026 - 05/12/2026` 修正为 `31/08/2026 - 28/11/2026`，并在 `notes` 中追加教室更换说明。

修改后的 C62 班次：

```json
{
  "crn": "13470",
  "section": "C62",
  "credits": 3,
  "web": "Y",
  "available": "16",
  "capacity": "250",
  "date": "31/08/2026 - 28/11/2026",
  "day": "S",
  "time": "09:00 - 11:50",
  "building": "LAU",
  "room": "LT-501",
  "instructor": "MO Zhenling",
  "medium": "English",
  "notes": [
    "only for Programme: MSDS1",
    "29/11/2026 - 05/12/2026 期间教室更换为 YEUNG LT-2"
  ]
}
```

**关键变化**：
- 日期范围修正为 `31/08/2026 - 28/11/2026`（与 AIMS 一致）
- 新增备注：`29/11/2026 - 05/12/2026 期间教室更换为 YEUNG LT-2`

### 3. DSC6008.json — 教师信息更新

**问题**：教师字段为 `TBA`，与 AIMS 系统显示的 `TBA DS002` 不一致。

**修改**：将 C61 和 C62 两个班次的 `instructor` 由 `TBA` 改为 `TBA DS002`。

修改后内容：

```json
[
  {
    "crn": "15420",
    "section": "C61",
    "credits": 3,
    "web": "Y",
    "available": "50",
    "capacity": "250",
    "date": "31/08/2026 - 05/12/2026",
    "day": "S",
    "time": "16:00 - 18:50",
    "building": "YEUNG",
    "room": "LT-2",
    "instructor": "TBA DS002",
    "medium": "English",
    "notes": []
  },
  {
    "crn": "15799",
    "section": "C62",
    "credits": 3,
    "web": "Y",
    "available": "50",
    "capacity": "50",
    "date": "31/08/2026 - 05/12/2026",
    "day": "S",
    "time": "16:00 - 18:50",
    "building": "YEUNG",
    "room": "LT-2",
    "instructor": "TBA DS002",
    "medium": "English",
    "notes": []
  }
]
```

### 4. DSC6018.json — 教师信息更新

**问题**：教师字段为 `TBA`，与 AIMS 系统显示的 `TBA DS002` 不一致。

**修改**：将 C61 班次的 `instructor` 由 `TBA` 改为 `TBA DS002`。

修改后内容：

```json
[
  {
    "crn": "15444",
    "section": "C61",
    "credits": 3,
    "web": "Y",
    "available": "200",
    "capacity": "200",
    "date": "31/08/2026 - 28/11/2026",
    "day": "R",
    "time": "19:00 - 21:50",
    "building": "MMW",
    "room": "3420",
    "instructor": "TBA DS002",
    "medium": "English",
    "notes": []
  }
]
```

## 四、推送过程与技术细节

### 推送方式

由于本地 `github.com` 直连超时，无法通过常规 `git push` 推送，最终改用 **GitHub REST API** 完成推送。完整流程如下：

1. **获取仓库信息**：通过 `https://api.github.com/repos/{owner}/{repo}/git/refs/heads/main` 获取当前 main 分支的最新 commit SHA。
2. **获取基础 tree**：通过 commit SHA 获取对应的 base tree SHA。
3. **上传 blob**：对每个修改的文件，从本地 git 对象中提取原始内容（LF 行尾），通过 `POST /repos/{owner}/{repo}/git/blobs` 上传，获取服务器端 blob SHA。
4. **构建新 tree**：使用 `POST /repos/{owner}/{repo}/git/trees`，基于 base tree 创建新 tree，引用上一步获取的 blob SHA。
5. **创建 commit**：通过 `POST /repos/{owner}/{repo}/git/commits` 创建新 commit，parent 为原 commit SHA，tree 为新 tree SHA。
6. **更新 ref**：通过 `PATCH /repos/{owner}/{repo}/git/refs/heads/main` 将 main 分支指向新 commit。

### 遇到的错误与解决方案

| 错误 | 原因 | 解决方案 |
| --- | --- | --- |
| `github.com` 直连超时 | 网络访问问题 | 改用 GitHub REST API 推送 |
| PowerShell JSON 解析错误 | 中文注释乱码、数组字面量解析问题 | 重写为纯 ASCII 脚本，使用 `New-Object PSObject` 构建 JSON |
| `tree.sha is not a valid blob` | 直接把 tree SHA 当作 blob 使用 | 先通过 Git Data API 上传 blob，获取服务器端 SHA 后再构建 tree |
| `Update is not a fast forward` | base tree 和 parent commit 不一致 | 使用正确的 base tree（b783d17）和 parent commit（b783d17） |
| 本地与远程 blob SHA 不一致 | 本地文件 CRLF 行尾导致内容差异 | 从 git 对象提取 LF 原始内容上传，确保本地与远程 SHA 一致 |

## 五、验证结果

- 远程仓库已成功更新，4 个文件的内容与本地修改一致。
- 网站前端渲染正常，课程详情页和班次表格显示的 CRN、时间、教室、教师均与 AIMS 系统一致。
- 未修改的课程（如 DSC5002、DSC5003 等）数据保持原样，无误改。

## 六、后续维护建议

1. **定期比对**：每学期开学前，建议重新查询 AIMS Master Class Schedule，与本仓库数据进行比对，及时发现并修正差异。
2. **关注 TBA 字段**：AIMS 系统中教师为 `TBA` 的课程（如 DSC6008、DSC6018）可能在学期中更新为具体教师姓名，建议在开学后 1-2 周再次核对。
3. **教室更换备注**：部分课程在学期最后一周会有教室更换（如 DSC5001 C62），此类信息通常出现在 AIMS 班次的 notes 字段中，需要手动同步到本地 `notes` 数组。
4. **MSDS1 专属班次**：MSDS1 专属班次通常以 `CA` 开头（如 CS5285 的 CA1/CA2），与普通 C 系列班次区分，录入时需特别注意。
5. **推送方式**：若再次遇到 `github.com` 直连超时，可直接复用本次的 GitHub REST API 推送方案，脚本核心逻辑见本文第四节。

## 七、相关文件路径

- 班次数据目录：`data/sections/`
- 课程索引：`data/courses/index.json`
- 前端渲染逻辑：`assets/planner.js`、`assets/course.js`、`assets/shared.js`
- 样式文件：`assets/styles.css`
- GitHub Pages 部署配置：`.github/workflows/pages.yml`
