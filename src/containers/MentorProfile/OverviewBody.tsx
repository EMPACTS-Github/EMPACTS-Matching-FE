import { Mentor } from '@/interfaces/MentorProfile';
import { Chip } from "@heroui/chip";

interface OverviewBodyProps {
    mentorProfile: Mentor | null;
}

const OverviewBody: React.FC<OverviewBodyProps> = ({ mentorProfile }) => {

    return (
        <div className="space-y-4">
            <div>
                <h4 className="text-lg font-semibold text-gray-800">Description</h4>
                <p className="text-gray-500 text-sm whitespace-pre-line">
                    {mentorProfile?.description || "No description available"}
                </p>
            </div>
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-semibold text-gray-800">Carrer</h4>
                    <div className="text-md flex gap-2">
                        <div className="text-md font-semibold text-gray-800 w-1/2">Year of Experience</div>
                        <p className="text-gray-500 text-sm w-1/2">
                            {mentorProfile?.yearOfProfessionalExperience || "No data"}
                        </p>
                    </div>
                    <div className="text-md flex gap-2">
                        <div className="text-md font-semibold text-gray-800 w-1/2">Current Workspace</div>
                        <p className="text-gray-500 text-sm w-1/2">
                            {mentorProfile?.currentWorkplace || "No data"}
                        </p>
                    </div>
                    <div className="text-md flex gap-2">
                        <div className="text-md font-semibold text-gray-800 w-1/2">Current Position</div>
                        <p className="text-gray-500 text-sm w-1/2">
                            {mentorProfile?.currentPosition || "No data"}
                        </p>
                    </div>
                    <div className="text-md flex gap-2">
                        <div className="text-md font-semibold text-gray-800 w-1/2">Industry</div>
                        <p className="text-gray-500 text-sm w-1/2">
                            {mentorProfile?.industryFocus || "No data"}
                        </p>
                    </div>
                </div>
                <div className='space-y-2'>
                    <h4 className="text-lg font-semibold text-gray-800">Skill offered</h4>
                    <p className="text-gray-500 text-sm whitespace-pre-line space-x-2 space-y-2">
                        {Array.isArray(mentorProfile?.skillOffered) && mentorProfile.skillOffered.length > 0
                            ? mentorProfile.skillOffered.map((skill: string, idx: number) => (
                                <Chip
                                    key={idx}
                                    size="sm"
                                    color="secondary"
                                    variant="bordered"
                                    className="border-1"
                                >
                                    {skill}
                                </Chip>
                            ))
                            : 'No data'}
                    </p>
                </div>
                <div className='space-y-2'>
                    <h4 className="text-lg font-semibold text-gray-800">Language Spoken</h4>
                    <p className="text-gray-500 text-sm whitespace-pre-line space-x-2 space-y-2">
                        {Array.isArray(mentorProfile?.languagesSpoken) && mentorProfile.languagesSpoken.length > 0
                            ? mentorProfile.languagesSpoken.map((lang: string, idx: number) => (
                                <Chip
                                    key={idx}
                                    size="sm"
                                    color="secondary"
                                    variant="bordered"
                                    className="border-1"
                                >
                                    {lang}
                                </Chip>
                            ))
                            : 'No data'}
                    </p>
                </div>
            </div>
        </div >
    );
};

export default OverviewBody;