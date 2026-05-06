'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader, Package, Calendar, FileText, Globe, Mail, Wrench } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PackagesManagement from '@/components/admin/PackagesManagement';
import ServicesManagement from '@/components/admin/ServicesManagement';
import BlogManagement from '@/components/admin/BlogManagement';
import AppointmentsManagement from '@/components/admin/AppointmentsManagement';
import VisaManagement from '@/components/admin/VisaManagement';
import ContactsManagement from '@/components/admin/ContactsManagement';

export default function AdminPage() {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('packages');

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
				<div className='mb-12'>
					<h1 className='text-4xl font-bold text-foreground mb-2'>Admin Dashboard</h1>
					<p className='text-muted-foreground'>Manage all website content and data — Welcome, {user.name}</p>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
					<TabsList className='grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8'>
						<TabsTrigger value='packages' className='flex items-center gap-2'>
							<Package className='w-4 h-4' />
							<span className='hidden sm:inline'>Packages</span>
						</TabsTrigger>
						<TabsTrigger value='services' className='flex items-center gap-2'>
							<Wrench className='w-4 h-4' />
							<span className='hidden sm:inline'>Services</span>
						</TabsTrigger>
						<TabsTrigger value='blog' className='flex items-center gap-2'>
							<FileText className='w-4 h-4' />
							<span className='hidden sm:inline'>Blog</span>
						</TabsTrigger>
						<TabsTrigger value='appointments' className='flex items-center gap-2'>
							<Calendar className='w-4 h-4' />
							<span className='hidden sm:inline'>Bookings</span>
						</TabsTrigger>
						<TabsTrigger value='visa' className='flex items-center gap-2'>
							<Globe className='w-4 h-4' />
							<span className='hidden sm:inline'>Visa</span>
						</TabsTrigger>
						<TabsTrigger value='contacts' className='flex items-center gap-2'>
							<Mail className='w-4 h-4' />
							<span className='hidden sm:inline'>Messages</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent value='packages'>
						<PackagesManagement />
					</TabsContent>

					<TabsContent value='services'>
						<ServicesManagement />
					</TabsContent>

					<TabsContent value='blog'>
						<BlogManagement />
					</TabsContent>

					<TabsContent value='appointments'>
						<AppointmentsManagement />
					</TabsContent>

					<TabsContent value='visa'>
						<VisaManagement />
					</TabsContent>

					<TabsContent value='contacts'>
						<ContactsManagement />
					</TabsContent>
				</Tabs>
			</div>
		</main>
	);
};

