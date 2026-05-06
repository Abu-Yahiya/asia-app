export interface VisaCountry {
	slug: string;
	name: string;
	flag: string;
	processing: string;
	type: string;
	description: string;
	requirements: string[];
	documents: string[];
	fees: { type: string; amount: string }[];
	tips: string[];
}
export interface BlogPost {
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

export interface TravelPackage {
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
	itinerary: { day: number; title: string; description: string }[];
}

export interface Service {
	slug: string;
	title: string;
	description: string;
	duration: string;
	longDescription: string;
	features: string[];
	process: { step: number; title: string; description: string }[];
}
// all types here
