import Image from 'next/image';
import React from 'react';
import FavoriteIcon from '/public/assets/favorite-icon.svg';
import FavoriteFilledIcon from '/public/assets/favorite-filled-icon.svg';
import Button from '@/components/Button/Button';
import Avatar from '@/components/Avatar/Avatar';
import Label from '/public/assets/label.svg';
import Star from '/public/assets/star.svg';
import IconText from '@/components/common/IconText';
import TextLine from '@/components/common/TextLine';
import UserPlusIcon from '@/components/Icons/UserPlusIcon';
import { getSDGGoal } from '@/utils/getSDGGoal';
import { Chip } from '@heroui/chip';
import skills from '@/utils/data/skillOffered.json';

interface SuggestMentorDetailCardProps {
  title: string;
  location: string | undefined;
  description: string;
  rating: number;
  sdg: string[];
  onFavoriteClick: () => void;
  isFavorite: boolean;
  avtUrl: string;
  className?: string;
  onClickButton?: () => void;
  mentorProfile?: any;
}

const SuggestMentorDetailCard: React.FC<SuggestMentorDetailCardProps> = ({
  title,
  location,
  description,
  rating,
  avtUrl,
  sdg,
  onFavoriteClick,
  isFavorite,
  className = '',
  onClickButton,
  mentorProfile,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-xl p-7 gap-y-6 flex flex-col h-fit ${className}`}>
      <div className="flex justify-start items-center">
        <Avatar src={avtUrl} alt={title} variant="default-lg" className="mr-6" />
        <div className="items-center justify-between flex-grow">
          <div className="flex items-center justify-between">
            <h3 className="text-[28px] font-semibold text-black">{title}</h3>
            <div className="flex items-center gap-2">
              <IconText icon={Star} text={rating} alt="Rating" />
              <Button isIconOnly onClick={onFavoriteClick} className="bg-transparent">
                {isFavorite ? (
                  <Image src={FavoriteFilledIcon} alt="Unfavorite" width={24} height={24} />
                ) : (
                  <Image src={FavoriteIcon} alt="Favorite" width={24} height={24} />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <TextLine text={location} className="text-black text-[20px]" />
            <Button
              type="submit"
              variant="primary-md"
              startContent={<UserPlusIcon className="text-white" />}
              onClick={onClickButton}
            >
              Connect
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4">
        <div>
          <div className="text-black text-md flex flex-col flex-wrap gap-1">
            {sdg.map((item, idx) => (
              <div className="flex gap-2" key={idx}>
                <IconText icon={Label} alt="SDG" />
                <span key={idx}>{getSDGGoal(item)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Description</h4>
          <p className="text-gray-500 text-sm whitespace-pre-line text-justify">
            {description || 'No description available'}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold text-gray-800">Carrer</h4>
            <div className="text-md flex gap-2">
              <div className="text-md font-semibold text-gray-800 w-1/2">Year of Experience</div>
              <p className="text-gray-500 text-sm w-1/2">
                {mentorProfile?.yearOfProfessionalExperience || 'No data'}
              </p>
            </div>
            <div className="text-md flex gap-2">
              <div className="text-md font-semibold text-gray-800 w-1/2">Current Workspace</div>
              <p className="text-gray-500 text-sm w-1/2">
                {mentorProfile?.currentWorkplace || 'No data'}
              </p>
            </div>
            <div className="text-md flex gap-2">
              <div className="text-md font-semibold text-gray-800 w-1/2">Current Position</div>
              <p className="text-gray-500 text-sm w-1/2">
                {mentorProfile?.currentPosition || 'No data'}
              </p>
            </div>
            <div className="text-md flex gap-2">
              <div className="text-md font-semibold text-gray-800 w-1/2">Industry</div>
              <p className="text-gray-500 text-sm w-1/2">
                {mentorProfile?.industryFocus || 'No data'}
              </p>
            </div>
          </div>
          <div className="space-y-2">
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
                      {skills.find((s) => s.value === skill)?.label || skill}
                    </Chip>
                  ))
                : 'No data'}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-800">Language Spoken</h4>
            <p className="text-gray-500 text-sm whitespace-pre-line space-x-2 space-y-2">
              {Array.isArray(mentorProfile?.languagesSpoken) &&
              mentorProfile.languagesSpoken.length > 0
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
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-800">Market Focus</h4>
            <p className="text-gray-500 text-sm">
              {mentorProfile?.marketFocusExpertise == null ? (
                'No data'
              ) : (
                <Chip size="sm" color="secondary" variant="bordered" className="border-1">
                  {mentorProfile.marketFocusExpertise}
                </Chip>
              )}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-800">Funding Stage Experience</h4>
            <p className="text-gray-500 text-sm flex gap-2 flex-wrap">
              {Array.isArray(mentorProfile?.experienceWithFundingStage) &&
              mentorProfile.experienceWithFundingStage.length > 0
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
      </div>
    </div>
  );
};

export default SuggestMentorDetailCard;
