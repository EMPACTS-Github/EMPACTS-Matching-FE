'use client';
import { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react'; // Replace antd with NextUI
import { ArrowLeftOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Button } from 'antd';
import { toast } from 'react-toastify';

const EnterEmailScreen = (props: { 
    email: string, 
    setEmailSent: (arg0: boolean) => void, 
    setResetPasswordScreen: (arg0: boolean) => void,
    title: string,
    description: string
}) => {

    const [otp, setOtp] = useState(Array(6).fill("")); // OTP input
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(60);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isResendDisabled) {
            timer = setInterval(() => {
                setResendCountdown((prev) => {
                    if (prev === 1) {
                        setIsResendDisabled(false);
                        clearInterval(timer!);
                        return 60;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer!);
    }, [isResendDisabled]);

    const handleResendCode = () => {
        toast.success('Resended code successfully');
        console.log("Resend code logic triggered");
        setIsResendDisabled(true);
    };

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Check if OTP is fully entered
        if (newOtp.every(digit => digit !== "")) {
            props.setEmailSent(false);
            props.setResetPasswordScreen(true);
        }
    };

    return (
        <div className="text-center">
            <div className="flex flex-col items-center text-center h-3/4">
                <Button
                    type='text'
                    onClick={() => props.setEmailSent(false)}
                    className="absolute left-4"
                >
                    <ArrowLeftOutlined
                        style={{ fontSize: '16px' }}
                    />
                </Button>
                <Image 
                    src="/empacts-logo.png" 
                    alt="Background image" 
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '50%', height: 'auto' }} 
                    priority 
                />
                <h2 className="text-2xl font-bold mt-6 mb-6 text-black">{props.title}</h2>
            </div>
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: props.description }} />
            <div className="flex justify-center space-x-2 mt-6">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        className="w-12 h-12 text-center text-[#000000] text-xl border-b-2 border-gray-300 focus:outline-none focus:border-[#000000]"
                    />
                ))}
            </div>
            <div className="text-gray-500 mt-4">
                Did not receive code? <span> </span>
                {isResendDisabled ? (
                    <span className='text-purple-400 cursor-not-allowed'>
                        Resend code({resendCountdown}s)
                    </span>
                ) : (
                    <span
                        onClick={handleResendCode}
                        className="text-purple-600 cursor-pointer"
                    >
                        Resend code
                    </span>
                )}
            </div>
        </div>
    );
};

export default EnterEmailScreen;
