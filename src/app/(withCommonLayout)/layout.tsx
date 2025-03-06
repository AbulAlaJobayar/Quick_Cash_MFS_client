
import React, { ReactNode } from 'react';
import Navbar from '../../components/shared/Navbar/Navbar';

// Dynamically import Navbar (no need for `ssr: false`)
const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container">
      <Navbar/>
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;