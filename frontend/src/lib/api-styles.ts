import { Terminal, Database, Fingerprint, Microscope, Languages, Map, Code, Calculator } from 'lucide-react';

export const getCategoryStyles = (category: string) => {
  switch (category) {
    case "Machine Learning": return { icon: Terminal, color: "bg-primary-container text-primary" };
    case "Storage": return { icon: Database, color: "bg-tertiary-container text-tertiary" };
    case "Authentication": return { icon: Fingerprint, color: "bg-surface-container-highest text-primary" };
    case "Health Stats": return { icon: Microscope, color: "bg-error/10 text-error" };
    case "Natural Language": return { icon: Languages, color: "bg-secondary-container text-secondary" };
    case "Geospatial": return { icon: Map, color: "bg-primary-container/20 text-primary" };
    case "Mathematics": return { icon: Calculator, color: "bg-primary-container/30 text-primary" };
    default: return { icon: Code, color: "bg-surface-container-high text-on-surface-variant" };
  }
};
