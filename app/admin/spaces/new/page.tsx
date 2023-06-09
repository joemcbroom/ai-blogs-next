'use client';

// framework
import { useEffect, useState } from 'react';

// library
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import AdminHeading from '#/components/admin/AdminHeading';
import AdminButton from '#/components/admin/AdminButton';
import ColorPicker from '#/components/UI/ColorPicker';

type Inputs = {
	spaceName: string;
	spaceDescription: string;
	primaryColor: string;
	secondaryColor: string;
	tertiaryColor: string;
};

export default function NewSpacePage() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<Inputs>();

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
					className=" border border-gray-300 rounded-md p-2 mt-2 w-[400px] text-xs "
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

				<ColorPicker
					handleColorChangeComplete={(hex) => setValue('primaryColor', hex)}
				/>

				<input className="block" type="submit" />

				<span>Primary color: {watch('primaryColor')}</span>
			</form>
		</>
	);
}
