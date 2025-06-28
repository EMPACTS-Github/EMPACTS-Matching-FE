import { Startup } from "@/interfaces/StartupProfile";
import { Tab, Tabs } from "@heroui/react";
import OverviewBody from "./OverviewBody";
import AdvancedBody from "./AdvancedBody";
import DocumentBody from "./DocumentBody";
import ImageGallery from "./ImageGallery";
import { IDocument } from "@/interfaces/upload";

interface TabsSectionProps {
    startup: Startup;
    images: IDocument[];
    documents: IDocument[];
}

const TabsSection: React.FC<TabsSectionProps> = ({ startup, images, documents }) => {
    return (
        <div className="flex-1">
            <Tabs aria-label="Startup Tabs" variant="underlined" color="primary" className="font-bold">
                <Tab key="overview" title="Overview">
                    <OverviewBody startup={startup} />
                </Tab>
                <Tab key="media" title="Media">
                    <div className="flex items-center">
                        <ImageGallery images={images} />
                    </div>
                </Tab>
                <Tab key="documentation" title="Documentation">
                    <DocumentBody documents={documents} />
                </Tab>
                <Tab key="advanced" title="Advanced">
                    <AdvancedBody startup={startup} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default TabsSection;
