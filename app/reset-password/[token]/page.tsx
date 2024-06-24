'use client';
import Image from 'next/image';
import logo from '../../img/logo.png';
import { customAxios } from '@/axios/customAxios';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Input from '../../components/UI/Inputs/Input';
import Button from '../../components/UI/Buttons/Button';
import ThemeToggler from '../../components/UI/ThemeToggler';
import { motion } from 'framer-motion';
import { UserType } from '@/app/types/userType';

const ForgotPage = ({ params }: any) => {
    const [user, setUser] = useState<null | UserType>(null);
    const [fetching, setFetching] = useState(false);
    const router = useRouter();

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const password = formData.get('passwordReset');
        const passwordRepeat = formData.get('passwordResetRepeat');

        if (!password || !passwordRepeat) {
            toast.error('Fill in all required fields!');
            return;
        }

        if (password !== passwordRepeat) {
            toast.error('Passwords do not match!');
            return;
        }

        if (!user) {
            toast.error('User not found!');
            router.push('/login');
            return;
        }

        await customAxios('POST', 'reset-password', setFetching, {
            data: {
                password: password,
                user: user
            },
            actionOnSuccess: () => {
                router.push('/login');
            },
            loadingString: 'Resetting password...',
            successString: 'Success! Now you can log in!'
        });
    };

    useEffect(() => {
        customAxios('POST', 'verify-token', setFetching, {
            data: {
                token: params.token
            },
            actionOnFailure: () => {
                router.push('/login');
            },
            actionOnSuccess: (data) => {
                setUser(data as UserType);
            }
        });
    }, [params.token, router]);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-gradient-to-br from-light-bg to-primary-hover p-8 dark:from-dark-bg dark:to-primary">
            <ThemeToggler />

            <motion.form
                layoutId="loginForm"
                onSubmit={(e) => submit(e)}
                className={`relative flex max-h-[95%] max-w-[95%] flex-col items-center gap-4 rounded-2xl bg-white !bg-opacity-50 p-12 shadow-md dark:bg-black`}
            >
                <motion.div
                    layoutId="logoImg"
                    className="relative flex h-10 w-fit select-none items-center gap-2"
                >
                    <Image
                        src={logo}
                        alt="logo"
                        width={500}
                        height={500}
                        priority={true}
                        className="h-full w-fit object-cover"
                    />
                    <h1 className="text-lg">
                        Story
                        <span className="text-primary">Hub</span>
                    </h1>
                </motion.div>

                <motion.div
                    layoutId="loginFormHeader"
                    className="flex flex-col gap-2"
                >
                    <h1 className="mt-4 text-3xl font-bold">Reset password</h1>
                    <h2 className="text-sm font-normal text-zinc-400 dark:text-white/20">
                        please enter new password below
                    </h2>
                </motion.div>

                <Input
                    type="password"
                    required={true}
                    name="passwordReset"
                    placeholder="New password"
                    disabled={fetching}
                    placeholderType="classic"
                    passwordSetup={true}
                />

                <Input
                    type="password"
                    name="passwordResetRepeat"
                    required={true}
                    disabled={fetching}
                    placeholder="Repeat new password"
                    placeholderType="classic"
                />

                <Button
                    type="submit"
                    layoutId="submitButton"
                    variant="colored"
                    className="w-full"
                    disabled={fetching}
                    buttonClassName="dark:bg-primary text-white bg-primary hover:!bg-primary-hover dark:hover:!bg-primary-dark outline outline-2 outline-offset-1 outline-transparent focus:outline-primary"
                >
                    Reset
                </Button>
            </motion.form>
        </div>
    );
};

export default ForgotPage;
