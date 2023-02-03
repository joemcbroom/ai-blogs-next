'use client';

// framework
import { useEffect, useState } from 'react';

// library
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import AdminHeading from '#/components/admin/AdminHeading';
import AdminButton from '#/components/admin/AdminButton';
import ColorPicker from '#/components/UI/ColorPicker';
import Link from 'next/link';

type Inputs = {
	spaceName: string;
	spaceDescription: string;
	primaryColor: string;
	secondaryColor: string;
	tertiaryColor: string;
};

const defaultValues: Inputs = {
	spaceName: '',
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

	const slugify = (text: string) => text.replace(/\s/g, '-').toLowerCase();
	const spaceName = watch('spaceName');

	useEffect(() => {
		if (!spaceName) return;
		setSpaceSlug(slugify(spaceName));
	}, [spaceName]);

	const handleGenerate = () => {
		setValue(
			'spaceDescription',
			`This is the "${spaceName}" space (not connected to backend yet)`
		);
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
					className="border border-gray-300 rounded-md p-2 mt-2 w-[400px] text-xs"
				/>

				<div className="flex items-center gap-2 text-sm mt-1">
					<span>URL</span>
					<span className="text-pink-400">blogverse.ai/{spaceSlug}</span>
				</div>

				<h2 className="text-lg mt-6">Space description</h2>
				<span className="text-sm">
					Describe this new entity you are creating
				</span>

				<textarea
					defaultValue=""
					rows={5}
					{...register('spaceDescription')}
					placeholder="What's this space all about?"
					className="block border border-gray-300 rounded-md p-2 mt-2 w-[500px] text-xs"
				/>
				<AdminButton
					disabled={!!watch('spaceDescription')?.length || !spaceName}
					onClick={handleGenerate}
					hoverText="Generate a description for this space"
				>
					Generate
				</AdminButton>

				<h2 className="text-lg mt-6">Color Theme</h2>
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

				<div className="border-t w-full mt-6">
					<p>
						Are you satisfied with your creation?
						<span
							className="text-pink-400 cursor-pointer ml-2"
							onClick={() => reset()}
						>
							No, Thanos snap that shit
						</span>
					</p>
					<AdminButton type="submit" disabled={!spaceName}>
						Yes, Create Space
					</AdminButton>
				</div>
			</form>
		</>
	);
}
