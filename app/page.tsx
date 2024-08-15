'use client';
import Button from './components/UI/Buttons/Button';
import { signOut } from 'next-auth/react';
import SearchInput from './components/UI/Inputs/SearchInput';

export default function Home() {
    return <div className="p-8 flex flex-col gap-4">
        <SearchInput/>
    </div>;
}
