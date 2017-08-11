const request = require('request');

const DOCTORS_API_URL = 'https://api.betterdoctor.com/2016-03-01/doctors';

const searchDoctorsByName = (name) => {
    return new Promise((resolve, reject) => {
        request({
            url: DOCTORS_API_URL,
            method: 'GET',
            json: true,
            qs: {
                user_key: process.env.API_USER_KEY,
                name,
            },
        }, (error, response, body) => {
            if (error) {
                return reject(error);
            }
            resolve(response);
        });
    });
};

module.exports = searchDoctorsByName;
