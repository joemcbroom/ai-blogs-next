import ReactSwagger from './ReactSwagger';
import { redirect } from 'next/navigation';
import spec from '#/pages/api/documentation/swagger.json';

export async function ApiDocPage() {
	if (!process.env.NEXT_PUBLIC_SHOW_SWAGGER) {
		// Redirect to 404
		redirect('/404');
	}
	return <ReactSwagger spec={spec} />;
}

export default ApiDocPage;
