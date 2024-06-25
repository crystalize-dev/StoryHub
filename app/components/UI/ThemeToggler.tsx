'use client';
import { useContext } from 'react';
import Icon from '../Icon/Icon';
import { ThemeContext } from '@/app/context/ThemeContext';

interface ThemeTogglerProps extends React.HTMLAttributes<SVGSVGElement> {
    disabled?: boolean;
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({
    className = '',
    disabled,
    ...props
}) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <Icon
                {...props}
                icon={theme === 'dark' ? 'moon' : 'sun'}
                onClick={disabled ? undefined : toggleTheme}
                className="h-5 w-5 text-black transition-all group-hover:scale-125 dark:text-white"
            />
        </div>
    );
};

export default ThemeToggler;
