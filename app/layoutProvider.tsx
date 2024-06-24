'use client';
import { SessionProvider } from 'next-auth/react';
import React, { Suspense } from 'react';
import { Sidebar } from './components/Nav/Sidebar';
import { Header } from './components/Nav/Header';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname();
    const isLoginPage =
        path === '/login' ||
        path === '/forgot-password' ||
        path.includes('reset-password');

    return (
        <SessionProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <main className="min-w-screen max-w-screen flex h-screen max-h-screen min-h-screen w-screen bg-light-bg text-black dark:bg-dark-bg dark:text-white">
                    <Toaster />

                    {!isLoginPage && <Sidebar />}

                    <div className="flex grow flex-col">
                        {!isLoginPage && <Header />}
                        <div className="scrollable grow">{children}</div>
                    </div>
                </main>
            </Suspense>
        </SessionProvider>
    );
};
