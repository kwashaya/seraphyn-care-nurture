import LegalDocument from "@/components/LegalDocument";
import terms from "@/content/terms.md?raw";

const Terms = () => (
  <LegalDocument
    document={terms}
    label="Terms of Service"
    description="The terms governing use of the Seraphyn Care website, resources, and services."
  />
);

export default Terms;
