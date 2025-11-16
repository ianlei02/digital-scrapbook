  import { Heart, Sparkles } from 'lucide-react';

  const ReflectionPage1 = () => {
    return (
      <div className="space-y-6 book-page page-dotted">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-ph-red/20 rounded-lg">
            <Heart className="h-8 w-8 text-ph-red" />
          </div>
          <div>
            <h2 className="font-handwriting text-4xl font-bold text-foreground">
              Personal Reflection
            </h2>
            <div className="h-1 w-32 bg-ph-red rounded-full mt-1" />
          </div>
        </div>

        {/* Main Reflection */}
        <div className="bg-card p-8 rounded-lg shadow-lg border-2 border-ph-blue">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-ph-yellow" />
            <h3 className="font-script text-2xl font-semibold text-foreground">
              My Cultural Journey
            </h3>
          </div>
          
          <div className="space-y-4 font-serif text-foreground leading-relaxed">
            <p>
              Exploring Philippine popular culture has been an enlightening journey through the 
              rich tapestry of our heritage. From the vibrant jeepneys to the graceful Tinikling, 
              from traditional folk music to modern OPM hits, our culture is a living testament 
              to resilience and creativity.
            </p>
            
            <p>
              What strikes me most is how Filipino culture adapts and evolves while staying 
              rooted in our core values of family, respect, and community. We embrace global 
              influences not by losing ourselves, but by making them uniquely our own.
            </p>
            
            <p className="text-primary font-semibold">
              Our popular culture is more than entertainment—it's our collective identity, 
              our shared story, and our gift to the world.
            </p>
          </div>
        </div>

      </div>
    );
  };

  export default ReflectionPage1;
