import { Interest, Question } from './types';

export const INTERESTS: Interest[] = [
  { id: 'sports', name: 'Sports', icon: 'Trophy', color: 'blue' },
  { id: 'music', name: 'Music', icon: 'Music', color: 'purple' },
  { id: 'science', name: 'Science', icon: 'Beaker', color: 'green' },
  { id: 'tech', name: 'Technology', icon: 'Cpu', color: 'indigo' },
  { id: 'art', name: 'Art', icon: 'Palette', color: 'pink' },
  { id: 'history', name: 'History', icon: 'Book', color: 'amber' },
];

export const QUESTIONS: Question[] = [
  {
    id: '1',
    title: 'The Physics of a Curveball',
    content: 'How does the Magnus effect influence the trajectory of a spinning baseball?',
    tags: ['sports', 'science'],
    difficulty: 'Intermediate',
    matchScore: 95,
    category: 'Science'
  },
  {
    id: '2',
    title: 'AI in Music Composition',
    content: 'Exploring how neural networks are used to generate melodies in the style of Bach.',
    tags: ['music', 'tech'],
    difficulty: 'Advanced',
    matchScore: 88,
    category: 'Technology'
  },
  {
    id: '3',
    title: 'Wearable Tech for Athletes',
    content: 'How real-time biometric data is revolutionizing training for professional sprinters.',
    tags: ['sports', 'tech'],
    difficulty: 'Beginner',
    matchScore: 92,
    category: 'Technology'
  },
  {
    id: '4',
    title: 'The Chemistry of Sound',
    content: 'Understanding how different materials affect the acoustic properties of concert halls.',
    tags: ['music', 'science'],
    difficulty: 'Intermediate',
    matchScore: 84,
    category: 'Science'
  },
  {
    id: '5',
    title: 'Historical Tech Revolutions',
    content: 'A look at how the printing press changed the spread of scientific knowledge.',
    tags: ['history', 'tech', 'science'],
    difficulty: 'Beginner',
    matchScore: 78,
    category: 'History'
  },
  {
    id: '6',
    title: 'Quantum Computing Basics',
    content: 'An introduction to qubits and how they differ from classical bits.',
    tags: ['tech', 'science'],
    difficulty: 'Advanced',
    matchScore: 70,
    category: 'Technology'
  }
];
