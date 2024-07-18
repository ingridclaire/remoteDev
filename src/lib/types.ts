export type TJobItem = {
  id: number;
  title: string;
  company: string;
  date: string;
  badgeLetters: string;
  daysAgo: number;
  relevanceScore: number;
};

export type TJobItemDetails = TJobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: number;
  location: string;
  coverImgURL: string;
  companyURL: string;
};
