import React, { useEffect, useId, useState } from 'react';
import BlogverseLogo from '#/components/UI/BlogverseLogo';
import AdminButton from '#/components/admin/AdminButton';

interface ModalProps {
	title: string;
	message: string;
	showModal: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({
	title,
	message,
	showModal,
	onConfirm,
	onCancel,
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const id = useId();
	useEffect(() => {
		const handleOutsideClick = (e: any) => {
			const modal = document.getElementById(id);
			if (modal && !modal.contains(e.target)) {
				onCancel();
			}
		};
		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [id, onCancel]);

	useEffect(() => {
		setIsVisible(showModal);
	}, [showModal]);

	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 z-10 overflow-y-auto">
			<div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>

				<span
					className="hidden sm:inline-block sm:h-screen sm:align-middle"
					aria-hidden="true"
				>
					&#8203;
				</span>

				<div
					id={id}
					className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
				>
					<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
								<BlogverseLogo />
							</div>
							<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									{title}
								</h3>
								<div className="mt-2">
									<p className="text-sm text-gray-500">{message}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="gap-2 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
						<AdminButton
							onClick={onConfirm}
							backgroundClass="bg-green-600 hover:bg-green-700"
						>
							Confirm
						</AdminButton>
						<AdminButton
							onClick={onCancel}
							backgroundClass="bg-white text-inherit hover:bg-gray-50"
						>
							Cancel
						</AdminButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
