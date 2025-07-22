import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function AddPet() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [petData, setPetData] = useState({
    name: '',
    breed: '',
    type: 'puppy' as 'puppy' | 'kitten',
    age: 8,
    price: 0,
    availableDate: undefined as Date | undefined,
    description: '',
    size: 'medium' as 'small' | 'medium' | 'large',
    temperament: [] as string[],
    vaccinated: false,
    microchipped: false,
    imageUrl: ''
  });

  const temperamentOptions = [
    'Friendly', 'Gentle', 'Loyal', 'Playful', 'Affectionate', 
    'Intelligent', 'Energetic', 'Calm', 'Trainable', 'Independent'
  ];

  const handleTemperamentChange = (trait: string, checked: boolean) => {
    setPetData(prev => ({
      ...prev,
      temperament: checked 
        ? [...prev.temperament, trait]
        : prev.temperament.filter(t => t !== trait)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock API call
    toast({
      title: "Pet added successfully!",
      description: `${petData.name} has been added to your listings`
    });
    
    navigate('/breeder-admin');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-soft border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/breeder-admin')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Add New Pet</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Pet Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Pet Name</Label>
                  <Input
                    id="name"
                    value={petData.name}
                    onChange={(e) => setPetData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter pet name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={petData.type} onValueChange={(value: 'puppy' | 'kitten') => setPetData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="puppy">🐶 Puppy</SelectItem>
                      <SelectItem value="kitten">🐱 Kitten</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="breed">Breed</Label>
                  <Select value={petData.breed} onValueChange={(value) => setPetData(prev => ({ ...prev, breed: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select breed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Golden Retriever">Golden Retriever</SelectItem>
                      <SelectItem value="Labrador Retriever">Labrador Retriever</SelectItem>
                      <SelectItem value="German Shepherd">German Shepherd</SelectItem>
                      <SelectItem value="French Bulldog">French Bulldog</SelectItem>
                      <SelectItem value="Maine Coon">Maine Coon</SelectItem>
                      <SelectItem value="Persian">Persian</SelectItem>
                      <SelectItem value="Siamese">Siamese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select value={petData.size} onValueChange={(value: 'small' | 'medium' | 'large') => setPetData(prev => ({ ...prev, size: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age (weeks)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={petData.age}
                    onChange={(e) => setPetData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    min="1"
                    max="52"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={petData.price}
                    onChange={(e) => setPetData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label>Available Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !petData.availableDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {petData.availableDate ? format(petData.availableDate, "PPP") : <span>Pick available date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={petData.availableDate}
                      onSelect={(date) => setPetData(prev => ({ ...prev, availableDate: date }))}
                      className={cn("p-3 pointer-events-auto")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={petData.description}
                  onChange={(e) => setPetData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the pet's personality, special features, etc."
                  rows={4}
                />
              </div>

              <div>
                <Label>Temperament</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {temperamentOptions.map((trait) => (
                    <div key={trait} className="flex items-center space-x-2">
                      <Checkbox
                        id={trait}
                        checked={petData.temperament.includes(trait)}
                        onCheckedChange={(checked) => handleTemperamentChange(trait, !!checked)}
                      />
                      <Label htmlFor={trait} className="text-sm">{trait}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vaccinated"
                    checked={petData.vaccinated}
                    onCheckedChange={(checked) => setPetData(prev => ({ ...prev, vaccinated: !!checked }))}
                  />
                  <Label htmlFor="vaccinated">Vaccinated</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="microchipped"
                    checked={petData.microchipped}
                    onCheckedChange={(checked) => setPetData(prev => ({ ...prev, microchipped: !!checked }))}
                  />
                  <Label htmlFor="microchipped">Microchipped</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={petData.imageUrl}
                  onChange={(e) => setPetData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="Enter image URL"
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-warm hover:opacity-90">
                Add Pet to Listings
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}