'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

export default function AdminPage() {
	const { user, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && (!user || user.role !== 'admin')) {
			router.push('/');
		}
	}, [user, isLoading, router]);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<Loader className='w-8 h-8 animate-spin' />
			</div>
		);
	}

	if (!user || user.role !== 'admin') {
		return null;
	}

	return (
		<main className='min-h-screen bg-background'>
			<div className='container mx-auto px-4 py-12'>
				<div className='mb-8'>
					<h1 className='text-4xl font-bold text-foreground mb-2'>Admin Dashboard</h1>
					<p className='text-muted-foreground'>Welcome, {user.name}</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
					<div className='bg-card rounded-lg p-6 border border-border'>
						<h2 className='text-xl font-semibold text-foreground mb-4'>Users</h2>
						<p className='text-muted-foreground'>Manage all users</p>
					</div>
					<div className='bg-card rounded-lg p-6 border border-border'>
						<h2 className='text-xl font-semibold text-foreground mb-4'>Settings</h2>
						<p className='text-muted-foreground'>Manage system settings</p>
					</div>
					<div className='bg-card rounded-lg p-6 border border-border'>
						<h2 className='text-xl font-semibold text-foreground mb-4'>Analytics</h2>
						<p className='text-muted-foreground'>View analytics data</p>
					</div>
				</div>

				<div className='bg-card rounded-lg p-6 border border-border'>
					<h2 className='text-2xl font-bold text-foreground mb-4'>Quick Stats</h2>
					<div className='grid grid-cols-3 gap-4'>
						<div className='text-center'>
							<p className='text-3xl font-bold text-primary'>0</p>
							<p className='text-muted-foreground text-sm'>Total Users</p>
						</div>
						<div className='text-center'>
							<p className='text-3xl font-bold text-primary'>0</p>
							<p className='text-muted-foreground text-sm'>Active Sessions</p>
						</div>
						<div className='text-center'>
							<p className='text-3xl font-bold text-primary'>0</p>
							<p className='text-muted-foreground text-sm'>Pending Tasks</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
			dolor architecto corrupti debitis facere repellat. Sequi, obcaecati. Unde,
			debitis ut laboriosam ea laborum tenetur. Quas explicabo repellendus
			beatae, voluptates odio sed illum suscipit nostrum accusamus ut eligendi
			tenetur perferendis amet blanditiis a? Tempore maxime quidem, vel sequi
			distinctio vero itaque autem corporis, consequuntur quaerat repudiandae
			voluptatibus aut fugit quis optio porro delectus. Illum, iusto tempore?
			Neque cumque quia tempore, ea excepturi obcaecati numquam nulla et
			consequatur voluptates sunt. Ratione, quaerat numquam placeat dolore
			magnam tempore tempora incidunt porro labore dolorem molestias nesciunt
			illo quisquam cupiditate molestiae officiis, velit rem itaque nisi
			consequuntur! Laboriosam possimus, sunt aliquam officia molestias magni
			voluptatum quod minus, culpa ipsam, praesentium illum ullam doloremque
			blanditiis. Minima est, nam pariatur facilis sapiente nemo nostrum hic
			porro dolore a, in ullam iusto? At illum commodi laborum natus enim
			voluptate sapiente consequuntur dignissimos? Dolor animi cum mollitia
			omnis corrupti, accusamus nihil rerum eius error harum tempora officia
			quisquam, repudiandae illum repellat aliquid, ullam perspiciatis
			blanditiis dolore praesentium doloremque officiis reiciendis. Veritatis
			mollitia cupiditate culpa accusantium consequatur illum quo expedita, fuga
			at possimus itaque porro sequi laboriosam. Quisquam nostrum accusantium
			minima enim iure! Dolorem veritatis qui esse similique voluptatibus,
			ducimus eos natus in fugit possimus facilis, adipisci nostrum ipsa? Odio
			quos fugiat quas tenetur atque laboriosam voluptatibus nemo, perferendis,
			ducimus minus sit similique incidunt numquam ut a ex repudiandae tempora.
			Quos maxime ipsum voluptas saepe fugit qui, dignissimos provident a hic
			porro doloremque mollitia rem perspiciatis consectetur dolorum suscipit
			minima inventore debitis, deleniti dolores voluptate. Pariatur voluptates
			ullam fuga consequatur corporis dolores aliquid, alias quo aut quis
			quisquam, quae officia error totam maiores, accusamus ea blanditiis
			voluptatum? Blanditiis quidem facilis tenetur molestias nihil aliquam
			minima ratione quaerat beatae libero, vitae eius perferendis quia
			consequatur voluptas incidunt expedita architecto dolore consequuntur qui
			voluptates quo officiis alias? Ea minima provident aspernatur nihil
			laborum consectetur cupiditate impedit optio vel unde, facilis tenetur
			maiores! Sint quo vitae obcaecati non quod alias provident aliquid
			praesentium voluptatem, eius soluta nobis assumenda? Voluptates dolores ab
			aut doloribus soluta in molestiae voluptatem perspiciatis amet? Omnis,
			quod nesciunt delectus exercitationem assumenda consectetur possimus eos
			quaerat veritatis deleniti autem voluptate quos corporis quasi! Saepe
			dolorum et unde quidem iure debitis? Nulla labore voluptates voluptate
			quae ratione quasi, magni iusto aut blanditiis qui, facere id
			reprehenderit reiciendis accusantium cumque, eos iure. Obcaecati quas,
			nulla repellendus tempore asperiores provident repudiandae dignissimos, a,
			quaerat praesentium iste expedita voluptatem. A doloremque sed optio animi
			libero aut laborum veniam minus. At nemo blanditiis corrupti fugit omnis
			hic saepe asperiores nihil pariatur consequatur excepturi harum labore
			iusto temporibus reiciendis, aliquam maxime sunt suscipit veritatis
			maiores dolor, tenetur rem praesentium provident! Nihil tempora, natus
			esse deleniti fugiat officiis in cum, sunt illum doloribus ratione
			accusantium pariatur commodi officia ipsa fugit perferendis eveniet
			dolores laboriosam excepturi necessitatibus voluptates? Fugiat esse
			inventore a ab ipsam, unde explicabo numquam odit eius optio maiores qui
			quasi natus quis! Obcaecati voluptatibus, ad quisquam illo voluptatum eius
			magnam ea commodi assumenda facere laudantium dolores delectus aspernatur
			cumque voluptatem? Et minima aut ducimus laudantium at maiores officiis,
			possimus vitae mollitia! Tempora, suscipit perspiciatis eaque earum alias
			magnam excepturi qui sit libero sapiente placeat ex autem iusto in
			nostrum, explicabo deserunt praesentium itaque voluptates quisquam
			necessitatibus accusamus porro quae vitae. Ducimus reprehenderit dolore,
			officiis dolor animi quibusdam similique eum aliquam iure repellat
			exercitationem molestiae quo minus expedita cupiditate, ut magnam
			voluptates? Quidem quod laudantium corrupti obcaecati amet? Alias, est
			voluptatum odit enim veritatis voluptatibus asperiores cumque quaerat
			doloribus deleniti neque pariatur! Aliquam harum quisquam, eaque ea
			voluptate atque quidem? Nisi totam quia eaque vero dolorum animi sint
			rerum facere itaque impedit praesentium unde, quas quae vitae. Sapiente
			ducimus praesentium eligendi ea ad. Labore tempora doloribus,
			reprehenderit veniam ipsa dolor commodi expedita, dicta aut enim, eius
			nemo obcaecati omnis porro mollitia consequuntur corrupti? Quos enim ad
			veritatis saepe, at animi nisi eligendi impedit quaerat voluptate quam sit
			sapiente, necessitatibus aspernatur eveniet tempore optio. Natus possimus
			tempora id repudiandae quo deleniti provident porro aperiam. Nemo aliquam
			at asperiores corrupti corporis ipsum nisi eaque veniam enim facere animi,
			blanditiis quia aspernatur harum debitis natus, itaque ipsa earum dicta
			sed eveniet saepe sequi commodi. Cupiditate quia laborum aperiam
			accusantium iste veniam sequi dolore sapiente quae delectus suscipit
			adipisci, eveniet odit, fuga dolorum itaque aliquam ipsa. Ipsum expedita
			assumenda totam, minus deleniti repellendus cumque id doloribus aspernatur
			voluptas neque ab officiis tempore deserunt error similique quas facilis
			ullam odit eos ipsa. Nesciunt quis quo dolor fuga quaerat distinctio,
			sapiente obcaecati. Assumenda molestias ipsa est quae provident dicta
			impedit voluptatum aliquid ad perspiciatis quos enim eos commodi,
			veritatis earum, corrupti illo, iure laudantium voluptas dolorem soluta?
			Incidunt at, libero ducimus harum ratione vitae quis optio itaque
			temporibus quasi, officiis eaque ullam sapiente modi neque officia culpa
			ipsam nostrum eveniet unde vel! Dolor perspiciatis placeat dolores
			repudiandae nobis quisquam sunt magnam ipsam itaque officia sed mollitia
			sequi blanditiis ipsa voluptas, sit, eligendi dignissimos. Nemo iure
			dolore deserunt voluptatum quibusdam, odio sequi ea sunt, commodi ratione
			velit quia sint reprehenderit officia. Facilis doloremque incidunt
			obcaecati. Labore delectus possimus illo vero nemo quam impedit. Pariatur
			tempore temporibus aut vero blanditiis alias nisi labore! Iste iure iusto
			consequuntur, quod nobis laborum in laudantium quam! Voluptatem, optio
			esse assumenda, aperiam repudiandae autem doloribus quasi iste harum
			mollitia natus! Sit, quisquam nisi? Deleniti voluptas quo odit esse
			ducimus aliquid velit praesentium magni iusto iure iste dolores, sunt
			tenetur assumenda exercitationem eligendi qui doloribus? Eum ut beatae
			nisi dolorum temporibus rerum id omnis culpa, animi velit itaque,
			reprehenderit ratione! Id dolores vel beatae, cupiditate magni nesciunt
			obcaecati qui rerum, dignissimos non excepturi? Vel pariatur molestiae
			veniam atque soluta id, minus quidem quae error earum tenetur, harum
			similique cum. Vitae incidunt, ipsa quasi natus nulla quaerat? Nam
			possimus, nostrum corrupti debitis ducimus ipsam quam veritatis delectus
			quod atque laborum voluptatum molestias at exercitationem obcaecati?
			Voluptate, mollitia suscipit. Aliquid voluptate dignissimos harum iste,
			facilis dicta asperiores dolores ipsa reprehenderit voluptatum rem quaerat
			amet odio blanditiis dolore quidem hic. Aliquam illum eveniet velit
			accusantium tenetur quos assumenda animi corrupti at iusto neque ea
			consequuntur debitis, explicabo mollitia enim odit asperiores a reiciendis
			necessitatibus nulla. Ducimus eveniet enim illo praesentium. Id unde
			provident sequi odit tempora incidunt cumque error obcaecati, adipisci
			deserunt, reiciendis, enim vero ratione? Facere, nihil id assumenda
			dolorem magni voluptas, illum rem molestiae enim ipsa aliquid saepe, fugit
			distinctio quaerat in ut deserunt eos nulla nisi? Incidunt quia delectus
			dolorem soluta maiores sunt ad rem explicabo aut quaerat. Sint obcaecati
			odio architecto rerum impedit qui fugit commodi dolores, id doloremque,
			deleniti laudantium ad possimus tenetur quos similique nobis repellendus
			nemo quaerat magni quam illo eum minima! Magnam quisquam ut, blanditiis
			quae qui debitis maiores ducimus minus earum quasi iusto fuga facilis sint
			iure sunt, veniam, sapiente est optio. Ex temporibus tempore beatae?
			Corporis impedit illum quibusdam facilis adipisci totam pariatur, minus
			aut neque voluptatem incidunt cum alias numquam magni? Provident, nisi ad.
			Impedit nihil nemo beatae iure odit vitae, eveniet nam necessitatibus qui
			ipsum ratione, sint deserunt officiis magni? Reprehenderit nesciunt libero
			repellendus harum temporibus, deleniti, ullam quod sunt accusamus nemo
			culpa minima veritatis iure unde architecto perferendis numquam labore?
			Autem expedita temporibus ipsam sed! Aperiam maxime quasi et, labore quod
			temporibus nostrum error debitis unde. Eveniet quas quo earum molestias!
			Repellendus error dicta tempora omnis nobis, modi consequuntur rem aliquid
			cupiditate animi aliquam, labore iste harum sunt est sapiente voluptatem
			maxime ea cumque numquam fuga dolorem. Illum distinctio eius mollitia vel
			vitae animi minus fugiat, cumque hic quam beatae eaque commodi aliquam ex,
			nemo, maxime ducimus assumenda earum saepe dolore quis veniam officia
			nobis quia? Dolor eaque ullam repellat fugit, repellendus ea temporibus
			cum assumenda deserunt illo, sequi quas nostrum eum tenetur debitis nam.
			Illo fuga suscipit sunt ut omnis nisi nihil, porro commodi fugiat ipsam
			ducimus libero ullam, asperiores officiis vero consectetur maxime ad
			doloremque excepturi quisquam quam sit! Libero maxime quidem eius error,
			illo, maiores, blanditiis quibusdam deleniti velit molestias voluptas
			pariatur fuga dignissimos asperiores voluptate? Nemo tempore, nulla
			quisquam aliquam at impedit, odit odio enim laborum nostrum maiores
			voluptate explicabo iure eius assumenda facilis corporis illum sapiente?
			Nihil perspiciatis aperiam explicabo ea repudiandae quidem tempore
			corporis, maiores, molestiae a sit labore nostrum reiciendis sed.
			Accusantium quasi ipsa sapiente debitis. Enim nihil aliquam tempore
			voluptates odit obcaecati veniam cumque repellat harum, eveniet
			necessitatibus dignissimos deleniti. Dolorum assumenda cum animi quo
			doloremque reprehenderit at iusto dolorem possimus voluptatem accusantium
			repellendus laboriosam eius, dolore nihil voluptates architecto iste
			debitis, mollitia voluptate non quisquam? Rerum voluptas odit, dolorum
			possimus numquam deleniti repellendus facilis corrupti facere ipsa
			molestiae eum hic necessitatibus ratione quam at saepe voluptatem
			doloremque error veritatis ipsam maxime fuga nisi est! Dignissimos
			temporibus perspiciatis, ad non numquam quae quibusdam possimus assumenda
			ut iste delectus, consectetur culpa, sed quis placeat officia aperiam
			tempore et natus corrupti recusandae. Modi tempora quas aperiam animi
			nostrum reiciendis aspernatur quisquam mollitia excepturi libero
			recusandae maxime nesciunt exercitationem, dolorem culpa quaerat illum
			fugiat id! Accusantium quis atque recusandae earum magni laudantium at
			iusto, dolore aspernatur et voluptates, itaque animi tenetur nobis
			veritatis exercitationem assumenda aut! Est voluptatum veniam, fuga nulla
			vero necessitatibus facilis consectetur odit, dolores itaque dignissimos
			nam quas modi illo, enim perspiciatis ad. Similique vero officiis ab eaque
			quaerat rem fugit deleniti placeat incidunt error eos sint suscipit,
			aliquam possimus nemo modi sequi praesentium omnis nam ratione, est quasi
			ipsam voluptatibus? Quis laudantium rerum repellendus illo sapiente,
			laborum ad eum eligendi, modi hic sit temporibus ipsum alias accusantium
			nobis? Aperiam laborum quis vel expedita provident commodi unde eligendi.
			Culpa voluptatibus laudantium nisi recusandae officiis, accusamus delectus
			omnis a, nobis et nihil pariatur blanditiis, sunt beatae ex. Quisquam quod
			ipsa quo nulla aliquid, explicabo ipsam officiis pariatur, eaque
			voluptatibus qui fuga? Ex eligendi sint quaerat sed perferendis esse
			tenetur nemo ipsa? Corporis praesentium qui doloribus consequatur tempora
			ab ipsam reiciendis omnis mollitia, dolores placeat velit in debitis
			laboriosam quas quo consectetur facere pariatur enim vero accusamus
			incidunt? Deserunt quas quae quibusdam laboriosam cupiditate rem
			dignissimos soluta ullam consequuntur animi quo libero repellendus tempore
			minus vitae dicta nulla, eos tenetur doloribus, fugit nam! Cumque dicta
			rem itaque, iste velit dolore atque qui odio provident! Temporibus quos
			beatae voluptates, non possimus id molestiae perspiciatis earum officiis
			ducimus deleniti saepe repudiandae laboriosam ex voluptatibus sunt minus
			architecto necessitatibus veniam culpa aliquam dicta tenetur totam.
			Placeat, harum facere corporis vel, officia autem debitis quisquam
			laudantium est aut atque voluptas labore sapiente voluptatum expedita amet
			accusantium illo dolorum veniam sed dolor culpa. Facere tempora, optio
			debitis voluptate voluptatem aliquam id eaque quo ea architecto! Quo alias
			placeat mollitia nam, maxime id sequi pariatur velit illo aperiam nobis
			dolores? Beatae minima fugiat consectetur dicta enim ullam ipsa impedit
			suscipit deleniti corporis itaque nulla quos aliquam vitae modi quam ea,
			laudantium assumenda fugit earum harum architecto accusamus in! Vitae nisi
			laborum veritatis, omnis minus dolorum sed tempora reiciendis molestiae?
			At magnam blanditiis deleniti ipsum? Facilis blanditiis nostrum itaque
			aliquid illum aut ipsam nemo. Corrupti dicta optio eveniet culpa explicabo
			a odit minus repudiandae architecto rerum, exercitationem ipsam aperiam
			debitis! Ad, sequi dignissimos voluptatem perspiciatis fugiat vel officiis
			quas enim, magnam, saepe architecto nam ipsa temporibus? Atque aperiam
			amet accusantium exercitationem perspiciatis quisquam deserunt, delectus
			non, dignissimos excepturi, nemo praesentium dolore? Rem unde iusto
			mollitia reprehenderit autem culpa voluptatem saepe reiciendis eligendi
			sapiente assumenda officiis voluptates iste, sit minus, inventore
			voluptate nobis possimus nisi vero consectetur sint sed. Placeat
			dignissimos eligendi, quod ipsam doloribus officia illum! Accusantium,
			eius in delectus porro praesentium, aperiam soluta esse rem ex voluptas
			consequatur quis optio ad facere quae dicta nostrum? Enim sapiente minima
			eligendi natus nihil soluta dicta maiores nam! Tempore ea nemo nostrum
			dolore, esse commodi expedita quae at molestias vitae quidem quisquam
			perferendis amet corrupti aliquid blanditiis error soluta sit repudiandae
			id placeat aperiam? Expedita itaque quasi magni reiciendis excepturi
			doloremque est laborum similique natus quae accusamus magnam, ratione
			optio. In, temporibus dicta voluptas sit ad aperiam ipsum saepe accusamus.
			Delectus repudiandae libero alias sint voluptatum corporis in amet beatae
			ullam voluptatem quae, rem dignissimos suscipit? Quasi, commodi dolorem.
			Inventore maiores, suscipit quaerat odio neque quo quasi quas eos quis
			nulla libero fugit totam? Unde eaque fugit quasi natus ducimus. Ullam
			molestiae dolore repudiandae debitis natus, nemo hic fugit illo illum
			nostrum recusandae saepe ratione! Pariatur, nobis atque! Reiciendis
			excepturi doloribus optio iste quos dolor, vitae sit aspernatur natus
			nihil deserunt odit eius, placeat at commodi ducimus delectus eum rem, id
			iure saepe nulla! Sint explicabo accusantium corrupti dicta labore aut
			magnam nam quo consequuntur quisquam inventore ab dolorem odio quibusdam
			laborum, quasi consequatur praesentium vero facilis!
		</div>
	);
};

export default page;
