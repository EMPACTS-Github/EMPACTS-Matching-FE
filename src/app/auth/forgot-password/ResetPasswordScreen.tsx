'use client';
import { useState } from 'react';
import { Input, Button } from 'antd';
import { ArrowLeftOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Image from 'next/image';

const ResetPasswordScreen = (props: { setOpenResetPasswordScreen: (arg0: boolean) => void }) => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (password === confirmPassword) {
            alert("Password reset successfully");            
        } else {
            alert("Passwords do not match");
        }
    };

    return (
        <div className="text-center">
            <div className="flex flex-col items-center text-center h-3/4">
                <Button
                    type='text'
                    onClick={() => props.setOpenResetPasswordScreen(false)}
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
                <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Reset your password</h2>
            </div>
            <div className="flex justify-center space-x-2 mt-6">
                <form onSubmit={handleResetPassword} className="space-y-4">
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
                        Reset password
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordScreen;
