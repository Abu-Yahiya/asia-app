import { BlogSection } from '@/components/blog/BlogSection';
import { PageBanner } from '@/components/common/PageBanner';

const Blog = () => {
	return (
		<div className='min-h-screen'>
			<div className='pt-20'>
				<PageBanner
					title='Travel Blog'
					subtitle='Stories, tips, and inspiration for your next adventure'
					gradient='forest'
				/>
				<BlogSection />
			</div>
		</div>
	);
};

export default Blog;
