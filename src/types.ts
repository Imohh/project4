export interface Interest {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  matchScore: number;
  category: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  interests: string[];
}
