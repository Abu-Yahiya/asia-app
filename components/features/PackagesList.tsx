'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Plus, Edit2, Trash2, Star, Users, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface Package {
	_id: string;
	id: string;
	title: string;
	location: string;
	image: any;
	price: number;
	duration: string;
	groupSize: string;
	rating: number;
	reviews: number;
	description: string;
	highlights: string[];
	included: string[];
	notIncluded: string[];
	itinerary: Array<{ day: number; title: string; description: string }>;
}

export function PackagesList() {
	const [packages, setPackages] = useState<Package[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [editingPackage, setEditingPackage] = useState<Package | null>(null);

	useEffect(() => {
		fetchPackages();
	}, []);

	const fetchPackages = async () => {
		try {
			const response = await fetch('/api/packages');
			const data = await response.json();
			if (data.success) {
				setPackages(data.data);
			}
		} catch (error) {
			console.error('[v0] Error fetching packages:', error);
			toast.error('Failed to load packages');
		} finally {
			setLoading(false);
		}
	};

	const filteredPackages = packages.filter(
		(pkg) =>
			pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this package?')) return;
		try {
			const response = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
			const data = await response.json();
			if (data.success) {
				toast.success('Package deleted');
				fetchPackages();
			}
		} catch (error) {
			toast.error('Failed to delete package');
		}
	};

	const handleOpenDrawer = (pkg?: Package) => {
		setEditingPackage(pkg || null);
		setIsDrawerOpen(true);
	};

	if (loading) {
		return <div className='container mx-auto px-4 py-12 text-center'>Loading packages...</div>;
	}

	return (
		<main className='min-h-screen bg-background py-12'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
					<div>
						<h1 className='text-3xl font-bold text-foreground mb-2'>Packages</h1>
						<p className='text-muted-foreground'>Manage travel packages</p>
					</div>
					<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
						<DrawerTrigger asChild>
							<Button onClick={() => handleOpenDrawer()} className='gap-2'>
								<Plus className='w-4 h-4' />
								Add Package
							</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>
									{editingPackage ? 'Edit Package' : 'Create Package'}
								</DrawerTitle>
								<DrawerDescription>
									Fill in the details below to {editingPackage ? 'update' : 'add a new'} package.
								</DrawerDescription>
							</DrawerHeader>
							<PackageForm
								package={editingPackage}
								onSuccess={() => {
									fetchPackages();
									setIsDrawerOpen(false);
								}}
							/>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button variant='outline'>Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>

				<div className='mb-6'>
					<Input
						placeholder='Search packages by name or location...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='max-w-md'
					/>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredPackages.map((pkg) => (
						<Card key={pkg._id} className='overflow-hidden hover:shadow-elevated transition-shadow'>
							<div className='h-48 bg-muted relative overflow-hidden'>
								{pkg.image && (
									<img
										src={typeof pkg.image === 'string' ? pkg.image : pkg.image}
										alt={pkg.title}
										className='w-full h-full object-cover'
									/>
								)}
							</div>
							<CardHeader>
								<CardTitle className='line-clamp-2'>{pkg.title}</CardTitle>
								<CardDescription>{pkg.location}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-3 mb-4'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-1'>
											<Star className='w-4 h-4 fill-primary text-primary' />
											<span className='font-semibold'>{pkg.rating}</span>
											<span className='text-muted-foreground'>({pkg.reviews})</span>
										</div>
										<span className='text-lg font-bold text-primary'>${pkg.price}</span>
									</div>
									<div className='flex gap-4 text-sm text-muted-foreground'>
										<div className='flex items-center gap-1'>
											<Clock className='w-4 h-4' />
											{pkg.duration}
										</div>
										<div className='flex items-center gap-1'>
											<Users className='w-4 h-4' />
											{pkg.groupSize}
										</div>
									</div>
								</div>
								<div className='flex gap-2'>
									<Button
										size='sm'
										variant='outline'
										className='flex-1'
										onClick={() => handleOpenDrawer(pkg)}
									>
										<Edit2 className='w-4 h-4' />
									</Button>
									<Button
										size='sm'
										variant='destructive'
										className='flex-1'
										onClick={() => handleDelete(pkg._id)}
									>
										<Trash2 className='w-4 h-4' />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{filteredPackages.length === 0 && (
					<div className='text-center py-12'>
						<p className='text-muted-foreground'>No packages found</p>
					</div>
				)}
			</div>
		</main>
	);
}

function PackageForm({
	package: pkg,
	onSuccess,
}: {
	package: Package | null;
	onSuccess: () => void;
}) {
	const [formData, setFormData] = useState({
		title: pkg?.title || '',
		location: pkg?.location || '',
		price: pkg?.price || 0,
		duration: pkg?.duration || '',
		groupSize: pkg?.groupSize || '',
		rating: pkg?.rating || 0,
		reviews: pkg?.reviews || 0,
		description: pkg?.description || '',
		highlights: pkg?.highlights.join('\n') || '',
		included: pkg?.included.join('\n') || '',
		notIncluded: pkg?.notIncluded.join('\n') || '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const payload = {
				...formData,
				price: Number(formData.price),
				rating: Number(formData.rating),
				reviews: Number(formData.reviews),
				highlights: formData.highlights.split('\n').filter(Boolean),
				included: formData.included.split('\n').filter(Boolean),
				notIncluded: formData.notIncluded.split('\n').filter(Boolean),
				id: pkg?.id || `pkg-${Date.now()}`,
			};

			const url = pkg ? `/api/packages/${pkg._id}` : '/api/packages';
			const method = pkg ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			const data = await response.json();
			if (data.success) {
				toast.success(pkg ? 'Package updated' : 'Package created');
				onSuccess();
			} else {
				toast.error(data.message || 'Failed to save package');
			}
		} catch (error) {
			toast.error('Failed to save package');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4 p-6 overflow-y-auto max-h-[70vh]'>
			<div>
				<label className='text-sm font-medium'>Title</label>
				<Input
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
					required
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label className='text-sm font-medium'>Location</label>
					<Input
						value={formData.location}
						onChange={(e) => setFormData({ ...formData, location: e.target.value })}
						required
					/>
				</div>
				<div>
					<label className='text-sm font-medium'>Price</label>
					<Input
						type='number'
						value={formData.price}
						onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
						required
					/>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label className='text-sm font-medium'>Duration</label>
					<Input
						value={formData.duration}
						onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
					/>
				</div>
				<div>
					<label className='text-sm font-medium'>Group Size</label>
					<Input
						value={formData.groupSize}
						onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
					/>
				</div>
			</div>
			<div>
				<label className='text-sm font-medium'>Description</label>
				<textarea
					value={formData.description}
					onChange={(e) => setFormData({ ...formData, description: e.target.value })}
					className='w-full border border-input rounded-md p-2'
					rows={3}
				/>
			</div>
			<div>
				<label className='text-sm font-medium'>Highlights (one per line)</label>
				<textarea
					value={formData.highlights}
					onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
					className='w-full border border-input rounded-md p-2'
					rows={2}
				/>
			</div>
			<Button type='submit' className='w-full'>
				{pkg ? 'Update Package' : 'Create Package'}
			</Button>
		</form>
	);
}
