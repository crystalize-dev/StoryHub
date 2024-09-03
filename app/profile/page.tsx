'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import defaultProfileImg from '../img/default.svg';
import Icon from '../components/Icon/Icon';
import Button from '../components/UI/Buttons/Button';
import { UserType } from '../types/userType';

const ProfilePage = () => {
    const session = useSession();
    const [user, setUser] = useState<UserType>();

    const [mode, setMode] = useState<'editting' | 'static'>('static');

    const changePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        if (input.files && input.files[0]) {
            setUser({ ...user, image: URL.createObjectURL(input.files[0]) });
        }
    };

    const saveUserData = async (e: React.FormEvent) => {
        e.preventDefault();

        setMode('static');
    };

    useEffect(() => {
        if (session.data) {
            setUser(session.data?.user);
        }
    }, [session]);

    return (
        <div className="flex h-full w-full gap-8">
            <form
                onSubmit={(e) => saveUserData(e)}
                className="relative flex h-full min-h-full w-96 min-w-96 flex-col items-center gap-2 rounded-lg border border-solid border-black/20 p-8 dark:border-white/20"
            >
                {mode === 'static' && (
                    <Icon
                        icon="pen"
                        className="absolute right-4 top-4"
                        onClick={() => setMode('editting')}
                    />
                )}

                <div
                    className={`group relative flex h-36 min-h-36 w-36 min-w-36 items-center justify-center overflow-hidden rounded-full ${!user?.image && 'bg-black/10 dark:bg-white/20'}`}
                >
                    {user?.image ? (
                        <picture className="h-full w-full">
                            <img
                                alt="profileImg"
                                src={user.image}
                                className="h-full w-full object-cover"
                            />
                        </picture>
                    ) : (
                        <Image
                            alt="default profile"
                            src={defaultProfileImg}
                            width={500}
                            height={500}
                            priority={true}
                            className="h-full w-full scale-50 object-cover"
                        />
                    )}

                    <div
                        className={`pointer-events-none absolute flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-black/20 ${mode === 'static' && '!hidden'}`}
                    >
                        <input
                            onChange={changePhoto}
                            type="file"
                            accept="image/*"
                            className="absolute h-full w-full cursor-pointer opacity-0"
                        />
                        <Icon
                            icon="photo"
                            className="pointer-events-none h-full w-full scale-50 text-white"
                        />
                    </div>
                </div>

                <h1 className="flex items-center gap-2 text-lg font-semibold text-black dark:text-white">
                    {user?.name}
                </h1>

                <p className="text-sm text-zinc-500">{user?.email}</p>

                <h2 className="text-md mt-4 self-start">About me:</h2>
                <p className="self-start text-sm text-zinc-500">
                    {user?.description ? user.description : 'Nothing here yet!'}
                </p>

                {mode === 'editting' && (
                    <Button
                        type="submit"
                        variant="colored"
                        className="mt-auto w-full"
                    >
                        Save
                    </Button>
                )}
            </form>

            <div className="h-full min-h-full grow rounded-lg border border-solid border-black/20 dark:border-white/20"></div>
        </div>
    );
};

export default ProfilePage;
