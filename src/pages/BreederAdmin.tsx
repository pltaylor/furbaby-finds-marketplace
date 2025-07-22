import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, User, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { mockPets } from '@/data/mockPets';

export default function BreederAdmin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [breeder, setBreeder] = useState<any>(null);
  const [pets, setPets] = useState(mockPets.filter(pet => pet.breeder.name === 'Golden Hills Kennel'));

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('breeder_auth');
    if (!auth) {
      navigate('/breeder-login');
      return;
    }
    
    const breederData = JSON.parse(auth);
    setBreeder(breederData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('breeder_auth');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate('/');
  };

  const deletePet = (petId: string) => {
    setPets(pets.filter(pet => pet.id !== petId));
    toast({
      title: "Pet removed",
      description: "Pet has been removed from your listings"
    });
  };

  if (!breeder) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-soft border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Public Site
              </Button>
              <h1 className="text-2xl font-bold">Breeder Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {breeder.name}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button 
            onClick={() => navigate('/breeder-admin/add-pet')}
            className="h-20 bg-gradient-warm hover:opacity-90"
          >
            <Plus className="h-6 w-6 mr-2" />
            Add New Pet
          </Button>
          <Button 
            onClick={() => navigate('/breeder-admin/create-litter')}
            variant="outline" 
            className="h-20"
          >
            <Plus className="h-6 w-6 mr-2" />
            Create Litter
          </Button>
          <Button 
            onClick={() => navigate('/breeder-admin/profile')}
            variant="outline" 
            className="h-20"
          >
            <User className="h-6 w-6 mr-2" />
            Edit Profile
          </Button>
          <Card className="h-20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{pets.length}</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </div>
          </Card>
        </div>

        {/* Current Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Your Pet Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {pets.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No pets listed yet</p>
                <Button onClick={() => navigate('/breeder-admin/add-pet')}>
                  Add Your First Pet
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {pets.map((pet) => (
                  <div key={pet.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <img 
                        src={pet.image} 
                        alt={pet.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{pet.name}</h3>
                        <p className="text-sm text-muted-foreground">{pet.breed}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">
                            {pet.type === 'puppy' ? '🐶' : '🐱'} {pet.type}
                          </Badge>
                          <span className="text-sm font-medium">${pet.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/breeder-admin/edit-pet/${pet.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deletePet(pet.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}