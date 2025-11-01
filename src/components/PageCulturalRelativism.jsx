import { CheckCircle, Globe2 } from "lucide-react";

const PageCulturalRelativism = () => {
  return (
    <div className="book-page page-dotted space-y-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-3 bg-blue-800/20 rounded-lg">
          <CheckCircle className="h-8 w-8 text-blue-800" />
        </div>
        <div>
            <div className="washi-tape"
          style={{ top: '70px', left: '1%', transform: 'translateX(-50%) rotate(10deg)' }}/>
           <div className="absolute top-11 left-1 text-4xl font-script">
            S
          </div>
          <h2 className="font-handwriting text-3xl font-bold text-foreground">
            Cultural Relativism
          </h2>
          <div className="h-1 w-32 bg-blue-800 rounded-full mt-1" />
        </div>
      </div>

      {/* Description */}
      <div className="bg-blue-900/10 rounded-lg shadow-lg border-2 border-primary/50 overflow-hidden">
        <div className="bg-blue-400/20 p-4">
          <p className="font-serif text-sm text-foreground leading-relaxed">
            The principle that a person’s beliefs and practices should be understood
            within their own cultural context, not judged by external standards.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h4 className="font-handwriting text-lg font-semibold text-foreground">
              Characteristics:
            </h4>
            <ul className="space-y-2 text-sm font-serif text-foreground">
              <li>✓ Respects cultural differences</li>
              <li>✓ Promotes understanding and empathy</li>
              <li>✓ Values diversity and inclusion</li>
              <li>✓ Encourages learning from others</li>
            </ul>
          </div>

          <div className="bg-primary/10 p-3 rounded border border-primary/30">
            <p className="text-xs font-serif italic text-foreground">
              <strong>Example:</strong> Understanding that Filipino “mañana habit”
              reflects a different relationship with time, or appreciating diverse
              cultural approaches to family and respect.
            </p>
          </div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="bg-card p-6 rounded-lg shadow-lg border-l-4 border-ph-blue">
        <div className="flex items-center gap-3 mb-3">
          <Globe2 className="h-6 w-6 text-ph-blue" />
          <h3 className="font-script text-xl font-semibold text-foreground">
            Finding the Balance
          </h3>
        </div>
        <p className="text-foreground text-sm font-serif leading-relaxed mb-3">
          While cultural relativism promotes respect, it's important to recognize
          universal human rights. The goal is to understand and appreciate cultural
          differences while maintaining ethical standards that protect human dignity.
        </p>
        <div className="bg-background/50 p-4 rounded">
          <p className="text-sm font-serif italic text-foreground">
            <strong>In the Philippine Context:</strong> We can embrace our unique
            practices (bayanihan spirit, close family ties, fiestas) while staying open
            to learning from others. This balance strengthens our identity without
            closing ourselves off from the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageCulturalRelativism;
