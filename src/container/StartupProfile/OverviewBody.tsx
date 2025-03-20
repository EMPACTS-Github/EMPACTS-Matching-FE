import { Startup } from "@/utils/interfaces/StartupProfile";

interface OverviewBodyProps {
    startup: Startup | null;
}

const OverviewBody: React.FC<OverviewBodyProps> = ({ startup }) => {
    return (
        <div className="space-y-4">
            <div>
                <h4 className="text-lg font-semibold text-gray-800">Description</h4>
                <p className="text-gray-500 text-sm whitespace-pre-line">
                    {startup?.description || "No description available"}
                </p>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-gray-800">Profile Link</h4>
                <p className="text-gray-500 text-sm whitespace-pre-line">
                    {startup?.startup_link ? (
                        <a
                            href={
                                startup.startup_link.startsWith("http")
                                    ? startup.startup_link
                                    : `https://${startup.startup_link}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            {startup.startup_link}
                        </a>
                    ) : (
                        <span className="text-gray-500">No profile link available</span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default OverviewBody;