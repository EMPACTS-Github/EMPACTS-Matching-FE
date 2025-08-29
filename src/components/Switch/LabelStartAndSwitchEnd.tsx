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
    <Switch checked={checked} color="primary" onValueChange={onChange} endContent>
      {label}
    </Switch>
  );
};

export default LabelStartAndSwitchEnd;
