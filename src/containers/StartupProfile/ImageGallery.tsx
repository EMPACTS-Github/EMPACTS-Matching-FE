import { useRef, useState } from 'react';
import Image from 'next/image';
import MediaEmptyStateLogo from "/public/assets/media-empty-state-logo.svg";
import { IDocument } from '@/interfaces/upload';

interface ImageGalleryProps {
    images: IDocument[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="flex flex-col w-full my-4">
            {images.length > 0 ? (
                <div>
                    <div className="w-full h-auto mb-4">
                        <Image
                            src={images[selectedIndex].attachmentUrl}
                            alt="Selected"
                            width={800}
                            height={400}
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
                                    src={image.attachmentUrl}
                                    alt={`Thumbnail ${index}`}
                                    width={56}
                                    height={56}
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
                    
                </div>
            )}
        </div>
    );
};

export default ImageGallery;