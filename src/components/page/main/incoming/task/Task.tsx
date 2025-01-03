import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { SECTION } from '../../../../../constants/Section';
import { taskService } from '../../../../../services/task/Task.service';
import { TaskProps } from '../../../../../types/Task.type';
import { BoardTask } from './BoardTask';
import { EditBoardTask } from './EditBoardTask';
import { EditListTask } from './EditListTask';
import { ListTask } from './ListTask';
export const Task = (props: TaskProps) => {
	//State

	const [edit, setEdit] = useState(false);
	console.log(edit);
	const container = useRef<null | HTMLDivElement>(null);

	//Effects

	useEffect(() => {
		if (container.current) {
			container.current.style.width =
				document.documentElement.clientWidth -
				50 -
				container.current.getBoundingClientRect().left +
				'px';
		}
	});

	if (!props.isClone) {
		return (
			<div
				onDoubleClick={() => setEdit(true)}
				className={`${props.isVisible ? 'hidden' : 'block'}`}
			>
				{!edit ? (
					<Draggable
						key={new Date(props.createdAt).toDateString()}
						draggableId={props.id}
						index={props.index}
					>
						{(provided, snapshot) => {
							return (
								<div
									style={{
										...taskService.animate(provided.draggableProps.style, snapshot),
									}}
									ref={provided.innerRef}
									{...provided.dragHandleProps}
									{...provided.draggableProps}
								>
									{props.type === SECTION.SMALL ? (
										<BoardTask {...props} />
									) : (
										<ListTask {...{ ...props }} />
									)}
								</div>
							);
						}}
					</Draggable>
				) : (
					<div>
						{props.type === SECTION.SMALL ? (
							<EditBoardTask {...{ ...props, setEdit: setEdit }} />
						) : (
							<EditListTask {...{ ...props, setEdit: setEdit }} />
						)}
					</div>
				)}
			</div>
		);
	} else {
		return (
			<div className='basis-full' onDoubleClick={() => void setEdit(true)}>
				{props.type === SECTION.SMALL ? (
					<BoardTask {...props} />
				) : (
					<ListTask {...{ ...props, isClone: true }} />
				)}
			</div>
		);
	}
};
