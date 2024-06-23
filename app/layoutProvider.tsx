'use client';
import { SessionProvider } from 'next-auth/react';
import React, { Suspense } from 'react';
import { Sidebar } from './components/Nav/Sidebar';
import { Header } from './components/Nav/Header';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <main className="min-w-screen max-w-screen bg-light-bg dark:bg-dark-bg flex h-screen max-h-screen min-h-screen w-screen text-black dark:text-white">
                    <Sidebar />

                    <div className="flex grow flex-col">
                        <Header />
                        <div className="scrollable grow">{children}</div>
                    </div>
                </main>
            </Suspense>
        </SessionProvider>
    );
};
