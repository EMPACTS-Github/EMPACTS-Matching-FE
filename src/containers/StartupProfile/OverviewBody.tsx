import { Startup } from "@/interfaces/StartupProfile";
import { Link } from "@heroui/link";

interface OverviewBodyProps {
    startup: Startup;
}

const OverviewBody: React.FC<OverviewBodyProps> = ({ startup }) => {
    return (
        <div className="space-y-4">
            <div>
                <h4 className="text-lg font-semibold text-gray-800">Description</h4>
                <p className="text-gray-500 text-sm whitespace-pre-line">
                    {startup.description || "No description available"}
                </p>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-gray-800 w-1/2">Profile Link</h4>
                <p className="text-gray-500 text-sm whitespace-pre-line w-1/2">
                    {startup.startupLink ? (
                        <Link isExternal showAnchorIcon size="sm" className="text-blue-500"
                            href={
                                startup.startupLink.startsWith("http")
                                    ? startup.startupLink
                                    : `https://${startup.startupLink}`
                            }
                        >
                            {startup.startupLink}
                        </Link>
                    ) : (
                        <span className="text-gray-500">No profile link available</span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default OverviewBody;