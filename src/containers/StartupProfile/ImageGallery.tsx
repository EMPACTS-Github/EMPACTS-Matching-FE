import { useState } from 'react';
import Image from 'next/image';
import MediaEmptyStateLogo from "/public/assets/media-empty-state-logo.svg";
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
    const [selectedIndex, setSelectedIndex] = useState(0); // Lưu trữ chỉ số của hình ảnh được chọn
    const onClickButton = () => {
        console.log('Add new media');
    };
    return (
        <div className="flex flex-col w-full my-4">
            {/* Hiển thị ảnh chính */}
            {images.length > 0 ? (
                <div>
                    <div className="w-full h-auto mb-4">
                        <Image
                            src={images[selectedIndex]}
                            alt="Selected"
                            width={800} // Chiều rộng của ảnh chính
                            height={400} // Chiều cao của ảnh chính
                            className="object-cover shadow-lg rounded-lg"
                        />
                    </div>

                    <div className="flex space-x-2">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                            >
                                <Image
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    width={56} // Chiều rộng của thumbnail
                                    height={56} // Chiều cao của thumbnail
                                    className={`w-14 h-14 object-cover cursor-pointer box-border p-1 border-solid border-2 ${selectedIndex == index ? 'border-empacts' : 'border-transparent'
                                        } rounded-lg`}
                                />
                            </div>
                        ))}
                    </div>
                </div>) : (
                <div className="flex flex-col items-center justify-center mt-4">
                    <Image
                        src={MediaEmptyStateLogo}
                        alt="Media Empty State Logo"
                        className='w-40 h-auto'
                    />
                    <div className='flex flex-col items-center justify-center mb-4'>
                        <p className="text-md text-gray-500 mb-2">No Result</p>
                        <p className="text-sm text-gray-400">This is a mistake? Please refresh your page to see updates</p>
                    </div>
                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        className="rounded-lg bg-empacts border-empacts text-md text-white"
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