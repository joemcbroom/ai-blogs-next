import Modal from '#/components/UI/Modal';
import { PauseIcon, PlayIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface ActionButtonProps {
	type: 'delete' | 'publish' | 'unpublish';
	className?: string;
	handleAction: () => void;
}

const ActionButton = ({ type, className, handleAction }: ActionButtonProps) => {
	const [showModal, setShowModal] = useState(false);

	const content = {
		delete: {
			title: 'Delete space?',
			message:
				'Are you sure you want to delete this space? This action cannot be undone.',
			icon: <TrashIcon className="h-5 w-5 fill-current" />,
			text: 'Delete',
		},
		unpublish: {
			title: 'Unpublish space?',
			message:
				'Are you sure you want to pause this space? Your readers will no longer be able to see its posts.',
			icon: <PauseIcon className="mr-1 h-5 w-5 fill-current" />,
			text: 'Unpublish',
		},
		publish: {
			title: 'Publish space?',
			message:
				'Are you sure you want to publish this space? Your readers will be able to see its posts.',
			icon: <PlayIcon className="mr-1 h-5 w-5 fill-current" />,
			text: 'Publish',
		},
	};

	return (
		<>
			<button
				className={`flex items-center justify-center ${className}`}
				onClick={() => setShowModal(true)}
			>
				{content[type].icon}
				<span>{content[type].text}</span>
			</button>

			<Modal
				showModal={showModal}
				title={content[type].title}
				message={content[type].message}
				onConfirm={() => {
					setShowModal(false);
					handleAction();
				}}
				onCancel={() => setShowModal(false)}
			/>
		</>
	);
};

export default ActionButton;
