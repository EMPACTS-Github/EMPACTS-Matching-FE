import ImageGallery from './ImageGallery';
import Image from 'next/image';
import { Startup } from "@/utils/interfaces/StartupProfile";


interface MediaBodyProps {
    startup: Startup | null;
}

const images: string[] = [
    "https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png",
    "https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png",
    "https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png",];

const MediaBody: React.FC<MediaBodyProps> = ({ startup }) => {
    return (
        <div className="flex items-center">
            <ImageGallery images={images} />
        </div>
    );
}

export default MediaBody;