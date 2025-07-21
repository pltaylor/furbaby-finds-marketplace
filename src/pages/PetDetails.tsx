import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Shield, Star, Check, X } from 'lucide-react';
import { mockPets } from '@/data/mockPets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const pet = mockPets.find(p => p.id === id);
  
  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pet not found</h1>
          <Button onClick={() => navigate('/')}>
            Return to listings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-soft border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to listings
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg shadow-pet-card">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground">
                  {pet.type === 'puppy' ? '🐶' : '🐱'} {pet.type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{pet.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{pet.breed}</p>
              <div className="text-3xl font-bold text-primary">${pet.price}</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-3" />
                <span>{pet.location} • {pet.distance} miles away</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-3" />
                <span>Available {new Date(pet.availableDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Star className="h-5 w-5 mr-3 fill-current text-warm-orange" />
                <span>{pet.breeder.name} • {pet.breeder.rating}/5 rating</span>
                {pet.breeder.verified && (
                  <Shield className="h-4 w-4 ml-2 text-primary" />
                )}
              </div>
            </div>

            <p className="text-foreground leading-relaxed">{pet.description}</p>

            <div className="flex flex-wrap gap-2">
              {pet.characteristics.temperament.map((trait) => (
                <Badge key={trait} variant="secondary">
                  {trait}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button size="lg" className="bg-gradient-warm hover:opacity-90">
                Contact Breeder
              </Button>
              <Button size="lg" variant="outline">
                Schedule Visit
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Pet Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span>{pet.age} weeks old</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="capitalize">{pet.characteristics.size}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vaccinated:</span>
                <div className="flex items-center">
                  {pet.characteristics.vaccinated ? (
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span>{pet.characteristics.vaccinated ? 'Yes' : 'No'}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Microchipped:</span>
                <div className="flex items-center">
                  {pet.characteristics.microchipped ? (
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span>{pet.characteristics.microchipped ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Breeder Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span>{pet.breeder.name}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating:</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-warm-orange fill-current mr-1" />
                  <span>{pet.breeder.rating}/5</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verified:</span>
                <div className="flex items-center">
                  {pet.breeder.verified ? (
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span>{pet.breeder.verified ? 'Verified' : 'Not Verified'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}