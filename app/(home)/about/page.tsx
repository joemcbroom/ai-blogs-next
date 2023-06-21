import Container from '#/components/UI/containers/Container';
import Header from '#/components/UI/Header/Header';
import SubscribeBox from '#/components/UI/ads/Subscribe';
import Heading from '#/components/UI/headings/Heading';
import { Metadata } from 'next';
import Link from 'next/link';
import { OGTwitterMetadata } from '#/lib/utils/OGTwitterMetadata';
import { SITE_INFO } from '#/lib/constants/siteInfo';

const { title, description } = SITE_INFO.about;
export const metadata: Metadata = {
	title,
	description,
	...OGTwitterMetadata({
		title,
		description,
		path: 'about',
	}),
};

const AboutPage = () => {
	return (
		<article>
			<Header
				title="About Us"
				image_path="general/robot-bg.jpg"
				variant="about"
				description={
					<>
						Welcome to Blogverse.ai - your gateway to a universe of knowledge
						spanning innumerable subjects, all carefully curated and
						thoughtfully presented in AI-generated&nbsp;
						<Link className="text-purple-500" href="/spaces">
							Spaces
						</Link>
						.
					</>
				}
				showDescription={true}
			/>
			<Container>
				<div className="ProseMirror my-4 flex flex-col space-y-4">
					<p>
						<strong>At Blogverse.ai,</strong> we believe in the boundless
						potential of artificial intelligence to curate, generate, and share
						knowledge. We understand the transformative power AI holds for
						communicating ideas, information, and insights. Our mission is to
						harness this power to provide our users with an unparalleled
						blogging experience, teeming with rich, diverse, and informative
						content.
					</p>
					<p>
						<strong>Every blog space</strong> we host is meticulously crafted by
						advanced AI models, designed to understand and generate meaningful
						content. Each post is a testament to the power of AI - an accurate,
						insightful, and engaging write-up on a multitude of topics. From
						breaking down complex scientific concepts to revealing the latest
						trends in fashion, or providing comprehensive guides on home
						gardening, our AI explores the breadth of human knowledge to serve
						you.
					</p>
					<p>
						<strong>But at the heart</strong> of Blogverse.ai, it&apos;s not
						just about the technology. It&apos;s about the endless thirst for
						learning, the innate curiosity, and the quest for knowledge that
						drives us all. Our AI is merely a tool that amplifies this quest,
						helping us deliver a comprehensive array of informative content that
						caters to diverse interests, tastes, and learning needs.
					</p>
					<p>
						<strong>Each Space within </strong>Blogverse.ai is a treasure trove
						of knowledge, a virtual library of posts designed to inform,
						inspire, and ignite intellectual exploration. The power of
						Blogverse.ai lies in the value it brings to its users. Every piece
						of content is aimed at empowering you with information, helping you
						make informed decisions, and satisfying your curiosity.
					</p>
					<p>
						<strong>While our cutting-edge AI</strong> takes center stage in
						creating content, we assure you that it doesn&apos;t stop at mere
						generation. We&apos;ve designed a user-centric platform that&apos;s
						not just about consumption, but also about engagement. Our Spaces
						are communities of learning where users can explore topics of
						interest, engage with content, and glean value from it.
					</p>
					<p>
						<strong>We invite you</strong> to delve into our Spaces, to explore,
						engage, and enrich your knowledge. As you embark on this journey of
						learning and discovery, we hope you find value in the content that
						Blogverse.ai has to offer. Enjoy your journey across the Blogverse -
						there&apos;s always something new to discover!
					</p>
				</div>
			</Container>
			<Container>
				<SubscribeBox />
			</Container>
		</article>
	);
};

export default AboutPage;
