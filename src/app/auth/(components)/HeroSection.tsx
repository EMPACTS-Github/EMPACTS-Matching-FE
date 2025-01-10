import Image from 'next/image';

export const HeroSection = () => {
  return (
    <div className="relative z-10 text-center py-10">
      <h1 className="mt-4 text-4xl font-bold text-black">Discover SDGs startups</h1>
      <p className="mt-2 text-lg text-black">or <span className='text-[#9200FE]'>create your own</span></p>
    </div>
  );
};
