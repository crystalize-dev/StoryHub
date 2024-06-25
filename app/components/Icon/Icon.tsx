import React from 'react';
import { IconType, icons } from './icon-database';

interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
    icon: IconType;
    fill?: string;
    weight?: 'normal' | 'bold' | 'thin';
}

const Icon: React.FC<IconProps> = ({
    icon,
    fill = 'none',
    className = '',
    weight = 'normal',
    ...props
}) => {
    const iconPaths = icons[icon];
    const weightMapping = {
        normal: 2,
        bold: 2.5,
        thin: 1.5
    };

    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill={fill}
            viewBox="0 0 24 24"
            strokeWidth={weightMapping[weight]}
            stroke="currentColor"
            className={`h-5 w-5 cursor-pointer select-none transition-all ${className}`}
        >
            {Array.isArray(iconPaths) ? (
                iconPaths.map((path) => (
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
                    d={iconPaths}
                />
            )}
        </svg>
    );
};

export default Icon;
