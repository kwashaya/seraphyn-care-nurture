import { Fragment, ReactNode, useEffect } from "react";
import Layout from "@/components/Layout";

interface LegalDocumentProps {
  document: string;
  label: string;
  description: string;
}

const renderInline = (text: string): ReactNode => {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((segment, index) =>
    segment.startsWith("**") && segment.endsWith("**") ? (
      <strong key={`${segment}-${index}`} className="font-semibold text-foreground">
        {segment.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={`${segment}-${index}`}>{segment}</Fragment>
    ),
  );
};

const LegalDocument = ({ document, label, description }: LegalDocumentProps) => {
  const lines = document.trim().split("\n");
  const title = lines[0].replace(/^# /, "");
  const content: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    const items = listItems;
    content.push(
      <ul key={`list-${content.length}`} className="my-5 space-y-2 pl-5 text-muted-foreground marker:text-accent">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="pl-1 leading-7">
            {renderInline(item)}
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.slice(1).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "---") {
      flushList();
      return;
    }
    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      return;
    }
    flushList();
    if (trimmed.startsWith("## ")) {
      content.push(
        <h2 key={`heading-${content.length}`} className="mt-12 scroll-mt-28 text-2xl md:text-3xl">
          {trimmed.slice(3)}
        </h2>,
      );
      return;
    }
    if (trimmed.startsWith("**Effective Date:**") || trimmed.startsWith("**Last Updated:**")) {
      content.push(
        <p key={`date-${content.length}`} className="text-sm text-muted-foreground">
          {renderInline(trimmed)}
        </p>,
      );
      return;
    }
    content.push(
      <p key={`paragraph-${content.length}`} className="my-4 leading-7 text-muted-foreground">
        {renderInline(trimmed)}
      </p>,
    );
  });
  flushList();

  useEffect(() => {
    window.document.title = `${label} | Seraphyn Care`;
    const meta = window.document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content");
    meta?.setAttribute("content", description);
    return () => {
      window.document.title = "Seraphyn Care — Healthcare Staffing & Nurse Retention";
      if (previousDescription) meta?.setAttribute("content", previousDescription);
    };
  }, [description, label]);

  return (
    <Layout>
      <header className="border-b border-border bg-card/70 px-6 py-16 md:py-20">
        <div className="seraphyn-container max-w-4xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-accent">Legal</p>
          <h1 className="text-4xl md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
        </div>
      </header>
      <section className="px-6 py-16 md:py-24">
        <article className="seraphyn-container max-w-4xl rounded-lg border border-border bg-card px-6 py-10 shadow-[var(--shadow-card)] md:px-12 md:py-14">
          {content}
        </article>
      </section>
    </Layout>
  );
};

export default LegalDocument;
