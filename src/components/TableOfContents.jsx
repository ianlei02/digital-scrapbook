import { BookMarked, Sparkles, Users, History, Globe, Building2, Heart } from 'lucide-react';

const TableOfContentsPage = () => {
  const sections = [
    { icon: BookMarked, title: "What is Culture & Popular Culture", color: "text-ph-red", top: "130px", left: "50px", rotate: "-3deg" },
    { icon: Sparkles, title: "Folk, High & Popular Culture", color: "text-ph-blue", top: "135px", left: "260px", rotate: "2deg" },
    { icon: Users, title: "Ethnocentrism vs. Cultural Relativism", color: "text-ph-yellow", top: "280px", left: "60px", rotate: "-2deg" },
    { icon: History, title: "History of Philippine Pop Culture", color: "text-ph-red", top: "270px", left: "250px", rotate: "1deg" },
    { icon: Globe, title: "Modernity & Global Influence", color: "text-ph-blue", top: "410px", left: "50px", rotate: "-1deg" },
    { icon: Building2, title: "Government & Cultural Policy", color: "text-ph-yellow", top: "410px", left: "250px", rotate: "3deg" },
    { icon: Heart, title: "Personal Reflection", color: "text-ph-red", top: "540px", left: "140px", rotate: "-2deg" },
  ];

  return (
    <div className="book-page page-dotted relative py-10 px-4 bg-background rounded-lg h-full">
      {/* Optional Title */}
      <h1 className="text-center font-script text-4xl font-bold text-orange-900 mb-6">
        Table of Contents
      </h1>

      {/* Optional tape decoration */}
      <div
        className="washi-tape"
        style={{ top: '70px', left: '50%', transform: 'translateX(-50%) rotate(10deg)' }}
      />

      {/* Sticky Notes / Polaroids */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <div
            key={index}
            className="sticky-note tape-horizontal hover:shadow-xl cursor-pointer absolute"
            style={{
              top: section.top,
              left: section.left,
              '--sticky-rotate': section.rotate,
              width: '160px',
            }}
          >
            <div className="flex items-center gap-2">
              <div className={`${section.color} bg-card/50 p-2 rounded-lg`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-serif text-foreground text-sm">
                {section.title}
              </span>
            </div>
          </div>
        );
      })}

      {/* Optional footer */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-script text-black italic text-sm">
        Navigate through the pages to explore each section →
      </p>
    </div>
  );
};

export default TableOfContentsPage;
