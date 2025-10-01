'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Spacer,
  Skeleton,
  addToast,
  Card,
  CardBody,
  Divider,
  Avatar,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
} from '@heroui/react';
import { Chip } from '@heroui/chip';
import ProfileInfoSubCard from '@/containers/StartupProfile/ProfileCard';
import { StartupProfileResponse, Member } from '@/interfaces/StartupProfile';
import { startup_matching_activity } from '@/apis/startup-matching';
import { MATCHING_STATUS } from '@/constants/matching';
import { IDocument } from '@/interfaces/upload';
import { getStartupDocuments } from '@/apis/upload';
import { UPLOAD_OWNER_TYPE } from '@/constants/upload';
import { isImageFile, isDocumentFile } from '@/services/upload';
import {
  startup_member_edit_title,
  startup_member_change_permission,
  startup_member_delete,
} from '@/apis/startup-member';
import { invite_list_member } from '@/apis/startup';
import { MemberForInvite } from '@/interfaces/startup';
import Image from 'next/image';
import MenuIcon from '/public/assets/three-dot-menu-icon.svg';

// Import components
import Button from '@/components/Button/Button';
import DeleteIcon from '@/components/Icons/DeleteIcon';
import EditIcon from '@/components/Icons/EditIcon';
import UsersIcon from '@/components/Icons/UsersIcon';
import EditMemberTitleModal from '@/components/Modal/EditMemberTitleModal';
import DeleteMemberModal from '@/components/Modal/DeleteMemberModal';
import ChangePermissionModal from '@/components/Modal/ChangeMemberPermissionModal';
import InviteMemberModal from '@/components/Modal/InviteMemberModal';

interface StartupMemberContainerProps {
  startup_profile: StartupProfileResponse | undefined;
  onFetchStartupProfile: () => Promise<void>;
}

const StartupMemberContainer: React.FC<StartupMemberContainerProps> = ({
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

  // Member list states
  const [memberList, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member>({} as Member);
  const [filterMode, setFilterMode] = useState<'ALL' | 'OWNER' | 'MEMBER'>('ALL');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [newMemberList, setNewMemberList] = useState<MemberForInvite[]>([]);
  const [accessAction, setAccessAction] = useState({
    canEdit: false,
    canInvite: false,
  });

  // Modal states
  const {
    isOpen: isEditTitleOpen,
    onOpen: onEditTitleOpen,
    onOpenChange: onEditTitleOpenChange,
  } = useDisclosure();
  const {
    isOpen: isChangePermissionOpen,
    onOpen: onChangePermissionOpen,
    onOpenChange: onChangePermissionOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();
  const {
    isOpen: isInviteOpen,
    onOpen: onInviteOpen,
    onOpenChange: onInviteOpenChange,
  } = useDisclosure();

  const iconClasses =
    'text-xl text-neutral-80 hover:text-neutral-20 pointer-events-none flex-shrink-0';

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
  }, [startup_profile?.startup?.id]);

  const fetchStartupDocuments = useCallback(async () => {
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
  }, [startup_profile?.startup?.id]);

  useEffect(() => {
    if (startup_profile?.startup?.id) {
      fetchStartupDocuments();
    }
  }, [startup_profile?.startup?.id, fetchStartupDocuments]);

  // Member list effects
  useEffect(() => {
    if (startup_profile?.members) {
      setMembers(startup_profile.members);
      setFilteredMembers(startup_profile.members);
    }
  }, [startup_profile?.members, startup_profile?.startup.id]);

  useEffect(() => {
    if (filterMode === 'ALL') {
      setFilteredMembers(memberList);
    } else {
      setFilteredMembers(memberList.filter((member) => member.role === filterMode));
    }
  }, [filterMode, memberList]);

  useEffect(() => {
    if (!userId || !memberList) return;
    const isOwner = memberList.some(
      (member) => member.user.id === userId && member.role === 'OWNER'
    );
    setAccessAction({
      canEdit: isOwner,
      canInvite: isOwner,
    });
  }, [memberList, userId]);

  // Member management functions
  const inviteMembers = async () => {
    if (newMemberList.length !== 0) {
      const inviterEmail = userObj.email;
      invite_list_member({
        invitee: newMemberList,
        inviterEmail: inviterEmail,
        startupId: startup_profile?.startup.id || '',
      })
        .then(() => {
          addToast({
            title: 'Members invited successfully',
            color: 'success',
            timeout: 3000,
          });
        })
        .catch(() => {
          addToast({
            title: 'Error inviting members',
            color: 'danger',
            timeout: 5000,
          });
        });
    }
  };

  const updateMemberTitle = async (memberId: string, newTitle: string) => {
    const member = memberList.find((member) => member.id === memberId);
    if (member && member.positionTitle != newTitle) {
      const data = {
        startupId: startup_profile?.startup.id || '',
        positionTitle: newTitle,
      };
      try {
        const res = await startup_member_edit_title(memberId, data);
        if (res.code == 'STARTUP_MEMBER_UPDATED') {
          setMembers((prevMembers) =>
            prevMembers.map((member) =>
              member.id === memberId ? { ...member, positionTitle: res.data.positionTitle } : member
            )
          );
          addToast({
            title: 'Update member position title successfully',
            color: 'success',
            timeout: 3000,
          });
        }
      } catch (err) {
        console.error('Failed to edit position title:', err);
        addToast({
          title: 'Update member position title failed',
          color: 'danger',
          timeout: 3000,
        });
      }
    }
  };

  const changeMemberPermission = async (memberId: string, newRole: string) => {
    const member = memberList.find((member) => member.id === memberId);
    if (member && member.role != newRole) {
      const data = {
        startupId: startup_profile?.startup.id || '',
        role: newRole,
      };
      try {
        const res = await startup_member_change_permission(memberId, data);
        if (res.code == 'STARTUP_MEMBER_UPDATED') {
          setMembers((prevMembers) =>
            prevMembers.map((member) =>
              member.id === memberId ? { ...member, role: res.data.role } : member
            )
          );
          addToast({
            title: 'Change member permission successfully',
            color: 'success',
            timeout: 3000,
          });
        }
      } catch (err) {
        console.error('Failed to change permission:', err);
        addToast({
          title: 'Change member permission failed',
          color: 'danger',
          timeout: 3000,
        });
      }
    }
  };

  const deleteMember = async (memberId: string) => {
    const member = memberList.find((member) => member.id === memberId);
    if (member) {
      const data = {
        startupId: startup_profile?.startup.id || '',
      };
      try {
        const res = await startup_member_delete(memberId, data);
        if (res.code == 'STARTUP_MEMBER_DELETED') {
          setMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId));
        }
        addToast({
          title: 'Delete member successfully',
          color: 'success',
          timeout: 3000,
        });
      } catch (err) {
        console.error('Failed to delete member:', err);
        addToast({
          title: 'Delete member failed',
          color: 'danger',
          timeout: 3000,
        });
      }
    }
  };

  // Inline RoleChip component
  const RoleChip = ({ role }: { role: string }) => (
    <Chip
      size='sm'
      color='primary'
      variant={role === 'OWNER' ? 'faded' : 'bordered'}
      className={role === 'OWNER' ? 'border-primary border-1 bg-primary-20 capitalize' : 'border-1'}
    >
      {role === 'OWNER' ? 'Owner' : role === 'MEMBER' ? 'Member' : role}
    </Chip>
  );

  // Inline MemberListContainer component
  const MemberListContainer = () => (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-regular'>
        <div className='space-x-small'>
          <Button
            variant={filterMode === 'ALL' ? 'primary-sm' : 'bordered-sm'}
            radius='full'
            onClick={() => setFilterMode('ALL')}
            className={cn('font-bold', filterMode !== 'ALL' && 'border-neutral-50 border-1')}
          >
            All
          </Button>
          <Button
            variant={filterMode === 'OWNER' ? 'primary-sm' : 'bordered-sm'}
            radius='full'
            onClick={() => setFilterMode('OWNER')}
            className={cn('font-bold', filterMode !== 'OWNER' && 'border-neutral-50 border-1')}
          >
            Owner
          </Button>
          <Button
            variant={filterMode === 'MEMBER' ? 'primary-sm' : 'bordered-sm'}
            radius='full'
            onClick={() => setFilterMode('MEMBER')}
            className={cn('font-bold', filterMode !== 'MEMBER' && 'border-neutral-50 border-1')}
          >
            Member
          </Button>
        </div>
        {accessAction.canInvite && (
          <Button
            variant='primary-sm'
            onClick={onInviteOpen}
            className='bg-primary text-neutral-20 px-regular'
          >
            INVITE
          </Button>
        )}
      </div>

      {/* Member List */}
      <div className='space-y-small'>
        {filteredMembers.map((member, idx) => (
          <div
            key={idx}
            className='flex justify-between p-regular bg-neutral-20 shadow-lg rounded-lg w-full'
          >
            <div className='flex items-center gap-semi-regular'>
              <Avatar
                src={member.user.avtUrl}
                alt='User Avatar'
                className='rounded-lg bg-neutral-20'
                size='md'
                radius='sm'
                isBordered
              />
              <div>
                <div className='font-semibold flex items-center gap-small'>
                  {member.user.name}
                  <RoleChip role={member.role} />
                </div>
                <div className='text-sm text-neutral-80'>{member.positionTitle}</div>
              </div>
            </div>
            {accessAction.canEdit && (
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <Image
                    src={MenuIcon}
                    alt='Menu Icon'
                    width={30}
                    height={30}
                    className='hover:cursor-pointer'
                  />
                </DropdownTrigger>
                <DropdownMenu variant='faded'>
                  <DropdownItem
                    key='edit'
                    startContent={<EditIcon className={iconClasses} />}
                    onPress={() => {
                      setSelectedMember(member);
                      onEditTitleOpen();
                    }}
                  >
                    Edit position title
                  </DropdownItem>
                  <DropdownItem
                    key='change-permission'
                    startContent={<UsersIcon className={iconClasses} />}
                    onPress={() => {
                      setSelectedMember(member);
                      onChangePermissionOpen();
                    }}
                  >
                    Change permission
                  </DropdownItem>
                  <DropdownItem
                    key='delete'
                    className='text-danger'
                    color='danger'
                    startContent={<DeleteIcon className={cn(iconClasses, 'text-danger')} />}
                    onPress={() => {
                      setSelectedMember(member);
                      onDeleteOpen();
                    }}
                  >
                    Delete member
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        ))}
      </div>

      {/* Modals */}
      <EditMemberTitleModal
        isOpen={isEditTitleOpen}
        onOpenChange={onEditTitleOpenChange}
        member={selectedMember}
        onSave={updateMemberTitle}
      />
      <DeleteMemberModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        member={selectedMember}
        onSave={deleteMember}
      />
      <ChangePermissionModal
        isOpen={isChangePermissionOpen}
        onOpenChange={onChangePermissionOpenChange}
        member={selectedMember}
        onSave={changeMemberPermission}
      />
      <InviteMemberModal
        isOpen={isInviteOpen}
        onOpenChange={onInviteOpenChange}
        members={newMemberList}
        setMembers={setNewMemberList}
        onInvite={inviteMembers}
      />
    </div>
  );

  // Loading skeleton for members
  const MemberLoadingSkeleton = () => (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-regular'>
        <div className='space-x-small'>
          <Button variant='primary-sm' radius='full' disabled>
            All
          </Button>
          <Button
            variant='bordered-sm'
            radius='full'
            disabled
            className='border-neutral-50 border-1'
          >
            Owner
          </Button>
          <Button
            variant='bordered-sm'
            radius='full'
            disabled
            className='border-neutral-50 border-1'
          >
            Member
          </Button>
        </div>
        <Button variant='primary-sm' disabled className='bg-primary text-neutral-20 px-regular'>
          INVITE
        </Button>
      </div>
      <Card className='flex p-regular w-full'>
        <div className='w-full flex items-center gap-semi-regular'>
          <div>
            <Skeleton className='h-12 w-12 rounded-full bg-neutral-40' />
          </div>
          <div className='w-full flex flex-col gap-small'>
            <Skeleton className='h-3 w-4/5 rounded-lg bg-neutral-40' />
            <Skeleton className='h-3 w-3/5 rounded-lg bg-neutral-40' />
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className='flex w-full 2xl:px-[20%] xl:px-56 lg:px-48 md:px-32 sm:px-16 xs:px-8 px-extra-small relative z-10 gap-none mt-medium'>
      {startup_profile?.startup ? (
        <div className='w-3/4 mx-0 flex flex-col'>
          <MemberListContainer />
        </div>
      ) : (
        <div className='w-3/4 mx-0 flex flex-col'>
          <MemberLoadingSkeleton />
        </div>
      )}
      <Spacer x={4} />
      {startup_profile?.startup ? (
        <div className='w-1/4'>
          <ProfileInfoSubCard
            onFetchStartupProfile={onFetchStartupProfile}
            startup={startup_profile.startup}
            isOwner={isOwner}
            countMatches={countMatches}
            onFetchStartupDocuments={fetchStartupDocuments}
          />
        </div>
      ) : (
        <div className='w-1/4'>
          <Card className='bg-neutral-20 min-w-lg shadow-lg rounded-lg px-regular py-small'>
            <div className='rounded-full flex items-center justify-center'>
              <Skeleton className='h-20 w-20 rounded-full bg-neutral-40' />
            </div>
            <CardBody>
              <Divider />
              <div className='flex gap-medium justify-center items-center p-small'>
                <Skeleton className='h-8 w-20 rounded-full bg-neutral-40' />
                <Divider orientation='vertical' className='h-14' />
                <Skeleton className='h-8 w-20 rounded-full bg-neutral-40' />
              </div>
              <Divider />
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StartupMemberContainer;
