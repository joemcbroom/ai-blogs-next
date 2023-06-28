'use client';
import { User } from '#/lib/types/inferred.types';
import { Fragment, useReducer, useState, useTransition } from 'react';
import { GravatarProfile } from './gravatar.types';
import { Tab } from '@headlessui/react';
import Container from '#/components/UI/containers/Container';
import ButtonComponent from '#/components/UI/ButtonComponent';
import { useSupabase } from '#/lib/hooks/useSupabase';
import Loading from '../loading';
import { supabaseStorage } from '#/lib/supabase/client';
import SUPABASE_CONSTANTS from '#/lib/constants/supabaseConstants';
import { useAlert } from '#/lib/hooks/useAlert';
import { useRouter } from 'next/navigation';
import ImageUploader from '#/components/UI/ImageUploader';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { start } from 'repl';

const defaultValues = {
	full_name: '',
	avatar_url: '',
	email: '',
	display_name: '',
};

type ActionType =
	| { type: 'EDIT'; field: keyof typeof defaultValues; value: string }
	| { type: 'RESET'; initialValues: typeof defaultValues };

const init = (initialValues: typeof defaultValues) => initialValues;

const reducer = (state: typeof defaultValues, action: ActionType) => {
	switch (action.type) {
		case 'EDIT':
			return {
				...state,
				[action.field]: action.value || defaultValues[action.field],
			};
		case 'RESET':
			return init(action.initialValues);
		default:
			return state;
	}
};

const AccountContent = ({
	user,
	gravatarProfile,
}: {
	user: User;
	gravatarProfile: GravatarProfile | null;
}) => {
	const { supabase } = useSupabase();
	const { full_name, avatar_url, email, is_admin, display_name } = user;

	const initialUserValues = {
		full_name: full_name || gravatarProfile?.name?.formatted || '',
		avatar_url: avatar_url || gravatarProfile?.thumbnailUrl || '',
		email: email || '',
		display_name: display_name || gravatarProfile?.displayName || email || '',
	};

	const [userValues, dispatch] = useReducer(reducer, initialUserValues, init);
	const [hasChanges, setHasChanges] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [isPending, startTransition] = useTransition();

	const handleEdit = (value: string, field: keyof typeof defaultValues) => {
		dispatch({ type: 'EDIT', field, value });
		setHasChanges(true);
	};

	const handleSaveChanges = () => {
		startTransition(() => {
			setTimeout(() => {
				console.log('save changes');
				setHasChanges(false);
			}, 3000);
		});
	};

	const handleClearChanges = () => {
		dispatch({ type: 'RESET', initialValues: initialUserValues });
		setHasChanges(false);
	};

	const Input = ({
		label,
		htmlFor,
	}: {
		label: string;
		htmlFor: 'display_name' | 'full_name';
	}) => (
		<label
			htmlFor={htmlFor}
			className="relative flex w-full items-center justify-center gap-2 pt-4"
		>
			<span className="absolute left-0 top-0 text-xs">{label}</span>
			<input
				type="text"
				name="display_name"
				className="w-full rounded border border-purple-700 px-2 py-1 text-xl"
				defaultValue={userValues[htmlFor]}
				onChange={(e) => handleEdit(e.target.value, htmlFor)}
			/>
		</label>
	);

	const { showAlert } = useAlert();
	const router = useRouter();

	const handleUpdateImage = async (file: File) => {
		const bucket = SUPABASE_CONSTANTS.PUBLIC_BUCKET;
		const hasImage = user.avatar_url ? true : false;

		if (hasImage) {
			await supabaseStorage.delete({
				bucket,
				paths: [`${SUPABASE_CONSTANTS.USER_IMAGES_PATH}/${user.id}`],
			});
		}

		const newPath = `${SUPABASE_CONSTANTS.USER_IMAGES_PATH}/${user.id}`;

		let path = '';
		try {
			path = await supabaseStorage.upload({
				file,
				path: newPath,
				bucket,
			});
		} catch (err: any) {
			return showAlert({
				message: err.message,
				type: 'error',
			});
		}

		await supabase
			.from('profiles')
			.update({ avatar_url: path })
			.match({ id: user.id });

		startTransition(() => {
			showAlert({
				message: 'Image updated',
				type: 'success',
			});
			router.refresh();
		});
	};

	const handleClearImage = async () => {
		const bucket = SUPABASE_CONSTANTS.PUBLIC_BUCKET;
		const hasImage = user.avatar_url ? true : false;

		if (hasImage) {
			await supabaseStorage.delete({
				bucket,
				paths: [`${SUPABASE_CONSTANTS.USER_IMAGES_PATH}/${user.id}`],
			});
		}

		await supabase
			.from('profiles')
			.update({ avatar_url: null })
			.match({ id: user.id });

		startTransition(() => {
			showAlert({
				message: 'Image cleared',
				type: 'success',
			});
			router.refresh();
		});
	};

	const ProfileContent = () => {
		return (
			<div
				className={`flex w-full flex-col items-center justify-center space-y-4 ${
					isPending ? 'pointer-events-none animate-pulse' : ''
				}`}
			>
				<div className="relative h-20 w-20">
					<ImageUploader
						onChange={handleUpdateImage}
						fileUrl={userValues.avatar_url}
						onClear={handleClearImage}
						variant="avatar"
					/>
					<span
						className="group absolute right-0 top-0 z-50 rounded-full border-2 border-white bg-purple-700 p-1 dark:border-black"
						onClick={handleClearImage}
					>
						<PhotoIcon className="w-4 text-white group-hover:hidden" />
						<XMarkIcon className="hidden w-4 cursor-pointer text-white group-hover:block" />
					</span>
				</div>
				<Input htmlFor="display_name" label="Display Name" />
				<Input htmlFor="full_name" label="Full Name" />
				<div className="relative flex w-full items-center justify-center gap-2 pt-4">
					<span className="absolute left-0 top-0 text-xs">Email</span>
					<span className="w-full py-1 text-xl font-bold text-slate-500">
						{userValues.email}
					</span>
				</div>
			</div>
		);
	};

	if (isLoggingOut) return <Loading />;

	return (
		<Container>
			<div className="mx-auto mt-4 flex w-full flex-col items-center justify-center space-y-4 ">
				<Tab.Group>
					<Tab.List className="flex w-full justify-evenly rounded-full bg-slate-100">
						{['Profile', 'Favorites'].map((tab) => (
							<Tab as={Fragment} key={tab}>
								{({ selected }) => (
									<button
										className={`${
											selected
												? 'bg-blue-500 text-white'
												: 'bg-slate-100 text-black'
										} mobile-fix w-full rounded-full px-4 py-2 transition-all duration-300 ease-in-out`}
									>
										{tab}
									</button>
								)}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className="w-full">
						<Tab.Panel className="mx-auto md:w-1/2">
							<ProfileContent />
						</Tab.Panel>
						<Tab.Panel>
							<div>favorites tab</div>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
				<div className="flex gap-2">
					<ButtonComponent
						onClick={() => {
							setIsLoggingOut(true);
							supabase.auth.signOut();
						}}
					>
						Logout
					</ButtonComponent>
					<ButtonComponent
						type="button"
						buttonStyle="primary"
						onClick={handleSaveChanges}
						disabled={!hasChanges}
					>
						Save Changes
					</ButtonComponent>
					{is_admin && (
						<ButtonComponent
							type="link"
							href="/admin"
							buttonStyle="default"
							onClick={() => {}}
						>
							Admin
						</ButtonComponent>
					)}
				</div>
			</div>
		</Container>
	);
};

export default AccountContent;
