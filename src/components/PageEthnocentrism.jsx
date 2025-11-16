import { AlertCircle } from "lucide-react";

const PageEthnocentrism = () => {
  return (
    <div className="book-page page-dotted space-y-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-6 ">
        <div className="p-3 bg-destructive/20 rounded-lg">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div >
          <h2 className="font-handwriting text-3xl font-bold text-foreground">
            Ethnocentrism
          </h2>
          <div className="h-1 w-32 bg-destructive rounded-full mt-1" />
          <div className="absolute top-11 right-1 text-4xl font-script">
            V
          </div>
          <div className="washi-tape"
          style={{ top: '70px', left: '99%', transform: 'translateX(-50%) rotate(10deg)' }}/>
        </div>
      </div>

      {/* Description */}
      <div className="bg-destructive/10 rounded-lg shadow-lg border-2 border-destructive/50 overflow-hidden">
        <div className="bg-destructive/20 p-4">
          <p className="font-serif text-sm text-foreground leading-relaxed">
            The tendency to view one's own culture as superior and to judge other
            cultures by one's own cultural standards.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h4 className="font-handwriting text-lg font-semibold text-foreground">
              Characteristics:
            </h4>
            <ul className="space-y-2 text-sm font-serif text-foreground">
              <li>✗ Judges others as “wrong” or “inferior”</li>
              <li>✗ Creates cultural barriers</li>
              <li>✗ Leads to prejudice and discrimination</li>
              <li>✗ Limits cultural understanding</li>
            </ul>
          </div>

          <div className="bg-destructive/10 p-3 rounded border border-destructive/30">
            <p className="text-xs font-serif italic text-foreground">
              <strong>Example:</strong> Viewing Filipino customs as “backward” compared
              to Western practices, or dismissing other Asian cultures as inferior.
            </p>
          </div>
        </div>
      </div>
      {/* Reflection Sticky Notes */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="sticky-note">
          <h4 className="font-handwriting text-lg font-bold mb-2 text-foreground">
            Why This Matters
          </h4>
          <p className="text-sm font-serif text-foreground">
            In our globalized world, cultural understanding is essential. The Philippines, 
            with its rich history of cultural mixing, is uniquely positioned to lead by example 
            in promoting cultural harmony.
          </p>
        </div>

        <div className="sticky-note" style={{ rotate: '-2deg' }}>
          <h4 className="font-handwriting text-lg font-bold mb-2 text-foreground">
            Practical Application
          </h4>
          <p className="text-sm font-serif text-foreground">
            Practice cultural relativism in daily life: respect different accents, understand 
            varied traditions, appreciate diverse perspectives. This enriches both personal 
            and collective experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageEthnocentrism;
