import { Startup } from '@/interfaces/StartupProfile';

interface AdvancedBodyProps {
  startup: Startup;
}

const AdvancedBody: React.FC<AdvancedBodyProps> = ({ startup }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-10 w-1/2">
        <div className="col-span-2 text-lg font-semibold text-gray-800">Active User</div>
        <p className="text-gray-500 text-sm">
          {startup.haveActiveUse == null ? 'No data' : startup.haveActiveUse ? 'Yes' : 'Not yet'}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10 w-1/2">
        <div className="col-span-2 text-lg font-semibold text-gray-800">Lastest Revenue</div>
        <p className="text-gray-500 text-sm">
          {startup?.revenue == null ? 'No data' : startup.revenue}
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">Startup State - State</h4>
        <p className="text-gray-500 text-sm">
          {startup.startupFundingStage == null ? 'No data' : startup.startupFundingStage}
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">Investment</h4>
        <p className="text-gray-500 text-sm">
          {startup.investmentDetail == null ? 'No data' : startup.investmentDetail}
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">Fundraising</h4>
        <p className="text-gray-500 text-sm">
          {startup.fundraisingDetail == null ? 'No data' : startup.fundraisingDetail}
        </p>
      </div>
    </div>
  );
};

export default AdvancedBody;
