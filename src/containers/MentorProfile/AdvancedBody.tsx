import { Mentor } from '@/interfaces/MentorProfile';
import { Chip } from "@heroui/chip";

interface AdvancedBodyProps {
  mentorProfile: Mentor | null;
}

const AdvancedBody: React.FC<AdvancedBodyProps> = ({ mentorProfile }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-10 w-[80%]">
        <h4 className="col-span-2 text-lg font-semibold text-gray-800">
          Market Focus
        </h4>
        <p className="text-gray-500 text-sm">
          {mentorProfile?.marketFocusExpertise == null
            ? 'No data'
            : <Chip
              size="sm"
              color="secondary"
              variant="bordered"
              className="border-1"
            >
              {mentorProfile.marketFocusExpertise}
            </Chip>}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10 w-[80%]">
        <h4 className="col-span-2 text-lg font-semibold text-gray-800">
          Funding Stage Experience
        </h4>
        <p className="text-gray-500 text-sm flex gap-2 flex-wrap">
          {Array.isArray(mentorProfile?.experienceWithFundingStage) && mentorProfile.experienceWithFundingStage.length > 0
            ? mentorProfile.experienceWithFundingStage.map((stage: string, idx: number) => (
              <Chip
                key={idx}
                size="sm"
                color="secondary"
                variant="bordered"
                className="border-1"
              >
                {stage}
              </Chip>
            ))
            : 'No data'}
        </p>
      </div>
    </div>
  );
};

export default AdvancedBody;
