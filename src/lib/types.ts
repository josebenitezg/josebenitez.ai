export interface Paper {
  uid: string;
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  tags: string[];
  stars: number;
  github_link: string;
  arxiv_link: string;
  media?: string;
} 