import React from 'react';
import { Switch } from '@heroui/react';

interface LabelStartAndSwitchEndProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const LabelStartAndSwitchEnd: React.FC<LabelStartAndSwitchEndProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <Switch isSelected={checked} color="primary" onValueChange={onChange} className="p-1">
      <div className="text-sm">{label}</div>
    </Switch>
  );
};

export default LabelStartAndSwitchEnd;
