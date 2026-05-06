'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface BlogPost {
	_id: string;
	id: string;
	title: string;
	excerpt: string;
	content: string;
	image: string;
	author: string;
	authorAvatar: string;
	date: string;
	category: string;
	readTime: string;
	tags: string[];
}

export function BlogList() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			const response = await fetch('/api/blog');
			const data = await response.json();
			if (data.success) {
				setPosts(data.data);
			}
		} catch (error) {
			console.error('[v0] Error fetching blog posts:', error);
			toast.error('Failed to load posts');
		} finally {
			setLoading(false);
		}
	};

	const filteredPosts = posts.filter((post) =>
		post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		post.category.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure?')) return;
		try {
			const response = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
			const data = await response.json();
			if (data.success) {
				toast.success('Post deleted');
				fetchPosts();
			}
		} catch (error) {
			toast.error('Failed to delete post');
		}
	};

	if (loading) {
		return <div className='container mx-auto px-4 py-12 text-center'>Loading...</div>;
	}

	return (
		<main className='min-h-screen bg-background py-12'>
			<div className='container mx-auto px-4'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-foreground mb-2'>Blog</h1>
					<p className='text-muted-foreground'>Manage blog posts</p>
				</div>

				<div className='mb-6'>
					<Input placeholder='Search posts...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='max-w-md' />
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{filteredPosts.map((post) => (
						<Card key={post._id} className='overflow-hidden hover:shadow-elevated transition-shadow'>
							<div className='h-40 bg-muted'>
								{post.image && <img src={post.image} alt={post.title} className='w-full h-full object-cover' />}
							</div>
							<CardHeader>
								<CardTitle className='line-clamp-2'>{post.title}</CardTitle>
								<CardDescription>
									{post.author} • {post.category}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground mb-4 line-clamp-2'>{post.excerpt}</p>
								<div className='flex gap-2'>
									<Button size='sm' variant='outline' className='flex-1'>
										<Edit2 className='w-4 h-4' />
									</Button>
									<Button size='sm' variant='destructive' className='flex-1' onClick={() => handleDelete(post._id)}>
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
