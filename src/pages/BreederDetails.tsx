import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Shield, MapPin, Phone, Mail } from 'lucide-react';
import { mockPets } from '@/data/mockPets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PetCard } from '@/components/PetCard';

export default function BreederDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  
  // Find breeder info from pets data
  const breederPets = mockPets.filter(pet => 
    pet.breeder.name.toLowerCase().replace(/\s+/g, '-') === name
  );
  
  const breeder = breederPets[0]?.breeder;
  
  if (!breeder || breederPets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Breeder not found</h1>
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
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breeder Information */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{breeder.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 fill-current text-warm-orange" />
                  <span>{breeder.rating}/5 rating</span>
                </div>
                {breeder.verified && (
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    <span>Verified Breeder</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Breeder Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-warm-orange fill-current mr-1" />
                    <span>{breeder.rating}/5</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verification Status:</span>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-primary mr-1" />
                    <span>{breeder.verified ? 'Verified' : 'Not Verified'}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Pets:</span>
                  <span>{breederPets.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-warm hover:opacity-90">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Breeder
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Pets */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Pets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breederPets.map((pet) => (
              <PetCard 
                key={pet.id} 
                pet={pet} 
                onViewDetails={(pet) => navigate(`/pet/${pet.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}