import { useState } from 'react';

export const useToggle = (val:boolean) => {
	const [value, setValue] = useState(val);

  const toggle = () => {
    setValue(prev => !prev)
  }

	return [value, toggle];
}
