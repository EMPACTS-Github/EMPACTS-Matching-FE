import { useState } from 'react';
import Image from 'next/image';
import MediaEmptyStateLogo from "/public/assets/media-empty-state-logo.svg";
// import PlusSquareIcon from '/public/assets/plus-square.svg';
import { Button } from '@heroui/react';

interface ImageGalleryProps {
    images: string[];
}

const PlusSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M8.5 4.58984L8.5 12.5898" stroke="white" stroke-width="2" stroke-linecap="round" />
        <path d="M12.5 8.58984L4.5 8.58984" stroke="white" stroke-width="2" stroke-linecap="round" />
    </svg>
);

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0] || null);
    const onClickButton = () => {
        console.log('Add new media');
    };
    return (
        <div className="flex flex-col w-full">
            {/* Hiển thị ảnh chính */}
            {selectedImage ? (
                <div>
                    <div className="w-full h-auto mb-4">
                        <Image
                            src={selectedImage}
                            alt="Selected"
                            width={800} // Chiều rộng của ảnh chính
                            height={400} // Chiều cao của ảnh chính
                            className="object-cover shadow-lg"
                        />
                    </div>

                    <div className="flex space-x-2">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedImage(image)}
                                className={`cursor-pointer rounded-lg border-2 ${selectedImage != image ? 'border-transparent' : 'border-black'
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    width={64} // Chiều rộng của thumbnail
                                    height={64} // Chiều cao của thumbnail
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>) : (
                <div className="flex flex-col items-center justify-center mb-4">
                    <Image
                        src={MediaEmptyStateLogo}
                        alt="Media Empty State Logo"
                        className='w-40 h-auto'
                    />
                    <div className='flex flex-col items-center justify-center my-4'>
                        <p className="text-md text-gray-500 mb-2">No Result</p>
                        <p className="text-sm text-gray-400">This is a mistake? Please refresh your page to see updates</p>
                    </div>
                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        className="rounded-lg bg-[#7f00ff] border-[#7f00ff] text-md text-white"
                        startContent={<PlusSquareIcon />}
                        onPress={onClickButton}
                    >
                        Add new media
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;