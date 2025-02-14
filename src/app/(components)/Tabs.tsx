"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  onTabChange?: (selectedTabs: string[]) => void;
  defaultTabs?: string[];
}

const Tabs: React.FC<TabsProps> = ({
  onTabChange = () => {},
  defaultTabs = [],
}) => {
  const [selectedTabs, setSelectedTabs] = useState<string[]>(defaultTabs);

  const tabs: Tab[] = [
    { id: "all", label: "All" },
    { id: "no-poverty", label: "No poverty" },
    { id: "zero-hunger", label: "Zero Hunger" },
    { id: "health", label: "Good health and Well-being" },
    { id: "education", label: "Quality Education" },
    { id: "gender", label: "Gender equality" },
    { id: "water", label: "Clean water and sanitation" },
    { id: "more", label: "More" },
  ];

  const handleTabClick = (tabId: string) => {
    const isSelected = selectedTabs.includes(tabId);

    const updatedTabs = isSelected
      ? selectedTabs.filter((id) => id !== tabId) // Remove if already selected
      : [...selectedTabs, tabId]; // Add if not selected

    setSelectedTabs(updatedTabs);
    onTabChange(updatedTabs); // Notify parent component
  };

  return (
    <div className="w-full p-4">
      <div className="flex gap-2 overflow-x-auto mb-4 justify-center whitespace-nowrap">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onPress={() => handleTabClick(tab.id)}
            size="sm"
            variant={selectedTabs.includes(tab.id) ? "flat" : "ghost"}
            radius="full"
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
