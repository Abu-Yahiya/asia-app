'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Service {
  _id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    longDescription: '',
    duration: '',
    features: [] as string[],
    process: [] as any[],
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
      const data = await response.json();
      if (data.success) setServices(data.data);
    } catch (error) {
      console.error('[v0] Error:', error);
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/services/${editingId}` : '/api/services';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(editingId ? 'Service updated!' : 'Service created!');
        resetForm();
        fetchServices();
      }
    } catch (error) {
      console.error('[v0] Error:', error);
      toast.error('Failed to save service');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try {
      const response = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        toast.success('Service deleted!');
        fetchServices();
      }
    } catch (error) {
      console.error('[v0] Error:', error);
      toast.error('Failed to delete service');
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      description: '',
      longDescription: '',
      duration: '',
      features: [],
      process: [],
    });
    setEditingId(null);
  };

  if (loading) return <div className='text-center py-8'>Loading services...</div>;

  return (
    <div className='space-y-8'>
      <Card className='border-0 shadow-soft'>
        <CardContent className='p-6'>
          <h3 className='text-xl font-bold text-foreground mb-4'>
            {editingId ? 'Edit Service' : 'Add New Service'}
          </h3>
          <form onSubmit={handleSubmit} className='grid md:grid-cols-2 gap-4'>
            <Input
              placeholder='Service Slug'
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
            <Input
              placeholder='Title'
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Input
              placeholder='Duration'
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <Input
              placeholder='Description'
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className='md:col-span-2'
            />
            <div className='md:col-span-2 flex gap-2'>
              <Button type='submit' variant='coral' className='flex-1'>
                {editingId ? 'Update Service' : 'Create Service'}
              </Button>
              {editingId && (
                <Button type='button' variant='outline' onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div>
        <h3 className='text-xl font-bold text-foreground mb-4'>All Services</h3>
        <div className='grid gap-4'>
          {services.map((service) => (
            <Card key={service._id} className='border-0 shadow-soft'>
              <CardContent className='p-4'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h4 className='font-bold text-foreground'>{service.title}</h4>
                    <p className='text-sm text-muted-foreground'>{service.description}</p>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => {
                        setEditingId(service._id);
                        setFormData({
                          slug: service.slug,
                          title: service.title,
                          description: service.description,
                          longDescription: '',
                          duration: service.duration,
                          features: [],
                          process: [],
                        });
                      }}
                    >
                      <Edit2 className='w-4 h-4' />
                    </Button>
                    <Button size='sm' variant='ghost' onClick={() => handleDelete(service._id)}>
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
