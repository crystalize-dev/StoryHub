'use client';
import { SessionProvider } from 'next-auth/react';
import React, { Suspense } from 'react';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <main>{children}</main>
            </Suspense>
        </SessionProvider>
    );
};
