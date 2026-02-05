
import { Template, User, UserRole, CVData } from './types';

export const INITIAL_TEMPLATES: Template[] = [
  { id: 't1', name: 'Hiện đại (Modern)', category: 'CV', thumbnail: 'https://picsum.photos/seed/t1/400/600' },
  { id: 't2', name: 'Cổ điển (Classic)', category: 'CV', thumbnail: 'https://picsum.photos/seed/t2/400/600' },
  { id: 't3', name: 'Tối giản (Minimalist)', category: 'CV', thumbnail: 'https://picsum.photos/seed/t3/400/600' },
  { id: 'cl1', name: 'Thư xin việc Thanh lịch', category: 'COVER_LETTER', thumbnail: 'https://picsum.photos/seed/cl1/400/600' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'admin', fullName: 'Quản trị viên', role: UserRole.ADMIN, createdAt: '2023-01-01' },
  { id: 'u2', username: 'user1', fullName: 'Nguyễn Văn A', role: UserRole.USER, createdAt: '2023-05-10' },
];

export const MOCK_CVS: CVData[] = [
  {
    id: 'cv1',
    userId: 'u2',
    title: 'CV Lập trình viên React',
    personalInfo: {
      fullName: 'Nguyễn Văn A',
      email: 'vana@example.com',
      phone: '0987654321',
      dob: '1995-05-20',
      gender: 'Nam',
      address: 'Hà Nội, Việt Nam',
      objective: 'Mong muốn trở thành lập trình viên Fullstack giỏi.',
    },
    experience: [
      { id: 'e1', company: 'Công ty Tech A', position: 'Frontend Developer', startDate: '2020-01', endDate: 'Hiện tại', description: 'Phát triển UI/UX cho các dự án thương mại điện tử.' }
    ],
    education: [
      { id: 'ed1', school: 'Đại học Bách Khoa', major: 'Công nghệ thông tin', year: '2013-2018' }
    ],
    skills: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
    templateId: 't1',
    type: 'CV',
    updatedAt: new Date().toISOString()
  }
];
