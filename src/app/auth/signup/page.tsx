'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import EmpactsBg from '/public/empacts-bg.png';
import { Input, Button } from "@heroui/react";
import Link from 'next/link';
import { toast } from 'react-toastify';
import { email_signup } from '@/apis/auth';
import VerificationScreen from '@/components/Auth/VerificationSreen';
import CreatePasswordScreen from '@/components/Auth/CreatePasswordScreen';
import ProtectedRoute from '@/app/ProtectedRoute';
import RegisterInfoScreen from './RegisterInfoScreen';
import { useRouter, useSearchParams } from 'next/navigation';
import LogoAndTitle from '@/components/Auth/LogoAndTitle';

const SignupPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentScreen = searchParams.get('stage');
    const [email, setEmail] = useState('');

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [emailColor, setEmailColor] = useState<'default' | 'danger'>('default');
    const [hasSubmitted, setHasSubmitted] = useState(false);

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
        setHasSubmitted(true);
        const isEmailValid = validateEmailFormat(email);
        if (!isEmailValid) {
            toast.error('Invalid email format');
            return;
        }
        try {
            const response = await email_signup(email);
            if (response.code == "VERIFICATION_EMAIL_SENT") {
                toast.success('Verification code sent to your email');
                localStorage.setItem('email', email);
                router.push('/auth/signup?stage=verification');
            } else {
                toast.error('User already exist', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('An error occurred while signing up');
        }
    };

    useEffect(() => {
        if (hasSubmitted && !isValidEmail) {
          validateEmailFormat(email);
        }
      }, [email, hasSubmitted, isValidEmail]);

    const renderForm = () => (
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
    );

    return (
        <ProtectedRoute>
            <div className="grid grid-cols-3 min-h-screen">
                {/* Left Side: Signup Form */}
                <div className="col-span-1 bg-white flex items-center justify-center">
                    <div className="p-8 rounded-lg w-full max-w-sm h-3/4">
                        {currentScreen == 'verification' ? (
                            <VerificationScreen email={email} />
                        ) : currentScreen == 'password' ? (
                            <CreatePasswordScreen email={email} />
                        ) : currentScreen == 'registerinfo' ? (
                            <RegisterInfoScreen />
                        ) : (
                            <div>
                                <LogoAndTitle 
                                    title="Sign up" 
                                    description=""
                                />
                                {renderForm()}
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
        </ProtectedRoute>
    );
};

export default SignupPage;
