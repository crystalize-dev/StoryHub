'use client';
import React, { ChangeEvent, useState } from 'react';
import { IconType } from '../../Icon/icon-database';
import Icon from '../../Icon/Icon';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    type: 'email' | 'password' | 'text';
    disabled?: boolean;
    placeholder?: string;
    placeholderType?: 'inner' | 'classic';
    passwordSetup?: boolean;
    onType?: (value: string) => void;
    name?: string;
    required?: boolean;
    icon?: IconType;
    layoutId?: string;
    inputClassName?: string;
    restrictedLength?: boolean;
    forgotPassword?: boolean;
}

const Input = ({
    placeholderType = 'inner',
    passwordSetup = false,
    forgotPassword = false,
    icon,
    ...props
}: InputProps) => {
    const {
        type,
        className,
        inputClassName,
        defaultValue,
        disabled,
        layoutId,
        placeholder,
        hidden,
        required,
        onType,
        restrictedLength = false,
        ...otherProps
    } = props;
    const [value, setValue] = useState(defaultValue ? defaultValue : '');
    const [isVisiblePassword, setVisiblePassword] = useState(false);
    const [error, setError] = useState(' ');

    const changeValue = (e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value;

        if (restrictedLength && value.length > 10) return;
        if (required && value.length > 0) setError(' ');

        setValue(value);
        onType && onType(value);
    };

    return (
        <motion.div
            layout
            layoutId={layoutId ? layoutId : undefined}
            className={`relative flex h-fit w-full flex-col gap-2 text-sm ${icon && 'items-center'} ${className}`}
        >
            {/* Outer text */}
            {placeholderType === 'inner' && (
                <p className="self-start font-semibold text-inherit">
                    {placeholder}
                </p>
            )}

            <input
                {...otherProps}
                type={
                    type === 'password'
                        ? isVisiblePassword
                            ? 'text'
                            : 'password'
                        : type
                }
                required={required}
                onBlur={
                    required
                        ? () => setError(!value ? 'Required!' : ' ')
                        : undefined
                }
                autoComplete={'off'}
                disabled={disabled}
                placeholder={
                    placeholderType === 'classic' && placeholder
                        ? placeholder
                        : undefined
                }
                hidden={hidden}
                value={value}
                onChange={(e) => changeValue(e)}
                className={`h-12 w-full rounded-md bg-light-bg p-4 !text-base transition-all dark:bg-dark-object ${focusStyles} ${disabled && disabledStyles} ${icon && 'pr-10'} ${inputClassName} ${error === 'Required!' && '!outline-red-500'}`}
            />

            {/* Error message */}
            {!hidden && (
                <div className="-mt-1 flex w-full items-center justify-between gap-2 text-xs">
                    <p className="text-red-500">{error}</p>
                    {forgotPassword && (
                        <Link
                            href={'/forgot-password'}
                            className={`cursor-pointer self-end whitespace-nowrap text-zinc-500 outline-none transition-all hover:text-primary hover:underline focus:text-primary focus:underline dark:text-white/20 ${disabled && 'pointer-events-none opacity-50'}`}
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>
            )}

            {/* Icon  */}
            {icon && type !== 'password' && (
                <Icon
                    icon={icon ? icon : 'eye'}
                    className={`pointer-events-none absolute right-4 select-none text-zinc-400 ${placeholderType === 'classic' ? 'top-[calc(50%-0.5rem)] -translate-y-1/2' : 'bottom-[2.1rem]'}`}
                />
            )}

            {/* Password icon */}
            {passwordSetup && type === 'password' && (
                <Icon
                    icon={isVisiblePassword ? 'eye' : 'eye-closed'}
                    className={`absolute right-4 text-zinc-400 ${placeholderType === 'classic' ? 'top-[calc(50%-0.5rem)] -translate-y-1/2' : 'bottom-[2.1rem]'}`}
                    onClick={() => setVisiblePassword(!isVisiblePassword)}
                />
            )}
        </motion.div>
    );
};

export default Input;

const focusStyles =
    'outline outline-2 outline-transparent focus:outline-primary-hover';

const disabledStyles = 'cusor-not-allowed opacity-50';
