'use client';

// framework
import { useEffect, useState } from 'react';
import Link from 'next/link';

// library
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import AdminHeading from '#/components/admin/AdminHeading';
import AdminButton from '#/components/admin/AdminButton';
import ColorPicker from '#/components/UI/ColorPicker';

// utils
import slugify from '#/lib/utils/slugify';

type Inputs = {
	spaceName: string;
	spaceDescription: string;
	primaryColor: string;
	secondaryColor: string;
	tertiaryColor: string;
};

const defaultValues: Inputs = {
	spaceName: "What's My Name?",
	spaceDescription: '',
	primaryColor: '#7418EA',
	secondaryColor: '#21FA90',
	tertiaryColor: '#F3F4F6',
};

export default function NewSpacePage() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm({ defaultValues });

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	const [spaceSlug, setSpaceSlug] = useState('');

	const spaceName = watch('spaceName');

	useEffect(() => {
		if (!spaceName) return;
		setSpaceSlug(slugify(spaceName));
	}, [spaceName]);

	const handleGenerate = () => {
		// TODO: generate description from title with AI (/api/)
		setValue(
			'spaceDescription',
			`This is the "${spaceName}" space (not connected to backend yet)`
		);
	};

	const handleCreate = () => {
		console.log('create space');
	};

	return (
		<>
			<AdminHeading
				title="Create a New Space"
				subtitle="What are you naming this baby?"
			/>

			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					defaultValue=""
					{...register('spaceName', { required: true })}
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
					{...register('spaceDescription')}
					placeholder="What's this space all about?"
					className="mt-2 block w-[500px] rounded-md border border-gray-300 p-2 text-xs"
				/>

				<AdminButton
					disabled={!!watch('spaceDescription')?.length || !spaceName}
					onClick={handleGenerate}
					hoverText="Generate a description for this space"
				>
					Generate
				</AdminButton>

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
						handleChange={(hex) => setValue('primaryColor', hex)}
						color={watch('primaryColor')}
						label="Main"
						subLabel="Logo, icons, links, primary buttons"
					/>

					<ColorPicker
						handleChange={(hex) => setValue('secondaryColor', hex)}
						color={watch('secondaryColor')}
						label="Secondary"
						subLabel="Secondary buttons, tags, borders"
					/>

					<ColorPicker
						handleChange={(hex) => setValue('tertiaryColor', hex)}
						color={watch('tertiaryColor')}
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
					<AdminButton
						type="submit"
						onClick={handleCreate}
						disabled={!spaceName}
					>
						Yes, Create Space
					</AdminButton>
				</div>
			</form>
		</>
	);
}
