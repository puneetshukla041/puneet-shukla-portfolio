import React from 'react';
import Header from '@/components/Header';
import Section1 from '@/components/developer/section1';
import Section2 from '@/components/developer/section2';

const Page = () => {
  return (
    <main className="relative">
      <Header />
 
        <Section1 />
        <Section2 />
   
    </main>
  );
};

export default Page;