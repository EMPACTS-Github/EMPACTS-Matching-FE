'use client';
import { useState } from 'react';
import { Input, Button } from '@nextui-org/react'; // Replacing Ant Design components
import { ArrowLeftOutlined } from '@ant-design/icons'; // Keeping the icon for now
import { toast } from 'react-toastify';
import Image from 'next/image';

const ResetPasswordScreen = (props: { setOpenResetPasswordScreen: (arg0: boolean) => void }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [passwordDescription, setPasswordDescription] = useState('Password must contain at least 12 characters');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordColor, setPasswordColor] = useState<'default' | 'danger'>('default');
    const [confirmPasswordColor, setConfirmPasswordColor] = useState<'default' | 'danger'>('default');

    const handleResetPassword = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (password.length < 12) {
            setIsValidPassword(false);
            setPasswordError('Password must contain at least 12 characters');
            setPasswordColor('danger');
            toast.error('Password must contain at least 12 characters');
        } else if (password !== confirmPassword) {
            setPasswordError('');
            setPasswordDescription('');
            setIsValidPassword(false);
            setPasswordColor('danger');
            setIsValidConfirmPassword(false);
            setConfirmPasswordColor('danger');
            setConfirmPasswordError('Passwords do not match');
            toast.error('Passwords do not match');
        } else {
            setIsValidPassword(true);
            setPasswordError('');
            setPasswordDescription('');
            setPasswordColor('default');

            setIsValidConfirmPassword(true);
            setConfirmPasswordError('');
            setConfirmPasswordColor('default');
            toast.success('Password reset successful');
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center text-center h-3/4">
                <Button
                    isIconOnly
                    variant="light"
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
                <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Create new password</h2>
            </div>
            <div className="flex justify-center space-x-2 mt-6">
                <form onSubmit={handleResetPassword} className="space-y-6 w-full max-w-xs">
                    <Input
                        variant='underlined'
                        label="Password"
                        type="password"
                        isInvalid={!isValidPassword}
                        color={passwordColor}
                        errorMessage={passwordError}
                        description={passwordDescription}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        size="lg"
                    />
                    <Input
                        variant='underlined'
                        label="Confirm Password"
                        type="password"
                        isInvalid={!isValidConfirmPassword}
                        color={confirmPasswordColor}
                        errorMessage={confirmPasswordError}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        size="lg"
                    />
                    <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        className="w-full mt-4 rounded-lg bg-[#7f00ff] border-[#7f00ff]"
                    >
                        Reset Password
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordScreen;
