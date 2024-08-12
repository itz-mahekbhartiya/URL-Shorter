const urlSchema = require('../models/schema');
const baseUrl = "http://short.url/";


function shortUrl() {
    // Generate a random string
    const randomString = Math.random().toString(36).substring(2, 8);
    // Append the current timestamp to ensure uniqueness
    const timestamp = Date.now().toString(36);
    return baseUrl + randomString + timestamp;
};

async function handleNewUrl(req, res) {
    const body = req.body;
    if (!body || !body.url) {
        return res.status(400).json({ msg: "All fields are req..." });
    }

    try {
        const result = await urlSchema.create({
            url: body.url,
            shortened_url: shortUrl(body.url),
            visit_history: [],
        });

        // console.log(urlSchema.findOne({ url: result.shortened_url}));
        return res.status(201).json({ msg: "Success!", url: result.shortened_url });
    }
    catch (err) { console.log(err) };


}

async function handleUrlData(req, res) {
    const body = req.body;
    if (!body || !body.shortUrl) {
        return res.status(400).json({ msg: "All fields are req..." });
    }

    try {
        const result = await urlSchema.findOne({
            shortened_url: body.shortUrl,
        });
        // console.log(urlSchema.findOne({ url: result.shortened_url}));
        return res.status(201).json({ msg: "Success!", url: result.url , data: result.visit_history });
    }
    catch (err) { console.log(err) };
}


module.exports = {
    handleNewUrl,
    handleUrlData,
};