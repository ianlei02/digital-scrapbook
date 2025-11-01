import { Building2, BookOpen, Award, Flag } from "lucide-react";

const SectionGovPolicyPage1 = () => {
  const policies = [
    {
      year: "1987",
      title: "Philippine Constitution",
      description:
        "Article XIV mandates the State to conserve, promote, and popularize the nation's cultural heritage and resources.",
      icon: Flag,
    },
    {
      year: "2009",
      title: "National Cultural Heritage Act",
      description:
        "Protection and preservation of Filipino cultural property, heritage sites, and indigenous practices.",
      icon: BookOpen,
    },
    {
      year: "2012",
      title: "National Commission for Culture and Arts",
      description:
        "NCCA oversees cultural programs, funding for artists, and preservation initiatives nationwide.",
      icon: Award,
    },
  ];

  return (
    <div className="space-y-6 book-page page-lined">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-ph-red/20 rounded-lg">
          <Building2 className="h-8 w-8 text-ph-red" />
        </div>
        <div>
          <h2 className="font-handwriting text-4xl font-bold text-foreground">
            Government & Cultural Policy
          </h2>
          <div className="h-1 w-40 bg-ph-red rounded-full mt-1" />
        </div>
      </div>

      {/* Intro */}
      <div className="bg-card p-6 rounded-lg shadow-md">
        <p className="text-foreground font-serif leading-relaxed text-sm">
          The Philippine government enacts cultural policies and laws to preserve
          and promote Filipino identity, ensuring traditions are protected for
          future generations.
        </p>
      </div>

      {/* Hoverable Policy Cards */}
      <div className="space-y-4">
        <h3 className="font-script text-2xl font-semibold text-center text-foreground mb-4">
          Key Cultural Policies & Laws
        </h3>

        {policies.map((policy, index) => {
          const Icon = policy.icon;
          const colors = ["ph-red", "ph-blue", "ph-yellow"];
          const color = colors[index % 3];

          return (
            <div
              key={index}
              className="group bg-card rounded-lg shadow-md border-l-4 border-dashed overflow-hidden transition-all duration-500 hover:shadow-xl cursor-default relative"
              style={{ borderLeftColor: `hsl(var(--${color}))` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: `hsl(var(--${color}) / 0.15)`,
                    }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: `hsl(var(--${color}))` }}
                    />
                  </div>
                  <div>
                    <h4
                      className="font-handwriting text-xl font-bold"
                      style={{ color: `hsl(var(--${color}))` }}
                    >
                      {policy.year}
                    </h4>
                    <p className="font-script text-base font-semibold text-foreground">
                      {policy.title}
                    </p>
                  </div>
                </div>

                {/* Hover Hint */}
                <span className="text-xs text-foreground/80 italic opacity-100 group-hover:opacity-0 transition-opacity duration-300 washi-tape right-10 top-4">
                  hover me
                </span>
              </div>

              {/* Description (reveals on hover) */}
              <div className="max-h-0 group-hover:max-h-32 transition-all duration-700 ease-in-out p-0 group-hover:p-4">
                <p className="text-sm font-serif text-foreground leading-relaxed">
                  {policy.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionGovPolicyPage1;
