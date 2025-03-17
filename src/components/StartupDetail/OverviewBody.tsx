import { Startup } from "@/utils/interfaces/startup";

const OverviewBody = ({ startup }: { startup: Startup | null }) => {
    return (
        <div className="space-y-4">
            <div>
                <h4 className="text-lg font-semibold text-gray-800">Description</h4>
                <p className="text-gray-500 text-sm whitespace-pre-line">
                    {startup?.description}
                </p>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-gray-800">Profile Link</h4>
                <p className="text-gray-500 text-sm whitespace-pre-line">
                    <a href={startup?.startup_link}>{startup?.startup_link}</a>
                </p>
            </div>
        </div>
    );
};

export default OverviewBody;