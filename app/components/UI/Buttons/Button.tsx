'use client';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant: 'bordered' | 'colored' | 'transparent';
    disabled?: boolean;
    buttonClassName?: string;
    layoutId?: string;
    type?: 'button' | 'submit';
}

const Button = ({
    children,
    variant,
    disabled = false,
    buttonClassName = '',
    layoutId,
    className = '',
    ...props
}: ButtonProps) => {
    const getStyles = useMemo(() => {
        switch (variant) {
            case 'bordered':
                return classNames(
                    'border-solid border border-black text-black transition-all',
                    {
                        '!opacity-50 cursor-not-allowed hover:!bg-transparent hover:!text-black':
                            disabled
                    }
                );
            case 'colored':
                return classNames(
                    'border-2 border-solid border-transparent bg-primary text-white transition-all',
                    {
                        '!opacity-50 cursor-not-allowed': disabled
                    }
                );
            case 'transparent':
                return classNames('!p-0', {
                    '!opacity-50 !cursor-not-allowed !no-underline hover:!text-black':
                        disabled
                });
            default:
                return '';
        }
    }, [variant, disabled]);

    return (
        <motion.div layoutId={layoutId} className={`h-fit w-fit ${className}`}>
            <button
                disabled={disabled}
                className={`h-fit w-full rounded-md px-4 py-2 ${getStyles} ${buttonClassName}`}
                {...props}
            >
                {children}
            </button>
        </motion.div>
    );
};

export default Button;
