let mongoose = require('mongoose');

// create a model class
let Url = mongoose.Schema(
    {
        longUrl:
        {
            type: String,
            default: '',
            trim: true,
            required: 'targetUrl is required'
        },
        shortCode:
        {
            type: String,
            default: '',
            trim: true,
            required: 'shortenUrl is required'
        },
        created:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "shorturl"
    }
);

module.exports.Url = mongoose.model('shorturl', Url);