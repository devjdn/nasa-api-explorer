// import { Separator } from "@/components/ui/separator";
// import Link from "next/link";
// import APOD from "@/../public/apod-hero.webp";
// import Image from "next/image";

export default function Home() {
	return (
		<div className="flex-1 space-y-24 pb-24">
			<section className="py-24 px-3 lg:px-8 not-dark:bg-secondary border-b">
				<div className="max-w-prose space-y-8">
					<h1 className="font-display font-semibold text-primary text-3xl lg:text-5xl text-balance leading-tight">
						Beyond <span className="text-orange-500">the stars</span>, <br /> and closer to <span className="text-orange-500">home</span>.
					</h1>
					<div className="space-y-6 text-muted-foreground">
						<p className="font-mono font-medium text-sm lg:text-base">The APIs from NASA&apos;s space centres have the best in class data and imagery for the world beyond our eyes.</p>
						<p className="font-mono font-medium text-sm lg:text-base">
							From daily images of the universe and detailed views of our home planet, to tracking the movements of near-Earth objects and monitoring space weather.
						</p>
					</div>
				</div>
			</section>

			{/* <section className="px-3 lg:px-8 space-y-18 max-w-6xl mx-auto">
				<div className="">
					<h2 className="font-display font-semibold text-primary text-2xl lg:text-4xl text-balance">
						Data shown on NASA API Explorer
					</h2>
				</div>
				<div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">

					<div className="space-y-6 max-w-prose">
						<div className="space-y-6">
							<Image src={APOD.src} alt="Space Image" width={500} height={500} loading="lazy" className="aspect-3/4 object-center object-cover" />
							<h3 className="font-display font-medium text-xl text-primary">
								Astronomy Picture of the Day
							</h3>
						</div>
						<Separator />
						<Link
							href="/apod"
							className="inline-block font-mono text-sm underline underline-offset-4 hover:text-orange-500 transition-colors"
						>
							View today’s image
						</Link>
					</div>

					<div className="space-y-6 max-w-prose">
						<div className="space-y-6">
							<Image src={APOD.src} alt="Space Image" width={500} height={500} loading="lazy" className="aspect-4/3 object-center object-cover" />
							<h3 className="font-display font-medium text-xl text-primary">
								EPIC Earth Imagery
							</h3>
						</div>
						<Separator />
						<Link
							href="/epic"
							className="inline-block font-mono text-sm underline underline-offset-4 hover:text-orange-500 transition-colors"
						>
							Browse recent captures
						</Link>
					</div>


					<div className="space-y-6 max-w-prose">
						<div className="space-y-6">
							<Image src={APOD.src} alt="Space Image" width={500} height={500} loading="lazy" className="aspect-4/3 object-center object-cover" />
							<h3 className="font-display font-medium text-xl text-primary">
								Near-Earth Objects
							</h3>
						</div>
						<Separator />
						<Link
							href="/neos"
							className="inline-block font-mono text-sm underline underline-offset-4 hover:text-orange-500 transition-colors"
						>
							Explore tracked objects
						</Link>
					</div>

					<div className="space-y-6 max-w-prose">
						<div className="space-y-6">
							<Image src={APOD.src} alt="Space Image" width={500} height={500} loading="lazy" className="aspect-4/3 object-center object-cover" />
							<h3 className="font-display font-medium text-xl text-primary">
								Image and Video Library
							</h3>
						</div>
						<Separator />
						<Link
							href="/media-library"
							className="inline-block font-mono text-sm underline underline-offset-4 hover:text-orange-500 transition-colors"
						>
							Open the archive
						</Link>
					</div>

					<div className="space-y-6 max-w-prose">
						<div className="space-y-6">
							<Image src={APOD.src} alt="Space Image" width={500} height={500} loading="lazy" className="aspect-4/3 object-center object-cover" />
							<div className="space-y-3">
								<h3 className="font-display font-medium text-xl text-primary">
									Technology Transfer
								</h3>
							</div>
						</div>
						<Separator />
						<Link
							href="/techtransfer"
							className="inline-block font-mono text-sm underline underline-offset-4 hover:text-orange-500 transition-colors"
						>
							View available technologies
						</Link>
					</div>
				</div>
			</section> */}
		</div>
	);
}