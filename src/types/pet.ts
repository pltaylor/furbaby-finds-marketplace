export interface Pet {
  id: string;
  name: string;
  breed: string;
  type: 'puppy' | 'kitten';
  age: number; // in weeks
  price: number;
  availableDate: string;
  location: string;
  distance: number; // in miles
  description: string;
  image: string;
  breeder: {
    name: string;
    rating: number;
    verified: boolean;
  };
  characteristics: {
    size: 'small' | 'medium' | 'large';
    temperament: string[];
    vaccinated: boolean;
    microchipped: boolean;
  };
}

export interface FilterOptions {
  type: 'all' | 'puppy' | 'kitten';
  breed: string;
  maxDistance: number;
  availableBy: string;
  priceRange: [number, number];
}

export interface SortOption {
  value: 'name' | 'price' | 'distance' | 'availableDate';
  label: string;
  direction: 'asc' | 'desc';
}