enum TimeUnits {
	SECOND = 1000,
	MINUTE = 60 * 1000,
	HOUR = 60 * 60 * 1000,
	DAY = 24 * 60 * 60 * 1000,
	MONTH = 30 * 24 * 60 * 60 * 1000,
	YEAR = 12 * 30 * 24 * 60 * 60 * 1000,
}

function pluralize(unit: string, value: number): string {
	return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
}

function formatDistanceToNow(date: Date): string {
	const now = new Date();
	const diff = Math.abs(now.getTime() - date.getTime());

	if (diff >= TimeUnits.YEAR) {
		return pluralize('year', Math.floor(diff / TimeUnits.YEAR));
	}
	if (diff >= TimeUnits.MONTH) {
		return pluralize('month', Math.floor(diff / TimeUnits.MONTH));
	}
	if (diff >= TimeUnits.DAY) {
		return pluralize('day', Math.floor(diff / TimeUnits.DAY));
	}
	if (diff >= TimeUnits.HOUR) {
		return pluralize('hour', Math.floor(diff / TimeUnits.HOUR));
	}
	if (diff >= TimeUnits.MINUTE) {
		return pluralize('minute', Math.floor(diff / TimeUnits.MINUTE));
	}
	if (diff >= TimeUnits.SECOND) {
		return pluralize('second', Math.floor(diff / TimeUnits.SECOND));
	}
	return 'just now';
}

export default formatDistanceToNow;
