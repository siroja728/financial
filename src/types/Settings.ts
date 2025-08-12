export interface AdminSettings {
  email: string;
  enable_liqpay: boolean;
  currency: "UAH" | "USD";
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface HeroBlock {
  main_text: string;
  sub_text: string;
}

export interface PersonalInfo {
  first_name: string;
  last_name: string;
  about_me: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
  telegram?: string;
  tiktok?: string;
  whatsapp?: string;
  viber?: string;
}

export interface Settings {
  admin: AdminSettings;
  contact_info: ContactInfo;
  personal_info: PersonalInfo;
  hero_block: HeroBlock;
  social_links: SocialLinks;
}
