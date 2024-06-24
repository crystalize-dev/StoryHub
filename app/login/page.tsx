'use client';
import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import logo from '../img/logo.png';
import google from '../img/google.webp';
import Input from '../components/UI/Inputs/Input';
import Button from '../components/UI/Buttons/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { customAxios } from '@/axios/customAxios';
import { useRouter } from 'next/navigation';
import image1 from '../img/Slider/image1.png';
import image2 from '../img/Slider/image2.png';
import image3 from '../img/Slider/image3.png';
import TypewriterComponent from 'typewriter-effect';

const LoginPage = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [fetching, setFetching] = useState(false);
    const router = useRouter();

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('emailLogin');
        const password = formData.get('passwordLogin');

        if (mode === 'login') {
            if (!email || !password) {
                toast.error('Fill in all required fields!');
                return;
            }

            setFetching(true);
            const toastId = toast.loading('Entering...');
            try {
                const result = await signIn('credentials', {
                    email: email,
                    password: password,
                    redirect: false
                });

                toast.dismiss(toastId);
                setFetching(false);

                if (result && result.error) {
                    toast.error(result.error);
                } else {
                    toast.success('Success!');
                    router.push('/');
                }
            } catch (err) {
                setFetching(false);
                toast.dismiss(toastId);

                toast.error('Error occurred!');
            }
        } else {
            const passwordRepeat = formData.get('passwordRepeat');

            if (!email || !password || !passwordRepeat) {
                toast.error('Fill in all required fields!');
                return;
            }

            if (password !== passwordRepeat) {
                toast.error('Passwords do not match!');
                return;
            }

            await customAxios('POST', 'register', setFetching, {
                data: { email: email, password: password },
                actionOnSuccess: () => {
                    setMode('login');
                },
                loadingString: 'Registering...',
                successString: 'Success! Now you can log in!'
            });
        }
    };

    const signInWithGoogle = async () => {
        setFetching(true);
        try {
            const promise = signIn('google', {
                redirect: false,
                callbackUrl: '/'
            }).finally(() => {
                setFetching(false);
            });
            toast.promise(promise, {
                loading: 'Entering...',
                success: 'Success!',
                error: 'Error occured!'
            });
        } catch (err) {
            setFetching(false);
        }
    };

    const sliderImages = [
        {
            id: 1,
            image: image1,
            text: 'Picture-Perfect <span style="color: #5858e6;">Tales</span>'
        },
        {
            id: 2,
            image: image2,
            text: 'Where <span style="color: #5858e6;">Ideas</span> and <span style="color: #5858e6;">Images</span> Meet'
        },
        {
            id: 3,
            image: image3,
            text: 'Where Every <span style="color: #5858e6;">Story</span> Finds a Home'
        }
    ];
    const [activeImageId, setActiveImageId] = useState(sliderImages[0].id);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-gradient-to-br from-light-bg to-primary-hover p-8 dark:from-dark-bg dark:to-primary">
            <AnimatePresence presenceAffectsLayout>
                {(mode === 'login' || mode === 'register') && (
                    <motion.form
                        initial={{ height: 'auto' }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 'auto' }}
                        layoutId="loginForm"
                        onSubmit={(e) => submit(e)}
                        className={`flex max-h-[95%] max-w-[95%] gap-10 rounded-2xl bg-white !bg-opacity-50 p-6 shadow-md dark:bg-black ${mode === 'register' && 'flex-row-reverse'}`}
                    >
                        <AnimatePresence presenceAffectsLayout>
                            {(mode === 'login' || mode === 'register') && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex min-w-96 flex-col gap-2 px-8"
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
                                            <span className="text-primary">
                                                Hub
                                            </span>
                                        </h1>
                                    </motion.div>

                                    <motion.div
                                        layoutId="loginFormHeader"
                                        className="flex flex-col gap-2"
                                    >
                                        <h1 className="mt-4 text-3xl font-bold">
                                            {mode === 'login'
                                                ? 'Welcome back!✌️'
                                                : 'Create an account'}
                                        </h1>
                                        <h2 className="text-sm font-normal text-zinc-400 dark:text-white/20">
                                            {mode === 'login'
                                                ? 'please log in below'
                                                : 'please register below'}
                                        </h2>
                                    </motion.div>

                                    <Input
                                        layoutId="emailLogin"
                                        type="email"
                                        placeholder="Email"
                                        disabled={fetching}
                                        icon="mail"
                                        required={true}
                                        name="emailLogin"
                                        placeholderType="classic"
                                        className="mt-4"
                                    />

                                    <Input
                                        layoutId="passwordLogin"
                                        type="password"
                                        required={true}
                                        name="passwordLogin"
                                        placeholder="Password"
                                        disabled={fetching}
                                        placeholderType="classic"
                                        forgotPassword={mode === 'login'}
                                        passwordSetup={true}
                                    />

                                    <Input
                                        layoutId="passwordRepeat"
                                        type="password"
                                        hidden={mode === 'login'}
                                        name="passwordRepeat"
                                        required={mode === 'register'}
                                        disabled={fetching}
                                        placeholder="Repeat password"
                                        placeholderType="classic"
                                    />

                                    <Button
                                        layoutId="submitButton"
                                        type="submit"
                                        variant="colored"
                                        className="mt-4 w-full"
                                        disabled={fetching}
                                        buttonClassName="dark:bg-primary text-white bg-primary hover:!bg-primary-hover dark:hover:!bg-primary-dark outline outline-2 outline-offset-1 outline-transparent focus:outline-primary"
                                    >
                                        Sign in
                                    </Button>

                                    <div className="relative flex items-center justify-center gap-2">
                                        <hr className="grow border-t border-solid border-black/20 dark:border-white/20" />
                                        <p className="wf-it whitespace-nowrap text-sm text-zinc-400 dark:text-white/20">
                                            or
                                        </p>
                                        <hr className="grow border-t border-solid border-black/20 dark:border-white/20" />
                                    </div>

                                    <Button
                                        type="button"
                                        variant="bordered"
                                        className="w-full"
                                        disabled={fetching}
                                        onClick={signInWithGoogle}
                                        buttonClassName="flex items-center gap-2 justify-center outline outline-2 outline-offset-2 outline-transparent focus:!outline-primary border-black/20 hover:bg-primary hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black hover:border-transparent"
                                    >
                                        <Image
                                            alt="google"
                                            src={google}
                                            width={20}
                                            height={20}
                                        />
                                        Sign in with Google
                                    </Button>

                                    <div className="mb-12 mt-4 flex items-center justify-center gap-2 text-sm text-zinc-500">
                                        {(mode === 'login'
                                            ? 'Don`t'
                                            : 'Already') + ' have an account?'}
                                        <Button
                                            type="button"
                                            variant="transparent"
                                            disabled={fetching}
                                            onClick={() =>
                                                setMode(
                                                    mode === 'login'
                                                        ? 'register'
                                                        : 'login'
                                                )
                                            }
                                            buttonClassName="!p-0 cursor-pointer font-semibold text-black/70 outline-none transition-all hover:text-primary hover:underline focus:text-primary focus:underline dark:text-white/70"
                                        >
                                            {mode === 'login'
                                                ? 'Sign in'
                                                : 'Log in'}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {(mode === 'login' || mode === 'register') && (
                                <motion.div
                                    initial={{
                                        borderBottomRightRadius: '0.5rem',
                                        borderBottomLeftRadius: '0.5rem'
                                    }}
                                    animate={
                                        mode === 'register'
                                            ? {
                                                  borderBottomRightRadius:
                                                      '3rem',
                                                  borderBottomLeftRadius:
                                                      '0.5rem'
                                              }
                                            : {
                                                  borderBottomRightRadius:
                                                      '0.5rem',
                                                  borderBottomLeftRadius: '3rem'
                                              }
                                    }
                                    exit={{ scaleY: 0 }}
                                    layoutId="sideBanner"
                                    className="flex h-full min-w-96 grow flex-col items-center gap-4 overflow-hidden rounded-t-lg bg-light-bg p-4 dark:bg-dark-object"
                                >
                                    <div className="relative flex h-full w-96 min-w-96 gap-4 overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            {sliderImages
                                                .filter(
                                                    (image) =>
                                                        image.id ===
                                                        activeImageId
                                                )
                                                .map((image) => (
                                                    <div
                                                        key={image.id}
                                                        className="flex w-96 max-w-96 flex-col items-center text-balance text-center text-4xl font-bold"
                                                    >
                                                        {sliderImages
                                                            .filter(
                                                                (image) =>
                                                                    image.id ===
                                                                    activeImageId
                                                            )
                                                            .map((image) => (
                                                                <TypewriterComponent
                                                                    key={
                                                                        image.id
                                                                    }
                                                                    onInit={(
                                                                        typewriter
                                                                    ) => {
                                                                        typewriter
                                                                            .typeString(
                                                                                image.text
                                                                            )
                                                                            .start();
                                                                    }}
                                                                    options={{
                                                                        delay: 60,
                                                                        autoStart:
                                                                            true
                                                                    }}
                                                                />
                                                            ))}
                                                        <motion.div
                                                            layout
                                                            initial={{
                                                                opacity: 0
                                                            }}
                                                            animate={{
                                                                opacity: 1
                                                            }}
                                                            exit={{
                                                                opacity: 0
                                                            }}
                                                            className={`absolute inset-0`}
                                                        >
                                                            <Image
                                                                src={
                                                                    image.image
                                                                }
                                                                alt="sliderImage"
                                                                width={1000}
                                                                height={1000}
                                                                priority={true}
                                                                className="h-full w-full object-contain"
                                                            />
                                                        </motion.div>
                                                    </div>
                                                ))}
                                        </AnimatePresence>
                                    </div>
                                    <div className="mt-auto flex h-fit w-fit items-center gap-4 rounded-full">
                                        {sliderImages.map((image) => (
                                            <div
                                                key={image.id}
                                                onClick={() =>
                                                    setActiveImageId(image.id)
                                                }
                                                className={`relative z-20 flex h-2 w-2 cursor-pointer items-center justify-center rounded-full bg-light-object transition-all ${
                                                    activeImageId ===
                                                        image.id &&
                                                    '!bg-primary'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LoginPage;
