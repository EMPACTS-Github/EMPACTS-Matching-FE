import { Startup } from "@/utils/interfaces/startup";
import { Tab, Tabs } from "@heroui/react";
import OverviewBody from "./OverviewBody";
import MediaBody from "./MediaBody";

const TabsSection = ({ startup }: { startup: Startup | null }) => {
    return (
        <div className="flex-1 overflow-y-scroll">
            <Tabs aria-label="Startup Tabs" variant="underlined">
                <Tab key="overview" title="Overview">
                    <OverviewBody startup={startup} />
                </Tab>
                <Tab key="media" title="Media">
                    {/* <div className="p-4 h-full flex items-center justify-center">
                        <p className="text-sm text-gray-500">Not available yet.</p>
                    </div> */}
                    <MediaBody />
                </Tab>
                <Tab key="documentation" title="Documentation">
                    <div className="p-4 h-full flex items-center justify-center">
                        <p className="text-sm text-gray-500">Not available yet.</p>
                    </div>
                </Tab>
                <Tab key="advanced" title="Advanced">
                    <div className="p-4 h-full flex items-center justify-center">
                        <p className="text-sm text-gray-500">Not available yet.</p>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default TabsSection;
