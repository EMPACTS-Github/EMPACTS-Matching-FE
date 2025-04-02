export interface StartupProfileResponse {
    startup: Startup;
    members: Member[];
}

export interface Startup {
    id: number;
    name: string;
    phone: string | null;
    avt_url: string;
    status: string;
    description: string | null;
    category: string;
    startup_link: string | null;
    credential: string | null;
    location_based: string;
    market_focus: string | null;
    startup_state: string | null;
    state_detail: string | null;
    have_active_use: number;
    revenue: number;
    other_participated_detail: string;
    legal_equity_detail: string;
    investment_detail: string;
    fundraising_detail: string;
    push_state: number;
    member_qty: number;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}

export interface Member {
    id: number;
    position_title: string;
    role: string;
    description: string | null;
    linkedin_url: string | null;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    user_id: User;
}

export interface User {
    id: number;
    email: string;
    name: string;
    avt_url: string;
    is_verified: boolean;
}