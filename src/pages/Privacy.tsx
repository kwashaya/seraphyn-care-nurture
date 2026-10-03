import LegalDocument from "@/components/LegalDocument";
import privacy from "@/content/privacy.md?raw";

const Privacy = () => (
  <LegalDocument
    document={privacy}
    label="Privacy Notice"
    description="How Seraphyn Care collects, uses, shares, and protects personal information."
  />
);

export default Privacy;
