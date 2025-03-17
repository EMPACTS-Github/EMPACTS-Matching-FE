import { useState } from 'react';

interface ImageGalleryProps {
    images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="flex flex-col items-center">
            {/* Hiển thị ảnh chính */}
            <div className="mb-4">
                <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
            </div>

            {/* Hiển thị các bản xem trước thu nhỏ */}
            <div className="flex space-x-2">
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`cursor-pointer p-1 border-2 ${selectedImage === image ? 'border-blue-500' : 'border-transparent'
                            } rounded-lg`}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index}`}
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;