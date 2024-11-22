'use client'
import { useState } from 'react';
import Image from 'next/image';
import EmpactsBg from '../../../../public/empacts-bg.png';
import EmpactsLogo from '../../../../public/empacts-logo.png';
import { Input, Button, Divider } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import Link from 'next/link';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
    };

    return (
        <div className="grid grid-cols-3 min-h-screen">
            <div className="col-span-1 bg-white flex items-center justify-center">
                <div className="login-form p-8 rounded-lg w-full max-w-sm h-3/4">
                <div className="flex flex-col items-center text-center">
                    <Image 
                        src={EmpactsLogo}
                        alt="EMPACTS Logo Image" 
                        priority 
                    />
                    <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Sign in</h2>
                </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            className="focus:bg-[#F4F4F4] bg-white" // Tailwind focus style
                            size="large"
                            placeholder="example"
                            prefix={<MailOutlined />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input.Password
                            size="large"
                            placeholder="example"
                            prefix={<LockOutlined />}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            Sign in
                        </Button>
                        <div className="text-right mt-2">
                            <Link href="/auth/forgot-password" className='text-sm text-[#1A1D1F] font-bold'>Forgot your password?</Link>
                        </div>
                    </form>
                    
                    <Divider>Or</Divider>

                    <Button
                        size="large"
                        className="w-full mt-2 py-3 px-6"
                    >
                        <Image
                            src="/google-icon.svg"  // Replace with the correct path to your Google icon
                            alt="Google icon"
                            width={20}
                            height={20}
                            className="w-5 h-5 mr-2"
                        />
                        Sign in with Google
                    </Button>

                    <div className="text-center mt-4">
                        <span className="text-gray-500">Don&apos;t you have an account? </span>
                        <Link href="/auth/signup" className="text-blue-600">Sign up</Link>
                    </div>
                </div>
            </div>

            <div className="col-span-2 h-screen overflow-hidden relative">
                <Image
                    src={EmpactsBg}
                    alt="EMPACTS Background Image"
                    priority 
                />
            </div>
        </div>
    );
};

export default LoginPage;
