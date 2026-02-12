
import { LinkItem, IconType } from './types';

export const DEFAULT_LINKS: LinkItem[] = [
  { id: '1', title: 'Rasmiy Veb-sayt', url: 'https://audi.com', iconName: IconType.Globe, isActive: true },
  { id: '2', title: 'Yangi Modellar', url: 'https://emaktab.uz', iconName: IconType.Car, isActive: true },
  { id: '3', title: 'Elektr Avtomobillar (e-tron)', url: '#', iconName: IconType.Zap, isActive: true },
  { id: '4', title: 'Sinov Drayviga Yozilish', url: '#', iconName: IconType.Calendar, isActive: true },
  { id: '5', title: 'Dilerlar Markazi', url: '#', iconName: IconType.MapPin, isActive: true },
  { id: '6', title: 'Instagram', url: 'https://instagram.com/audi', iconName: IconType.Instagram, isActive: true },
  { id: '7', title: 'YouTube Kanali', url: 'https://youtube.com/audi', iconName: IconType.Youtube, isActive: true },
  { id: '8', title: 'LinkedIn', url: 'https://linkedin.com/company/audi-ag', iconName: IconType.Linkedin, isActive: true },
  { id: '9', title: 'Aloqa va Qo\'llab-quvvatlash', url: '#', iconName: IconType.Phone, isActive: true },
];

export const DEFAULT_SETTINGS = {
  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/2560px-Audi-Logo_2016.svg.png',
  slogan: 'Vorsprung durch Technik - Texnologiya orqali yuksalish',
  backgroundColor: '#ffffff'
};

export const ADMIN_CREDENTIALS = {
  login: 'test',
  password: 'test123'
};
