import React from 'react';
import Link from 'next/link';

interface AuthLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function AuthLink({ href, children, className = '' }: AuthLinkProps) {
  const defaultClasses = 'text-primary';
  const finalClasses = `${defaultClasses} ${className}`;

  return (
    <Link href={href} className={finalClasses}>
      {children}
    </Link>
  );
}

export default AuthLink;
