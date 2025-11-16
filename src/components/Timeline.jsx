const Timeline = () => {
  const timeline = [
    { era: "Pre-Colonial", period: "Before 1521", highlight: "Indigenous traditions, tribal arts, oral literature" },
    { era: "Spanish Colonial", period: "1521-1898", highlight: "Catholicism, folk music, traditional festivals" },
    { era: "American Period", period: "1898-1946", highlight: "Hollywood influence, jazz, Western education" },
    { era: "Post-Independence", period: "1946-1970s", highlight: "OPM rise, Manila Sound, local cinema boom" },
    { era: "Modern Era", period: "1980s-Present", highlight: "K-pop influence, social media, global Filipino artists" },
  ];

  return (
    <div className="book-page page-lined relative px-6 py-8">
      {/* Section Title */}
      <h3 className="font-script text-2xl font-semibold text-center text-foreground mb-8">
        Cultural Evolution Timeline
      </h3>

      {/* Vertical Line */}
      <div className="absolute left-16 top-20 bottom-8 w-[3px] bg-muted-foreground/30" />

      {/* Timeline Items */}
      <div className="space-y-8 relative">
        {timeline.map((item, index) => (
          <div key={index} className="relative pl-12">
            {/* Circle marker */}
            <div
              className="absolute left-[26px] top-[50%] -translate-y-[50%] w-4 h-4 rounded-full border-2 bg-background"
              style={{
                borderColor:
                  index % 3 === 0
                    ? "hsl(var(--ph-red))"
                    : index % 3 === 1
                    ? "hsl(var(--ph-blue))"
                    : "hsl(var(--ph-yellow))",
              }}
            />

            {/* Timeline Card */}
            <div
              className="bg-card p-4 rounded-lg shadow-sm border-l-4 hover:scale-[1.02] transition-transform"
              style={{
                borderLeftColor:
                  index % 3 === 0
                    ? "hsl(var(--ph-red))"
                    : index % 3 === 1
                    ? "hsl(var(--ph-blue))"
                    : "hsl(var(--ph-yellow))",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <div className="shrink-0">
                  <span className="font-handwriting text-xl font-bold text-foreground">
                    {item.era}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({item.period})
                  </span>
                </div>
                <div className="flex-1 font-serif text-sm text-foreground">
                  {item.highlight}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
