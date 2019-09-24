const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');
const COMP_URL = 'https://kmvv.be/ploegen/reeks-a/de-jackies'

const lines = [];
const seperator = ',';

axios.get(COMP_URL).then((response) => {
        // `response` is an HTTP response object, whose body is contained in it's `data` attribute
        
        // This will print the HTML source code to the console
        const $ = cheerio.load(response.data);
        


        $('.ploegcalendar-list li').each(function(index,element)  {
        	if(index){


			const splitter = ':';

        	const beker = $(element).hasClass('beker');

        	const nr = $(element).find('span.cal-nr').text();
        	const date = $(element).find('span.cal-date').text();
        	const lea = $(element).find('span.cal-league').text();
        	let time = $(element).find('span.cal-time').text();
        	if(beker){
        		time = time.replace('.',':');
        	}
			const homeT = $(element).find('span.cal-place1').text();
        	const outT = $(element).find('span.cal-place2').text();

        	const matchEndTime = `${Number(time.split(splitter)[0])+1}:${time.split(splitter)[1]}`;


        	const subject = `${nr}: ${homeT} vs ${outT} @ ${lea} ${beker?' (BEKER)':''}`;
        	const line = `${subject}${seperator}${date}${seperator}${time}${seperator}${date}${seperator}${matchEndTime}${seperator}false${seperator}${subject}${seperator}${lea}${seperator}false\r\n`

        	lines.push(line)
        }


        });

        //empty file:
        fs.writeFile('test.txt', `Subject${seperator}Start Date${seperator} Start Time${seperator} End Date${seperator} End Time${seperator} All Day Event${seperator} Description${seperator} Location${seperator} Private \r\n`, (err)=>{
        	if(err){
        		return console.log(err);
        	}
        	console.log('saved ... ');

        	lines.forEach(line => {





		fs.appendFile("test.txt", line, function(err) {
    	if(err) {
        return console.log(err);
    	}

    	console.log("The file was saved!");
		});
        });
        	
        });

        

})