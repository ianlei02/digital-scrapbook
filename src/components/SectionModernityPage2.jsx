import modernPop from '@/assets/paper-texture.jpg';
const SectionModernityPage2 = () => {
  return (
    <div className="space-y-6 book-page page-dotted">
      {/* Global Stars */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="sticky-note -rotate-1deg">
          <h4 className="font-handwriting text-xl font-bold mb-2 text-foreground">
            Filipino Global Stars
          </h4>
          <ul className="space-y-1 font-serif text-sm text-foreground">
            <li>• Olivia Rodrigo - Pop sensation</li>
            <li>• Bruno Mars - Music icon</li>
            <li>• H.E.R. - Grammy winner</li>
            <li>• Bella Poarch - Social media star</li>
          </ul>
        </div>

        <div className="sticky-note -rotate-1deg">
          <h4 className="font-handwriting text-xl font-bold mb-2 text-foreground">
            Cultural Phenomena
          </h4>
          <ul className="space-y-1 font-serif text-sm text-foreground">
            <li>• Filipino memes & humor</li>
            <li>• "Pinoy Pride" movement</li>
            <li>• OFW culture & connections</li>
            <li>• E-sports dominance</li>
          </ul>
        </div>
      </div>
       {/* Polaroid Image Section */}
      <div className="flex justify-center mt-4">
        <div className="polaroid-frame max-w-sm">
          <img
            src={modernPop}
            alt="Modern Filipino pop culture scene"
            className="w-full h-60 object-cover rounded"
          />
          <p className="font-handwriting text-center mt-2 text-foreground">
            Filipino Pop Culture in the Modern Era
          </p>
        </div>
      </div>
      {/* Reflection */}
      <div className="bg-primary/10 p-5 rounded-lg border-l-4 border-primary mt-4">
        <p className="font-script text-base text-foreground italic">
          "Modern Filipino culture beautifully balances embracing global trends while proudly 
          preserving our unique traditions and identity."
        </p>
      </div>
    </div>
  );
};

export default SectionModernityPage2;
