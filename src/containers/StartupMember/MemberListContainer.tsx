"use client";
import React, { useEffect, useState } from "react";
import { Button, cn, useDisclosure } from "@heroui/react";
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
import { Member } from "@/interfaces/StartupProfile";
import EditMemberTitleModal from "@/components/Modal/EditMemberTitleModal";
import MenuIcon from '/public/assets/three-dot-menu-icon.svg';
import DeleteMemberModal from "@/components/Modal/DeleteMemberModal";
import ChangePermissionModal from "@/components/Modal/ChangeMemberPermissionModal";

interface MemberListContainerProps {
    members: Member[] | undefined;
    startupId: number;
}

const RoleChip = ({ role }: { role: string }) => (
    <Chip
        size="sm"
        color={role === "OWNER" ? "primary" : "default"}
        variant="faded"
        className={role === "OWNER" ? "border-empacts" : ""}
    >
        {role}
    </Chip>
);

const MemberListContainer: React.FC<MemberListContainerProps> = ({ members, startupId }) => {
    const [memberList, setMembers] = useState<Member[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    const { isOpen: isEditTitleOpen, onOpen: onEditTitleOpen, onOpenChange: onEditTitleOpenChange } = useDisclosure();
    const { isOpen: isChangePermissionOpen, onOpen: onChangePermissionOpen, onOpenChange: onChangePermissionOpenChange } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();

    const iconClasses = "text-xl text-default-500 hover:text-white pointer-events-none flex-shrink-0";
    useEffect(() => {
        if (members) {
            setMembers(members);
        }
    }, [members, startupId]);
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4" >
                <div className="space-x-2">
                    <Button size="sm" variant="solid" radius="full">All</Button>
                    <Button size="sm" variant="bordered" radius="full">Owner</Button>
                    <Button size="sm" variant="bordered" radius="full">Member</Button>
                </div>
                <Button className="bg-empacts text-white px-4" size="sm">INVITE</Button>
            </div>
            {/* Member List */}
            <div className="space-y-2">
                {memberList.map((member, idx) => (
                    <div key={idx} className="flex justify-between p-4 bg-white shadow-lg rounded-lg w-full">
                        <div className="flex items-center gap-3">
                            <Image
                                src={member.user_id.avt_url} // Replace with actual image or use avatar component
                                alt="User Avatar"
                                width={48}
                                height={48}
                                className="rounded-lg"
                            />
                            <div>
                                <div className="font-semibold flex items-center gap-2">
                                    {member.user_id.name}
                                    <RoleChip role={member.role} />
                                </div>
                                <div className="text-sm text-gray-500">{member.position_title}</div>
                            </div>
                        </div>
                        <Dropdown placement="bottom-end">
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
                                    startContent={<EditIcon className={iconClasses} />}
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
                    </div>
                ))}
                <EditMemberTitleModal isOpen={isEditTitleOpen} onOpenChange={onEditTitleOpenChange} member={selectedMember} startupId={startupId} />
                <DeleteMemberModal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange} member={selectedMember} />
                <ChangePermissionModal isOpen={isChangePermissionOpen} onOpenChange={onChangePermissionOpenChange} member={selectedMember} />
            </div>
        </div>
    );
}
export default MemberListContainer;