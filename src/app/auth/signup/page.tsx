'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import VerificationScreen from './VerificationSreen';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVerifiedScreen, setIsVerifiedScreen] = useState(false);

    const handleSignup = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setIsVerifiedScreen(true); // Show verification screen
        } else {
            alert("Passwords do not match");
        }
    };

    return (
        <div className="grid grid-cols-3 min-h-screen">
            <div className="col-span-1 bg-white flex items-center justify-center">
                <div className="login-form p-8 rounded-lg w-full max-w-sm h-3/4">
                    {isVerifiedScreen ? (
                        <VerificationScreen email={email} setIsVerifiedScreen={setIsVerifiedScreen} />
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
                                <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Sign up</h2>
                            </div>
                            <form onSubmit={handleSignup} className="space-y-4">
                                <Input
                                    size="large"
                                    placeholder="Email"
                                    prefix={<MailOutlined />}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Input.Password
                                    size="large"
                                    placeholder="Password"
                                    prefix={<LockOutlined />}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Input.Password
                                    size="large"
                                    placeholder="Confirm Password"
                                    prefix={<LockOutlined />}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                    Sign up
                                </Button>
                                <div className="text-right mt-2">
                                    <Link href="/auth/forgot-password" className='text-sm text-[#1A1D1F] font-bold'>Forgot your password?</Link>
                                </div>
                            </form>
                            <div className="text-center mt-10">
                                <span className="text-gray-500">Already have an account? </span>
                                <Link href="/auth/login" className="text-blue-600">Sign in</Link>
                            </div>
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

export default SignupPage;
