import { User, Startup } from "./StartupProfile"

//use this interface to get startup of user at dropdown in header
export interface StartupOfUser {
    id: number;
    position_title: string;
    role: string;
    description: string | null;
    linkedin_url: string | null;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    user_id: User;
    startup_id: Startup;
}
