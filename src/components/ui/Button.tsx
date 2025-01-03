export function Button({
	content,
	styles,
	disabled,
	onClick,
}: {
	content: string;
	styles?: string;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<button
			onClick={onClick}
			className={`${styles} active:relative active:top-[1px] rounded-[6px] pt-1 pb-1 pl-3 pr-3 
				transition-opacity duration-500 disabled:cursor-not-allowed disabled:opacity-60
				`}
			disabled={disabled}
		>
			{content}
		</button>
	);
}
