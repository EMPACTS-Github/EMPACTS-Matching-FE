import { Tab, Tabs } from "@heroui/react";

interface TabSelectionProps {
    tabsTitle: string;
    tabKey?: string;
    tabs: string[];
    selectedTab?: string;
    setSelectedTab?: (tab: string) => void;
}

const TabSelection: React.FC<TabSelectionProps> = ({
    tabs,
    tabKey,
    tabsTitle,
    selectedTab,
    setSelectedTab,
}) => {
    return (
        
        <div className="flex flex-wrap gap-4">
            <Tabs aria-label="Tabs variants" variant="underlined">
                <Tab key={tabKey} title={tabsTitle} />
                {tabs.map((tab, index) => {
                    return <Tab key={index} title={tab} />;
                })}
            </Tabs>
        </div>
    );
};

export default TabSelection;
