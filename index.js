const axios = require('axios')
const cheerio = require('cheerio')
const COMP_URL = 'https://kmvv.be/ploegen/reeks-a/de-jackies'

const matches = [];

axios.get(COMP_URL).then((response) => {
        // `response` is an HTTP response object, whose body is contained in it's `data` attribute
        
        // This will print the HTML source code to the console
        const $ = cheerio.load(response.data);
        


        $('.ploegcalendar-list li').each(function(index,element)  {
        	const beker = $(element).hasClass('beker');
        	const nr = $(element).find('span.cal-nr').text();
        	const date = $(element).find('span.cal-date').text();
        	const lea = $(element).find('span.cal-league').text();
        	const time = $(element).find('span.cal-time').text();
			const homeT = $(element).find('span.cal-place1').text();
        	const outT = $(element).find('span.cal-place2').text();

        	const subject = `${homeT} vs ${outT} @ ${lea}`;

        	const line = `${subject};${date};${time};`

        	console.log(line);


        })





})