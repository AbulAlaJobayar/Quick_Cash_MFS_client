
import React, { ReactNode } from 'react';
import Navbar from '../../components/shared/Navbar/Navbar';
import Footer from '@/components/shared/Footer/Footer';

// Dynamically import Navbar (no need for `ssr: false`)
const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen max-w-[1920px] mx-auto">
      <Navbar/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default CommonLayout;