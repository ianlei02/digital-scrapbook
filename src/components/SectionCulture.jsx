import { BookMarked } from 'lucide-react';
import tinikling from '@/assets/paper-dark.jpg';

const SectionCulture = () => {
  return (
    <div className="w-full h-full book-page page-dotted">
      {/* Section Header */}
      <div className="flex items-center">
        <div className=" bg-ph-red/20 rounded-lg">
          <BookMarked className="h-8 w-8 text-ph-red" />
        </div>
        <div>
          <h2 className="font-handwriting text-4xl font-bold text-orange-900">
            What is Culture?
          </h2>
          <div className="h-1 w-24 bg-ph-red rounded-full mt-1" />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Text Content */}
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-lg shadow-md border-l-4 border-yellow-900">
            <h3 className="font-script text-2xl font-semibold text-foreground mb-3">
              Understanding Culture
            </h3>
            <p className="text-foreground leading-relaxed text-sm">
              Culture encompasses the shared values, beliefs, customs, behaviors, and artifacts 
              that characterize a group or society. It's the lens through which we view the world 
              and interpret our experiences.
            </p>
          </div>

          <div className="sticky-note tape-corner">
            <h4 className="font-handwriting text-xl font-bold mb-2">
              Key Components:
            </h4>
            <ul className="space-y-2 font-serif">
              <li>• Language & Communication</li>
              <li>• Traditions & Rituals</li>
              <li>• Arts & Entertainment</li>
              <li>• Social Norms & Values</li>
              <li>• Food & Cuisine</li>
            </ul>
          </div>
        </div>

        {/* Image Content */}
        <div className="space-y-4">
          <div className="polaroid-frame">
            <img 
              src={tinikling}
              alt="Traditional Filipino Tinikling dance"
              className="w-full h-64 object-cover rounded"
            />
            <p className="font-handwriting text-center mt-2 text-foreground">
              Tinikling - Traditional Filipino Dance
            </p>
          </div>

          <div className="bg-orange-400/20 p-4 rounded-lg border-2 border-dashed border-orange-400">
            <h4 className="font-script text-xl font-semibold text-primary mb-2">
              Popular Culture
            </h4>
            <p className="text-foreground text-sm leading-relaxed">
              Popular culture refers to the cultural elements that are prevalent in mainstream 
              society at a given time. It includes mass media, entertainment, fashion, and trends 
              that resonate with large audiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCulture;
