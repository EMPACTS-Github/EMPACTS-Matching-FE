'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import { InputOtp } from '@heroui/react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { verify_OTP } from '@/apis/auth';
import { toast } from 'react-toastify';

const VerificationScreen = (props: {
    email: string;
    setIsVerifiedScreen: (arg0: boolean) => void;
    setIsCreatePasswordScreen: (arg0: boolean) => void;
}) => {
    const [otp, setOtp] = useState(""); // OTP input

    const handleSubmitOtp = async () => {
        try {
            const response = await verify_OTP(props.email, otp);
            if (response.code === "OTP_VERIFIED") {
                toast.success("OTP code verified successfully");
                props.setIsVerifiedScreen(false);
                props.setIsCreatePasswordScreen(true); // Render CreatePasswordScreen
            } else if (response.code === "OTP_EXPIRED") {
                toast.error("OTP code has expired. Please request a new one.");
            } else if (response.code === "OTP_INCORRECT") {
                toast.error("Incorrect OTP code. Please try again.");
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while verifying the OTP");
        }
    }
    
    return (
        <div className="text-center">
            <div className="flex flex-col items-center text-center h-3/4">
                <Button
                    type='text'
                    onClick={() => props.setIsVerifiedScreen(false)}
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
                Please input your OTP code to finish the registration process.
            </p>
            <div className="flex justify-center space-x-2 mt-6">
            <InputOtp 
                length={6} 
                value={otp} 
                onValueChange={setOtp} 
                onComplete={handleSubmitOtp}
                variant='underlined'
            />
            </div>
            <div className="text-gray-500 mt-4">
                Did not receive code? <span className="text-purple-600 cursor-pointer">Resend code</span>
            </div>
        </div>
    )
}

export default VerificationScreen;
