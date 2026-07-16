import { auth, defineMcp } from "@lovable.dev/mcp-js";
import submitAssessment from "./tools/submit-assessment";
import listMyAssessments from "./tools/list-my-assessments";
import getAssessment from "./tools/get-assessment";
import submitLead from "./tools/submit-lead";
import getBookInfo from "./tools/get-book-info";
import getBookingLink from "./tools/get-booking-link";

// Build issuer from the project ref (inlined at build time by Vite),
// never from SUPABASE_URL (which is the .lovable.cloud proxy).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "seraphyn-care-mcp",
  title: "Seraphyn Care",
  version: "0.1.0",
  instructions:
    "Tools for Seraphyn Care — nurse retention consulting. Save and retrieve Staffing Stability Assessments, submit leads, look up book info, and get the strategy-call booking link. All data tools act as the signed-in user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    submitAssessment,
    listMyAssessments,
    getAssessment,
    submitLead,
    getBookInfo,
    getBookingLink,
  ],
});
