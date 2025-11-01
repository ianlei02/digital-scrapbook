import { History } from 'lucide-react';
import jeepney from '@/assets/jeepney.jpg';

const SectionHistory = () => {


  return (
    <div className="space-y-6 book-page page-lined">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-ph-blue/20 rounded-lg">
          <History className="h-8 w-8 text-ph-blue" />
        </div>
        <div>
          <h2 className="font-handwriting text-4xl font-bold text-foreground">
            History of Philippine Pop Culture
          </h2>
          <div className="h-1 w-32 bg-ph-blue rounded-full mt-1" />
        </div>
      </div>

      {/* Featured Image */}
      <div className="polaroid-frame max-w-md mx-auto">
        <img 
          src={jeepney}
          alt="Colorful Philippine Jeepney - Symbol of Filipino Culture"
          className="w-full h-56 object-cover rounded"
        />
        <p className="font-handwriting text-center mt-2 text-foreground">
          The Iconic Jeepney - Mobile Art & Culture
        </p>
      </div>
     {/* Summary Note */}
      <div className="sticky-note tape-horizontal mt-6">
        <p className="font-handwriting text-lg text-foreground">
          "Philippine popular culture is a beautiful blend of indigenous roots, colonial influences, 
          and modern global trends - creating something uniquely Filipino."
        </p>
      </div>
   

     
    </div>
  );
};

export default SectionHistory;
