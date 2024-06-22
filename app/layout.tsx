import type { Metadata } from 'next';
import './globals.css';
import { LayoutProvider } from './layoutProvider';

export const metadata: Metadata = {
    title: 'StoryHub',
    description: ''
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="scrollable">
                <LayoutProvider>{children}</LayoutProvider>
            </body>
        </html>
    );
}