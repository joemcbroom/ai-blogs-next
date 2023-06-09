import { getApiDocs } from '/lib/swagger';
import ReactSwagger from './ReactSwagger';
import { redirect } from 'next/navigation';

export async function ApiDocPage() {
	if (!process.env.NEXT_PUBLIC_SHOW_SWAGGER) {
		// Redirect to 404
		redirect('/404');
	}
	const spec = await getApiDocs();
	return <ReactSwagger spec={spec} />;
}

export default ApiDocPage;
