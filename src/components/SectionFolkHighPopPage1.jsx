import { Sparkles, Crown, Users } from 'lucide-react';

const SectionFolkHighPopPage1 = () => {
  const categories = [
    {
      icon: Users,
      title: "Folk Culture",
      description: "Traditional practices passed down through generations within local communities.",
      examples: ["Tribal dances", "Oral folklore", "Traditional crafts", "Indigenous rituals"],
      color: "ph-red"
    },
    {
      icon: Crown,
      title: "High Culture",
      description: "Cultural products appreciated by the educated elite and upper classes.",
      examples: ["Classical music", "Fine arts", "Opera", "Literary classics"],
      color: "ph-blue"
    },
    {
      icon: Sparkles,
      title: "Popular Culture",
      description: "Mass-produced entertainment and trends consumed by mainstream society.",
      examples: ["Pop music", "Movies & TV", "Social media", "Fashion trends"],
      color: "ph-yellow"
    }
  ];

  return (
    <div className="w-full h-full book-page page-lined space-y-5 page-shadow">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-ph-blue/20 rounded-lg">
          <Sparkles className="h-7 w-7 text-ph-blue" />
        </div>
        <div>
          <h2 className="font-handwriting text-3xl font-bold text-foreground">
            Types of Culture
          </h2>
          <div className="h-1 w-24 bg-ph-blue rounded-full mt-1" />
        </div>
      </div>

      {/* Intro Paragraph */}
   

      {/* Culture Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={index}
              className="bg-card rounded-lg shadow-md border overflow-hidden transition-all hover:shadow-lg"
              style={{ borderColor: `hsl(var(--${category.color}) / 0.7)` }}
            >
              <div 
                className="flex items-center gap-2 p-3"
                style={{ backgroundColor: `hsl(var(--${category.color}) / 0.15)` }}
              >
                <div 
                  className="p-2 rounded-md"
                  style={{ backgroundColor: `hsl(var(--${category.color}) / 0.25)` }}
                >
                  <Icon className="h-5 w-5" style={{ color: `hsl(var(--${category.color}))` }} />
                </div>
                <h3 className="font-script text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
                <p className="text-xs text-foreground font-serif leading-snug">
                  {category.description}
                </p>
              </div>

              <div className="p-4 space-y-2">

                <div>
                  <h4 className="font-handwriting text-sm font-semibold text-foreground mb-1">
                    Examples:
                  </h4>
                  <ul className="text-xs font-serif text-foreground space-y-1 grid grid-cols-2">
                    {category.examples.map((example, i) => (
                      <li key={i} className="bg-background/50 px-2 py-1 rounded">
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    
    </div>
  );
};

export default SectionFolkHighPopPage1;
