import { useState } from 'react';

type Tab = {
	title: string;
	content: React.ReactNode;
};

type TabsProps = {
	tabs: Tab[];
};

const Tabs = ({ tabs }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="w-full">
			<ul className="flex gap-1 border-b">
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={`rounded rounded-b-none px-4 py-2 ${
							index === activeTab
								? 'bg-transparent text-purple-500'
								: 'bg-slate-300'
						}`}
					>
						<button
							className="outline-none focus:outline-none"
							onClick={() => setActiveTab(index)}
						>
							{tab.title}
						</button>
					</li>
				))}
			</ul>
			{tabs.map((tab, index) => (
				<div
					key={index}
					className={` mt-3 ${index === activeTab ? 'block' : 'hidden'}`}
				>
					{tab.content}
				</div>
			))}
		</div>
	);
};

export default Tabs;
