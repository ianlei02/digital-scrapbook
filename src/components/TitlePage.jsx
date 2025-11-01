import phPattern from "@/assets/paper-dark.jpg";
import { BookOpen } from "lucide-react";

const TitlePage = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden  p-6 rounded-lg shadow-md bg-cover" style={{ backgroundImage: `url(${phPattern})` }}>
      {/* Background Paper Texture */}
      <div
        className="absolute inset-0 opacity-20 rounded-lg scale-[1.05] blur-sm"
        style={{
          backgroundImage: `url(${phPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Parallax Floating Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 w-12 h-12 md:w-16 md:h-16 bg-ph-red/20 rounded-full blur-md animate-float" />
        <div className="absolute top-8 right-6 w-16 h-16 md:w-20 md:h-20 bg-ph-blue/20 rounded-full blur-md animate-float-slow" />
        <div className="absolute bottom-6 left-8 w-14 h-14 md:w-16 md:h-16 bg-ph-yellow/20 rounded-full blur-md animate-float-slower" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4 md:space-y-6">
        {/* Book Icon */}
        <BookOpen className="h-16 w-16 md:h-20 md:w-20 text-white/90 animate-float" />

        {/* Title */}
        <h1 className="font-handwriting text-4xl md:text-5xl font-bold text-gradient-to-r from-ph-red via-ph-blue to-ph-yellow bg-clip-text text-transparent">
          Digital Scrapbook
        </h1>

        {/* Subtitle */}
        <h2 className="font-script text-2xl md:text-3xl text-white drop-shadow-md">
          Philippine Popular Culture
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base text-white/80 max-w-xs md:max-w-sm font-serif italic leading-relaxed">
          A journey through the rich tapestry of Filipino traditions, arts, and modern influences
        </p>

        

        {/* Navigation Hint */}
        <div className="pt-4 text-xs md:text-sm text-muted-foreground font-script animate-pulse">
          Click "Next" to start exploring →
        </div>
      </div>
    </div>
  );
};

export default TitlePage;
