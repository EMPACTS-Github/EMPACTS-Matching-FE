import { Tab, Tabs } from "@heroui/react";

interface TabSelectionProps {
    tabsTitle: string;
    tabs: string[];
    selectedTab?: string;
    setSelectedTab?: (tab: string) => void;
}

const TabSelection: React.FC<TabSelectionProps> = ({
    tabs,
    tabsTitle,
    selectedTab,
    setSelectedTab,
}) => {
    return (

        <div className="flex flex-wrap gap-4">
            <Tabs aria-label="Tabs variants" variant="underlined">
                {tabs.map((tab, index) => {
                    return <Tab key={index} title={tab} />;
                })}
            </Tabs>
        </div>
    );
};

export default TabSelection;
