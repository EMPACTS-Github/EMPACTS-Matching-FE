"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { STARTUP_SDG_GOALS } from "@/constants/sdgs";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  selectedTabs?: string[];
  setSelectedTabs: (tabs: string[]) => void;
}

const Tabs: React.FC<TabsProps> = ({
  selectedTabs = [],
  setSelectedTabs,
}) => {
  const allTabs: Tab[] = (Object.keys(STARTUP_SDG_GOALS) as Array<keyof typeof STARTUP_SDG_GOALS>).map((key) => ({
    id: STARTUP_SDG_GOALS[key].textValue,
    label: STARTUP_SDG_GOALS[key].label,
  }));

  const initialTabs = allTabs.slice(0, 7);
  const moreTabs1 = allTabs.slice(7,12);
  const moreTabs2 = allTabs.slice(12);

  const [showMore, setShowMore] = useState(false);

  const handleTabClick = (tabId: string) => {
    const isSelected = selectedTabs.includes(tabId);

    const updatedTabs = isSelected
      ? selectedTabs.filter((id) => id !== tabId) // Remove if already selected
      : [...selectedTabs, tabId]; // Add if not selected

    setSelectedTabs(updatedTabs);
    console.log("updatedTabs", selectedTabs);
  };

  return (
    <div className="w-full p-4">
      <div className="flex gap-2 overflow-x-auto mb-4 justify-center whitespace-nowrap">
        {initialTabs.map((tab) => (
          <Button
            key={tab.id}
            onPress={() => handleTabClick(tab.id)}
            size="sm"
            variant={selectedTabs.includes(tab.id) ? "flat" : "ghost"}
            style={{
              border: selectedTabs.includes(tab.id) ? "2px solid #EBEBEC" : "",
            }}
            radius="full"
          >
            {tab.label}
          </Button>
        ))}
        <Button
          onPress={() => setShowMore(!showMore)}
          size="sm"
          variant="ghost"
          radius="full"
        >
          {showMore ? "Less" : "More"}
        </Button>
      </div>
      {showMore && (
        <div className="flex flex-col items-center">
          <div className="flex gap-2 overflow-x-auto mb-4 justify-center whitespace-nowrap w-3/4">
            {moreTabs1.map((tab) => (
              <Button
                key={tab.id}
                onPress={() => handleTabClick(tab.id)}
                size="sm"
                variant={selectedTabs.includes(tab.id) ? "flat" : "ghost"}
                className="w-min"
                style={{
                  border: selectedTabs.includes(tab.id) ? "2px solid #EBEBEC" : "",
                }}
                radius="full"
              >
                {tab.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto mb-4 justify-center whitespace-nowrap w-3/4">
            {moreTabs2.map((tab) => (
              <Button
                key={tab.id}
                onPress={() => handleTabClick(tab.id)}
                size="sm"
                variant={selectedTabs.includes(tab.id) ? "flat" : "ghost"}
                className="w-min"
                style={{
                  border: selectedTabs.includes(tab.id) ? "2px solid #EBEBEC" : "",
                }}
                radius="full"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
