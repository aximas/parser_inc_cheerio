const axios = require('axios');
const cheerio = require('cheerio');

const parse = async () => {
    const getHTML = async (url) => {
        const {
            data
        } = await axios.get(url)
        return cheerio.load(data)
    }

    const $ = await getHTML('https://www.olx.uz/obyavlenie/sdaetsya-kvartira-svoya-na-hudozhnikah-metro-gorkogo-ID1Eh9o.html');

    const links = [];
    $('.offer-details__value').each(function (i) {
        links[i] = $(this).text();
    });

    console.log(links[0]);


}

parse();