'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader, Package, Calendar, FileText, Globe, Mail, Wrench, BarChart3, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DashboardStats {
	packages: number;
	services: number;
	blogs: number;
	appointments: number;
	visaCountries: number;
	contacts: number;
	totalUsers: number;
}

export default function AdminPage() {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const [stats, setStats] = useState<DashboardStats>({
		packages: 0,
		services: 0,
		blogs: 0,
		appointments: 0,
		visaCountries: 0,
		contacts: 0,
		totalUsers: 1,
	});

	useEffect(() => {
		if (!isLoading && (!user || user.role !== 'admin')) {
			router.push('/');
		}
	}, [user, isLoading, router]);

	useEffect(() => {
		fetchStats();
	}, []);

	const fetchStats = async () => {
		try {
			const [packages, services, blogs, appointments, visa, contacts] = await Promise.all([
				fetch('/api/packages').then((r) => r.json()),
				fetch('/api/services').then((r) => r.json()),
				fetch('/api/blog').then((r) => r.json()),
				fetch('/api/appointments').then((r) => r.json()),
				fetch('/api/visa').then((r) => r.json()),
				fetch('/api/contacts').then((r) => r.json()),
			]);

			setStats({
				packages: packages.data?.length || 0,
				services: services.data?.length || 0,
				blogs: blogs.data?.length || 0,
				appointments: appointments.data?.length || 0,
				visaCountries: visa.data?.length || 0,
				contacts: contacts.data?.length || 0,
				totalUsers: 1,
			});
		} catch (error) {
			console.error('[v0] Error fetching stats:', error);
		}
	};

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

	const statCards = [
		{
			title: 'Travel Packages',
			value: stats.packages,
			icon: Package,
			color: 'bg-blue-500/10 text-blue-600',
			href: '/packages',
		},
		{
			title: 'Services',
			value: stats.services,
			icon: Wrench,
			color: 'bg-purple-500/10 text-purple-600',
			href: '/services',
		},
		{
			title: 'Blog Posts',
			value: stats.blogs,
			icon: FileText,
			color: 'bg-green-500/10 text-green-600',
			href: '/blog',
		},
		{
			title: 'Appointments',
			value: stats.appointments,
			icon: Calendar,
			color: 'bg-orange-500/10 text-orange-600',
			href: '/appointment',
		},
		{
			title: 'Visa Countries',
			value: stats.visaCountries,
			icon: Globe,
			color: 'bg-red-500/10 text-red-600',
			href: '/visa',
		},
		{
			title: 'Messages',
			value: stats.contacts,
			icon: Mail,
			color: 'bg-pink-500/10 text-pink-600',
			href: '/contact',
		},
	];

	return (
		<main className='min-h-screen bg-background'>
			<div className='container mx-auto px-4 py-12'>
				<div className='mb-12'>
					<h1 className='text-4xl font-bold text-foreground mb-2'>Admin Dashboard</h1>
					<p className='text-muted-foreground'>
						Welcome back, {user.name}. Here's an overview of your website activity.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
					{statCards.map((stat) => {
						const Icon = stat.icon;
						return (
							<Link href={stat.href} key={stat.title}>
								<Card className='hover:shadow-elevated transition-all cursor-pointer h-full'>
									<CardHeader className='flex flex-row items-center justify-between pb-2'>
										<CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
										<div className={`${stat.color} p-2 rounded-lg`}>
											<Icon className='w-4 h-4' />
										</div>
									</CardHeader>
									<CardContent>
										<div className='text-3xl font-bold text-foreground'>{stat.value}</div>
										<p className='text-xs text-muted-foreground mt-1'>Total {stat.title.toLowerCase()}</p>
									</CardContent>
								</Card>
							</Link>
						);
					})}
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12'>
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<BarChart3 className='w-5 h-5' />
								Content Overview
							</CardTitle>
							<CardDescription>Distribution of content across categories</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								{statCards.slice(0, 3).map((stat) => (
									<div key={stat.title} className='flex items-center gap-3'>
										<div className='text-sm font-medium min-w-fit'>{stat.title}</div>
										<div className='flex-1 h-2 bg-muted rounded-full overflow-hidden'>
											<div
												className={`h-full ${stat.color.split(' ')[0]}`}
												style={{
													width: `${Math.min((stat.value / Math.max(...statCards.map((s) => s.value), 1)) * 100, 100)}%`,
												}}
											/>
										</div>
										<div className='text-sm font-semibold'>{stat.value}</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<TrendingUp className='w-5 h-5' />
								Quick Actions
							</CardTitle>
							<CardDescription>Manage your content quickly</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-2'>
								<Button variant='outline' className='w-full justify-start' asChild>
									<Link href='/packages'>View All Packages</Link>
								</Button>
								<Button variant='outline' className='w-full justify-start' asChild>
									<Link href='/blog'>View All Blog Posts</Link>
								</Button>
								<Button variant='outline' className='w-full justify-start' asChild>
									<Link href='/appointment'>View All Appointments</Link>
								</Button>
								<Button variant='outline' className='w-full justify-start' asChild>
									<Link href='/contact'>View All Messages</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className='flex items-center gap-2'>
							<Users className='w-5 h-5' />
							System Summary
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
							<div className='text-center'>
								<div className='text-2xl font-bold text-primary'>
									{statCards.reduce((sum, card) => sum + card.value, 0)}
								</div>
								<p className='text-sm text-muted-foreground mt-1'>Total Content Items</p>
							</div>
							<div className='text-center'>
								<div className='text-2xl font-bold text-primary'>{stats.appointments}</div>
								<p className='text-sm text-muted-foreground mt-1'>Pending Bookings</p>
							</div>
							<div className='text-center'>
								<div className='text-2xl font-bold text-primary'>{stats.contacts}</div>
								<p className='text-sm text-muted-foreground mt-1'>Unread Messages</p>
							</div>
							<div className='text-center'>
								<div className='text-2xl font-bold text-primary'>{stats.totalUsers}</div>
								<p className='text-sm text-muted-foreground mt-1'>Admin Users</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}

