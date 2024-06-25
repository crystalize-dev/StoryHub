'use client';
import Image from 'next/image';
import logo from '../img/logo.png';
import { customAxios } from '@/axios/customAxios';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import Icon from '../components/Icon/Icon';
import { useRouter } from 'next/navigation';
import Input from '../components/UI/Inputs/Input';
import Button from '../components/UI/Buttons/Button';
import { motion } from 'framer-motion';

const ForgotPage = () => {
    const [fetching, setFetching] = useState(false);
    const router = useRouter();

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('resetEmail');

        if (!email) {
            toast.error('Fill in all required fields!');
            return;
        }

        await customAxios('POST', 'forgot-password', setFetching, {
            data: { email },
            loadingString: 'Sending letter...',
            actionOnSuccess: () => {
                router.push('/login');
            },
            successString: 'Check your email!'
        });
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-light-bg to-primary-hover lg:gap-8 lg:p-8 dark:from-dark-bg dark:to-primary">
            <motion.form
                layoutId="loginForm"
                onSubmit={(e) => submit(e)}
                className={`!max-w-sreen flex !h-screen max-h-screen !w-screen flex-col items-center justify-center gap-4 bg-white !bg-opacity-50 p-8 lg:relative lg:!h-fit lg:max-h-[95%] lg:!w-fit lg:!max-w-[95%] lg:gap-6 lg:rounded-2xl lg:p-6 lg:shadow-md dark:bg-black`}
            >
                <div
                    className="group absolute left-2 top-6 flex cursor-pointer items-center gap-1 rounded-full bg-white/20 px-4 py-2 text-sm lg:-left-0 lg:-top-14 lg:bg-transparent lg:hover:bg-white/20 lg:dark:hover:!bg-black/20"
                    onClick={() => router.push('/login')}
                >
                    <Icon icon="arrowLeft" className="h-6 w-6 scale-75" />
                    <p className="relative -left-2 whitespace-nowrap font-semibold transition-all lg:opacity-0 lg:group-hover:left-0 lg:group-hover:opacity-100">
                        Back to log in
                    </p>
                </div>

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
                    className="flex w-full flex-col items-center gap-2"
                >
                    <h1 className="mt-4 text-3xl font-bold">Reset password</h1>
                    <h2 className="text-sm font-normal text-zinc-400 dark:text-white/20">
                        please enter email account below
                    </h2>
                </motion.div>

                <Input
                    layoutId="emailLogin"
                    type="email"
                    placeholder="Email"
                    disabled={fetching}
                    icon="mail"
                    required={true}
                    name="resetEmail"
                    placeholderType="classic"
                    className="mt-8 lg:mt-0"
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
