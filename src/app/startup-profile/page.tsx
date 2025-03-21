import StartupProfileContainer from '@/container/StartupProfile/StartupProfileContainer';
import React from 'react';
import Header from '@/components/Header';

const ExplorePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full h-screen relative z-10 gap-y-8">
            <Header />
            <StartupProfileContainer />
        </div>
    );
};

export default ExplorePage;
