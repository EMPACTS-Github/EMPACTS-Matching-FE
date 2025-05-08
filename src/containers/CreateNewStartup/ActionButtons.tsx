import React from 'react';
import { Button } from "@heroui/react";

interface ActionButtonsProps {
  onCancel: () => void;
  onCreate: () => void;
  accentColor?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  onCreate,
  accentColor = "#70a75c"
}) => {
  return (
    <div className="flex flex-row justify-between w-full gap-8 h-12" style={{ color: accentColor }}>
      <div className="flex-1">
        <Button
          className="w-full h-[48px] rounded-lg border border-secondary bg-white text-black"
          onPress={onCancel}
        >
          <span className="text-base font-medium">Cancel</span>
        </Button>
      </div>
      <div className="flex-1">
        <Button
          className="w-full h-[48px] rounded-lg bg-empacts text-white"
          onPress={onCreate}
        >
          <span className="text-base font-medium">Create New</span>
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
