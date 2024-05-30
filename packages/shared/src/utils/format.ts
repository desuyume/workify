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

export const formatDate = (date: Date, separator = '.'): string => {
	const formattedDate = date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
	return formattedDate.replace(/\//g, separator)
}
