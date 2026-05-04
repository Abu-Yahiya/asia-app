import { PageBanner } from '@/components/common/PageBanner';
import { PackagesSection } from '@/components/home/PackagesSection';

const Packages = () => {
	return (
		<div className='min-h-screen'>
			<div className='pt-20'>
				<PageBanner
					title='Travel Packages'
					subtitle='Explore our curated collection of travel experiences designed to create unforgettable memories'
				/>
				<PackagesSection />
			</div>
		</div>
	);
};

export default Packages;
