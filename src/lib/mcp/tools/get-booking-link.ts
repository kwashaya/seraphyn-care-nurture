import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_booking_link",
  title: "Get strategy-call booking link",
  description:
    "Return the Seraphyn Care free Nurse Retention Strategy Call Calendly link so the user can book a 30-minute call.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const url = "https://calendly.com/seraphyncare-info/30min";
    return {
      content: [
        {
          type: "text",
          text: `Book a free 30-minute Nurse Retention Strategy Call: ${url}`,
        },
      ],
      structuredContent: { url, duration_minutes: 30 },
    };
  },
});
