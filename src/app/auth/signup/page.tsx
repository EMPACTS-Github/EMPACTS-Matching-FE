'use client'
import { useState } from 'react';
import Image from 'next/image';
import EmpactsBg from '/public/empacts-bg.png';
import EmpactsLogo from '/public/empacts-logo.png';
import { Input, Button } from "@heroui/react";
import Link from 'next/link';
import { toast } from 'react-toastify';
import { email_signup } from '@/apis/auth';
import VerificationScreen from './VerificationSreen';
import CreatePasswordScreen from './CreatePasswordScreen';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [isVerifiedScreen, setIsVerifiedScreen] = useState(false);
    const [isCreatePasswordScreen, setIsCreatePasswordScreen] = useState(false);

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [emailColor, setEmailColor] = useState<'default' | 'danger'>('default');
    // Function to validate email format
    const validateEmailFormat = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
            setEmailColor('danger');
            setIsValidEmail(false);
            return false;
        }
        setEmailError('');
        setEmailColor('default');
        setIsValidEmail(true);
        return true;
    };

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const isEmailValid = validateEmailFormat(email);
        if (!isEmailValid) {
            toast.error('Invalid email format');
            return;
        }
        try {
            const response = await email_signup(email);
            if (response.code == "VERIFICATION_CODE_SENT") {
                toast.success('Verification code sent to your email');
                setIsVerifiedScreen(true);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('An error occurred while signing up');
        }
        // setIsVerifiedScreen(true);
    };

    return (
        <div className="grid grid-cols-3 min-h-screen">
            {/* Left Side: Signup Form */}
            <div className="col-span-1 bg-white flex items-center justify-center">
                <div className="login-form p-8 rounded-lg w-full max-w-sm h-3/4">
                    {isVerifiedScreen ? (
                        <VerificationScreen 
                            email={email} 
                            setIsVerifiedScreen={setIsVerifiedScreen} 
                            setIsCreatePasswordScreen={setIsCreatePasswordScreen}
                        />
                    ) : isCreatePasswordScreen ? (
                        <CreatePasswordScreen email={email} />
                    ) : (
                        <div>
                            <div className="flex flex-col items-center text-center">
                                <Image
                                    src={EmpactsLogo}
                                    alt="EMPACTS Logo Image"
                                    priority
                                    width={120}
                                    height={120}
                                />
                                <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Sign up</h2>
                            </div>
                            <form onSubmit={handleSignup} className="space-y-4">
                                <Input
                                    variant="underlined"
                                    size="lg"
                                    radius='none'
                                    label="Email"
                                    value={email}
                                    isInvalid={!isValidEmail}
                                    color={emailColor}
                                    errorMessage={emailError}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Button
                                    type="submit"
                                    color="primary"
                                    size="lg"
                                    className="w-full rounded-lg bg-[#7f00ff] border-[#7f00ff]"
                                >
                                    Sign up
                                </Button>
                            </form>

                            {/* Sign In Link */}
                            <div className="text-center mt-8">
                                <span className="text-gray-500">Already have an account? </span>
                                <Link href="/auth/login" color="secondary" className="text-empacts">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Background with Content */}
            <div className="col-span-2 h-screen overflow-hidden relative bg-[#1A1D1F]">
                <Image
                    src={EmpactsBg}
                    alt="EMPACTS Background Image"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                />
            </div>
        </div>
    );
};

export default SignupPage;
