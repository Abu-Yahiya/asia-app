import { Footer } from '@/components/common/Footer';
import { Navbar } from '@/components/common/Navbar';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'react-hot-toast';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'TravelHub - Explore the World',
	description:
		'Discover and book amazing travel packages to destinations around the world',
	generator: 'v0.app',
	icons: {
		icon: [
			{
				url: '/icon-light-32x32.png',
				media: '(prefers-color-scheme: light)',
			},
			{
				url: '/icon-dark-32x32.png',
				media: '(prefers-color-scheme: dark)',
			},
			{
				url: '/icon.svg',
				type: 'image/svg+xml',
			},
		],
		apple: '/apple-icon.png',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='bg-background'>
			<body className='font-sans antialiased'>
				<Navbar />
				{children}
				<Footer />
				<Toaster position='top-right' />
				{process.env.NODE_ENV === 'production' && <Analytics />}
			</body>
		</html>
	);
}
