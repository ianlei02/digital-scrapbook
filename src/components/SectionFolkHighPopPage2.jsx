import { Sparkles } from "lucide-react";

const SectionFolkHighPopPage2 = () => {
  const category = {
    icon: Sparkles,
    title: "Popular Culture",
    description:
      "Mass-produced entertainment and trends consumed by mainstream society.",
    examples: ["Pop music", "Movies & TV", "Social media", "Fashion trends"],
    color: "ph-yellow",
  };

  const Icon = category.icon;

  return (
    <div className="space-y-6 w-full h-full book-page page-lined">
      <div className="bg-card p-4 rounded-lg shadow-md border-l-4 border-ph-blue">
        <p className="text-sm text-foreground font-serif leading-relaxed">
          Culture manifests in different forms that shape our identity and creativity. 
          Understanding these categories helps us appreciate how traditions and trends coexist.
        </p>
      </div>
      {/* Sticky Note */}
      <div className="sticky-note tape-horizontal mt-6">
        <h4 className="font-handwriting text-xl font-bold mb-2 text-foreground">
          Important Note:
        </h4>
        <p className="font-serif text-sm text-foreground">
          These categories aren't rigid! Popular culture can become folk
          tradition over time, and folk elements often influence high culture.
          In the Philippines, this blending creates our unique cultural
          identity.
        </p>
      </div>

      {/* Filipino Example */}
      <div className="bg-primary/10 p-6 rounded-lg border-2 border-dashed border-primary">
        <h4 className="font-script text-xl font-semibold text-primary mb-3">
          Filipino Cultural Blend
        </h4>
        <p className="text-foreground text-sm font-serif leading-relaxed">
          The <strong>Kundiman</strong> is a perfect example: originating as
          folk music, it evolved into an art form performed in concert halls
          (high culture), and continues to influence modern OPM (popular
          culture). This fluidity defines Filipino creativity.
        </p>
      </div>
    </div>
  );
};

export default SectionFolkHighPopPage2;
