import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-pets.jpg';

export function HeroSection() {
  const scrollToListings = () => {
    const listingsSection = document.getElementById('pet-listings');
    listingsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          Find Your Perfect
          <span className="block bg-gradient-warm bg-clip-text text-transparent animate-gentle-pulse">
            Furry Friend
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Connect with trusted breeders and find adorable puppies and kittens 
          ready for their forever homes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={scrollToListings}
            className="bg-gradient-warm hover:opacity-90 text-lg px-8 py-3 shadow-hover"
          >
            🐾 Browse Pets
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-3"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-white/80">Happy Families</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="text-white/80">Verified Breeders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">1000+</div>
            <div className="text-white/80">Pets Adopted</div>
          </div>
        </div>
      </div>
    </section>
  );
}