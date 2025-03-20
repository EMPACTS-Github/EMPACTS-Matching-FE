"use client";

import React, { useEffect, useState } from "react";
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

  const initialTabs = allTabs.slice(0, 6);
  const moreTabs1 = allTabs.slice(6,10);
  const moreTabs2 = allTabs.slice(10, 14);
  const moreTabs3 = allTabs.slice(14);

  const [showMore, setShowMore] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handleTabClick = (tabId: string) => {
    setSelectAll(false);
    const isSelected = selectedTabs.includes(tabId);

    const updatedTabs = isSelected
      ? selectedTabs.filter((id) => id !== tabId) // Remove if already selected
      : [...selectedTabs, tabId]; // Add if not selected

    setSelectedTabs(updatedTabs);
    console.log("updatedTabs", selectedTabs);
  };

  const handleSelectAll = () => {
    setSelectAll(true);
  }

  useEffect(() => {
    if (selectAll) {
      setSelectedTabs([]);
    }
  }, [selectAll, setSelectedTabs]);

  return (
    <div className="w-full p-4">
      <div className="flex gap-2 overflow-x-auto mb-4 justify-center whitespace-nowrap">
        <Button
          onPress={() => handleSelectAll()}
          size="md"
          variant={selectAll ? "flat" : "ghost"}
          radius="full"
          style={{
            border: selectAll ? "2px solid #EBEBEC" : "",
            whiteSpace: "normal", // Ensure full text is displayed
            wordBreak: "break-word", // Break long words
          }}
        >
          <div className="text-[16px]">
            All
          </div>
        </Button>
        {initialTabs.map((tab) => (
          <Button
            key={tab.id}
            onPress={() => handleTabClick(tab.id)}
            size="md"
            variant={selectedTabs.includes(tab.id) ? "flat" : "ghost"}
            style={{
              border: selectedTabs.includes(tab.id) ? "2px solid #EBEBEC" : "",
              whiteSpace: "normal", // Ensure full text is displayed
              wordBreak: "break-word", // Break long words
              fontSize: "16px",
            }}
            radius="full"
          >
            <div className="text-[16px]">{tab.label}</div>
          </Button>
        ))}
        {!showMore && (<Button
          onPress={() => setShowMore(!showMore)}
          size="md"
          variant="ghost"
          radius="full"
        >
          <div className="text-[16px]">
            More
          </div>
        </Button>
      )}
      </div>
      {showMore && (
        <div className="flex flex-col items-center">
          <div className="flex gap-2 overflow-x-auto mb-4 justify-center whitespace-nowrap">
            {moreTabs1.map((tab) => (
              <Button
                key={tab.id}
                onPress={() => handleTabClick(tab.id)}
                size="md"
                variant={selectedTabs.includes(tab.id) ? "flat" : "ghost"}
                className="w-min"
                style={{
                  border: selectedTabs.includes(tab.id) ? "2px solid #EBEBEC" : "",
                  whiteSpace: "normal", // Ensure full text is displayed
                  wordBreak: "break-word", // Break long words
                }}
                radius="full"
              >
                <div className="text-[16px]">{tab.label}</div>
              </Button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto mb-4 justify-center whitespace-nowrap">
            {moreTabs2.map((tab) => (
              <Button
                key={tab.id}
                onPress={() => handleTabClick(tab.id)}
                size="md"
                variant={selectedTabs.includes(tab.id) ? "flat" : "ghost"}
                className="w-min"
                style={{
                  border: selectedTabs.includes(tab.id) ? "2px solid #EBEBEC" : "",
                  whiteSpace: "normal", // Ensure full text is displayed
                  wordBreak: "break-word", // Break long words
                }}
                radius="full"
              >
                <div className="text-[16px]">{tab.label}</div>
              </Button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto mb-4 justify-center whitespace-nowrap">
            {moreTabs3.map((tab) => (
              <Button
                key={tab.id}
                onPress={() => handleTabClick(tab.id)}
                size="md"
                variant={selectedTabs.includes(tab.id) ? "flat" : "ghost"}
                className="w-min"
                style={{
                  border: selectedTabs.includes(tab.id) ? "2px solid #EBEBEC" : "",
                  whiteSpace: "normal", // Ensure full text is displayed
                  wordBreak: "break-word", // Break long words
                }}
                radius="full"
              >
                <div className="text-[16px]">{tab.label}</div>
              </Button>
            ))}
            <Button
              onPress={() => setShowMore(!showMore)}
              size="md"
              variant="ghost"
              radius="full"
            >
              <div className="text-[16px]">              
                Less
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
