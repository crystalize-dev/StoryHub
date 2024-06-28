'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { ThemeContext } from './context/ThemeContext';

import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import { Sidebar } from './components/Sidebar';
import { Toaster } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';
import ThemeToggler from './components/UI/ThemeToggler';

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname();

    const isLoginPage =
        ['/login', '/forgot-password'].includes(path) ||
        path.includes('reset-password');

    return (
        <SessionProvider>
            <Suspense fallback={<TailSpin color="var(--primary)" />}>
                <ThemeProvider>
                    <main className="flex h-screen w-screen flex-col bg-light-bg text-black lg:flex-row dark:bg-dark-bg dark:text-white">
                        <Toaster />

                        {!isLoginPage && <Sidebar />}

                        <div className="flex h-full w-full flex-grow flex-col bg-light-object dark:bg-dark-object">
                            {isLoginPage && (
                                <ThemeToggler className="absolute right-8 top-8" />
                            )}

                            {children}
                        </div>
                    </main>
                </ThemeProvider>
            </Suspense>
        </SessionProvider>
    );
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<'dark' | 'light' | null>(null);

    useEffect(() => {
        // Проверка локального хранилища на наличие сохраненной темы
        const savedTheme = localStorage.getItem('theme') as
            | 'dark'
            | 'light'
            | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        } else {
            // Проверка настроек системы пользователя
            const userPrefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            const initialTheme = userPrefersDark ? 'dark' : 'light';
            setTheme(initialTheme);
            document.documentElement.classList.add(initialTheme);
        }
    }, []);

    const toggleTheme = () => {
        if (theme) {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            document.documentElement.classList.remove(theme);
            document.documentElement.classList.add(newTheme);
            localStorage.setItem('theme', newTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default LayoutProvider;
