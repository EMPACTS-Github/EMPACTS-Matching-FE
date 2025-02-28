'use client'
import { useState } from 'react';
import { create_new_password } from '@/apis/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input, Button } from "@heroui/react";
import EmpactsLogo from '/public/empacts-logo.png';
import Link from 'next/link';

const CreatePasswordScreen = (props: { email: string }) => {
    const email = localStorage.getItem('email');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleCreatePassword = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (password && email) {
            try {
                const response = await create_new_password(email, password);
                if (response.code === "PASSWORD_CREATED") {
                    toast.success("Password created successfully");
                    router.push('/auth/signup?stage=registerinfo')
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while creating the password");
            }
        }
    };

    return (
        <div className="text-center">
            <div className="flex flex-col items-center text-center h-3/4">
                <Image
                    src={EmpactsLogo}
                    alt="EMPACTS Logo Image"
                    priority
                    width={120}
                    height={120}
                />
                <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Sign up</h2>
            </div>
            <div className="space-y-4">
                <Input
                    variant="underlined"
                    radius='none'
                    size="lg"
                    type='password'
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Input
                    variant="underlined"
                    radius='none'
                    size="lg"
                    type='password'
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-full rounded-lg bg-[#7f00ff] border-[#7f00ff]"
                    onClick={handleCreatePassword}
                >
                    Sign up
                </Button>
            </div>

            {/* Sign In Link */}
            <div className="text-center mt-8">
                <span className="text-gray-500">Already have an account? </span>
                <Link href="/auth/login" color="secondary" className="text-empacts">
                    Sign in
                </Link>
            </div>
        </div>
    );
};

export default CreatePasswordScreen;
