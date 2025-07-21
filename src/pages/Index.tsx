import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pet, FilterOptions, SortOption } from '@/types/pet';
import { mockPets } from '@/data/mockPets';
import { HeroSection } from '@/components/HeroSection';
import { PetFilters } from '@/components/PetFilters';
import { PetCard } from '@/components/PetCard';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    breed: '',
    maxDistance: 1000,
    availableBy: '',
    priceRange: [0, 5000],
  });
  const [sortOption, setSortOption] = useState<SortOption>({
    value: 'name',
    label: 'Name',
    direction: 'asc',
  });

  const filteredAndSortedPets = useMemo(() => {
    let result = mockPets.filter((pet) => {
      // Search filter
      if (searchQuery && !pet.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !pet.breed.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Type filter
      if (filters.type !== 'all' && pet.type !== filters.type) {
        return false;
      }

      // Breed filter
      if (filters.breed && pet.breed !== filters.breed) {
        return false;
      }

      // Distance filter
      if (pet.distance > filters.maxDistance) {
        return false;
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      let aValue: any = a[sortOption.value];
      let bValue: any = b[sortOption.value];

      if (sortOption.value === 'availableDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOption.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return result;
  }, [searchQuery, filters, sortOption]);

  const handleViewDetails = (pet: Pet) => {
    navigate(`/pet/${pet.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-12" id="pet-listings">
        <PetFilters
          filters={filters}
          onFiltersChange={setFilters}
          sortOption={sortOption}
          onSortChange={setSortOption}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Available Pets ({filteredAndSortedPets.length})
          </h2>
          <p className="text-muted-foreground">
            Find your perfect companion from our trusted breeders
          </p>
        </div>

        {filteredAndSortedPets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="text-xl font-semibold mb-2">No pets found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more results
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
