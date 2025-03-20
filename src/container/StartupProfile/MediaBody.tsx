import ImageGallery from './ImageGallery';
import Image from 'next/image';
const images: string[] = [
    "https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png",
    "https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png",
    "https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png",];

const MediaBody = () => {
    return (
        <div className="flex items-center">
            <ImageGallery images={images} />
        </div>
    );
}

export default MediaBody;