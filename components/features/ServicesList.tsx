'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Service {
	_id: string;
	slug: string;
	title: string;
	description: string;
	duration: string;
	longDescription: string;
	features: string[];
	process: Array<{ step: number; title: string; description: string }>;
}

export function ServicesList() {
	const [services, setServices] = useState<Service[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [editingService, setEditingService] = useState<Service | null>(null);

	useEffect(() => {
		fetchServices();
	}, []);

	const fetchServices = async () => {
		try {
			const response = await fetch('/api/services');
			const data = await response.json();
			if (data.success) {
				setServices(data.data);
			}
		} catch (error) {
			console.error('[v0] Error fetching services:', error);
			toast.error('Failed to load services');
		} finally {
			setLoading(false);
		}
	};

	const filteredServices = services.filter((svc) =>
		svc.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure?')) return;
		try {
			const response = await fetch(`/api/services/${id}`, { method: 'DELETE' });
			const data = await response.json();
			if (data.success) {
				toast.success('Service deleted');
				fetchServices();
			}
		} catch (error) {
			toast.error('Failed to delete service');
		}
	};

	if (loading) {
		return <div className='container mx-auto px-4 py-12 text-center'>Loading...</div>;
	}

	return (
		<main className='min-h-screen bg-background py-12'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
					<div>
						<h1 className='text-3xl font-bold text-foreground mb-2'>Services</h1>
						<p className='text-muted-foreground'>Manage travel services</p>
					</div>
				</div>

				<div className='mb-6'>
					<Input placeholder='Search services...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='max-w-md' />
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredServices.map((svc) => (
						<Card key={svc._id} className='hover:shadow-elevated transition-shadow'>
							<CardHeader>
								<CardTitle>{svc.title}</CardTitle>
								<CardDescription>{svc.duration}</CardDescription>
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground mb-4'>{svc.description}</p>
								<div className='flex gap-2'>
									<Button size='sm' variant='outline' className='flex-1'>
										<Edit2 className='w-4 h-4' />
									</Button>
									<Button size='sm' variant='destructive' className='flex-1' onClick={() => handleDelete(svc._id)}>
										<Trash2 className='w-4 h-4' />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</main>
	);
}
