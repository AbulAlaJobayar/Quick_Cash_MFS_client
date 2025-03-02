import Navbar from '@/components/shared/Navbar/Navbar';
import React, { ReactNode } from 'react';

const CommonLayout = ({children}:{children:ReactNode}) => {
    return (
        <div className='container'>
            <Navbar/>
            {children}
            
        </div>
    );
};

export default CommonLayout;