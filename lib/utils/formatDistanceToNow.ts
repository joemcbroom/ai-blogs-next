const formatDistanceToNow = (() => {
	const ONE_SECOND = 1000;
	const ONE_MINUTE = ONE_SECOND * 60;
	const ONE_HOUR = ONE_MINUTE * 60;
	const ONE_DAY = ONE_HOUR * 24;
	const ONE_MONTH = ONE_DAY * 30;
	const ONE_YEAR = ONE_MONTH * 12;

	const now = new Date();

	return (date: Date) => {
		const diff = Math.abs(now.getTime() - date.getTime());
		if (diff >= ONE_YEAR) {
			const years = Math.floor(diff / ONE_YEAR);
			return `${years} year${years === 1 ? '' : 's'} ago`;
		}
		if (diff >= ONE_MONTH) {
			const months = Math.floor(diff / ONE_MONTH);
			return `${months} month${months === 1 ? '' : 's'} ago`;
		}
		if (diff >= ONE_DAY) {
			const days = Math.floor(diff / ONE_DAY);
			return `${days} day${days === 1 ? '' : 's'} ago`;
		}
		if (diff >= ONE_HOUR) {
			const hours = Math.floor(diff / ONE_HOUR);
			return `${hours} hour${hours === 1 ? '' : 's'} ago`;
		}
		if (diff >= ONE_MINUTE) {
			const minutes = Math.floor(diff / ONE_MINUTE);
			return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
		}
		if (diff >= ONE_SECOND) {
			const seconds = Math.floor(diff / ONE_SECOND);
			return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
		}
		return 'just now';
	};
})();

export default formatDistanceToNow;
