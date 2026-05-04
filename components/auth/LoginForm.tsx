'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const LoginForm = ({ searchParams }: any) => {
	const router = useRouter();

	const callbackUrl = searchParams.callbackUrl;

	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!data.success) {
				toast.error(data.message || 'Login failed');
				setLoading(false);
				return;
			}

			// Store token in localStorage for client-side auth context
			// Note: httpOnly cookie is also set by the API for middleware auth
			localStorage.setItem('auth_token', data.data.token);
			localStorage.setItem('auth_user', JSON.stringify(data.data.user));

			toast.success('Login successful!');

			// Get redirect URL from search params (set by middleware for protected routes)
			const redirectUrl = searchParams.redirect;

			// Redirect based on user role and callback URL
			setTimeout(() => {
				if (redirectUrl && data.data.user.role === 'admin') {
					// Redirect to the originally requested admin page
					// router.push(redirectUrl);
				} else if (data.data.user.role === 'admin') {
					router.push('/admin');
				} else if (callbackUrl) {
					// router.push(callbackUrl);
				} else {
					// Default redirect to packages page for regular users
					router.push('/packages');
				}
			}, 1000);
		} catch (error) {
			console.error('Login error:', error);
			toast.error('An error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='space-y-2'>
				<label className='block text-sm font-medium text-foreground'>
					Email Address
				</label>
				<Input
					type='email'
					name='email'
					placeholder='Enter your email'
					value={formData.email}
					onChange={handleChange}
					required
					disabled={loading}
					className='w-full'
				/>
			</div>

			<div className='space-y-2'>
				<label className='block text-sm font-medium text-foreground'>
					Password
				</label>
				<Input
					type='password'
					name='password'
					placeholder='Enter your password'
					value={formData.password}
					onChange={handleChange}
					required
					disabled={loading}
					className='w-full'
				/>
			</div>

			<Button
				type='submit'
				variant='coral'
				size='lg'
				className='w-full'
				disabled={loading}
			>
				{loading ? (
					<>
						<Loader className='w-4 h-4 mr-2 animate-spin' />
						Signing in...
					</>
				) : (
					'Sign In'
				)}
			</Button>

			<p className='text-center text-sm text-muted-foreground'>
				Don&apos;t have an account?{' '}
				<a href='/signup' className='text-primary font-medium hover:underline'>
					Sign up here
				</a>
			</p>
		</form>
	);
};
