'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input, Button } from "@heroui/react";
import EmpactsBg from '/public/empacts-bg.png';
import EnterEmailScreen from '../../../components/Auth/EnterEmailScreen';
import ResetPasswordScreen from '../../../components/Auth/ResetPasswordScreen';
import { toast } from 'react-toastify';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';
import { useRouter } from 'next/navigation'
import { send_forgot_password_otp } from '@/apis/auth';
import ProtectedRoute from '@/app/ProtectedRoute';
import LogoAndTitle from '../../../components/Auth/LogoAndTitle';

const ForgotPasswordPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [isEmailScreen, setIsEmailScreen] = useState(false);
    const [isResetPasswordScreen, setIsResetPasswordScreen] = useState(false);

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

    const handleSentCode = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setHasSubmitted(true);
        const isEmailValid = validateEmailFormat(email);
        if (isEmailValid) {
            try {
                const response = await send_forgot_password_otp(email);
                if (response.code === "VERIFICATION_CODE_SENT") {
                    toast.success('Verification code sent to your email');
                    setIsEmailScreen(true);
                } else if (response.code === "EMAIL_ALREADY_SENT") {
                    toast.error('Email already sent. Please wait before requesting again.');
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error(error);
                toast.error('An error occurred while sending the verification code');
            }
        } else {
            toast.error('Invalid email format');
        }
    };

    useEffect(() => {
        if (hasSubmitted) {
            validateEmailFormat(email);
        }
    }, [email, hasSubmitted]);

    const renderForm = () => (
        <form onSubmit={handleSentCode} className="space-y-4">
            <Input
                variant='underlined'
                fullWidth
                radius='none'
                size="lg"
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
                className="w-full mt-4 rounded-lg bg-[#7f00ff] border-[#7f00ff]"
            >
                Continue
            </Button>
        </form>
    );

    return (
        <ProtectedRoute>
            <div className="grid grid-cols-3 min-h-screen">
                {/* Left Panel */}
                <div className="col-span-1 bg-white flex items-center justify-center">
                    <div className="login-form p-8 rounded-lg w-full max-w-sm h-3/4">
                        <div className="absolute left-10 hover:bg-gray-300 rounded-lg" onClick={() => router.back()}>
                            <Image src={ArrowLeftIcon} alt="Arrow left icon" width={40} height={40} />
                        </div>
                        {isEmailScreen ? (
                            <EnterEmailScreen
                                email={email}
                                setEmailSent={setIsEmailScreen}
                                setResetPasswordScreen={setIsResetPasswordScreen}
                                title="Verification code"
                                description={`A verification code has been sent to <strong>${email}</strong>. Please input your OTP code to finish reset password.`}
                            />
                        ) : isResetPasswordScreen ? (
                            <ResetPasswordScreen email={email} setOpenResetPasswordScreen={setIsResetPasswordScreen} />
                        ) : (
                            <div>
                                <LogoAndTitle 
                                    title="Forgot password"
                                    description="Enter your email address and we will send you instructions to reset your password."
                                />
                                {renderForm()}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="col-span-2 h-screen overflow-hidden relative flex items-center justify-center">
                    <Image
                        src={EmpactsBg}
                        alt="EMPACTS Background"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default ForgotPasswordPage;
