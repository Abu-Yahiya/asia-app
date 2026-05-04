import { PageBanner } from '@/components/common/PageBanner';
import { VisaSection } from '@/components/home/VisaSection';

const Visa = () => {
	return (
		<div className='min-h-screen'>
			<div className='pt-20'>
				<PageBanner
					title='Visa Services'
					subtitle='Navigate complex visa requirements with expert guidance and hassle-free processing'
					gradient='ocean'
				/>
				<VisaSection />
			</div>
		</div>
	);
};

export default Visa;
