'use client';
import React, { useState } from 'react';
import { addToast, Form } from '@heroui/react';
import { emailSignup } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import AuthHeader from '@/components/Header/AuthHeader';
import { ROUTES } from '@/constants/link';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import EmailVerification from '@/containers/SignUp/EmailVerification';
import CreatePassword from '@/containers/SignUp/CreatePassword';
import RegisterInfo from '@/containers/SignUp/RegisterInfo';
import { checkEmailFormat } from '@/utils/checkValid';
import AuthLink from '@/components/AuthLink';
import FormFooterAction from '@/components/Form/FormFooterAction';
import { API_RESPONSE_CODES, TOAST_TIMEOUT, TOAST_COLORS, TOAST_MESSAGES } from '@/constants/api';

function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentScreen = searchParams.get('stage');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailError, setEmailError] = useState('');

  const updateEmailValidation = (email: string) => {
    const isValid = checkEmailFormat(email);
    setEmailError(isValid ? '' : 'Invalid email format');
    setIsValidEmail(isValid);
    return isValid;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = updateEmailValidation(email);
    if (!isEmailValid) return;

    try {
      const response = await emailSignup(email);
      if (response.code == API_RESPONSE_CODES.VERIFICATION_EMAIL_SENT) {
        addToast({
          title: TOAST_MESSAGES.VERIFICATION_EMAIL_SENT,
          color: TOAST_COLORS.SUCCESS,
          timeout: TOAST_TIMEOUT.SHORT,
        });
        localStorage.setItem('email', email);
        router.push(`${ROUTES.AUTH.SIGNUP}?stage=verification`);
      } else {
        addToast({
          title: TOAST_MESSAGES.USER_ALREADY_EXISTS,
          color: TOAST_COLORS.DANGER,
          timeout: TOAST_TIMEOUT.MEDIUM,
        });
      }
    } catch (error) {
      addToast({
        title: TOAST_MESSAGES.SIGNUP_ERROR,
        color: TOAST_COLORS.DANGER,
        timeout: TOAST_TIMEOUT.MEDIUM,
      });
    }
  };

  return (
    <div className='col-span-1 bg-white h-screen flex justify-center'>
      <div className='p-8 rounded-lg w-full max-w-sm flex flex-col justify-start mt-[30%]'>
        {currentScreen == 'verification' ? (
          <EmailVerification />
        ) : currentScreen == 'password' ? (
          <CreatePassword email={email} />
        ) : currentScreen == 'registerinfo' ? (
          <RegisterInfo />
        ) : (
          <div>
            <AuthHeader title='Sign up' description='' />
            <Form onSubmit={handleSignup} className='space-y-4'>
              <Input
                label='Email'
                variant='email'
                value={email}
                onChange={setEmail}
                isInvalid={!isValidEmail}
                preset='line-fill-sm'
                errorMessage={emailError}
                isRequired={true}
              />
              <Button variant='primary-full' type='submit'>
                Sign up
              </Button>
            </Form>

            <FormFooterAction
              text='Already have an account?'
              action={
                <AuthLink href={ROUTES.AUTH.LOGIN} className='text-md font-semibold text-primary'>
                  Sign in
                </AuthLink>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
