const formatNumberString = (numberString: string | number) => {
	const formatter = Intl.NumberFormat('en', { notation: 'compact' });
	return formatter.format(Number(numberString));
};

export default formatNumberString;
