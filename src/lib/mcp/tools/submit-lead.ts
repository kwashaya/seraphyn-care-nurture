import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { notAuthenticated, supabaseForUser } from "../supabase";

export default defineTool({
  name: "submit_lead",
  title: "Submit lead",
  description:
    "Record a lead-capture entry (book, consulting, staffing, or general inquiry) tied to the signed-in user.",
  inputSchema: {
    source: z
      .enum(["book", "consulting", "staffing", "assessment", "general"])
      .describe("Which funnel this lead came from"),
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    org_name: z.string().optional(),
    role: z.string().optional().describe("Job title / role"),
    bed_count: z.number().int().min(0).optional(),
    message: z.string().optional(),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("leads")
      .insert({
        user_id: ctx.getUserId(),
        source: input.source,
        name: input.name,
        email: input.email ?? ctx.getUserEmail() ?? null,
        org_name: input.org_name,
        role: input.role,
        bed_count: input.bed_count,
        message: input.message,
      })
      .select()
      .single();
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Lead saved. id=${data.id}` }],
      structuredContent: { lead: data },
    };
  },
});
