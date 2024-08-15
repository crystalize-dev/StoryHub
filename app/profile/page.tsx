'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import defaultProfileImg from '../img/default.svg';
import Icon from '../components/Icon/Icon';

type UserType =
    | {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
      }
    | undefined;

const ProfilePage = () => {
    const session = useSession();
    const [user, setUser] = useState<UserType>({});

    const changePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        if (input.files && input.files[0]) {
            setUser({ ...user, image: URL.createObjectURL(input.files[0]) });
        }
    };

    useEffect(() => {
        if (session.data) {
            setUser(session.data?.user);
        }
    }, [session]);

    return (
        <div className="flex h-full w-full gap-8">
            <div className="flex h-full min-h-full w-96 min-w-96 flex-col items-center gap-4 rounded-lg border border-solid border-black/20 p-8 dark:border-white/20">
                <div
                    className={`group relative flex h-36 min-h-36 w-36 min-w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full ${!user?.image && 'bg-black/10 dark:bg-white/20'}`}
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

                    <div className="pointer-events-none absolute flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-black/20">
                        <input
                            onChange={changePhoto}
                            type="file"
                            accept="image/*"
                            className="absolute h-full w-full cursor-pointer opacity-0"
                        />
                        <Icon
                            icon="photo"
                            className="pointer-events-none h-1/2 w-1/2 text-white"
                        />
                    </div>
                </div>
                Profile editting content
            </div>
            <div className="h-full min-h-full grow rounded-lg border border-solid border-black/20 dark:border-white/20"></div>
        </div>
    );
};

export default ProfilePage;
