const ReflectionPage = () => {
  return (
    <div className="space-y-6 book-page page-dotted">
      {/* Sticky Notes Grid */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="sticky-note">
          <h4 className="font-handwriting text-xl font-bold mb-2 text-foreground">
            What I Learned
          </h4>
          <ul className="space-y-2 font-serif text-sm text-foreground">
            <li>✓ Culture is constantly evolving</li>
            <li>✓ We can honor tradition & embrace change</li>
            <li>✓ Filipino identity is global yet unique</li>
            <li>✓ Our culture is our strength</li>
          </ul>
        </div>

        <div className="sticky-note" style={{ rotate: '-2deg' }}>
          <h4 className="font-handwriting text-xl font-bold mb-2 text-foreground">
            Looking Forward
          </h4>
          <p className="font-serif text-sm text-foreground">
            As we move forward, let's continue celebrating our heritage while creating new 
            cultural expressions. The future of Philippine popular culture is bright, diverse, 
            and boundless.
          </p>
        </div>
      </div>

      {/* Final Message */}
      <div className="text-center space-y-4 pt-8">
        <div className="inline-block">
          <div className="h-1 w-48 bg-linear-to-r from-ph-red via-ph-blue to-ph-yellow rounded-full mx-auto mb-4" />
          <p className="font-handwriting text-3xl text-foreground">
            Mabuhay ang Kulturang Pilipino!
          </p>
          <p className="font-serif text-sm text-muted-foreground font-bold italic mt-2">
            Long live Philippine Culture!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReflectionPage;
