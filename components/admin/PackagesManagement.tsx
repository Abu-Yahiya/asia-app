'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Edit2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface Package {
  _id: string;
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
}

export default function PackagesManagement() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    location: '',
    price: 0,
    duration: '',
    description: '',
    image: '',
    groupSize: '',
    rating: 4.5,
    highlights: [] as string[],
    itinerary: [] as any[],
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/packages');
      const data = await response.json();
      if (data.success) {
        setPackages(data.data);
      }
    } catch (error) {
      console.error('[v0] Error fetching packages:', error);
      toast.error('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/packages/${editingId}` : '/api/packages';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(editingId ? 'Package updated!' : 'Package created!');
        setFormData({
          id: '',
          title: '',
          location: '',
          price: 0,
          duration: '',
          description: '',
          image: '',
          groupSize: '',
          rating: 4.5,
          highlights: [],
          itinerary: [],
        });
        setEditingId(null);
        fetchPackages();
      }
    } catch (error) {
      console.error('[v0] Error:', error);
      toast.error('Failed to save package');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      const response = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        toast.success('Package deleted!');
        fetchPackages();
      }
    } catch (error) {
      console.error('[v0] Error:', error);
      toast.error('Failed to delete package');
    }
  };

  if (loading) {
    return <div className='text-center py-8'>Loading packages...</div>;
  }

  return (
    <div className='space-y-8'>
      <Card className='border-0 shadow-soft'>
        <CardContent className='p-6'>
          <h3 className='text-xl font-bold text-foreground mb-4'>
            {editingId ? 'Edit Package' : 'Add New Package'}
          </h3>
          <form onSubmit={handleSubmit} className='grid md:grid-cols-2 gap-4'>
            <Input
              placeholder='Package ID'
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              required
            />
            <Input
              placeholder='Title'
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Input
              placeholder='Location'
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
            <Input
              placeholder='Price'
              type='number'
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required
            />
            <Input
              placeholder='Duration'
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <Input
              placeholder='Group Size'
              value={formData.groupSize}
              onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className='md:col-span-2'
            />
            <Input
              placeholder='Description'
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className='md:col-span-2'
            />
            <div className='md:col-span-2 flex gap-2'>
              <Button type='submit' variant='coral' className='flex-1'>
                {editingId ? 'Update Package' : 'Create Package'}
              </Button>
              {editingId && (
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      id: '',
                      title: '',
                      location: '',
                      price: 0,
                      duration: '',
                      description: '',
                      image: '',
                      groupSize: '',
                      rating: 4.5,
                      highlights: [],
                      itinerary: [],
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div>
        <h3 className='text-xl font-bold text-foreground mb-4'>All Packages</h3>
        <div className='grid gap-4'>
          {packages.map((pkg) => (
            <Card key={pkg._id} className='border-0 shadow-soft'>
              <CardContent className='p-4'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h4 className='font-bold text-foreground'>{pkg.title}</h4>
                    <p className='text-sm text-muted-foreground'>{pkg.location}</p>
                    <p className='text-sm font-medium text-primary'>${pkg.price}</p>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => {
                        setEditingId(pkg._id);
                        setFormData({
                          id: pkg.id,
                          title: pkg.title,
                          location: pkg.location,
                          price: pkg.price,
                          duration: pkg.duration,
                          description: '',
                          image: '',
                          groupSize: '',
                          rating: pkg.rating,
                          highlights: [],
                          itinerary: [],
                        });
                      }}
                    >
                      <Edit2 className='w-4 h-4' />
                    </Button>
                    <Button size='sm' variant='ghost' onClick={() => handleDelete(pkg._id)}>
                      <Trash2 className='w-4 h-4 text-destructive' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
