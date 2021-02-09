const https = require('https');
const fs = require('fs');

let data = [];

function update() {
	https.get('https://covid.ourworldindata.org/data/owid-covid-data.json', (res) => {
		let body = "";

		res.on("data", (chunk) => {
			body += chunk;
		});

		res.on("end", () => {
			try {
				let json = JSON.parse(body);
				// do something with JSON

				data = Object.values(json).map(item => {
					const country = {};
					for (let prop in item) {
						if (prop != 'data') country[prop] = item[prop];
					}

					const cases = item.data.filter(item => item.total_cases > 1);
					for (let prop in cases[cases.length - 1]) {
						country[prop] = cases[cases.length - 1][prop];
					}

					const tests = item.data.filter(item => item.total_tests > 1);
					for (let prop in tests[tests.length - 1]) {
						if ((prop.indexOf('tests') >= 0) || (prop.indexOf('rate') >= 0)) country[prop] = tests[tests.length - 1][prop];
					}

					const vaccinations = item.data.filter(item => item.total_vaccinations > 1);
					for (let prop in vaccinations[vaccinations.length - 1]) {
						if (prop.indexOf('vaccinations') >= 0) country[prop] = vaccinations[vaccinations.length - 1][prop];
					}

					return country;
				});
				//fs.writeFileSync('data.json', JSON.stringify(data));

			} catch (error) {
				console.error(error.message);
			};
		});

	}).on("error", (error) => {
		console.error(error.message);
	});

}

update();

setInterval(update, 600000);


const http = require('http');
const url = require('url');

http.createServer((req,res)=>{
	res.writeHead(200,{'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'});
    res.write(JSON.stringify(data)); // Json to String Convert
    res.end();
    
}).listen(8000);
