'use client';

import { IconType } from '../Icon/icon-database';

import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '@/app/context/ThemeContext';
import { signOut } from 'next-auth/react';

import toast from 'react-hot-toast';

import logo from '../../img/logoSquare.png';
import Image from 'next/image';
import Icon from '../Icon/Icon';
import Link from 'next/link';
import ThemeToggler from '../UI/ThemeToggler';

export const Sidebar = () => {
    const [isHidden, setHidden] = useState(true);

    const { toggleTheme } = useContext(ThemeContext);

    const handleSignOut = () => {
        const promise = signOut();
        toast.promise(promise, {
            success: 'Signed out!',
            loading: 'Leaving...',
            error: 'Error occurred!'
        });
    };

    type Link = {
        href: string;
        text: string;
        icon: IconType;
    };
    const links: Link[] = [
        {
            text: 'Profile',
            href: 'profile',
            icon: 'person'
        },
        {
            text: 'Stories',
            href: '/',
            icon: 'book'
        },
        {
            text: 'Groups',
            href: 'groups',
            icon: 'group'
        },
        {
            text: 'Analytics',
            href: 'analytics',
            icon: 'chart-bars'
        }
    ];

    return (
        <motion.div
            initial={{ width: '6rem' }}
            animate={{ width: isHidden ? '6rem' : '16rem' }}
            className="relative flex h-full flex-col border-r border-solid border-transparent bg-light-bg px-4 py-6 shadow-md dark:border-white/20 dark:bg-dark-bg dark:shadow-none"
        >
            <button
                className="absolute -right-0 top-[20%] w-fit -translate-y-1/2 translate-x-[calc(50%+1px)] rounded-full bg-primary p-2"
                onClick={() => setHidden(!isHidden)}
            >
                <Icon
                    icon="arrowLeft"
                    weight="bold"
                    className={`duration-250 h-4 w-4 rotate-0 text-white transition-all ease-linear ${isHidden && '!rotate-180'}`}
                />
            </button>

            <div className="flex h-full w-full flex-col justify-between gap-4 overflow-hidden">
                <Link
                    href={'/'}
                    className={`relative flex h-12 min-h-12 w-16 min-w-16 items-center gap-4 overflow-hidden whitespace-nowrap pl-[0.4rem] transition-all ${!isHidden ? '!w-full' : ''}`}
                >
                    <Image
                        src={logo}
                        alt="logo"
                        width={500}
                        height={500}
                        className="h-12 min-h-12 w-12 min-w-12"
                    />

                    <div className="flex w-full min-w-fit flex-col">
                        <h1 className="text-lg">
                            Story<span className="text-primary">Hub</span>
                        </h1>
                        <h2 className="text-xs text-zinc-400">
                            Let your story begin
                        </h2>
                    </div>
                </Link>

                <div className="flex h-fit w-full flex-col gap-4">
                    {links.map((link: Link) => (
                        <Link
                            title={isHidden ? link.text : undefined}
                            key={link.href}
                            href={link.href}
                            className={`group flex h-14 min-h-14 w-14 min-w-14 cursor-pointer items-center gap-1 overflow-hidden whitespace-nowrap rounded-lg text-lg text-zinc-700 transition-all duration-300 ease-out hover:bg-primary hover:text-white dark:!text-white ${!isHidden ? '!w-full' : ''}`}
                        >
                            <div className="flex h-14 min-h-14 w-14 min-w-14 items-center justify-center rounded-lg">
                                <Icon
                                    icon={link.icon}
                                    className="h-7 w-7 dark:text-white"
                                />
                            </div>

                            <p>{link.text}</p>
                        </Link>
                    ))}
                </div>

                <div className="flex h-fit w-full flex-col text-zinc-700 dark:text-white">
                    <div
                        className="group flex w-full cursor-pointer items-center gap-1 whitespace-nowrap text-lg"
                        title={isHidden ? 'Theme' : undefined}
                        onClick={toggleTheme}
                    >
                        <ThemeToggler
                            disabled
                            className="h-14 min-h-14 w-14 min-w-14"
                        />

                        <p>Switch Theme</p>
                    </div>

                    <div
                        onClick={handleSignOut}
                        title={isHidden ? 'Sign out' : undefined}
                        className={`group flex h-14 min-h-14 w-14 min-w-14 cursor-pointer items-center gap-1 overflow-hidden whitespace-nowrap rounded-lg bg-light-object text-lg transition-all hover:bg-red-500 hover:text-white dark:bg-dark-object ${!isHidden ? '!w-full' : ''}`}
                    >
                        <div className="flex h-14 min-h-14 w-14 min-w-14 items-center justify-center">
                            <Icon
                                icon="quit"
                                className="relative left-[2px] group-hover:scale-125 group-hover:!text-white dark:text-white"
                            />
                        </div>

                        <p>Sign out</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
