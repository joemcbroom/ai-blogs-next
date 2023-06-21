import Header from '#/components/UI/Header/Header';
import Container from '#/components/UI/containers/Container';
import Heading from '#/components/UI/headings/Heading';
import Link from 'next/link';

const CookiePolicyPage = () => {
	return (
		<article>
			<Header
				title="Blogverse.ai Cookie Policy"
				image_path="general/cookies-bg.jpg"
				variant="about"
				description="At Blogverse.ai, we believe in being transparent about how we
        collect and use data. This policy provides information about how and
        when we use cookies for these purposes."
				showDescription={true}
			/>
			<Container>
				<div className="ProseMirror my-4 flex flex-col space-y-4">
					<Heading variant="h2">What are cookies?</Heading>
					<p>
						Cookies are small pieces of data that are stored on your computer,
						mobile phone, or other device when you first visit a page. We use
						cookies, pixels, and similar technologies to recognize your browser
						or device and to collect information. This allows us to provide
						services, understand your preferences based on previous or current
						site activity, which enables us to provide improved services. We
						also use cookies to help us compile aggregate data about site
						traffic and site interactions so that we can offer better site
						experiences and tools in the future.
					</p>
					<Heading variant="h2">How we use cookies</Heading>
					<p>
						Blogverse.ai uses both session cookies (which expire once you close
						your web browser) and persistent cookies (which stay on your device
						until you delete them) to provide you with a more personal and
						interactive experience on our website.
					</p>
					<p>
						We use two broad categories of cookies: (1) first-party cookies,
						served directly by us to your device, which we use to recognize your
						device and provide our services; and (2) third-party cookies, which
						are served by our partners or service providers on our website, and
						can be used by these companies to recognize your device and provide
						various services.
					</p>
					<Heading variant="h2">What types of cookies we use and why</Heading>
					<ul>
						<li>
							<strong>Essential cookies:</strong> These cookies are necessary
							for the website to function and cannot be switched off in our
							systems. They are usually only set in response to actions made by
							you which amount to a request for services, such as setting your
							privacy preferences, logging in or filling in forms.
						</li>
						<li>
							<strong>Performance and functionality cookies:</strong> These
							cookies are used to enhance the performance and functionality of
							our website but are non-essential to their use. However, without
							these cookies, certain functionality may become unavailable.
						</li>
						<li>
							<strong>Analytics and customization cookies:</strong> These
							cookies collect information that is used either in aggregate form
							to help us understand how our websites are being used or how
							effective our marketing campaigns are, or to help us customize our
							website for you.
						</li>
						<li>
							<strong>Advertising cookies:</strong> These cookies are used to
							make advertising messages more relevant to you. They perform
							functions like preventing the same ad from continuously
							reappearing, ensuring that ads are properly displayed for
							advertisers, and in some cases selecting advertisements that are
							based on your interests.
						</li>
					</ul>
					<Heading variant="h2">Your choices about cookies</Heading>
					<p>
						Most web browsers are set to accept cookies by default. If you
						prefer, you can usually choose to set your browser to remove or
						reject cookies. Please note that if you choose to remove or reject
						cookies, this could affect the availability and functionality of our
						services. You may also set your email options to prevent the
						automatic downloading of images that may contain technologies that
						would allow us to know whether you have accessed our email and
						performed certain functions with it.
					</p>
					<Heading variant="h2">Changes to this Cookie Policy</Heading>
					<p>
						We may update this Cookie Policy from time to time. If we make
						significant changes, we will let you know but please regularly check
						this policy to ensure you are aware of the most updated version.
					</p>
					<Heading variant="h2">Contact Us</Heading>
					<p>
						If you have any questions about our use of cookies, please contact
						us at{' '}
						<Link href="mailto:email@blogverse.ai">email@blogverse.ai</Link>.
					</p>

					<p>Last updated: June 21, 2023</p>
				</div>
			</Container>
		</article>
	);
};

export default CookiePolicyPage;
