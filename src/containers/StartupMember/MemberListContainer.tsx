"use client";
import React, { useEffect, useState } from "react";
import { Button, cn, useDisclosure, addToast } from "@heroui/react";
import { Chip } from "@heroui/chip";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@heroui/dropdown";
import Image from "next/image";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import EditIcon from "@/components/Icons/EditIcon";
import UsersIcon from "@/components/Icons/UsersIcon";
import { Member } from "@/interfaces/StartupProfile";
import EditMemberTitleModal from "@/components/Modal/EditMemberTitleModal";
import MenuIcon from '/public/assets/three-dot-menu-icon.svg';
import DeleteMemberModal from "@/components/Modal/DeleteMemberModal";
import ChangePermissionModal from "@/components/Modal/ChangeMemberPermissionModal";
import { startup_member_edit_title, startup_member_change_permission, startup_member_delete } from "@/apis/startup-member";
import { invite_list_member } from '@/apis/startup';
import { MemberForInvite } from "@/interfaces/startup";
import InviteMemberModal from "@/components/Modal/InviteMemberModal";

interface MemberListContainerProps {
    members: Member[] | undefined;
    startupId: string;
}

const RoleChip = ({ role }: { role: string }) => (
    <Chip
        size="sm"
        color="primary"
        variant={role === "OWNER" ? "faded" : "bordered"}
        className={role === "OWNER" ? "border-empacts border-1 bg-empacts-lighter capitalize" : "border-1"}
    >
        {role === "OWNER" ? "Owner" : role === "MEMBER" ? "Member" : role}
    </Chip>
);

const MemberListContainer: React.FC<MemberListContainerProps> = ({ members, startupId }) => {
    const [memberList, setMembers] = useState<Member[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member>({} as Member);
    const [filterMode, setFilterMode] = useState<"ALL" | "OWNER" | "MEMBER">("ALL");
    const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
    const [newMemberList, setNewMemberList] = useState<MemberForInvite[]>([]);

    const { isOpen: isEditTitleOpen, onOpen: onEditTitleOpen, onOpenChange: onEditTitleOpenChange } = useDisclosure();
    const { isOpen: isChangePermissionOpen, onOpen: onChangePermissionOpen, onOpenChange: onChangePermissionOpenChange } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
    const { isOpen: isInviteOpen, onOpen: onInviteOpen, onOpenChange: onInviteOpenChange } = useDisclosure();

    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : {};
    const userId = userObj.id;
    const [acessAction, setAccessAction] = useState({
        canEdit: false,
        canInvite: false,
    });

    const iconClasses = "text-xl text-default-500 hover:text-white pointer-events-none flex-shrink-0";
    useEffect(() => {
        if (members) {
            setMembers(members);
            setFilteredMembers(members);
        }
    }, [members, startupId]);
    useEffect(() => {
        if (filterMode === "ALL") {
            setFilteredMembers(memberList);
        } else {
            setFilteredMembers(memberList.filter((member) => member.role === filterMode));
        }
    }, [filterMode, memberList]);
    useEffect(() => {
        if (!userId || !memberList) return;
        const isOwner = memberList.some((member) => member.user.id === userId && member.role === "OWNER");
        setAccessAction({
            canEdit: isOwner,
            canInvite: isOwner,
        });
    }, [memberList, userId]);

    const inviteMembers = async () => {
        if (newMemberList.length !== 0) {
            const inviterEmail = userObj.email;
            invite_list_member({
                invitee: newMemberList,
                inviterEmail: inviterEmail,
                startupId: startupId,
            }).then(() => {
                addToast({
                    title: 'Members invited successfully',
                    color: 'success',
                    timeout: 3000,
                });
            }).catch(() => {
                addToast({
                    title: 'Error inviting members',
                    color: 'danger',
                    timeout: 5000,
                });
            });
        }
    }

    const updateMemberTitle = async (memberId: string, newTitle: string) => {
        const member = memberList.find((member) => member.id === memberId);
        if (member && member.positionTitle != newTitle) {
            const data = {
                startupId: startupId,
                positionTitle: newTitle,
            }
            try {
                const res = await startup_member_edit_title(memberId, data);
                console.log(res);
                if (res.code == "STARTUP_MEMBER_UPDATED") {
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
        };
    }

    const changeMemberPermission = async (memberId: string, newRole: string) => {
        const member = memberList.find((member) => member.id === memberId);
        if (member && member.role != newRole) {
            const data = {
                startupId: startupId,
                role: newRole,
            }
            try {
                const res = await startup_member_change_permission(memberId, data);
                console.log(res);
                if (res.code == "STARTUP_MEMBER_UPDATED") {
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
        };
    }

    const deleteMember = async (memberId: string) => {
        const member = memberList.find((member) => member.id === memberId);
        if (member) {
            const data = {
                startupId: startupId,
            }
            try {
                const res = await startup_member_delete(memberId, data);
                console.log(res);
                if (res.code == "STARTUP_MEMBER_DELETED") {
                    setMembers((prevMembers) =>
                        prevMembers.filter((member) => member.id !== memberId)
                    );
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
        };
    }
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4" >
                <div className="space-x-2">
                    <Button
                        size="sm"
                        color="primary"
                        className={filterMode === "ALL" ? "font-bold" : "border-empacts-grey-50 border-1 font-bold"}
                        variant={filterMode === "ALL" ? "solid" : "bordered"}
                        radius="full"
                        onPress={() => setFilterMode("ALL")}
                    >
                        All
                    </Button>
                    <Button
                        size="sm"
                        color="primary"
                        className={filterMode === "OWNER" ? "font-bold" : "border-empacts-grey-50 border-1 font-bold"}
                        variant={filterMode === "OWNER" ? "solid" : "bordered"}
                        radius="full"
                        onPress={() => setFilterMode("OWNER")}
                    >
                        Owner
                    </Button>
                    <Button
                        size="sm"
                        color="primary"
                        className={filterMode === "MEMBER" ? "font-bold" : "border-empacts-grey-50 border-1 font-bold"}
                        variant={filterMode === "MEMBER" ? "solid" : "bordered"}
                        radius="full"
                        onPress={() => setFilterMode("MEMBER")}
                    >
                        Member
                    </Button>
                </div>
                {acessAction.canInvite && <Button className="bg-empacts text-white px-4" size="sm" onPress={onInviteOpen}>INVITE</Button>}
            </div>
            {/* Member List */}
            <div className="space-y-2">
                {filteredMembers.map((member, idx) => (
                    <div key={idx} className="flex justify-between p-4 bg-white shadow-lg rounded-lg w-full">
                        <div className="flex items-center gap-3">
                            <Image
                                src={member.user.avtUrl}
                                alt="User Avatar"
                                width={48}
                                height={48}
                                className="rounded-lg"
                            />
                            <div>
                                <div className="font-semibold flex items-center gap-2">
                                    {member.user.name}
                                    <RoleChip role={member.role} />
                                </div>
                                <div className="text-sm text-gray-500">{member.positionTitle}</div>
                            </div>
                        </div>
                        {acessAction.canEdit && <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Image src={MenuIcon} alt="Menu Icon" width={30} height={30} />
                            </DropdownTrigger>
                            <DropdownMenu variant="faded">
                                <DropdownItem
                                    key="edit"
                                    startContent={<EditIcon className={iconClasses} />}
                                    onPress={() => {
                                        setSelectedMember(member);
                                        onEditTitleOpen();
                                    }}
                                >
                                    Edit position title
                                </DropdownItem>
                                <DropdownItem
                                    key="change-permission"
                                    startContent={<UsersIcon className={iconClasses} />}
                                    onPress={() => {
                                        setSelectedMember(member); // Lưu thành viên được chọn
                                        onChangePermissionOpen(); // Mở modal Change Permission
                                    }}
                                >
                                    Change permission
                                </DropdownItem>
                                <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    startContent={<DeleteIcon className={cn(iconClasses, "text-danger")} />}
                                    onPress={() => {
                                        setSelectedMember(member); // Lưu thành viên được chọn
                                        onDeleteOpen(); // Mở modal Delete
                                    }}
                                >
                                    Delete member
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        }
                    </div>
                ))}
                <EditMemberTitleModal isOpen={isEditTitleOpen} onOpenChange={onEditTitleOpenChange} member={selectedMember} onSave={updateMemberTitle} />
                <DeleteMemberModal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange} member={selectedMember} onSave={deleteMember} />
                <ChangePermissionModal isOpen={isChangePermissionOpen} onOpenChange={onChangePermissionOpenChange} member={selectedMember} onSave={changeMemberPermission} />
                <InviteMemberModal isOpen={isInviteOpen} onOpenChange={onInviteOpenChange} members={newMemberList} setMembers={setNewMemberList} onInvite={inviteMembers} />

            </div>
        </div>
    );
}
export default MemberListContainer;