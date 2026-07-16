import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_book_info",
  title: "Get book info",
  description:
    "Return information about 'The Million Dollar Nurse: How Nurse Retention Saves Hospitals Millions and Protects Patient Care' by Kundayi Washaya, RN.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      title:
        "The Million Dollar Nurse: How Nurse Retention Saves Hospitals Millions and Protects Patient Care",
      author: "Kundayi Washaya, RN",
      audience: "Hospital CFOs, CEOs, CNOs, and healthcare executives",
      themes: [
        "Nurse retention as a financial strategy",
        "Reducing agency reliance",
        "Protecting patient care through workforce stability",
        "Frontline + consulting perspective on staffing ROI",
      ],
      buy_url: "https://seraphyncare.com/book",
      strategy_call_url: "https://calendly.com/seraphyncare-info/30min",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
