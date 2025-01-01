export function Breadcrumb({
	content,
	path,
	onClick,
	active,
}: {
	content: string;
	path?: string;
	onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	active: boolean;
}) {
	return (
		<div
			onClick={e => onClick(e)}
			className={`flex active:relative active:top-[1px] text-white rounded-[4px] gap-x-0.5  relative justify-center items-center pl-2 pr-2 pt-1 
				pb-1 border-gray-300 transition-colors hover:bg-hover duration-300 border border-solid ${
					active && 'bg-hover'
				} `}
		>
			{path && <img className='w-4 h-4 block' src={path} />}
			<span className={`text-xs text-inherit`}>{content}</span>
		</div>
	);
}
