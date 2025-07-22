import { Heart, MapPin, Calendar, Shield, Star } from 'lucide-react';
import { Pet } from '@/types/pet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PetCardProps {
  pet: Pet;
  onViewDetails: (pet: Pet) => void;
}

export function PetCard({ pet, onViewDetails }: PetCardProps) {
  return (
    <Card className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-card border-border">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-white/80 hover:bg-white shadow-sm"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            {pet.type === 'puppy' ? '🐶' : '🐱'} {pet.type}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-foreground">{pet.name}</h3>
          <div className="text-right">
            <p className="text-xl font-bold text-primary">${pet.price}</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{pet.breed}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{pet.distance} miles away</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Available {new Date(pet.availableDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-4 w-4 mr-2 fill-current text-warm-orange" />
            <span>{pet.breeder.rating}/5</span>
            {pet.breeder.verified && (
              <Shield className="h-4 w-4 ml-1 text-primary" />
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {pet.characteristics.temperament.slice(0, 2).map((trait) => (
            <Badge key={trait} variant="outline" className="text-xs">
              {trait}
            </Badge>
          ))}
        </div>
        
        <Button 
          onClick={() => onViewDetails(pet)}
          className="w-full bg-gradient-warm hover:opacity-90 transition-opacity"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}