export interface ClientDto {
  id: string;
  avatarUrl: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  createdAt: number;
  tags: string[];
}

export interface ClientDetails {
  avatar: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  createdAt: string;
  tags: string[];
}

export interface ClientHitList {
  id: string;
  avatarUrl: string;
  name: string;
  company: string;
}


