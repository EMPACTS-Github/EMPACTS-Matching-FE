'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import EnterEmailScreen from './EnterEmailScreen';
import ResetPasswordScreen from './ResetPasswordScreen';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isEmailScreen, setIsEmailScreen] = useState(false);
    const [isResetPasswordScreen, setIsResetPasswordScreen] = useState(false);

    const handleSentCode = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsEmailScreen(true);
    };

    return (
        <div className="grid grid-cols-3 min-h-screen">
            <div className="col-span-1 bg-white flex items-center justify-center">
                <div className="login-form p-8 rounded-lg w-full max-w-sm h-3/4">
                    {isEmailScreen ? (
                        <EnterEmailScreen 
                            email={email} 
                            setEmailSent={setIsEmailScreen} 
                            setResetPasswordScreen={setIsResetPasswordScreen}
                        />
                    ) : isResetPasswordScreen ? (
                        <ResetPasswordScreen setOpenResetPasswordScreen={setIsResetPasswordScreen} />
                    ) : (
                        <div>
                            <div className="flex flex-col items-center text-center">
                                <Image 
                                    src="/empacts-logo.png" 
                                    alt="Background image" 
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '50%', height: 'auto' }} 
                                    priority 
                                />
                                <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Enter your email</h2>
                            </div>
                            <form onSubmit={handleSentCode} className="space-y-4">
                                <Input
                                    type='email'
                                    size="large"
                                    placeholder="Email"
                                    prefix={<MailOutlined />}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full mt-4"
                                    style={{ 
                                        backgroundColor: '#7f00ff', 
                                        borderColor: '#7f00ff',
                                        padding: '12px',
                                    }}
                                >
                                    Send code to email
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <div className="col-span-2 h-screen overflow-hidden relative">
                <Image
                    src="/empacts-bg.png" 
                    alt="Background image" 
                    width={0}
                    height={0}
                    sizes="100vw"
                    layout="fill"
                    objectFit="cover"
                    priority 
                />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
