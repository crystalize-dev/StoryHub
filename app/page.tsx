'use client';
import Button from './components/UI/Buttons/Button';
import { signOut } from 'next-auth/react';

export default function Home() {
    return (
        <div className="">
            <Button type="button" variant="colored" onClick={() => signOut()}>
                Выйти
            </Button>
        </div>
    );
}
