const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const parse = async () => {
    const getHTML = async (url) => {
        const {data} = await axios.get(url) 
        return cheerio.load(data)
    }

    const $ = await getHTML('https://www.olx.uz/nedvizhimost/kvartiry/arenda-dolgosrochnaya/tashkent/?search%5Bfilter_float_price%3Afrom%5D=2300000&search%5Bfilter_float_price%3Ato%5D=2700000&page=1');

    const links = [];
     $('a.link.detailsLink').each(function(i) {
        links[i] = $(this).attr('href');
    });

    for (let i=1; i<links.length; i++) {
        const selector = await getHTML(
            `${links[i]}`
        );
        selector('.offer-details').each((i, element) => {
            const title = selector(element).find('.offer-details__value').text();
            const titleFirst = title[0];

            // fs.appendFileSync('./data.txt', `${titleFirst}\n`)
            console.log(titleFirst);
        });
        // fs.appendFileSync('./data.txt', `${links[i]}\n`)
        console.log(links[i]);

    }
    console.log(links.length);
    // console.log($.html());
}

parse();
