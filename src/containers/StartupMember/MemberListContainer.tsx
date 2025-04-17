"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Chip } from "@heroui/chip";
import Image from "next/image";
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
    useEffect(() => {
        if (members) {
            setMembers(members);
        }
    }, [members]);
    return (
        <div>
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
                                className="rounded-full"
                            />
                            <div>
                                <div className="font-semibold flex items-center gap-2">
                                    {member.user_id.name}
                                    <RoleChip role={member.role} />
                                </div>
                                <div className="text-sm text-gray-500">{member.position_title}</div>
                            </div>
                        </div>
                        <div className="text-gray-400 text-xl font-bold cursor-pointer">⋯</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default MemberListContainer;