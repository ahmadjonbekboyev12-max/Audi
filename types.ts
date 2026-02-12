
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  iconName: string;
  isActive: boolean;
}

export interface AppSettings {
  logoUrl: string;
  slogan: string;
  backgroundColor: string;
}

export enum IconType {
  Globe = 'Globe',
  Car = 'Car',
  Zap = 'Zap',
  Calendar = 'Calendar',
  MapPin = 'MapPin',
  Instagram = 'Instagram',
  Youtube = 'Youtube',
  Linkedin = 'Linkedin',
  Phone = 'Phone',
  Mail = 'Mail'
}
