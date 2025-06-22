import { Card, CardBody } from "@heroui/react";
import DocsIcon from '/public/assets/docs-icon.svg';
import SheetsIcon from '/public/assets/sheets-icon.svg';
import SlidesIcon from '/public/assets/slides-icon.svg';
import DocumentEmptyStateLogo from "/public/assets/document-empty-state-logo.svg";
import Image from 'next/image';
import { getFileName, handleDocumentDownload } from "@/services/file";
import { IDocument } from "@/interfaces/upload";

interface DocumentBodyProps {
    documents: IDocument[];
}

const DocumentBody: React.FC<DocumentBodyProps> = ({ documents }) => {
    const fileIcons = {
        docx: DocsIcon,
        csv: SheetsIcon,
        pptx: SlidesIcon,
        xlsx: SheetsIcon,
        pdf: SlidesIcon,
    };

    // Get icon based on file type
    const getFileIcon = (fileType: string) => {
        return fileIcons[fileType as keyof typeof fileIcons] || DocumentEmptyStateLogo;
    }

    return (
        <>
            <div className="space-y-4">
                {
                    documents.length > 0 ? (
                        <Card className="flex gap-3 shadow-none m-0 p-0">
                            <CardBody className='m-0 p-1'>
                                <div className="space-y-4">
                                    {documents.map((document, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => handleDocumentDownload(document.attachmentUrl, document.attachmentTitle)}
                                                className="cursor-pointer bg-transparent border-none p-0 flex items-center"
                                            >
                                                <Image
                                                    alt={`${document.type} icon`}
                                                    height={40}
                                                    src={getFileIcon(document.type)}
                                                    width={40}
                                                    className="cursor-pointer"
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDocumentDownload(document.attachmentUrl, document.attachmentTitle)}
                                                className="grid justify-items-start text-left cursor-pointer bg-transparent border-none p-0"
                                            >
                                                <div className="text-lg text-black font-bold">{getFileName(document.attachmentTitle, 50)}</div>
                                                <div className="text-xs text-gray-500">{document.type}</div>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    ) : (<div className="flex flex-col items-center justify-center mt-4">
                        <Image
                            src={DocumentEmptyStateLogo}
                            alt="Media Empty State Logo"
                            className='w-40 h-auto'
                        />
                        <div className='flex flex-col items-center justify-center mb-4'>
                            <p className="text-md text-gray-500 mb-2">No Result</p>
                            <p className="text-sm text-gray-400">This is a mistake? Please refresh your page to see updates</p>
                        </div>

                    </div>)
                }
            </div>
        </>
    );
}
export default DocumentBody;