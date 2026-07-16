import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "submit_assessment",
  title: "Submit Staffing Stability Assessment",
  description:
    "Save a Staffing Stability Assessment result for the signed-in user. Stores retention/turnover/vacancy metrics, stability score, risk level, and projected financial impact.",
  inputSchema: {
    org_name: z.string().min(1).describe("Organization name"),
    role: z.string().optional().describe("Submitter's role/title at the organization"),
    retention_rate: z.number().min(0).max(100).optional(),
    turnover_rate: z.number().min(0).max(100).optional(),
    vacancy_rate: z.number().min(0).max(100).optional(),
    overtime_pct: z.number().min(0).max(100).optional(),
    stability_score: z.number().min(0).max(100).optional(),
    risk_level: z.enum(["low", "moderate", "high", "severe"]).optional(),
    financial_impact_usd: z
      .number()
      .min(0)
      .optional()
      .describe("Projected annual financial impact in USD"),
    notes: z.string().optional(),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("assessments")
      .insert({
        user_id: ctx.getUserId(),
        org_name: input.org_name,
        role: input.role,
        retention_rate: input.retention_rate,
        turnover_rate: input.turnover_rate,
        vacancy_rate: input.vacancy_rate,
        overtime_pct: input.overtime_pct,
        stability_score: input.stability_score,
        risk_level: input.risk_level,
        financial_impact_cents: input.financial_impact_usd
          ? Math.round(input.financial_impact_usd * 100)
          : null,
        payload: { notes: input.notes ?? null },
      })
      .select()
      .single();
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Assessment saved. id=${data.id}` }],
      structuredContent: { assessment: data },
    };
  },
});
