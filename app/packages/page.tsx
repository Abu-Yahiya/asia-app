'use client';

import { PageBanner } from '@/components/common/PageBanner';
import { PackagesList } from '@/components/features/PackagesList';

const Packages = () => {
	return (
		<div className='min-h-screen'>
			<PageBanner
				title='Travel Packages'
				subtitle='Explore our curated collection of travel experiences designed to create unforgettable memories'
			/>
			<PackagesList />
		</div>
	);
};

export default Packages;
