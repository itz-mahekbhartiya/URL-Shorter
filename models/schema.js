const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: {
        type : 'string',
        required: true,
    },
    shortened_url: {
        type : 'string',
        required: true,
        unique : true,
    },
    visit_history: [{ timestamps:
       { type : Number }
    },
]}, {timestamps: true});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;