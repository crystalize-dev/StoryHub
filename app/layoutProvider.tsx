'use client';
import React, { Suspense } from 'react';

import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import { Sidebar } from './components/Nav/Sidebar';
import { Header } from './components/Nav/Header';
import { Toaster } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname();

    const isLoginPage =
        ['/login', '/forgot-password'].includes(path) ||
        path.includes('reset-password');

    return (
        <SessionProvider>
            <Suspense fallback={<TailSpin color="var(--primary)" />}>
                <main className="flex h-screen w-screen bg-light-bg text-black dark:bg-dark-bg dark:text-white">
                    <Toaster />

                    {!isLoginPage && <Sidebar />}

                    <div className="flex flex-grow flex-col">
                        {!isLoginPage && <Header />}
                        <div className="scrollable flex-grow">{children}</div>
                    </div>
                </main>
            </Suspense>
        </SessionProvider>
    );
};

export default LayoutProvider;
