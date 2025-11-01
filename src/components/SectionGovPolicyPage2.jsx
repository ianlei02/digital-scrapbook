import { Award } from 'lucide-react';

const SectionGovPolicyPage2 = () => {
  const initiatives = [
    "National Artists Awards recognizing Filipino excellence",
    "Gawad sa Manlilikha ng Bayan (GAMABA) for traditional artists",
    "Cultural festivals and heritage month celebrations",
    "Film and television incentive programs",
    "Music and arts education in schools",
  ];

  return (
    <div className="space-y-6 book-page page-lined">
      {/* Initiatives */}
      <div className="bg-primary/10 p-2 rounded-lg border-2 border-dashed border-primary">
        <h3 className="font-script text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
          <Award className="h-6 w-6" />
          Cultural Initiatives & Programs
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {initiatives.map((initiative, index) => (
            <div
              key={index}
              className="bg-card p-3 rounded-lg shadow-sm border border-primary/20"
            >
              <p className="text-sm font-serif text-foreground flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>{initiative}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Notes */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="sticky-note tape-corner -rotate-1deg">
          <h4 className="font-handwriting text-xl font-bold mb-3 text-foreground">
            Key Government Agencies
          </h4>
          <ul className="space-y-2 text-sm font-serif text-foreground">
            <li><strong>NCCA</strong> - National Commission for Culture and Arts</li>
            <li><strong>NHI</strong> - National Historical Institute</li>
            <li><strong>NM</strong> - National Museum</li>
            <li><strong>FDCP</strong> - Film Development Council</li>
            <li><strong>CCP</strong> - Cultural Center of the Philippines</li>
          </ul>
        </div>

        <div className="sticky-note rotate-1deg">
          <h4 className="font-handwriting text-xl font-bold mb-3 text-foreground">
            Impact & Challenges
          </h4>
          <p className="text-sm font-serif text-foreground mb-2">
            <strong>Achievements:</strong> Preservation of heritage sites, support for artists, 
            international cultural promotion.
          </p>
          <p className="text-sm font-serif text-foreground">
            <strong>Challenges:</strong> Funding limitations, balancing modernization with 
            preservation, reaching remote communities.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-card p-6 rounded-lg shadow-lg border-l-4 border-ph-blue mt-6">
        <h4 className="font-script text-xl font-semibold text-foreground mb-3">
          The Role of Citizens
        </h4>
        <p className="text-foreground text-sm font-serif leading-relaxed">
          While government policies provide structure, cultural preservation and promotion 
          succeed when citizens actively participate. Supporting local artists, attending 
          cultural events, teaching traditions to youth, and advocating for cultural programs 
          are ways every Filipino can contribute to preserving our heritage.
        </p>
      </div>
    </div>
  );
};

export default SectionGovPolicyPage2;
