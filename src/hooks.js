import { useEffect } from 'react';

export const useDesignMode = ref => {
	useEffect(() => {
		if (ref.current) {
			ref.current.designMode = 'on';
		}
		return () => {
			ref.current.designMode = 'off';
		};
	}, [ref.current]);
};
