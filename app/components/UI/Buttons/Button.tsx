'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant: 'bordered' | 'colored' | 'transparent';
    disabled?: boolean;
    buttonClassName?: React.HTMLProps<HTMLButtonElement>['className'];
    layoutId?: string;
    type?: 'button' | 'submit';
}

const Button = ({
    children,
    buttonClassName,
    disabled,
    layoutId,
    ...props
}: ButtonProps) => {
    const { className, ...propsWithoutClass } = props;

    const getStyles = () => {
        switch (props.variant) {
            case 'bordered':
                return `border-solid border border-black text-black transition-all ${disabled && '!opacity-50 cursor-not-allowed hover:!bg-transparent hover:!text-black'}`;
            case 'colored':
                return `border-2 border-solid border-transparent bg-primary text-white transition-all ${disabled && '!opacity-50 cursor-not-allowed'}`;
            case 'transparent':
                return `!p-0 ${disabled && '!opacity-50 !cursor-not-allowed !no-underline hover:!text-black'}`;
            default:
                return '';
        }
    };

    return (
        <motion.div
            layoutId={layoutId ? layoutId : undefined}
            className={`h-fit w-fit ${className}`}
        >
            <button
                disabled={disabled}
                className={`h-fit w-full rounded-md px-4 py-2 ${getStyles()} ${buttonClassName}`}
                {...propsWithoutClass}
            >
                {children}
            </button>
        </motion.div>
    );
};

export default Button;
