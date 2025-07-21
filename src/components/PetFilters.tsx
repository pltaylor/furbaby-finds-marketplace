import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { FilterOptions, SortOption } from '@/types/pet';
import { breeds } from '@/data/mockPets';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PetFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const sortOptions: SortOption[] = [
  { value: 'name', label: 'Name', direction: 'asc' },
  { value: 'price', label: 'Price: Low to High', direction: 'asc' },
  { value: 'price', label: 'Price: High to Low', direction: 'desc' },
  { value: 'distance', label: 'Distance', direction: 'asc' },
  { value: 'availableDate', label: 'Available Date', direction: 'asc' },
];

export function PetFilters({ 
  filters, 
  onFiltersChange, 
  sortOption, 
  onSortChange,
  searchQuery,
  onSearchChange 
}: PetFiltersProps) {
  const currentBreeds = filters.type === 'all' 
    ? [...breeds.puppy, ...breeds.kitten]
    : breeds[filters.type] || [];

  return (
    <Card className="mb-6 shadow-pet-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Find Your Perfect Pet</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Pet Type */}
          <Select
            value={filters.type}
            onValueChange={(value) => 
              onFiltersChange({ ...filters, type: value as any, breed: '' })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Pet Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pets</SelectItem>
              <SelectItem value="puppy">🐶 Puppies</SelectItem>
              <SelectItem value="kitten">🐱 Kittens</SelectItem>
            </SelectContent>
          </Select>

          {/* Breed */}
          <Select
            value={filters.breed}
            onValueChange={(value) => 
              onFiltersChange({ ...filters, breed: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Breed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Breeds</SelectItem>
              {currentBreeds.map((breed) => (
                <SelectItem key={breed} value={breed}>
                  {breed}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Distance */}
          <Select
            value={filters.maxDistance.toString()}
            onValueChange={(value) => 
              onFiltersChange({ ...filters, maxDistance: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000">Any Distance</SelectItem>
              <SelectItem value="10">Within 10 miles</SelectItem>
              <SelectItem value="25">Within 25 miles</SelectItem>
              <SelectItem value="50">Within 50 miles</SelectItem>
              <SelectItem value="100">Within 100 miles</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select
            value={`${sortOption.value}-${sortOption.direction}`}
            onValueChange={(value) => {
              const [sortValue, direction] = value.split('-');
              const option = sortOptions.find(
                opt => opt.value === sortValue && opt.direction === direction
              );
              if (option) onSortChange(option);
            }}
          >
            <SelectTrigger>
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem 
                  key={`${option.value}-${option.direction}`} 
                  value={`${option.value}-${option.direction}`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}