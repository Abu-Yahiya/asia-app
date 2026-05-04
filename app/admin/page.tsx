'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

export default function AdminPage() {
	const { user, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && (!user || user.role !== 'admin')) {
			router.push('/');
		}
	}, [user, isLoading, router]);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<Loader className='w-8 h-8 animate-spin' />
			</div>
		);
	}

	if (!user || user.role !== 'admin') {
		return null;
	}

	return (
		<main className='min-h-screen bg-background'>
			<div className='container mx-auto px-4 py-12'>
				<div className='mb-8'>
					<h1 className='text-4xl font-bold text-foreground mb-2'>Admin Dashboard</h1>
					<p className='text-muted-foreground'>Welcome, {user.name}</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
					<div className='bg-card rounded-lg p-6 border border-border'>
						<h2 className='text-xl font-semibold text-foreground mb-4'>Users</h2>
						<p className='text-muted-foreground'>Manage all users</p>
					</div>
					<div className='bg-card rounded-lg p-6 border border-border'>
						<h2 className='text-xl font-semibold text-foreground mb-4'>Settings</h2>
						<p className='text-muted-foreground'>Manage system settings</p>
					</div>
					<div className='bg-card rounded-lg p-6 border border-border'>
						<h2 className='text-xl font-semibold text-foreground mb-4'>Analytics</h2>
						<p className='text-muted-foreground'>View analytics data</p>
					</div>
				</div>

				<div className='bg-card rounded-lg p-6 border border-border'>
					<h2 className='text-2xl font-bold text-foreground mb-4'>Quick Stats</h2>
					<div className='grid grid-cols-3 gap-4'>
						<div className='text-center'>
							<p className='text-3xl font-bold text-primary'>0</p>
							<p className='text-muted-foreground text-sm'>Total Users</p>
						</div>
						<div className='text-center'>
							<p className='text-3xl font-bold text-primary'>0</p>
							<p className='text-muted-foreground text-sm'>Active Sessions</p>
						</div>
						<div className='text-center'>
							<p className='text-3xl font-bold text-primary'>0</p>
							<p className='text-muted-foreground text-sm'>Pending Tasks</p>
						</div>
					</div>
				</div>
			</div>
		</main>

	);
};

