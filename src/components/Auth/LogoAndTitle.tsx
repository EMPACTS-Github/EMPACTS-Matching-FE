'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import EmpactsLogo from '/public/empacts-logo.svg';

const LogoAndTitle = ({ title, description }: { title: string, description: string }) => {
  const router = useRouter();

  const handleOnClickLogo = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center text-center">
      <Image
        onClick={handleOnClickLogo}
        className='cursor-pointer'
        src={EmpactsLogo}
        alt="Background image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '50%', height: 'auto' }}
        priority
      />
      <h2 className="text-2xl font-bold mt-6 mb-6 text-black">
        {title}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {description}
      </p>
    </div>
  )
};

export default LogoAndTitle;
