'use client';

import { IconType } from './Icon/icon-database';

import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeContext } from '@/app/context/ThemeContext';
import { signOut, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import logo from '../img/logoSquare.png';
import defaultAvatar from '../img/default.svg';
import Image from 'next/image';
import Icon from './Icon/Icon';
import Link from 'next/link';
import ThemeToggler from './UI/ThemeToggler';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

interface SidebarLinkProps {
    href: string;
    text: string;
    icon: IconType;
    isHidden: boolean;
    isActive: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
    href,
    text,
    icon,
    isHidden,
    isActive
}) => (
    <Link
        title={isHidden ? text : undefined}
        href={href ? href : '/'}
        className={classNames(
            'group flex h-14 min-h-14 w-14 min-w-14 cursor-pointer items-center gap-1 overflow-hidden whitespace-nowrap rounded-lg text-lg text-zinc-700 transition-all duration-300 ease-out hover:bg-primary hover:text-white dark:!text-white',
            {
                '!w-full': !isHidden,
                '!bg-primary !text-white': isActive
            }
        )}
    >
        <div className="flex h-14 min-h-14 w-14 min-w-14 items-center justify-center rounded-lg">
            <Icon icon={icon} className="h-7 w-7 dark:text-white" />
        </div>
        <p>{text}</p>
    </Link>
);

export const Sidebar = () => {
    const [isHidden, setHidden] = useState(true);
    const [mobileModalVisible, setMobileModalVisible] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    const path = usePathname();
    const { data: session } = useSession();
    const user = session?.user;

    const { toggleTheme } = useContext(ThemeContext);

    const handleSignOut = () => {
        const promise = signOut();
        toast.promise(promise, {
            success: 'Signed out!',
            loading: 'Leaving...',
            error: 'Error occurred!'
        });
    };

    useEffect(() => {
        setActiveLink(path);
    }, [path]);

    const links: Array<{ text: string; href: string; icon: IconType }> = [
        { text: 'Profile', href: 'profile', icon: 'person' },
        { text: 'Stories', href: '', icon: 'book' },
        { text: 'Favorite', href: 'favorite', icon: 'star' },
        { text: 'Groups', href: 'groups', icon: 'group' },
        { text: 'Analytics', href: 'analytics', icon: 'chart-bars' }
    ];

    return (
        <motion.div
            initial={{ width: '5.8rem' }}
            animate={{ width: isHidden ? '5.8rem' : '16rem' }}
            className="relative flex min-w-full flex-row items-center justify-between border-b border-solid border-transparent bg-light-bg px-4 py-6 shadow-md lg:min-w-[unset] lg:flex-col lg:items-start lg:justify-normal lg:border-b-0 lg:border-r dark:border-white/20 dark:bg-dark-bg dark:shadow-none"
        >
            <button
                className="absolute -right-0 top-[20%] hidden w-fit -translate-y-1/2 translate-x-[calc(50%+1px)] rounded-full bg-primary p-2 lg:flex"
                onClick={() => setHidden(!isHidden)}
            >
                <Icon
                    icon="arrowLeft"
                    weight="bold"
                    className={classNames(
                        'duration-250 h-4 w-4 rotate-0 text-white transition-all ease-linear',
                        { '!rotate-180': isHidden }
                    )}
                />
            </button>

            <div className="hidden h-full w-full flex-col justify-between gap-4 overflow-hidden lg:flex">
                <Link
                    href="/"
                    className={classNames(
                        'relative flex h-12 min-h-12 w-16 min-w-16 items-center gap-4 overflow-hidden whitespace-nowrap pl-[0.4rem] transition-all',
                        { '!w-full': !isHidden }
                    )}
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
                    {links.map((link) => (
                        <SidebarLink
                            key={link.href}
                            href={link.href}
                            text={link.text}
                            icon={link.icon}
                            isHidden={isHidden}
                            isActive={activeLink === '/' + link.href}
                        />
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
                        className={classNames(
                            'group flex h-14 min-h-14 w-14 min-w-14 cursor-pointer items-center gap-1 overflow-hidden whitespace-nowrap rounded-lg bg-light-object text-lg transition-all hover:bg-red-500 hover:text-white dark:bg-dark-object',
                            { '!w-full': !isHidden }
                        )}
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

            <Icon
                icon="menu"
                className="lg:hidden"
                onClick={() => setMobileModalVisible(true)}
            />
            <ThemeToggler className="lg:hidden" />

            <AnimatePresence>
                {mobileModalVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed left-0 top-0 z-50 h-full w-full bg-black/70 lg:hidden"
                        onMouseDown={() => setMobileModalVisible(false)}
                    >
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween' }}
                            onMouseDown={(e) => e.stopPropagation()}
                            className="flex h-full w-3/4 flex-col gap-4 bg-light-bg px-4 dark:bg-dark-bg"
                        >
                            <Link
                                href="profile"
                                className="flex h-24 w-full items-center gap-2 border-b border-solid border-black/10 dark:border-white/10"
                            >
                                <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-zinc-200">
                                    <Image
                                        src={user?.image || defaultAvatar}
                                        alt="avatar"
                                        width={500}
                                        height={500}
                                        priority
                                        className={classNames(
                                            'h-full w-full object-cover',
                                            { 'scale-75': !user?.image }
                                        )}
                                    />
                                </div>

                                <div className="flex h-fit grow flex-col gap-1">
                                    <h1 className="text-lg">{user?.name}</h1>
                                    <h2 className="text-xs text-zinc-400">
                                        {user?.email}
                                    </h2>
                                </div>
                            </Link>

                            <div className="flex w-full grow flex-col gap-4">
                                {links
                                    .filter((link) => link.href !== 'profile')
                                    .map((link) => (
                                        <Link
                                            href={link.href || '/'}
                                            key={link.href}
                                            className={classNames(
                                                'flex w-full items-center gap-2 rounded-md px-4 py-2 text-2xl text-zinc-600 hover:bg-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-800',
                                                {
                                                    '!bg-primary !text-white':
                                                        activeLink ===
                                                        '/' + link.href
                                                }
                                            )}
                                        >
                                            <Icon icon={link.icon} />
                                            <p>{link.text}</p>
                                        </Link>
                                    ))}
                            </div>

                            <div
                                className="mb-4 mt-auto flex h-12 w-full items-center gap-2 px-4 text-zinc-400"
                                onClick={handleSignOut}
                            >
                                <Icon icon="quit" />
                                <p className="text-xl">Log out</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
