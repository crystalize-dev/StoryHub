'use client';
import React, { useState } from 'react';

export const Sidebar = () => {
    const [isHidden, setHidden] = useState(false);

    return (
        <div
            className={`relative flex h-full w-64 flex-col bg-red-500 p-4 ${isHidden && 'w-16'}`}
        >
            <button
                className="absolute -right-0 top-1/2 w-fit -translate-y-1/2 translate-x-1/2 bg-primary px-4 py-2"
                onClick={() => setHidden(!isHidden)}
            >
                {isHidden ? '>' : '<'}
            </button>
        </div>
    );
};
