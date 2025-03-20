import React from 'react';
import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import DocsIcon from '/public/assets/docs-icon.svg';
import SheetsIcon from '/public/assets/sheets-icon.svg';
import SlidesIcon from '/public/assets/slides-icon.svg';
import Image from 'next/image';

const files = [
    {
        name: "Document 1",
        filename: "document1.pdf",
        icon: DocsIcon
    },
    {
        name: "Document 2",
        filename: "document2.pdf",
        icon: DocsIcon
    },
    {
        name: "Sheet 1",
        filename: "sheet1.xlsx",
        icon: SheetsIcon
    },
    {
        name: "Sheet 2",
        filename: "sheet2.xlsx",
        icon: SheetsIcon
    },
    {
        name: "Slide 1",
        filename: "slide1.pptx",
        icon: SlidesIcon
    },
    {
        name: "Slide 2",
        filename: "slide2.pptx",
        icon: SlidesIcon
    }
];
const DocumentBody = () => {
    return (
        <div className="space-y-4">
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
            </Card>
        </div>
    );
}
export default DocumentBody;