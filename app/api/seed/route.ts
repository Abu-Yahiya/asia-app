import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/db/seed';

export async function POST(request: Request) {
	try {
		const result = await seedDatabase();
		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.error('[v0] Seed endpoint error:', error);
		return NextResponse.json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Failed to seed database',
			},
			{ status: 500 }
		);
	}
}
