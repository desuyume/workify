export const formatMoney = (
	money: string | number,
	separator: string = ' '
): string => {
	const parts = money.toString().split('.')
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
	return parts.join(',')
}

export const stringToBoolean = (str: string): boolean => {
	return str.toLowerCase() === 'true'
}
