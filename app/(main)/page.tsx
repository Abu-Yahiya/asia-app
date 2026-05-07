import { AppointmentSection } from '@/components/home/AppointmentSection';
import { BlogSection } from '@/components/home/BlogSection';
import { CTASection } from '@/components/home/CTASection';
import { HeroSection } from '@/components/home/HeroSection';
import { PackagesSection } from '@/components/home/PackagesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { VisaSection } from '@/components/home/VisaSection';

const Index = () => {
	return (
		<div className='min-h-screen'>
			<HeroSection />
			<PackagesSection />
			<VisaSection />
			<AppointmentSection />
			<TestimonialsSection />
			<BlogSection />
			<CTASection />
		</div>
	);
};

export default Index;
