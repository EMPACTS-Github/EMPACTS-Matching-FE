"use client";
import { useRouter } from 'next/navigation';
export const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="relative z-10 text-center py-10">
      <h1 className="mt-4 text-4xl font-bold text-black">Discover SDGs startups</h1>
      <p className="mt-2 text-lg text-black cursor-pointer" onClick={() => {
        router.push('/profiles/new');
      }}>or <span className='text-empacts'>create your own</span></p>
    </div>
  );
};
