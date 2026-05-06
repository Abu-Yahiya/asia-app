import { connectDB } from './connection';
import { Package } from '../models/Package';
import { Service } from '../models/Service';
import { BlogPost } from '../models/BlogPost';
import { VisaCountry } from '../models/VisaCountry';
import { Appointment } from '../models/Appointment';
import { Contact } from '../models/Contact';
import { packages } from '@/data/packages';
import { services } from '@/data/services';
import { blogPosts } from '@/data/blog';
import { countries } from '@/data/countries';

export async function seedDatabase() {
	try {
		await connectDB();

		// Clear existing data
		await Package.deleteMany({});
		await Service.deleteMany({});
		await BlogPost.deleteMany({});
		await VisaCountry.deleteMany({});
		console.log('[v0] Cleared existing data');

		// Seed Packages
		const packageData = packages.map((pkg) => ({
			id: pkg.id,
			title: pkg.title,
			location: pkg.location,
			image: pkg.image,
			price: pkg.price,
			duration: pkg.duration,
			groupSize: pkg.groupSize,
			rating: pkg.rating,
			reviews: pkg.reviews,
			description: pkg.description,
			highlights: pkg.highlights,
			included: pkg.included,
			notIncluded: pkg.notIncluded,
			itinerary: pkg.itinerary,
		}));
		await Package.insertMany(packageData);
		console.log(`[v0] Seeded ${packageData.length} packages`);

		// Seed Services
		const serviceData = services.map((svc) => ({
			slug: svc.slug,
			title: svc.title,
			description: svc.description,
			duration: svc.duration,
			longDescription: svc.longDescription,
			features: svc.features,
			process: svc.process,
		}));
		await Service.insertMany(serviceData);
		console.log(`[v0] Seeded ${serviceData.length} services`);

		// Seed Blog Posts
		const blogData = blogPosts.map((blog) => ({
			id: blog.id,
			title: blog.title,
			excerpt: blog.excerpt,
			content: blog.content,
			image: blog.image,
			author: blog.author,
			authorAvatar: blog.authorAvatar,
			date: blog.date,
			category: blog.category,
			readTime: blog.readTime,
			tags: blog.tags,
		}));
		await BlogPost.insertMany(blogData);
		console.log(`[v0] Seeded ${blogData.length} blog posts`);

		// Seed Visa Countries
		const visaData = countries.map((country) => ({
			slug: country.slug,
			name: country.name,
			flag: country.flag,
			processing: country.processing,
			type: country.type,
			description: country.description,
			requirements: country.requirements,
			documents: country.documents,
			fees: country.fees,
			tips: country.tips,
		}));
		await VisaCountry.insertMany(visaData);
		console.log(`[v0] Seeded ${visaData.length} visa countries`);

		return {
			success: true,
			message: 'Database seeded successfully',
			data: {
				packages: packageData.length,
				services: serviceData.length,
				blogs: blogData.length,
				visaCountries: visaData.length,
			},
		};
	} catch (error) {
		console.error('[v0] Seed error:', error);
		throw error;
	}
}
