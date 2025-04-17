"use client";
import React, { useEffect, useState } from "react";
import { Button, cn } from "@heroui/react";
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

interface MemberListContainerProps {
    members: Member[] | undefined;
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

const MemberListContainer: React.FC<MemberListContainerProps> = ({ members }) => {
    const [memberList, setMembers] = useState<Member[]>([]);

    const iconClasses = "text-xl text-default-500 hover:text-white pointer-events-none flex-shrink-0";
    useEffect(() => {
        if (members) {
            setMembers(members);
        }
    }, [members]);
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
            {/* User List */}
            <div className="space-y-2">
                {memberList.map((member, idx) => (

                    <div className="flex justify-between p-4 bg-white shadow-lg rounded-lg items-center w-full">
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
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="light">:</Button>
                            </DropdownTrigger>
                            <DropdownMenu variant="faded">
                                <DropdownItem
                                    key="edit"
                                    startContent={<EditIcon className={iconClasses} />}
                                >
                                    Edit title
                                </DropdownItem>
                                <DropdownItem
                                    key="change-permission"
                                    startContent={<EditIcon className={iconClasses} />}
                                >
                                    Change permission
                                </DropdownItem>
                                <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    startContent={<DeleteIcon className={cn(iconClasses, "text-danger")} />}
                                >
                                    Delete file
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default MemberListContainer;