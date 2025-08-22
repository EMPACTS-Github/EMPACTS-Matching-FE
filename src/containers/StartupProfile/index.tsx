/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import { Spacer, Skeleton, addToast, Card, CardBody, Divider, Avatar, Tab, Tabs, Link } from '@heroui/react';
import ProfileInfoSubCard from '@/components/Card/ProfileInfoSubCard';
import { StartupProfileResponse, Startup } from '@/interfaces/StartupProfile';
import { startup_matching_activity } from '@/apis/startup-matching';
import { MATCHING_STATUS } from '@/constants/matching';
import { IDocument } from '@/interfaces/upload';
import { getStartupDocuments } from '@/apis/upload';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import { isImageFile, isDocumentFile } from '@/services/upload';
import { getProvince } from '@/utils/getProvince';
import { getSDGGoal } from '@/utils/getSDGGoal';
import { getFileName, handleDocumentDownload } from '@/services/file';
import Image from 'next/image';
import GroupIcon from '/public/assets/group.png';
import LabelIcon from '/public/assets/label.png';
import DocsIcon from '/public/assets/docs-icon.svg';
import SheetsIcon from '/public/assets/sheets-icon.svg';
import SlidesIcon from '/public/assets/slides-icon.svg';
import DocumentEmptyStateLogo from '/public/assets/document-empty-state-logo.svg';
import MediaEmptyStateLogo from '/public/assets/media-empty-state-logo.svg';

interface StartupProfileContainerProps {
  startup_profile: StartupProfileResponse | undefined;
  onFetchStartupProfile: () => Promise<void>;
}

const StartupProfileContainer: React.FC<StartupProfileContainerProps> = ({
  startup_profile,
  onFetchStartupProfile,
}) => {
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : {};
  const userId = userObj.id;
  const isOwner = startup_profile?.members.some(
    (member) => member.user.id === userId && member.role === 'OWNER'
  );
  const [countMatches, setCountMatches] = useState<number>(0);
  const [startupImages, setStartupImages] = useState<IDocument[]>([]);
  const [startupDocuments, setStartupDocuments] = useState<IDocument[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!startup_profile?.startup?.id) return;
    const fetchMatching = async () => {
      try {
        const data = await startup_matching_activity(startup_profile.startup.id);
        const acceptedMatches = data.data.filter(
          (match: any) => match.status === MATCHING_STATUS.ACCEPTED
        );
        setCountMatches(acceptedMatches.length);
      } catch (err: any) {
        setCountMatches(0);
      }
    };
    fetchMatching();
  }, [startup_profile?.startup.id]);

  const fetchStartupDocuments = async () => {
    try {
      const response = await getStartupDocuments({
        ownerId: startup_profile?.startup.id || '',
        ownerType: UPLOAD_OWNER_TYPE.STARTUP,
        limit: 100,
        page: 1,
      });
      const allDocuments = response.data;
      const images = allDocuments.filter((document: IDocument) => isImageFile(document.type));
      const documents = allDocuments.filter((document: IDocument) => isDocumentFile(document.type));
      setStartupImages(images);
      setStartupDocuments(documents);
    } catch (error) {
      addToast({
        title: 'Oops! Something went wrong',
        color: 'danger',
        timeout: 3000,
      });
    }
  };

  useEffect(() => {
    fetchStartupDocuments();
  }, []);

  // Inline ProfileHeader component
  const ProfileHeader = ({ startup }: { startup: Startup | null }) => (
    <div className="mb-small">
      <div className="flex items-center">
        <Avatar
          showFallback
          isBordered
          src={startup?.avtUrl}
          size="lg"
          radius="full"
          className="bg-neutral-20"
          color="primary"
        />
        <div className="flex flex-col ml-regular">
          <h3 className="text-xl font-bold text-secondary">{startup?.name}</h3>
          <p className="text-neutral-80 text-md">{getProvince(startup?.locationBased || '')}</p>
        </div>
      </div>
      <div className="flex w-full gap-x-semi-regular mt-regular">
        <div className="flex items-center gap-1 overflow-hidden">
          <Image src={LabelIcon} alt="Project" width={24} height={24} className="object-cover" />
          <span className="font-inter font-semibold text-base text-secondary text-center truncate">
            {getSDGGoal(startup?.sdgGoal || '')}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Image src={GroupIcon} alt="Members" width={24} height={24} className="object-cover" />
          <span className="font-inter font-semibold text-base text-secondary text-center">
            {startup?.memberQty} {startup?.memberQty === 1 ? 'Member' : 'Members'}
          </span>
        </div>
      </div>
    </div>
  );

  // Inline OverviewBody component
  const OverviewBody = ({ startup }: { startup: Startup }) => (
    <div className="space-y-regular">
      <div>
        <h4 className="text-lg font-semibold text-secondary">Description</h4>
        <p className="text-neutral-80 text-sm whitespace-pre-line">
          {startup.description || 'No description available'}
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-secondary w-1/2">Profile Link</h4>
        <p className="text-neutral-80 text-sm whitespace-pre-line w-1/2">
          {startup.startupLink ? (
            <Link
              isExternal
              showAnchorIcon
              size="sm"
              className="text-primary"
              href={
                startup.startupLink.startsWith('http')
                  ? startup.startupLink
                  : `https://${startup.startupLink}`
              }
            >
              {startup.startupLink}
            </Link>
          ) : (
            <span className="text-neutral-80">No profile link available</span>
          )}
        </p>
      </div>
    </div>
  );

  // Inline AdvancedBody component
  const AdvancedBody = ({ startup }: { startup: Startup }) => (
    <div className="space-y-medium">
      <div className="grid grid-cols-3 gap-10 w-1/2">
        <div className="col-span-2 text-lg font-semibold text-secondary">Active User</div>
        <p className="text-neutral-80 text-sm">
          {startup.haveActiveUse == null ? 'No data' : startup.haveActiveUse ? 'Yes' : 'Not yet'}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10 w-1/2">
        <div className="col-span-2 text-lg font-semibold text-secondary">Latest Revenue</div>
        <p className="text-neutral-80 text-sm">
          {startup?.revenue == null ? 'No data' : startup.revenue}
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-secondary">Startup State - Stage</h4>
        <p className="text-neutral-80 text-sm">
          {startup.startupFundingStage == null ? 'No data' : startup.startupFundingStage}
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-secondary">Investment</h4>
        <p className="text-neutral-80 text-sm">
          {startup.investmentDetail == null ? 'No data' : startup.investmentDetail}
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-secondary">Fundraising</h4>
        <p className="text-neutral-80 text-sm">
          {startup.fundraisingDetail == null ? 'No data' : startup.fundraisingDetail}
        </p>
      </div>
    </div>
  );

  // Inline DocumentBody component
  const DocumentBody = ({ documents }: { documents: IDocument[] }) => {
    const fileIcons = {
      docx: DocsIcon,
      csv: SheetsIcon,
      pptx: SlidesIcon,
      xlsx: SheetsIcon,
      pdf: SlidesIcon,
    };

    const getFileIcon = (fileType: string) => {
      return fileIcons[fileType as keyof typeof fileIcons] || DocumentEmptyStateLogo;
    };

    return (
      <div className="space-y-regular">
        {documents.length > 0 ? (
          <Card className="flex gap-semi-regular shadow-none m-0 p-0">
            <CardBody className="m-0 p-1">
              <div className="space-y-regular">
                {documents.map((document, index) => (
                  <div key={index} className="flex items-center gap-regular">
                    <button
                      type="button"
                      onClick={() =>
                        handleDocumentDownload(document.attachmentUrl, document.attachmentTitle)
                      }
                      className="cursor-pointer bg-transparent border-none p-0 flex items-center"
                    >
                      <Image
                        alt={`${document.type} icon`}
                        height={40}
                        src={getFileIcon(document.type)}
                        width={40}
                        className="cursor-pointer"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDocumentDownload(document.attachmentUrl, document.attachmentTitle)
                      }
                      className="grid justify-items-start text-left cursor-pointer bg-transparent border-none p-0"
                    >
                      <div className="text-lg text-secondary font-bold">
                        {getFileName(document.attachmentTitle, 50)}
                      </div>
                      <div className="text-xs text-neutral-80">{document.type}</div>
                    </button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center mt-regular">
            <Image
              src={DocumentEmptyStateLogo}
              alt="Media Empty State Logo"
              className="w-40 h-auto"
            />
            <div className="flex flex-col items-center justify-center mb-regular">
              <p className="text-md text-neutral-80 mb-small">No Result</p>
              <p className="text-sm text-neutral-50">
                This is a mistake? Please refresh your page to see updates
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Inline ImageGallery component
  const ImageGallery = ({ images }: { images: IDocument[] }) => (
    <div className="flex flex-col w-full my-regular">
      {images.length > 0 ? (
        <div>
          <div className="w-full h-auto mb-regular">
            <Image
              src={images[selectedImageIndex].attachmentUrl}
              alt="Selected"
              width={800}
              height={400}
              className="object-cover shadow-lg rounded-lg"
            />
          </div>

          <div className="flex space-x-small">
            {images.map((image, index) => (
              <div key={index} onClick={() => setSelectedImageIndex(index)}>
                <Image
                  src={image.attachmentUrl}
                  alt={`Thumbnail ${index}`}
                  width={56}
                  height={56}
                  className={`w-14 h-14 object-cover cursor-pointer box-border p-1 border-solid border-2 ${
                    selectedImageIndex == index ? 'border-primary' : 'border-transparent'
                  } rounded-lg`}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-regular">
          <Image src={MediaEmptyStateLogo} alt="Media Empty State Logo" className="w-40 h-auto" />
          <div className="flex flex-col items-center justify-center mb-regular">
            <p className="text-md text-neutral-80 mb-small">No Result</p>
            <p className="text-sm text-neutral-50">
              This is a mistake? Please refresh your page to see updates
            </p>
          </div>
        </div>
      )}
    </div>
  );

  // Inline TabsSection component
  const TabsSection = ({ startup, images, documents }: { startup: Startup; images: IDocument[]; documents: IDocument[] }) => (
    <div className="flex-1">
      <Tabs aria-label="Startup Tabs" variant="underlined" color="primary" className="font-bold">
        <Tab key="overview" title="Overview">
          <OverviewBody startup={startup} />
        </Tab>
        <Tab key="media" title="Media">
          <div className="flex items-center">
            <ImageGallery images={images} />
          </div>
        </Tab>
        <Tab key="documentation" title="Documentation">
          <DocumentBody documents={documents} />
        </Tab>
        <Tab key="advanced" title="Advanced">
          <AdvancedBody startup={startup} />
        </Tab>
      </Tabs>
    </div>
  );

  return (
    <div className="flex w-full 2xl:px-[20%] xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-extra-small relative z-10 gap-none mt-medium">
      <div className="w-3/4 mx-0 p-large rounded-lg shadow-lg bg-neutral-20 flex flex-col justify-center">
        {startup_profile?.startup ? (
          <div>
            <ProfileHeader startup={startup_profile?.startup} />
            <TabsSection
              startup={startup_profile?.startup}
              images={startupImages}
              documents={startupDocuments}
            />
          </div>
        ) : (
          <div>
            <Skeleton className="rounded-lg mb-regular">
              <div className="h-24 rounded-lg bg-neutral-40" />
            </Skeleton>
            <div className="space-y-semi-regular">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-neutral-40" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-neutral-40" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-neutral-40" />
              </Skeleton>
            </div>
          </div>
        )}
      </div>
      <Spacer x={4} />
      {startup_profile?.startup ? (
        <div className="w-1/4">
          <ProfileInfoSubCard
            onFetchStartupProfile={onFetchStartupProfile}
            onFetchStartupDocuments={fetchStartupDocuments}
            startup={startup_profile.startup}
            isOwner={isOwner}
            countMatches={countMatches}
          />
        </div>
      ) : (
        <div className="w-1/4">
          <Card className="bg-neutral-20 min-w-lg shadow-lg rounded-lg px-regular py-small">
            <div className="rounded-full flex items-center justify-center">
              <Skeleton className="h-20 w-20 rounded-full bg-neutral-40" />
            </div>
            <CardBody>
              <Divider />
              <div className="flex gap-medium justify-center items-center p-small">
                <Skeleton className="h-8 w-20 rounded-full bg-neutral-40" />
                <Divider orientation="vertical" className="h-14" />
                <Skeleton className="h-8 w-20 rounded-full bg-neutral-40" />
              </div>
              <Divider />
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StartupProfileContainer;
