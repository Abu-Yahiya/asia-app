'use client';

import Dashboard from '@/components/admin/Dashboard';

export default function AdminPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your travel business analytics and activities
        </p>
      </div>
      <Dashboard />
    </div>
  );
}
