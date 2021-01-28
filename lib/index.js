const { get } = require("../routes");

const getZero = (input) => (input < 10 ? `0${input}` : String(input));

const getDate = () => {
	const date = new Date();
	const yyyy = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hours = date.getHours(),
		minutes = date.getMinutes();

	return `${yyyy}-${getZero(month)}-${getZero(day)} ${getZero(hours)}:${getZero(
		minutes,
	)}`;
};

module.exports = { getDate };
