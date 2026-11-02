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
    image: 'images/acne.jpg',
    points: ['Skin assessment', 'Treatment plan tailored to you', 'Follow-up visits'],
  },
  {
    title: 'Anti Aging Solutions',
    summary: 'Our anti-aging solutions include cutting-edge procedures designed to rejuvenate your skin, restore elasticity, and enhance your natural beauty.',
    image: 'images/antiage.jpg',
    points: ['Fine lines and wrinkles treatment', 'Skin tightening and rejuvenation', 'Personalized anti-aging skincare guidance'],
    
  },
  {
    title: 'Hair Laser Treatment',
    summary: 'Advanced laser sessions for smoother, hair-free skin.',
    image: 'images/hair.png',
    points: ['Consultation', 'Session planning', 'Aftercare advice'],
  },
  {
    title: 'Eczema Management',
    summary: 'Comprehensive care and long-term support for eczema.',
    image: 'images/eczema.jpg',
    points: ['Trigger identification', 'Treatment and skincare routine', 'Ongoing review'],
  },
];