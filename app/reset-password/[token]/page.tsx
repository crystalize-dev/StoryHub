'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { customAxios } from '@/axios/customAxios';
import toast from 'react-hot-toast';

import Image from 'next/image';
import Input from '../../components/UI/Inputs/Input';
import Button from '../../components/UI/Buttons/Button';
import logo from '../../img/logo.png';

import { UserType } from '@/app/types/userType';

const ForgotPage = ({ params }: any) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [fetching, setFetching] = useState(false);
    const router = useRouter();

    const submit = async (e: React.FormEvent) => {
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

        try {
            await customAxios('POST', 'reset-password', setFetching, {
                data: {
                    password,
                    user
                },
                actionOnSuccess: () => {
                    router.push('/login');
                    toast.success('Success! Now you can log in!');
                },
                loadingString: 'Resetting password...',
                successString: 'Success! Now you can log in!'
            });
        } catch (error) {
            toast.error('Failed to reset password. Please try again later.');
        }
    };

    useEffect(() => {
        customAxios('POST', 'verify-token', setFetching, {
            data: {
                token: params.token
            },
            loadingString: 'Checking token...',
            successString: 'All ok! You can reset your password',
            actionOnFailure: () => {
                router.push('/login');
            },
            actionOnSuccess: (data) => {
                setUser(data as UserType);
            }
        });
    }, [params.token, router]);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-light-bg to-primary-hover lg:gap-8 lg:p-8 dark:from-dark-bg dark:to-primary">
            <motion.form
                layoutId="loginForm"
                onSubmit={submit}
                className={`!max-w-sreen flex !h-screen max-h-screen !w-screen flex-col items-center justify-center gap-6 bg-white !bg-opacity-50 p-8 lg:!h-fit lg:max-h-[95%] lg:!w-fit lg:min-w-96 lg:!max-w-[95%] lg:gap-4 lg:rounded-2xl lg:px-12 lg:py-6 lg:shadow-md dark:bg-black`}
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
                    required
                    name="passwordReset"
                    placeholder="New password"
                    disabled={fetching}
                    className="mt-8 lg:mt-4"
                    placeholderType="classic"
                    passwordSetup
                />

                <Input
                    type="password"
                    name="passwordResetRepeat"
                    required
                    disabled={fetching}
                    placeholder="Repeat new password"
                    placeholderType="classic"
                    className="-mt-2"
                />

                <Button
                    type="submit"
                    layoutId="submitButton"
                    variant="colored"
                    className="mt-8 w-full lg:mt-0"
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
