'use client';

import { Button } from '@/components/ui/button';

import { Menu, Plane, User, X, LogOut } from 'lucide-react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const navLinks = [
	{ name: 'Home', href: '/' },
	{ name: 'Packages', href: '/packages' },
	{ name: 'Visa Services', href: '/visa' },
	{ name: 'Book Appointment', href: '/appointment' },
	{ name: 'Blog', href: '/blog' },
	{ name: 'Contact', href: '/contact' },
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState<any>(null);
	const pathname = usePathname();

	useEffect(() => {
		const userData = localStorage.getItem('auth_user');
		if (userData) {
			setUser(JSON.parse(userData));
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('auth_token');
		localStorage.removeItem('auth_user');
		setUser(null);
		toast.success('Logged out successfully');
		window.location.href = '/';
	};

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border'>
			<div className='container mx-auto px-4'>
				<div className='flex items-center justify-between h-20'>
					<Link href='/' className='flex items-center gap-2'>
						<div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center'>
							<Plane className='w-5 h-5 text-primary-foreground' />
						</div>
						<span className='font-display text-2xl font-semibold text-foreground'>
							Asia Tours
						</span>
					</Link>

					<div className='hidden lg:flex items-center gap-8'>
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`font-body text-sm font-medium transition-colors hover:text-primary ${
									pathname === link.href
										? 'text-primary'
										: 'text-muted-foreground'
								}`}
							>
								{link.name}
							</Link>
						))}
					</div>

					<div className='hidden lg:flex items-center gap-3'>
						{user ? (
							<>
								<div className='flex items-center gap-2 px-3 py-2 bg-muted rounded-lg'>
									<User className='w-4 h-4 text-muted-foreground' />
									<span className='text-sm text-muted-foreground'>
										{user.name}
									</span>
								</div>
								<Button variant='ghost' size='sm' onClick={handleLogout}>
									<LogOut className='w-4 h-4' />
									Logout
								</Button>
							</>
						) : (
							<>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => redirect('/login')}
								>
									<User className='w-4 h-4' />
									Login
								</Button>
								<Button
									variant='coral'
									size='lg'
									onClick={() => redirect('/signup')}
								>
									Sign Up
								</Button>
							</>
						)}
						<Button
							variant='coral'
							size='lg'
							onClick={() => redirect('/appointment')}
						>
							Book Now
						</Button>
					</div>

					<button
						className='lg:hidden p-2'
						onClick={() => setIsOpen(!isOpen)}
						aria-label='Toggle menu'
					>
						{isOpen ? (
							<X className='w-6 h-6 text-foreground' />
						) : (
							<Menu className='w-6 h-6 text-foreground' />
						)}
					</button>
				</div>
			</div>

			{isOpen && (
				<div className='lg:hidden bg-card border-t border-border'>
					<div className='container mx-auto px-4 py-6 space-y-4'>
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setIsOpen(false)}
								className={`block font-body text-base font-medium transition-colors hover:text-primary ${
									location.pathname === link.href
										? 'text-primary'
										: 'text-muted-foreground'
								}`}
							>
								{link.name}
							</Link>
						))}
						<div className='flex flex-col gap-3 pt-4'>
							{user ? (
								<>
									<Button
										variant='ghost'
										className='w-full'
										onClick={handleLogout}
									>
										<LogOut className='w-4 h-4' />
										Logout
									</Button>
								</>
							) : (
								<>
									<Button
										variant='ghost'
										className='w-full'
										onClick={() => {
											redirect('/login');
											setIsOpen(false);
										}}
									>
										<User className='w-4 h-4' />
										Login
									</Button>
									<Button
										variant='coral'
										className='w-full'
										onClick={() => {
											redirect('/signup');
											setIsOpen(false);
										}}
									>
										Sign Up
									</Button>
								</>
							)}
							<Button
								variant='coral'
								className='w-full'
								onClick={() => {
									redirect('/appointment');
									setIsOpen(false);
								}}
							>
								Book Now
							</Button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
