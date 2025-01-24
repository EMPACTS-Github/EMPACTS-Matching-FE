'use client'
import { useState } from 'react';
import Image from 'next/image';
import EmpactsBg from '../../../../public/empacts-bg.png';
import EmpactsLogo from '../../../../public/empacts-logo.png';
import { Input, Button } from '@nextui-org/react';
import Link from 'next/link';
import EnterEmailScreen from '../forgot-password/EnterEmailScreen';
import { toast } from 'react-toastify';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVerifiedScreen, setIsVerifiedScreen] = useState(false);

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [emailColor, setEmailColor] = useState<'default' | 'danger'>('default');

    const [isValidPassword, setIsValidPassword] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [passwordColor, setPasswordColor] = useState<'default' | 'danger'>('default');

    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [confirmPasswordColor, setConfirmPasswordColor] = useState<'default' | 'danger'>('default');

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

    const handleSignup = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const isEmailValid = validateEmailFormat(email);
        if (!isEmailValid) {
            toast.error('Invalid email format');
            return;
        }

        if (password.length < 12) {
            setIsValidPassword(false);
            setPasswordError('Password must contain at least 12 characters');
            setPasswordColor('danger');
            toast.error('Password must contain at least 12 characters');
        } else if (password !== confirmPassword) {
            setPasswordError('');
            setIsValidPassword(false);
            setPasswordColor('danger');
            setIsValidConfirmPassword(false);
            setConfirmPasswordColor('danger');
            setConfirmPasswordError('Passwords do not match');
            toast.error('Passwords do not match');
        } else {
            setIsValidPassword(true);
            setPasswordError('');
            setPasswordColor('default');

            setIsValidConfirmPassword(true);
            setConfirmPasswordError('');
            setConfirmPasswordColor('default');
            setIsVerifiedScreen(true); // Show verification screen
            toast.success('Signup successful');
        }
    };

    return (
        <div className="grid grid-cols-3 min-h-screen">
            {/* Left Side: Signup Form */}
            <div className="col-span-1 bg-white flex items-center justify-center">
                <div className="login-form p-8 rounded-lg w-full max-w-sm h-3/4">
                    {isVerifiedScreen ? (
                        <EnterEmailScreen 
                            email={email} 
                            setEmailSent={setIsVerifiedScreen} 
                            setResetPasswordScreen={setIsVerifiedScreen}
                            title="Verification code"
                            description={`A verification code has been sent to <strong>${email}</strong>. Please input your OTP code to finish the registration process.`}
                        />
                    ) : (
                        <div>
                            <div className="flex flex-col items-center text-center">
                                <Image
                                    src={EmpactsLogo}
                                    alt="EMPACTS Logo Image"
                                    priority
                                    width={120}
                                    height={120}
                                />
                                <h2 className="text-2xl font-bold mt-6 mb-6 text-black">Sign up</h2>
                            </div>
                            <form onSubmit={handleSignup} className="space-y-4">
                                <Input
                                    variant="underlined"
                                    size="lg"
                                    label="Email"
                                    value={email}
                                    isInvalid={!isValidEmail}
                                    color={emailColor}
                                    errorMessage={emailError}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Input
                                    variant="underlined"
                                    size="lg"
                                    type="password"
                                    label="Password"
                                    value={password}
                                    isInvalid={!isValidPassword}
                                    color={passwordColor}
                                    errorMessage={passwordError}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Input
                                    variant="underlined"
                                    size="lg"
                                    type="password"
                                    label="Confirm Password"
                                    value={confirmPassword}
                                    isInvalid={!isValidConfirmPassword}
                                    color={confirmPasswordColor}
                                    errorMessage={confirmPasswordError}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    type="submit"
                                    color="primary"
                                    size="lg"
                                    className="w-full rounded-lg bg-[#7f00ff] border-[#7f00ff]"
                                >
                                    Sign up
                                </Button>
                            </form>

                            {/* Sign In Link */}
                            <div className="text-center mt-8">
                                <span className="text-gray-500">Already have an account? </span>
                                <Link href="/auth/login" color="secondary" className="text-empacts">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Background with Content */}
            <div className="col-span-2 h-screen overflow-hidden relative bg-[#1A1D1F]">
                <Image
                    src={EmpactsBg}
                    alt="EMPACTS Background Image"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                />
            </div>
        </div>
    );
};

export default SignupPage;
