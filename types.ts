
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  major: string;
  year: string;
}

export interface CVData {
  id: string;
  userId: string;
  title: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    address: string;
    avatar?: string;
    objective: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  templateId: string;
  type: 'CV' | 'COVER_LETTER';
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  category: 'CV' | 'COVER_LETTER';
}
