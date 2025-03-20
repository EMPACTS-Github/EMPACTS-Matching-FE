import ImageGallery from './ImageGallery';
import Image from 'next/image';
const images: string[] = [
    "https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png",
    "https://startup-document-s3-empacts.s3.us-east-1.amazonaws.com/fd822b489eba4908f48a9e843c9ea8d5ddfb76133a2ed0cad7a5f1b7ad3bf5e8",
];

const MediaBody = () => {
    return (
        <div className="flex items-center">
            <ImageGallery images={images} />
        </div>
    );
}

export default MediaBody;