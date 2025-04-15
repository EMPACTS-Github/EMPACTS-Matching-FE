import { useState } from "react";
import { Card, CardBody, Tab, Tabs, Link } from "@heroui/react";
import DocsIcon from '/public/assets/docs-icon.svg';
import SheetsIcon from '/public/assets/sheets-icon.svg';
import SlidesIcon from '/public/assets/slides-icon.svg';
import DocumentEmptyStateLogo from "/public/assets/document-empty-state-logo.svg";
import Image from 'next/image';
import { Button } from '@heroui/react';
import { Startup } from "@/interfaces/StartupProfile";

const PlusSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M8.5 4.58984L8.5 12.5898" stroke="white" stroke-width="2" stroke-linecap="round" />
        <path d="M12.5 8.58984L4.5 8.58984" stroke="white" stroke-width="2" stroke-linecap="round" />
    </svg>
);

interface File {
    id: number;
    owner_id: number;
    owner_type: string;
    attachment_title: string;
    attachment_url: string;
    type: string;
    size: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

const fileNames: { [key: string]: string } = {
    docx: "Legal Documentation",
    csv: "Revenue Report",
    pptx: "Proposal Pitch"
};
// Map type to corresponding icons
const fileIcons: { [key: string]: string } = {
    docx: DocsIcon,
    csv: SheetsIcon,
    pptx: SlidesIcon,
};

const files: File[] = [
    {
        id: 3,
        owner_id: 60,
        owner_type: "STARTUP",
        attachment_title: "Presentation.pptx",
        attachment_url: "https://startup-document-s3-empacts.s3.us-east-1.amazonaws.com/d08bb9ae81ccfa7ed2d42562f16911ae8b09a7e349048d903702666542c9f497?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASIVGK7DDLGR6ELPL%2F20250314%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250314T092647Z&X-Amz-Expires=604800&X-Amz-Signature=b7de91d675690034e4301a2681188cdcf3883225e3e39b02b8a82f7019e65a1f&X-Amz-SignedHeaders=host&x-id=GetObject",
        type: "pptx",
        size: 40124,
        is_deleted: 0,
        created_at: "2025-03-14T09:26:47.603Z",
        updated_at: "2025-03-14T09:26:47.603Z"
    },
    {
        id: 2,
        owner_id: 60,
        owner_type: "STARTUP",
        attachment_title: "Data.csv",
        attachment_url: "https://startup-public-document-s3-empacts.s3.us-east-1.amazonaws.com/EmpactsLogo.png",
        type: "csv",
        size: 633650,
        is_deleted: 0,
        created_at: "2025-03-14T04:27:08.516Z",
        updated_at: "2025-03-14T04:27:08.516Z"
    },
    {
        id: 1,
        owner_id: 60,
        owner_type: "STARTUP",
        attachment_title: "Document.docx",
        attachment_url: "https://startup-document-s3-empacts.s3.us-east-1.amazonaws.com/d08bb9ae81ccfa7ed2d42562f16911ae8b09a7e349048d903702666542c9f497?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASIVGK7DDLGR6ELPL%2F20250314%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250314T092647Z&X-Amz-Expires=604800&X-Amz-Signature=b7de91d675690034e4301a2681188cdcf3883225e3e39b02b8a82f7019e65a1f&X-Amz-SignedHeaders=host&x-id=GetObject",
        type: "docx",
        size: 323072,
        is_deleted: 0,
        created_at: "2025-03-14T04:24:23.443Z",
        updated_at: "2025-03-14T04:24:23.443Z"
    }
];

interface DocumentBodyProps {
    startup: Startup | null;
}

const DocumentBody: React.FC<DocumentBodyProps> = ({ startup }) => {
    const [fileList, setFileList] = useState(files);

    const onClickButton = () => {
        console.log('Add new media');
    };

    const handleDocumentDownload = (fileUrl: string, fileName: string) => {
        // Create a hidden anchor element
        const element = document.createElement('a');
        element.setAttribute('href', fileUrl);
        element.setAttribute('download', fileName);
        element.style.display = 'none';

        // Add to the DOM
        document.body.appendChild(element);

        // Trigger download
        element.click();

        // Clean up
        document.body.removeChild(element);
    };

    return (
        <div className="space-y-4">
            {fileList.length > 0 ? (
                <Card className="flex gap-3 shadow-none m-0 p-0">
                    <CardBody className='m-0 p-1'>
                        <div className="space-y-4">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleDocumentDownload(file.attachment_url, file.attachment_title)}
                                        className="cursor-pointer bg-transparent border-none p-0 flex items-center"
                                    >
                                        <Image
                                            alt={`${file.type} icon`}
                                            height={40}
                                            src={fileIcons[file.type] || DocumentEmptyStateLogo}
                                            width={40}
                                            className="cursor-pointer"
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDocumentDownload(file.attachment_url, file.attachment_title)}
                                        className="grid justify-items-start text-left cursor-pointer bg-transparent border-none p-0"
                                    >
                                        <div className="font-semibold text-gray-800">{fileNames[file.type]}</div>
                                        <div className="text-sm text-gray-500">{file.attachment_title}</div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>) : (
                <div className="flex flex-col items-center justify-center mt-4">
                    <Image
                        src={DocumentEmptyStateLogo}
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
                        className="rounded-lg bg-[#7f00ff] border-[#7f00ff] text-md text-white"
                        startContent={<PlusSquareIcon />}
                        onPress={onClickButton}
                    >
                        Add new media
                    </Button>
                </div>
            )
            }
        </div>
    );
}
export default DocumentBody;