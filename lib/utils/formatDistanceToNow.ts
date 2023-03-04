const formatDistanceToNow = (date: Date) => {
	const now = new Date();
	const seconds = Math.abs((now.getTime() - date.getTime()) / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 12);
	const buildString = (value: number, unit: string) => {
		return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
	};
	if (years > 0) return buildString(years, 'year');
	if (months > 0) return buildString(months, 'month');
	if (days > 0) return buildString(days, 'day');
	if (hours > 0) return buildString(hours, 'hour');
	if (minutes > 0) return buildString(minutes, 'minute');
	if (seconds > 0) return buildString(seconds, 'second');
	return 'just now';
};

export default formatDistanceToNow;
