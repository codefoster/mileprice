var MarketcheckCarsApi = require('marketcheck_cars_api');
require('dotenv').config();

var listingsApi = new MarketcheckCarsApi.ListingsApi()

let seattle = { latitude: 47.6, longitude: -122.34 };

var opts = {
    apiKey: process.env.MARKETCHECK_API_KEY,
    start: 1,
    latitude: seattle.latitude,
    longitude: seattle.longitude,
    radius: 200,
    rows: 50,
    year: '2007,2008,2009',
    bodyType: 'sedan',
    make: 'toyota',
    model: 'yaris',
    priceRange: '2000-7000'
};

listingsApi.search(opts, (err, data) => {
    let listings = data.listings
        .map(l => ({
            id: l.id,
            make: l.build.make,
            model: l.build.model,
            trim: l.build.trim,
            body: l.build.body_type,
            exteriorColor: l.exterior_color,
            interiorColor: l.interior_color,
            transmission: l.build.transmission,
            miles: l.miles,
            price: l.price,
            mileprice: l.miles * l.price,
            url: l.vdp_url
        }))
        .filter(l => l.mileprice)
        .sort((a, b) => b.mileprice - a.mileprice)
    console.log(JSON.stringify(listings, null, 2));
    console.log(`${data.num_found} results`);
    console.log(`${listings.length} displayed`);
})

