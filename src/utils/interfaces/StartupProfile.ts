export interface StartupProfileResponse {
    startup: Startup;
    members: Member[];
}

export interface Startup {
    id: number;
    name: string;
    phone: string | null;
    avt_url: string | null;
    status: string | null;
    accept_email_marketing: boolean | null;
    description: string | null;
    category: number | null;
    startup_link: string | null;
    credential: string | null;
    location_based: string | null;
    market_focus: string | null;
    startup_state: string | null;
    state_detail: string | null;
    have_active_use: boolean;
    revenue: string | null;
    other_participated_status: boolean;
    other_participated_detail: string | null;
    legal_equity_detail: string | null;
    investment_detail: string | null;
    fundraising_detail: string | null;
    empacts_source: string | null;
    participation_reason: string | null;
    push_state: number;
    is_hide: boolean;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface Member {
    id: number;
    title: string | null;
    role: string | null;
    is_deleted: number;
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