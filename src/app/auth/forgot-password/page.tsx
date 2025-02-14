'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Input, Button } from "@heroui/react";
import { Button as AntdButton } from 'antd';
import EmpactsBg from '../../../../public/empacts-bg.png';
import EmpactsLogo from '../../../../public/empacts-logo.png';
import EnterEmailScreen from './EnterEmailScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import { toast } from 'react-toastify';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'
import { send_forgot_password_otp } from '@/apis/auth';

const ForgotPasswordPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [isEmailScreen, setIsEmailScreen] = useState(false);
    const [isResetPasswordScreen, setIsResetPasswordScreen] = useState(false);

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

    const handleSentCode = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
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

    return (
        <>            
            <div className="grid grid-cols-3 min-h-screen">
                {/* Left Panel */}
                <div className="col-span-1 bg-white flex items-center justify-center">
                    <div className="login-form p-8 rounded-lg w-full max-w-sm h-3/4">
                        <AntdButton
                            type='text'
                            onClick={() => router.back()}
                            className="absolute left-4"
                        >
                            <ArrowLeftOutlined
                                style={{ fontSize: '16px' }}
                            />
                        </AntdButton>
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
                                {/* Logo and Title */}
                                <div className="flex flex-col items-center text-center">
                                <Image 
                                    src={EmpactsLogo} 
                                    alt="Background image" 
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '50%', height: 'auto' }} 
                                    priority 
                                />
                                    <h2 className="text-2xl font-bold mt-6 mb-6 text-black">
                                        Forgot password
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Enter your email address and we will send you instructions to reset your password.
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSentCode} className="space-y-4">
                                    <Input
                                        variant='underlined'
                                        fullWidth
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
        </>
    );
};

export default ForgotPasswordPage;
