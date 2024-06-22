import React from 'react';
import { IconType, icons } from './icon-database';
;

interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
    icon: IconType;
    fill?: string;
}

export default function Icon({ icon, fill = '', ...props }: IconProps) {
    const { className, ...otherProps } = props;

    return (
        <svg
            {...otherProps}
            xmlns="http://www.w3.org/2000/svg"
            fill={fill ? fill : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={'h-5 w-5 cursor-pointer select-none ' + className}
        >
            {typeof icons[icon] !== 'string' ? (
                (icons[icon] as Array<string>).map((path: string) => (
                    <path
                        key={path}
                        fillRule="evenodd"
                        clipRule="evenodd"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={path}
                    />
                ))
            ) : (
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={icons[icon] as string}
                />
            )}
        </svg>
    );
}