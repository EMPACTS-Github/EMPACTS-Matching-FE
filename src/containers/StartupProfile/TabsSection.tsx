import { Startup } from "@/interfaces/StartupProfile";
import { Tab, Tabs } from "@heroui/react";
import OverviewBody from "./OverviewBody";
import MediaBody from "./MediaBody";
import AdvancedBody from "./AdvancedBody";
import DocumentBody from "./DocumentBody";

interface TabsSectionProps {
    startup: Startup | null;
}

const TabsSection: React.FC<TabsSectionProps> = ({ startup }) => {
    return (
        <div className="flex-1">
            <Tabs aria-label="Startup Tabs" variant="underlined">
                <Tab key="overview" title="Overview">
                    <OverviewBody startup={startup} />
                </Tab>
                <Tab key="media" title="Media">
                    <MediaBody startup={startup} />
                </Tab>
                <Tab key="documentation" title="Documentation">
                    <DocumentBody startup={startup} />
                </Tab>
                <Tab key="advanced" title="Advanced">
                    <AdvancedBody startup={startup} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default TabsSection;
