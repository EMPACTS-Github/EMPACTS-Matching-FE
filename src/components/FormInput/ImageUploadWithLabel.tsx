import React, { useState } from "react";
import Image from "next/image";
import { uploadAttachemt } from "@/apis/upload";
import { addToast } from "@heroui/react";
import LoadingOverlay from "@/components/common/LoadingOverlay";

interface ImageUploadWithLabelProps {
  label: string;
  onImageUpload: (fileUrl: string, fileId: string) => void;
  defaultImage: string;
  ownerType: string;
  width?: number;
  height?: number;
  className?: string;
}

function ImageUploadWithLabel({
  label,
  onImageUpload,
  defaultImage,
  ownerType,
  width = 120,
  height = 120,
  className = ""
}: ImageUploadWithLabelProps) {
  const [image, setImage] = useState<string>(defaultImage);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const response = await uploadAttachemt({ file, ownerType });
        setImage(response.data.attachmentUrl);
        onImageUpload(response.data.attachmentUrl, response.data.id);
        addToast({
          title: 'Image uploaded successfully',
          color: 'success',
          timeout: 3000,
        });
      } catch (err) {
        addToast({
          title: 'Failed to upload the image',
          color: 'danger',
          timeout: 3000,
        });
      } finally {
        setLoading(false);
      }
    } else {
      addToast({
        title: 'No file selected. Please choose an image file.',
        color: 'danger',
        timeout: 3000,
      });
    }
  };

  return (
    <div className={`flex flex-col items-center gap-5 w-full py-4 relative ${className}`}>
      <LoadingOverlay isVisible={loading} />
      <label htmlFor="image-upload" className="relative cursor-pointer">
        <div 
          className="rounded-full overflow-hidden border border-gray-300"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <Image
            src={image}
            alt="Upload preview"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
      <p className="text-[#313957] text-lg leading-[160%] tracking-[0.18px] text-center">
        {label}
      </p>
    </div>
  );
}

export default ImageUploadWithLabel;
