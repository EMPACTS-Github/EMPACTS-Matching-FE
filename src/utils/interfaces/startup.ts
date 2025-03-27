export interface Startup {
    id: number;
    name: string;
    description?: string;
    category?: string;
    location_based: string;
    location_based_label?: string;  // Add this field
    avt_url?: string;
    startup_link?: string;
    // Other fields...
}

export interface Member {
    email: string;
    title: string;
}
