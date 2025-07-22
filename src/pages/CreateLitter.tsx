import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const steps = [
  'Basic Information',
  'Parents',
  'Litter Details',
  'Individual Pets',
  'Review'
];

export default function CreateLitter() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [litterData, setLitterData] = useState({
    breed: '',
    motherName: '',
    fatherName: '',
    litterSize: 1,
    birthDate: undefined as Date | undefined,
    availableDate: undefined as Date | undefined,
    basePrice: 0,
    pets: [] as Array<{
      name: string;
      sex: 'male' | 'female';
      price: number;
      markings: string;
    }>
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLitterSizeChange = (size: number) => {
    setLitterData(prev => ({
      ...prev,
      litterSize: size,
      pets: Array.from({ length: size }, (_, i) => ({
        name: '',
        sex: 'male' as const,
        price: prev.basePrice,
        markings: ''
      }))
    }));
  };

  const updatePet = (index: number, field: string, value: any) => {
    setLitterData(prev => ({
      ...prev,
      pets: prev.pets.map((pet, i) => 
        i === index ? { ...pet, [field]: value } : pet
      )
    }));
  };

  const submitLitter = () => {
    // Mock API call
    toast({
      title: "Litter created successfully!",
      description: `${litterData.litterSize} pets have been added to your listings`
    });
    navigate('/breeder-admin');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="breed">Breed</Label>
              <Select value={litterData.breed} onValueChange={(value) => setLitterData(prev => ({ ...prev, breed: value }))}>
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
              <Label>Birth Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !litterData.birthDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {litterData.birthDate ? format(litterData.birthDate, "PPP") : <span>Pick birth date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={litterData.birthDate}
                    onSelect={(date) => setLitterData(prev => ({ ...prev, birthDate: date }))}
                    className={cn("p-3 pointer-events-auto")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Available Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !litterData.availableDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {litterData.availableDate ? format(litterData.availableDate, "PPP") : <span>Pick available date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={litterData.availableDate}
                    onSelect={(date) => setLitterData(prev => ({ ...prev, availableDate: date }))}
                    className={cn("p-3 pointer-events-auto")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mother">Mother's Name</Label>
              <Input
                id="mother"
                value={litterData.motherName}
                onChange={(e) => setLitterData(prev => ({ ...prev, motherName: e.target.value }))}
                placeholder="Enter mother's name"
              />
            </div>
            <div>
              <Label htmlFor="father">Father's Name</Label>
              <Input
                id="father"
                value={litterData.fatherName}
                onChange={(e) => setLitterData(prev => ({ ...prev, fatherName: e.target.value }))}
                placeholder="Enter father's name"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="size">Number of Pets in Litter</Label>
              <Select value={litterData.litterSize.toString()} onValueChange={(value) => handleLitterSizeChange(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="basePrice">Base Price ($)</Label>
              <Input
                id="basePrice"
                type="number"
                value={litterData.basePrice}
                onChange={(e) => setLitterData(prev => ({ ...prev, basePrice: parseInt(e.target.value) || 0 }))}
                placeholder="Enter base price"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Configure Each Pet</h3>
            {litterData.pets.map((pet, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">Pet #{index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={pet.name}
                        onChange={(e) => updatePet(index, 'name', e.target.value)}
                        placeholder="Pet name"
                      />
                    </div>
                    <div>
                      <Label>Sex</Label>
                      <Select value={pet.sex} onValueChange={(value) => updatePet(index, 'sex', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        value={pet.price}
                        onChange={(e) => updatePet(index, 'price', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label>Markings</Label>
                      <Input
                        value={pet.markings}
                        onChange={(e) => updatePet(index, 'markings', e.target.value)}
                        placeholder="Special markings"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Litter Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Breed:</strong> {litterData.breed}
              </div>
              <div>
                <strong>Litter Size:</strong> {litterData.litterSize}
              </div>
              <div>
                <strong>Mother:</strong> {litterData.motherName}
              </div>
              <div>
                <strong>Father:</strong> {litterData.fatherName}
              </div>
              <div>
                <strong>Birth Date:</strong> {litterData.birthDate ? format(litterData.birthDate, "PPP") : 'Not set'}
              </div>
              <div>
                <strong>Available Date:</strong> {litterData.availableDate ? format(litterData.availableDate, "PPP") : 'Not set'}
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Pets in Litter:</h4>
              <div className="space-y-2">
                {litterData.pets.map((pet, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                    <span>{pet.name || `Pet #${index + 1}`} ({pet.sex})</span>
                    <span>${pet.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
            <h1 className="text-2xl font-bold">Create New Litter</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  index <= currentStep 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-20 h-1 mx-2",
                    index < currentStep ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep]}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <Button onClick={submitLitter} className="bg-gradient-warm hover:opacity-90">
              Create Litter
            </Button>
          ) : (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}