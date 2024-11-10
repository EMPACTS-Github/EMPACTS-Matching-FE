'use client';
import { useState } from 'react';
import { Input, Button } from 'antd';
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import Image from 'next/image';

const EnterEmailScreen = (props: { email: string, setEmailSent: (arg0: boolean) => void, setResetPasswordScreen: (arg0: boolean) => void }) => {

    const [otp, setOtp] = useState(Array(6).fill("")); // OTP input

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
                <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Verification code</h2>
            </div>
            <p className="text-gray-600">
                A verification code has been sent to <strong>{props.email}</strong>. 
                Please input your OTP code to finish the reset your password.
            </p>
            <div className="flex justify-center space-x-2 mt-6">
                {otp.map((digit, index) => (
                    <Input
                        key={index}
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        className="text-center w-12 h-12"
                    />
                ))}
            </div>
            <div className="text-gray-500 mt-4">
                Did not receive code? <span className="text-purple-600 cursor-pointer">Resend code</span>
            </div>
        </div>
    );
};

export default EnterEmailScreen;
