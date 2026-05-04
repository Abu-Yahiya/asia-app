'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

export const SignupForm = ({ searchParams }: any) => {
	const { signup } = useAuth();

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
		if (!formData.name || !formData.email || !formData.password || !formData.phone) {
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
			await signup(
				formData.name,
				formData.email,
				formData.phone,
				formData.password,
				formData.confirmPassword
			);
			toast.success('Account created successfully!');
		} catch (error) {
			console.error('Signup error:', error);
			toast.error(error instanceof Error ? error.message : 'Signup failed');
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
