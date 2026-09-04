import api from "../../auth/api/axios";

// ================================
// Moderation Reports
// ================================

// GET /reports/
//
// Expected response:
//
// [
//   {
//     id: 1,
//     report: {
//       id: 10,
//       reporter: 5,
//       question: 20,
//       solution: null,
//       comment: null,
//       reviewed_by: null,
//       reason: "Spam",
//       status: "pending",
//       created_at: "2026-09-04T10:30:00Z",
//       resolved_at: null
//     },
//     question: {
//       id: 20,
//       author: {...},
//       company: [...],
//       job_role: 1,
//       difficulty_level: "medium",
//       title: "Two Sum",
//       tag: [...],
//       description: "...",
//       status: "published",
//       is_deleted: false,
//       company_full: [...],
//       job_role_full: {...},
//       tag_full: [...]
//     },
//     moderator: null,
//     action: "...",
//     created_at: "...",
//     reviewed_at: null
//   }
// ]
export const getModerationReports = () => {
  return api.get("moderation/reports/");
};


// GET /reports/:id/
//
// Expected response:
//
// {
//   id: 1,
//   report: {
//     id: 10,
//     reporter: 5,
//     question: 20,
//     solution: null,
//     comment: null,
//     reviewed_by: null,
//     reason: "Spam",
//     status: "pending",
//     created_at: "...",
//     resolved_at: null
//   },
//   question: {
//     id: 20,
//     author: {...},
//     company: [...],
//     job_role: 1,
//     difficulty_level: "medium",
//     title: "Two Sum",
//     tag: [...],
//     description: "...",
//     status: "published",
//     is_deleted: false,
//     company_full: [...],
//     job_role_full: {...},
//     tag_full: [...]
//   },
//   moderator: null,
//   action: "...",
//   created_at: "...",
//   reviewed_at: null
// }
export const getModerationReport = (id) => {
  return api.get(`moderation/reports/${id}/`);
};


// PATCH /reports/:id/
//
// Sending:
//
// Approve:
// {
//   action: "approve"
// }
//
// Remove:
// {
//   action: "remove"
// }
//
// Edit:
// {
//   action: "edit",
//   title: "...",
//   description: "..."
// }
//
// Expected response:
//
// {
//   id: 1,
//   report: {...},
//   question: {...},
//   moderator: {...},
//   action: "approve" | "edit" | "remove",
//   created_at: "...",
//   reviewed_at: "..."
// }
export const moderateReport = (id, data) => {
  return api.patch(`moderation/reports/${id}/`, data);
};