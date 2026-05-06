export interface Visa {
	title: string;
	visaType: string; // 'Visit' | 'Medical' | 'Work' | 'Student' | 'Business'
	processingTime: number; // days
	description: string;
	requirements: string[];
	neededDocuments: string[];
	visaFees: {
		tourist: number;
		medical: number;
		work: number;
		student: number;
		business: number;
	};
	tips: string[];
}
