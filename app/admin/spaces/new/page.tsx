'use client';

// framework
import { MouseEvent, useEffect, useState, useTransition } from 'react';
import Link from 'next/link';

// library
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import AdminHeading from '#/components/admin/AdminHeading';
import ButtonComponent from '#/components/UI/ButtonComponent';
import ColorPicker from '#/components/UI/ColorPicker';

// utils
import slugify from '#/lib/utils/slugify';
import IconLoader from '#/components/UI/loaders/IconLoader';
import { createSpace } from '#/lib/supabase/client';
import { useAlert } from '#/lib/hooks/useAlert';

type Inputs = {
	name: string;
	description: string;
	primary_color: string;
	secondary_color: string;
	tertiary_color: string;
};

const defaultValues: Inputs = {
	name: "What's My Name?",
	description: '',
	primary_color: '#7418EA',
	secondary_color: '#21FA90',
	tertiary_color: '#F3F4F6',
};

export default function NewSpacePage() {
	const {
		register,
		watch,
		setValue,
		getValues,
		reset,
		formState: { errors },
	} = useForm({ defaultValues });

	const { showAlert } = useAlert();
	const [isBusy, setIsBusy] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const [spaceSlug, setSpaceSlug] = useState('');

	const name = watch('name');
	const [hasSpaceName, setHasSpaceName] = useState(false);

	useEffect(() => {
		if (!name || name === defaultValues.name) {
			setHasSpaceName(false);
			return;
		}
		setSpaceSlug(slugify(name));
		setHasSpaceName(true);
	}, [name]);

	const handleGenerate = async () => {
		setIsBusy(true);
		const res = await fetch('/api/generate/space_description', {
			method: 'POST',
			body: JSON.stringify({ name }),
		});
		const { description } = await res.json();
		setValue('description', description);
		setIsBusy(false);
	};

	const LinkToNewSpace = ({ slug }: { slug: string }) => (
		<>
			<span>Space Created Successfully</span>
			<Link href={`/admin/spaces/viewer/${slug}/edit`}>
				<span className="text-blue-500 hover:underline">View</span>
			</Link>
		</>
	);

	const handleCreate = async () => {
		setIsSaving(true);
		const space = getValues();
		await createSpace({ ...space, slug: spaceSlug });
		setIsSaving(false);
		showAlert({
			message: <LinkToNewSpace slug={spaceSlug} />,
			type: 'success',
			duration: 10000,
		});
		reset(defaultValues);
	};

	return (
		<>
			<AdminHeading
				title="Create a New Space"
				subtitle="What are you naming this baby?"
			/>

			<form className={`mt-8 ${isSaving ? 'animate-pulse' : ''}`}>
				<input
					defaultValue=""
					{...register('name', { required: true })}
					placeholder="What's My Name?"
					className="mt-2 w-[400px] rounded-md border border-gray-300 p-2 text-xs"
				/>

				<div className="mt-1 flex items-center gap-2 text-sm">
					<span>URL</span>
					<span className="text-pink-400">blogverse.ai/{spaceSlug}</span>
				</div>

				<h2 className="mt-6 text-lg">Space description</h2>
				<span className="text-sm">
					Describe this new entity you are creating
				</span>

				<textarea
					defaultValue=""
					rows={5}
					{...register('description')}
					placeholder="What's this space all about?"
					className="mt-2 block w-[500px] rounded-md border border-gray-300 p-2 text-xs"
				/>

				<ButtonComponent
					disabled={isBusy || !hasSpaceName}
					onClick={handleGenerate}
					hoverText={`Generate a description for this space ${
						hasSpaceName ? '' : '\n after you give it a new name'
					}`}
					additionalClasses="mt-2 min-w-[100px]"
				>
					{isBusy ? <IconLoader className="h-4 w-4" /> : 'Generate'}
				</ButtonComponent>

				<h2 className="mt-6 text-lg">Color Theme</h2>
				<p>
					Want some color ideas?{' '}
					<Link
						target="_blank"
						href="https://coolors.co/generate"
						className="text-pink-400"
					>
						Color palette generator
					</Link>{' '}
				</p>

				<div className="my-4">
					<ColorPicker
						handleChange={(hex) => setValue('primary_color', hex)}
						color={watch('primary_color')}
						label="Main"
						subLabel="Logo, icons, links, primary buttons"
					/>

					<ColorPicker
						handleChange={(hex) => setValue('secondary_color', hex)}
						color={watch('secondary_color')}
						label="Secondary"
						subLabel="Secondary buttons, tags, borders"
					/>

					<ColorPicker
						handleChange={(hex) => setValue('tertiary_color', hex)}
						color={watch('tertiary_color')}
						label="Tertiary"
						subLabel="Backgrounds"
					/>
				</div>

				<div className="mt-6 w-full border-t">
					<p>
						Are you satisfied with your creation?
						<span
							className="ml-2 cursor-pointer text-pink-400"
							onClick={() => reset()}
						>
							No, Thanos snap that shit
						</span>
					</p>
					<ButtonComponent
						type="submit"
						onClick={handleCreate}
						disabled={!name}
					>
						Yes, Create Space
					</ButtonComponent>
				</div>
			</form>
		</>
	);
}
