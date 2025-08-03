import React from 'react';
import AuthLink from './AuthLink';

interface AuthFormFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
  linkClassName?: string;
}

function AuthFormFooter({
  text,
  linkText,
  linkHref,
  linkClassName = ''
}: AuthFormFooterProps) {
  return (
    <div className="text-center mt-4">
      <span className="text-gray-500">{text} </span>
      <AuthLink href={linkHref} className={linkClassName}>
        {linkText}
      </AuthLink>
    </div>
  );
}

export default AuthFormFooter;
