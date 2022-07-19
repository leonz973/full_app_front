// 替换污染物下标
export const replacePltName = (value) => {
	value = value || '';
	let labelObj = {
		'PM2.5': 'PM₂.₅',
		PM25: 'PM₂.₅',
		'PM₂.₅':'PM₂.₅',
		PM10: 'PM₁₀',
		'PM₁₀':'PM₁₀',
		O3: 'O₃',
		'O₃':'O₃',
		NO2: 'NO₂',
		'NO₂':'NO₂',
		SO2: 'SO₂',
		'SO₂':'SO₂'
	};
	return value.replace(/[A-Z]+[0-9]+\.*[0-9]*/g, function() {
		return labelObj[arguments[0]] || arguments[0];
	});
}
