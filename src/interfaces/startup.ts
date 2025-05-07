export interface HomepageStartup {
  id: number;
  name: string;
  description?: string;
  category: string;
  avt_url: string;
  member_qty: number;
}

export interface Startup {
  id: number;
  name: string;
  avt_url?: string;
  description?: string;
  category?: string;
  startup_link?: string;
  location_based: string;
  member_qty?: number;
}

export interface Category {
  id: string;
  label: string;
}

export interface MemberForInvite {
  email: string;
  title: string;
}
