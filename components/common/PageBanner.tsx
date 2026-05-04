interface PageBannerProps {
	title: string;
	subtitle: string;
	gradient?: 'hero' | 'ocean' | 'forest';
}

export function PageBanner({
	title,
	subtitle,
	gradient = 'hero',
}: PageBannerProps) {
	const gradientClass =
		gradient === 'ocean'
			? 'bg-gradient-ocean'
			: gradient === 'forest'
				? 'bg-forest'
				: 'bg-gradient-hero';

	return (
		<div className={`bg-primary py-20`}>
			<div className='container mx-auto px-4 text-center'>
				<h1 className='font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4'>
					{title}
				</h1>
				<p className='font-body text-lg text-primary-foreground/80 max-w-2xl mx-auto'>
					{subtitle}
				</p>
			</div>
		</div>
	);
}
