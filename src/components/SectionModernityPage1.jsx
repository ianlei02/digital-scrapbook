import { Globe, Smartphone, Music, Film } from 'lucide-react';

const SectionModernityPage1 = () => {
  const influences = [
    {
      icon: Music,
      title: "K-pop & Global Music",
      description: "Korean pop culture has significantly influenced Filipino youth, while OPM artists gain international recognition.",
      color: "ph-red"
    },
    {
      icon: Film,
      title: "Streaming & Cinema",
      description: "Netflix, Disney+, and local streaming platforms reshape how Filipinos consume entertainment and stories.",
      color: "ph-blue"
    },
    {
      icon: Smartphone,
      title: "Social Media Culture",
      description: "TikTok, Facebook, and Instagram drive trends, memes, and shape modern Filipino identity and expression.",
      color: "ph-yellow"
    }
  ];

  return (
    <div className="space-y-4 book-page page-dotted">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-ph-yellow/20 rounded-lg">
          <Globe className="h-8 w-8 text-ph-yellow" />
        </div>
        <div>
          <h2 className="font-handwriting text-3xl font-bold text-foreground">
            Modernity & Global Influence
          </h2>
          <div className="h-1 w-24 bg-ph-yellow rounded-full mt-1" />
        </div>
      </div>

      {/* Intro */}
      <div className="bg-card p-4 rounded-lg shadow-md">
        <p className="text-foreground leading-relaxed font-serif text-sm">
          In the digital age, Philippine popular culture has become increasingly interconnected 
          with global trends while maintaining its unique Filipino identity. Technology and social 
          media have transformed how culture is created, shared, and consumed.
        </p>
      </div>

      {/* Influences */}
      <div className="space-y-3">
        {influences.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-card p-4 rounded-lg shadow-lg border-2 border-dashed hover:shadow-xl transition-all"
              style={{ borderColor: `hsl(var(--${item.color}))` }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg shrink-0"
                  style={{ backgroundColor: `hsl(var(--${item.color}) / 0.2)` }}
                >
                  <Icon className="h-5 w-5" style={{ color: `hsl(var(--${item.color}))` }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-script text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-foreground text-sm font-serif leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionModernityPage1;
