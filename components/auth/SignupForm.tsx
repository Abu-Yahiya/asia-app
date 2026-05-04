'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';

export const SignupForm = ({ searchParams }: any) => {
	const router = useRouter();

	const callbackUrl = searchParams.callbackUrl;
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		phone: '',
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

		// Validation
		if (!formData.name || !formData.email || !formData.password) {
			toast.error('Please fill in all required fields');
			setLoading(false);
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match');
			setLoading(false);
			return;
		}

		if (formData.password.length < 6) {
			toast.error('Password must be at least 6 characters');
			setLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					password: formData.password,
					phone: formData.phone,
				}),
			});

			const data = await response.json();

			if (!data.success) {
				toast.error(data.message || 'Registration failed');
				setLoading(false);
				return;
			}

			// Store token in localStorage
			localStorage.setItem('auth_token', data.data.token);
			localStorage.setItem('auth_user', JSON.stringify(data.data.user));

			toast.success('Account created successfully!');

			// Redirect to callback URL or packages page
			setTimeout(() => {
				if (callbackUrl) {
					router.push(callbackUrl);
				} else {
					router.push('/packages');
				}
			}, 1000);
		} catch (error) {
			console.error('Signup error:', error);
			toast.error('An error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='space-y-2'>
				<label className='block text-sm font-medium text-foreground'>
					Full Name *
				</label>
				<Input
					type='text'
					name='name'
					placeholder='Enter your full name'
					value={formData.name}
					onChange={handleChange}
					required
					disabled={loading}
					className='w-full'
				/>
			</div>

			<div className='space-y-2'>
				<label className='block text-sm font-medium text-foreground'>
					Email Address *
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
					Phone Number (Optional)
				</label>
				<Input
					type='tel'
					name='phone'
					placeholder='Enter your phone number'
					value={formData.phone}
					onChange={handleChange}
					disabled={loading}
					className='w-full'
				/>
			</div>

			<div className='space-y-2'>
				<label className='block text-sm font-medium text-foreground'>
					Password *
				</label>
				<Input
					type='password'
					name='password'
					placeholder='Create a password (min. 6 characters)'
					value={formData.password}
					onChange={handleChange}
					required
					disabled={loading}
					className='w-full'
				/>
			</div>

			<div className='space-y-2'>
				<label className='block text-sm font-medium text-foreground'>
					Confirm Password *
				</label>
				<Input
					type='password'
					name='confirmPassword'
					placeholder='Confirm your password'
					value={formData.confirmPassword}
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
						Creating Account...
					</>
				) : (
					'Create Account'
				)}
			</Button>

			<p className='text-center text-sm text-muted-foreground'>
				Already have an account?{' '}
				<a href='/login' className='text-primary font-medium hover:underline'>
					Sign in here
				</a>
			</p>
		</form>
	);
};
