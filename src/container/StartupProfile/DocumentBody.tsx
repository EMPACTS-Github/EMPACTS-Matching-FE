import { useState } from "react";
import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import DocsIcon from '/public/assets/docs-icon.svg';
import SheetsIcon from '/public/assets/sheets-icon.svg';
import SlidesIcon from '/public/assets/slides-icon.svg';
import DocumentEmptyStateLogo from "/public/assets/document-empty-state-logo.svg";
import Image from 'next/image';
import { Button } from '@heroui/react';

const PlusSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M8.5 4.58984L8.5 12.5898" stroke="white" stroke-width="2" stroke-linecap="round" />
        <path d="M12.5 8.58984L4.5 8.58984" stroke="white" stroke-width="2" stroke-linecap="round" />
    </svg>
);

interface File {
    name: string;
    filename: string;
    icon: string;
}

const files: File[] = [
    // {
    //     name: "Document 1",
    //     filename: "document1.pdf",
    //     icon: DocsIcon
    // },
    // {
    //     name: "Document 2",
    //     filename: "document2.pdf",
    //     icon: DocsIcon
    // },
    // {
    //     name: "Sheet 1",
    //     filename: "sheet1.xlsx",
    //     icon: SheetsIcon
    // },
    // {
    //     name: "Sheet 2",
    //     filename: "sheet2.xlsx",
    //     icon: SheetsIcon
    // },
    // {
    //     name: "Slide 1",
    //     filename: "slide1.pptx",
    //     icon: SlidesIcon
    // },
    // {
    //     name: "Slide 2",
    //     filename: "slide2.pptx",
    //     icon: SlidesIcon
    // }
];
const DocumentBody = () => {
    const [fileList, setFileList] = useState(files[0] || null);
    const onClickButton = () => {
        console.log('Add new media');
    };
    return (
        <div className="space-y-4">
            {fileList ? (
                <Card className="flex gap-3 shadow-none m-0 p-0">
                    <CardBody className='m-0 p-1'>
                        <div className="space-y-4">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <Image
                                        alt="heroui logo"
                                        height={40}
                                        src={file.icon}
                                        width={40}
                                    />
                                    <div>
                                        <p className="font-semibold">{file.name}</p>
                                        <p className="text-sm text-gray-500">{file.filename}</p>
                                    </div>
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