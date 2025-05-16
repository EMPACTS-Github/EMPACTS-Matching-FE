import { Switch } from "@heroui/react";

interface LabelStartAndSwitchEndProps {
    label: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
}

const LabelStartAndSwitchEnd: React.FC<LabelStartAndSwitchEndProps> = ({ label, checked, onChange }) => {
    return (
        <div className="flex justify-between">
            <div className="font-semibold text-gray-500 text-sm mr-2">
                {label}
            </div>
            <Switch
                checked={checked}
                color="secondary"
            >
            </Switch>
        </div>

    )
}

export default LabelStartAndSwitchEnd;