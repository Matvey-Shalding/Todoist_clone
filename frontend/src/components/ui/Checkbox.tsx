import React, { useEffect, useRef } from 'react';
import styles from '../../styles/assets/checkbox.module.scss';
export function Checkbox({
	checked,
	onChange,
}: {
	checked?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	const checkbox = useRef<null | HTMLInputElement>(null);
	useEffect(() => {
		if (checkbox.current && checked) {
			checkbox.current.checked = true;
		}
	}, []);
	return (
		<div className={styles.checkbox}>
			<input onChange={onChange} ref={checkbox} type='checkbox' className={styles.real} />
			<span className={styles.fake}></span>
		</div>
	);
}
