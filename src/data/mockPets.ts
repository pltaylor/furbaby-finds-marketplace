import { Pet } from '@/types/pet';
import puppy1 from '@/assets/puppy-1.jpg';
import puppy2 from '@/assets/puppy-2.jpg';
import kitten1 from '@/assets/kitten-1.jpg';
import kitten2 from '@/assets/kitten-2.jpg';

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    type: 'puppy',
    age: 8,
    price: 1200,
    availableDate: '2024-02-15',
    location: 'San Francisco, CA',
    distance: 5,
    description: 'Beautiful Golden Retriever puppy with a gentle temperament. Great with kids and other pets.',
    image: puppy1,
    breeder: {
      name: 'Golden Hills Kennel',
      rating: 4.8,
      verified: true,
    },
    characteristics: {
      size: 'large',
      temperament: ['Friendly', 'Gentle', 'Loyal'],
      vaccinated: true,
      microchipped: true,
    },
  },
  {
    id: '2',
    name: 'Whiskers',
    breed: 'Maine Coon',
    type: 'kitten',
    age: 12,
    price: 800,
    availableDate: '2024-02-20',
    location: 'Oakland, CA',
    distance: 12,
    description: 'Adorable Maine Coon kitten with stunning orange coat and bright blue eyes.',
    image: kitten1,
    breeder: {
      name: 'Purrfect Paws Cattery',
      rating: 4.9,
      verified: true,
    },
    characteristics: {
      size: 'large',
      temperament: ['Playful', 'Affectionate', 'Intelligent'],
      vaccinated: true,
      microchipped: false,
    },
  },
  {
    id: '3',
    name: 'Cocoa',
    breed: 'Labrador Retriever',
    type: 'puppy',
    age: 10,
    price: 1000,
    availableDate: '2024-03-01',
    location: 'San Jose, CA',
    distance: 25,
    description: 'Energetic chocolate lab puppy perfect for active families.',
    image: puppy2,
    breeder: {
      name: 'Bay Area Labs',
      rating: 4.7,
      verified: true,
    },
    characteristics: {
      size: 'large',
      temperament: ['Energetic', 'Friendly', 'Trainable'],
      vaccinated: true,
      microchipped: true,
    },
  },
  {
    id: '4',
    name: 'Luna',
    breed: 'Persian',
    type: 'kitten',
    age: 16,
    price: 1500,
    availableDate: '2024-02-25',
    location: 'Berkeley, CA',
    distance: 8,
    description: 'Elegant Persian kitten with luxurious gray and white coat.',
    image: kitten2,
    breeder: {
      name: 'Royal Persian Cattery',
      rating: 4.9,
      verified: true,
    },
    characteristics: {
      size: 'medium',
      temperament: ['Calm', 'Affectionate', 'Gentle'],
      vaccinated: true,
      microchipped: true,
    },
  },
];

export const breeds = {
  puppy: ['Golden Retriever', 'Labrador Retriever', 'German Shepherd', 'French Bulldog', 'Beagle'],
  kitten: ['Maine Coon', 'Persian', 'Siamese', 'British Shorthair', 'Ragdoll'],
};