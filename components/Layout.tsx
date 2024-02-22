import React, { ReactNode } from 'react';
import Head from 'next/head';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Netflix Clone</title>
      </Head>
      {children}
    </>
  );
};

export default Layout;
