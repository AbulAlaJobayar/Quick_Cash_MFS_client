
import React, { ReactNode } from 'react';
import Navbar from '../../components/shared/Navbar/Navbar';

// Dynamically import Navbar (no need for `ssr: false`)
const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen max-w-[1920px] mx-auto">
      <Navbar/>
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;