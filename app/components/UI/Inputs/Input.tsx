'use client';
import React, { ChangeEvent, useState } from 'react';
import { IconType } from '../../Icon/icon-database';
import Icon from '../../Icon/Icon';
import { motion } from 'framer-motion';

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
}

const Input = ({
    placeholderType = 'inner',
    passwordSetup = false,
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
        onType,
        restrictedLength = false,
        ...otherProps
    } = props;
    const [value, setValue] = useState(defaultValue ? defaultValue : '');
    const [isVisiblePassword, setVisiblePassword] = useState(false);

    const changeValue = (e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value;

        if (restrictedLength && value.length > 10) return;

        setValue(value);
        onType && onType(value);
    };

    return (
        <motion.div
            layout
            layoutId={layoutId ? layoutId : undefined}
            className={`relative flex h-fit w-full flex-col gap-2 text-sm ${icon && 'items-center'} ${className}`}
        >
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
                autoComplete={'off'}
                disabled={disabled}
                placeholder={
                    placeholderType === 'classic' && placeholder
                        ? placeholder
                        : undefined
                }
                value={value}
                onChange={(e) => changeValue(e)}
                className={`h-12 w-full rounded-md bg-light-bg p-4 !text-base transition-all dark:bg-dark-object ${focusStyles} ${disabled && disabledStyles} ${icon && 'pr-10'} ${inputClassName}`}
            />

            {icon && type !== 'password' && (
                <Icon
                    icon={icon ? icon : 'eye'}
                    className={`pointer-events-none absolute right-4 select-none text-zinc-400 ${placeholderType === 'classic' ? 'top-1/2 -translate-y-1/2' : 'bottom-[0.9rem]'}`}
                />
            )}

            {passwordSetup && type === 'password' && (
                <Icon
                    icon={isVisiblePassword ? 'eye' : 'eye-closed'}
                    className={`absolute right-4 text-zinc-400 ${placeholderType === 'classic' ? 'top-1/2 -translate-y-1/2' : 'bottom-[0.9rem]'}`}
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
