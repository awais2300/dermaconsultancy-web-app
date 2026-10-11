export interface Service {
  title: string;
  summary: string;
  image: string;
  points: string[];
}

// Edit these so they match what your clinic really offers
export const SERVICES: Service[] = [
  {
    title: 'Acne Treatment',
    summary: 'Customised plans for effective acne management and clearer skin.',
    image: 'images/service-acne.jpg',
    points: ['Skin assessment', 'Treatment plan tailored to you', 'Follow-up visits'],
  },
  {
    title: 'Skin Cancer Screening',
    summary: 'Early detection and professional assessment of moles and skin changes.',
    image: 'images/service-screening.jpg',
    points: ['Full skin check', 'Mole assessment', 'Referral guidance if needed'],
  },
  {
    title: 'Hair Laser Treatment',
    summary: 'Advanced laser sessions for smoother, hair-free skin.',
    image: 'images/service-laser.jpg',
    points: ['Consultation', 'Session planning', 'Aftercare advice'],
  },
  {
    title: 'Eczema Management',
    summary: 'Comprehensive care and long-term support for eczema.',
    image: 'images/service-eczema.jpg',
    points: ['Trigger identification', 'Treatment and skincare routine', 'Ongoing review'],
  },
];