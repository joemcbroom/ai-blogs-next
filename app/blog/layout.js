import Link from 'next/link';
import styles from './blog.module.css';

const BLogLayout = ({ params, children }) => {
	const { blogName } = params;
	return (
		<>
			<nav className={styles.nav}>
				<h1>Some links to blog posts:</h1>
				<Link href="/blog/blog1/post1">Blog1 Post1</Link>
				<Link href="/blog/blog1/post2">Blog1 Post2</Link>
				<Link href="/blog/blog2/post1">Blog2 Post1</Link>
				<Link href="/blog/blog2/post2">Blog2 Post2</Link>
			</nav>
			{children}
		</>
	);
};

export default BLogLayout;
