let tableConfig = [{
		text: 'Country name',
		align: 'start',
		sortable: false,
		value: 'location',
	},
	{
		text: 'Total cases',
		value: 'total_cases',
		align: 'start'
	},
	{
		text: 'New cases',
		value: 'new_cases'
	},
	{
		text: 'Total cases per 1M',
		value: 'total_cases_per_million'
	},
	{
		text: 'Total deaths',
		value: 'total_deaths'
	},
	{
		text: 'New deaths',
		value: 'new_deaths'
	},
	{
		text: 'Total deaths per 1M',
		value: 'total_deaths_per_million'
	},
	{
		text: 'Total tests',
		value: 'total_tests'
	},
	{
		text: 'New tests',
		value: 'new_tests'
	},
	{
		text: 'Positive rate',
		value: 'positive_rate'
	},
	{
		text: 'Total tests per 1k',
		value: 'total_tests_per_thousand'
	},
	{
		text: 'Total vaccinations',
		value: 'total_vaccinations'
	},
	{
		text: 'New vaccinations',
		value: 'new_vaccinations'
	},
	{
		text: 'Vaccination per 100',
		value: 'total_vaccinations_per_hundred'
	},
	{
		text: 'Median age',
		value: 'median_age'
	},
	{
		text: 'Life expectancy',
		value: 'life_expectancy'
	},
	{
		text: 'Aged 65+',
		value: 'aged_65_older'
	},
	{
		text: 'Hospital beds per 1k',
		value: 'hospital_beds_per_thousand'
	},
	{
		text: 'HDI',
		value: 'human_development_index'
	},
	{
		text: 'Population',
		value: 'population'
	},
	{
		text: 'Population density',
		value: 'population_density'
	},
	{
		text: 'Diabetes prevalence',
		value: 'diabetes_prevalence'
	},
	{
		text: 'Handwashing facilities',
		value: 'handwashing_facilities'
	},
	{
		text: 'GDP per capita',
		value: 'gdp_per_capita'
	}
];

//.map(item => '<v-checkbox v-model="'+item.value+'" :label="\`'+item.text+'\`"></v-checkbox>').join("\r\n")

/*
fetch('https://covid.ourworldindata.org/data/owid-covid-data.json').then(response => response.json()).then(data => {
	//const db = {...data};
	document.querySelector('#loading').remove();
	Object.defineProperty(window, 'db', {
		value: Object.values(data),
		writable: false
	});
	Object.freeze(db);

	Object.defineProperty(window, 'table', {
		value: Object.values(data).map(item => {
			const country = {};
			for (let prop in item) {
				if (prop != 'data') country[prop] = item[prop];
			}

			const cases = item.data.filter(item => item.total_cases > 1);
			for (let prop in cases[cases.length - 1]) {
				country[prop] = cases[cases.length - 1][prop];
			}

			const tests = item.data.filter(item => item.total_tests > 1);
			for (let prop in tests[tests.length-1]) {
				if ((prop.indexOf('tests') >= 0) || (prop.indexOf('rate') >= 0)) country[prop] = tests[tests.length-1][prop];
			}

			const vaccinations = item.data.filter(item => item.total_vaccinations > 1);
			for (let prop in vaccinations[vaccinations.length - 1]) {
				if (prop.indexOf('vaccinations') >= 0) country[prop] = vaccinations[vaccinations.length - 1][prop];
			}

			return country;
		}),
		writable: false
	});
	Object.freeze(table);

	renderTable();
	updateConfig();
});
*/

fetch('https://covid-data.cloudno.de/').then(response => response.json()).then(data => {
	//const db = {...data};
	document.querySelector('#loading').remove();
	/*
	Object.defineProperty(window, 'db', {
		value: Object.values(data),
		writable: false
	});
	Object.freeze(db);
	* */

	Object.defineProperty(window, 'table', {
		value: [...data],
		writable: false
	});
	Object.freeze(table);

	renderTable();
	updateConfig();
});

function renderTable() {
	window.app = new Vue({
		el: '#app',
		vuetify: new Vuetify(),
		data() {
			return {
				headers: tableConfig,
				countries: table,
				total_cases: true,
				new_cases: true,
				total_cases_per_million: true,
				total_deaths: true,
				new_deaths: true,
				total_deaths_per_million: true,
				total_tests: true,
				new_tests: false,
				positive_rate: true,
				total_tests_per_thousand: true,
				total_vaccinations: true,
				new_vaccinations: false,
				total_vaccinations_per_hundred: true,
				median_age: false,
				life_expectancy: false,
				aged_65_older: true,
				hospital_beds_per_thousand: false,
				human_development_index: false,
				population: false,
				population_density: false,
				diabetes_prevalence: false,
				handwashing_facilities: false,
				gdp_per_capita: false
			}
		},
	});
}


function updateConfig() {
	tableConfig = [{
		text: 'Country name',
		align: 'start',
		sortable: false,
		value: 'location',
	}];
	if (app.total_cases) {
		tableConfig.push({
			text: 'Total cases',
			value: 'total_cases',
			align: 'start'
		});
	}
	if (app.new_cases) {
		tableConfig.push({
			text: 'New cases',
			value: 'new_cases'
		});
	}
	if (app.total_cases_per_million) {
		tableConfig.push({
			text: 'Total cases per 1M',
			value: 'total_cases_per_million'
		});
	}
	if (app.total_deaths) {
		tableConfig.push({
			text: 'Total deaths',
			value: 'total_deaths'
		});
	}
	if (app.new_deaths) {
		tableConfig.push({
			text: 'New deaths',
			value: 'new_deaths'
		});
	}
	if (app.total_deaths_per_million) {
		tableConfig.push({
			text: 'Total deaths per 1M',
			value: 'total_deaths_per_million'
		});
	}
	if (app.total_tests) {
		tableConfig.push({
			text: 'Total tests',
			value: 'total_tests'
		});
	}
	if (app.new_tests) {
		tableConfig.push({
			text: 'New tests',
			value: 'new_tests'
		});
	}
	if (app.positive_rate) {
		tableConfig.push({
			text: 'Positive rate',
			value: 'positive_rate'
		});
	}
	if (app.total_tests_per_thousand) {
		tableConfig.push({
			text: 'Total tests per 1k',
			value: 'total_tests_per_thousand'
		});
	}
	if (app.total_vaccinations) {
		tableConfig.push({
			text: 'Total vaccinations',
			value: 'total_vaccinations'
		});
	}
	if (app.new_vaccinations) {
		tableConfig.push({
			text: 'New vaccinations',
			value: 'new_vaccinations'
		});
	}
	if (app.total_vaccinations_per_hundred) {
		tableConfig.push({
			text: 'Vaccination per 100',
			value: 'total_vaccinations_per_hundred'
		});
	}
	if (app.median_age) {
		tableConfig.push({
			text: 'Median age',
			value: 'median_age'
		});
	}
	if (app.life_expectancy) {
		tableConfig.push({
			text: 'Life expectancy',
			value: 'life_expectancy'
		});
	}
	if (app.aged_65_older) {
		tableConfig.push({
			text: 'Aged 65+',
			value: 'aged_65_older'
		});
	}
	if (app.hospital_beds_per_thousand) {
		tableConfig.push({
			text: 'Hospital beds per 1k',
			value: 'hospital_beds_per_thousand'
		});
	}
	if (app.human_development_index) {
		tableConfig.push({
			text: 'HDI',
			value: 'human_development_index'
		});
	}
	if (app.population) {
		tableConfig.push({
			text: 'Population',
			value: 'population'
		});
	}
	if (app.population_density) {
		tableConfig.push({
			text: 'Population density',
			value: 'population_density'
		});
	}
	if (app.diabetes_prevalence) {
		tableConfig.push({
			text: 'Diabetes prevalence',
			value: 'diabetes_prevalence'
		});
	}
	if (app.handwashing_facilities) {
		tableConfig.push({
			text: 'Handwashing facilities',
			value: 'handwashing_facilities'
		});
	}
	if (app.gdp_per_capita) {
		tableConfig.push({
			text: 'GDP per capita',
			value: 'gdp_per_capita'
		});
	}

	app.headers = tableConfig;
}
