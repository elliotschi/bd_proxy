const app = require('../app');
const request = require('supertest');

describe('app', () => {
    describe('/ index route', () => {
        it('has index route / that gives basic information', (done) => {
            request(app)
                .get('/')
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    expect(response.text).toBe('Proxying the BetterDoctor API. Go to /api/v1/doctors/search?name=[search string here].');
                    done();
                });
        });
    });

    describe('/api/v1/doctors/search?name=', () => {
        it('sends 400 when name is not preset', (done) => {
            request(app)
                .get('/api/v1/doctors/search')
                .then(response => {
                    expect(response.statusCode).toBe(400);
                    done();
                });
        });

        it('proxies to BD api when name is passed', (done) => {
            request(app)
                .get('/api/v1/doctors/search?name=elliot')
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    expect(response.body.data).toBeInstanceOf(Array);
                    expect(Object.keys(response.body.meta)).toEqual(['data_type', 'item_type', 'total', 'count', 'skip', 'limit']);
                    done();
                })
                .catch(console.error);
        });
    });

    describe('/* catch all route', () => {
        it('sends 404 on unknown requests', (done) => {
            request(app)
                .get('/random_route')
                .then(response => {
                    expect(response.statusCode).toBe(404);
                    done();
                });
        });
    });
});
