'use client';
import { useRouter } from 'next/navigation';
import EmpactsLogoIcon from '@/components/Icons/EmpactsLogoIcon';
import { Button } from '@heroui/button';

const LogoAndTitle = ({ title, description }: { title: string; description: string }) => {
  const router = useRouter();

  const handleOnClickLogo = () => {
    router.push('/');
  };

  return (
    <div className='flex flex-col items-center text-center space-y-[12.5%]'>
      <Button
        isIconOnly
        aria-label='LogoEmpactsIcon'
        onPress={handleOnClickLogo}
        className='w-48 p-1 bg-transparent'
        radius='md'
      >
        <EmpactsLogoIcon />
      </Button>
      <h2 className='text-2xl font-bold mt-6 mb-6 text-black'>{title}</h2>
      <p className='text-sm text-gray-500 mb-6'>{description}</p>
    </div>
  );
};

export default LogoAndTitle;
