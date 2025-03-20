import { Startup } from "@/utils/interfaces/StartupProfile";

interface AdvancedBodyProps {
    startup: Startup | null;
}

const AdvancedBody: React.FC<AdvancedBodyProps> = ({ startup }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-10 w-1/2">
                <div className="col-span-2 text-lg font-semibold text-gray-800">Active User</div>
                <p className="text-gray-500 text-sm">
                    {startup?.have_active_use == null ? "No data" : startup.have_active_use ? "Yes" : "Not yet"}
                </p>
            </div>
            <div className="grid grid-cols-3 gap-10 w-1/2">
                <div className="col-span-2 text-lg font-semibold text-gray-800">Lastest Revenue</div>
                <p className="text-gray-500 text-sm">
                    {startup?.revenue == null ? "No data" : startup.revenue}
                </p>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-gray-800">Startup State - State</h4>
                <p className="text-gray-500 text-sm">
                    {startup?.startup_state == null ? "No data" : startup.startup_state}
                </p>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-gray-800">Investment</h4>
                <p className="text-gray-500 text-sm">
                    {startup?.investment_detail == null ? "No data" : startup.investment_detail}
                </p>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-gray-800">Fundraising</h4>
                <p className="text-gray-500 text-sm">
                    {startup?.fundraising_detail == null ? "No data" : startup.fundraising_detail}
                </p>
            </div>
        </div>
    );
}

export default AdvancedBody;