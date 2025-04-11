"use client";

import React, { useState } from 'react';
import { Tab, Tabs } from "@heroui/react";
import Image from 'next/image';
import Link from 'next/link';

interface StartupProfileNavigationProps {
  startupName: string;
  startupLogo?: string;
  startupId?: string;
}

const StartupProfileNavigation: React.FC<StartupProfileNavigationProps> = ({
  startupName,
  startupLogo = '/assets/avatar-placeholder.png',
  startupId = '',
}) => {
  const [selected, setSelected] = useState("explore");

  return (
    <div className="w-full bg-white border-b border-gray-200 flex justify-center">
      <div className="flex-col w-full max-w-5xl">
        <Tabs 
          aria-label="Startup profile tabs" 
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary"
          }}
          selectedKey={selected}
          onSelectionChange={setSelected as any}
        >
          <Tab 
            key="explore" 
            title={
              <div className="flex items-center gap-2">
                <span>Explore</span>
              </div>
            }
          />
          <Tab 
            key="profile" 
            title={
              <div className="flex items-center gap-2">
                <span>Profile</span>
              </div>
            } 
          />
          <Tab 
            key="member" 
            title={
              <div className="flex items-center gap-2">
                <span>Member</span>
              </div>
            }
          />
        </Tabs>
      </div>
    </div>
  );
};

export default StartupProfileNavigation; 