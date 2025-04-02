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

export interface Member {
    email: string;
    title: string;
}
