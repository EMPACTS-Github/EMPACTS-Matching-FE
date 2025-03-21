import { Tab, Tabs } from "@heroui/react";
import { usePathname } from "next/navigation";
import React from "react";

interface TabSelectionProps {
    tabsTitle?: string;
    tabs: { title: string, href: string }[];
    selectedTab?: string;
    setSelectedTab?: (tab: string) => void;
}

const HeaderTabSelection: React.FC<TabSelectionProps> = ({
    tabs,
    tabsTitle,
    selectedTab,
    setSelectedTab,
}) => {
    const pathname = usePathname();
    return (
        <div className="flex flex-wrap gap-4">
            <Tabs
                aria-label="Tabs variants"
                variant="underlined"
            // selectedKey={pathname}
            >
                {tabs.map((tab, index) => {
                    return <Tab key={index} title={tab.title} href={tab.href} />;
                })}
            </Tabs>
        </div>
    );
};

export default HeaderTabSelection;