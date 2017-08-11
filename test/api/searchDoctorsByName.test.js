const searchDoctorsByName = require('../../api/searchDoctorsByName');
jest.mock('request');
const request = require('request');

describe('searchDoctorsByName()', () => {
	it('sends request to the correct url', (done) => {
		request.mockImplementationOnce((options, cb) => {
			cb(null, {body: {mock: 'request'}});
		});
		searchDoctorsByName('elliot')
			.then(() => {
				expect(request.mock.calls[0][0]).toEqual({
					url: 'https://api.betterdoctor.com/2016-03-01/doctors',
					method: 'GET',
					json: true,
					qs: expect.objectContaining({
						name: 'elliot',
					}),
				});
				done();
			});
	});

	it('returns an error if there is problem fetching', (done) => {
		request.mockImplementationOnce((optsion, cb) => {
			cb('Mock error');
		});
		searchDoctorsByName('error')
			.catch(err => {
				expect(err).toBe('Mock error');
				done();
			});
	});
});
