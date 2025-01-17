"use client"

import StartupCard from './auth/(components)/StartupCard';
import Tabs from './auth/(components)/Tabs';
import SearchBar from './auth/(components)/SearchBar';
import { HeroSection } from './auth/(components)/HeroSection';
import Header from './auth/(components)/Header';

export default function Home() {
  const startupMockData = [
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'GreenTech Solutions',
      description: 'Innovative solutions for a sustainable future with renewable energy.',
      memberCount: 10,
      sdgName: 'Affordable and Clean Energy',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'AgroSphere',
      description: 'Revolutionizing agriculture through smart farming and precision technology.',
      memberCount: 15,
      sdgName: 'Zero Hunger',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'EcoBuild Co.',
      description: 'Sustainable construction materials for a greener tomorrow.',
      memberCount: 8,
      sdgName: 'Sustainable Cities and Communities',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'AquaCare Tech',
      description: 'Innovative water purification systems for clean drinking water.',
      memberCount: 12,
      sdgName: 'Clean Water and Sanitation',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'Healthify AI',
      description: 'AI-driven solutions for affordable healthcare access.',
      memberCount: 20,
      sdgName: 'Good Health and Well-being',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'EduConnect',
      description: 'Empowering students with tools for accessible online education.',
      memberCount: 18,
      sdgName: 'Quality Education',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'FoodCycle',
      description: 'Reducing food waste through smart logistics and food-sharing.',
      memberCount: 6,
      sdgName: 'Responsible Consumption and Production',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'Solarify',
      description: 'Innovative solar panel technology for remote areas.',
      memberCount: 14,
      sdgName: 'Affordable and Clean Energy',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'ClimaTech',
      description: 'Data-driven climate change solutions for industries.',
      memberCount: 9,
      sdgName: 'Climate Action',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'SafeNet',
      description: 'Cybersecurity solutions for small and medium businesses.',
      memberCount: 11,
      sdgName: 'Decent Work and Economic Growth',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'UrbanGrow',
      description: 'Vertical farming solutions for urban communities.',
      memberCount: 7,
      sdgName: 'Sustainable Cities and Communities',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'BioGenics',
      description: 'Biotechnology solutions for renewable materials.',
      memberCount: 5,
      sdgName: 'Industry, Innovation, and Infrastructure',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'ReCycleUp',
      description: 'Revolutionizing recycling processes with smart tech.',
      memberCount: 13,
      sdgName: 'Responsible Consumption and Production',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'SkillBridge',
      description: 'Bridging the skills gap for youth employment.',
      memberCount: 16,
      sdgName: 'Decent Work and Economic Growth',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'Finclusion Labs',
      description: 'Fintech solutions for financial inclusion in underserved regions.',
      memberCount: 19,
      sdgName: 'No Poverty',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'TreeMend',
      description: 'Tree planting initiatives powered by blockchain for tracking.',
      memberCount: 4,
      sdgName: 'Life on Land',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'WaveGuard',
      description: 'Protecting ocean life with innovative technology.',
      memberCount: 10,
      sdgName: 'Life Below Water',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'E-Health Connect',
      description: 'Digital health records and remote diagnostics for rural areas.',
      memberCount: 8,
      sdgName: 'Good Health and Well-being',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'FarmChain',
      description: 'Blockchain technology for transparent food supply chains.',
      memberCount: 17,
      sdgName: 'Zero Hunger',
    },
    {
      logoUrl: 'https://via.placeholder.com/150',
      startupName: 'CleanAir Labs',
      description: 'Air purification solutions for industrial and urban environments.',
      memberCount: 9,
      sdgName: 'Climate Action',
    },
  ];  

  return (
    <main className="flex flex-col items-center min-h-screen">
      <Header />

      {/* Content Section */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <HeroSection />
        <SearchBar className="mb-8 w-full max-w-2xl shadow-md" />
        <Tabs />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {startupMockData.map((card, index) => (
            <StartupCard key={index} {...card} />
          ))}
        </div>
      </div>
    </main>
  );
}
