import React from 'react';
import ThemeToggler from '../components/UI/ThemeToggler';

const LoginPage = () => {
    return (
        <div className="flex flex-col gap-8 p-8">
            <ThemeToggler />
            <p className="bg-light-object dark:bg-dark-object rounded-md p-4">
                Hello!
            </p>
            <div className="min-h-[500vh]" />
        </div>
    );
};

export default LoginPage;
