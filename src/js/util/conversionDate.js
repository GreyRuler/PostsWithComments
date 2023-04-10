export default function conversionDate(number) {
	const date = new Date(number);
	return `${date.toLocaleTimeString('ru').slice(0, 5)} ${date.toLocaleDateString('ru')}`;
}
