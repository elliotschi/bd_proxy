const doctorsController = require('../../controllers/doctors');
jest.mock('../../api/searchDoctorsByName');
jest.mock('../../models/doctors');
const searchDoctorsByName = require('../../api/searchDoctorsByName');
const doctorsModel = require('../../models/doctors');

describe('doctorsController', () => {
    describe('.doctorsSearch() handler', () => {
        afterEach(() => {
            searchDoctorsByName.mockClear();
            doctorsModel.addDocumentIfNotExists.mockClear();
        });

        it('calls res.json with the original response from searchDoctorsByName', (done) => {
            searchDoctorsByName.mockReturnValueOnce(Promise.resolve({
                body: {
                    data: [{
                        test: 'document',
                    }],
                },
            }));
            doctorsModel.addDocumentIfNotExists.mockReturnValue(Promise.resolve(true));
            const mockRes = {
                json: jest.fn(),
            };
            doctorsController.doctorsSearch({query: {name: 'randomName'}}, mockRes, () => {})
                .then(() => {
                    expect(mockRes.json).toHaveBeenCalledWith({
                        data: [{test: 'document'}],
                    });
                    done();
                });
        });

        it('calls addDocumentIfNotExists for every document from the request', (done) => {
            searchDoctorsByName.mockReturnValueOnce(Promise.resolve({
                body: {
                    data: [
                        {record: 1},
                        {record: 2},
                        {record: 3},
                        {record: 4},
                    ],
                },
            }));
            doctorsModel.addDocumentIfNotExists.mockReturnValue(Promise.resolve());
            doctorsController.doctorsSearch({query: {name: 'randomName'}}, {json: () => {}}, () => {})
                .then(() => {
                    expect(doctorsModel.addDocumentIfNotExists).toHaveBeenCalledTimes(4);
                    done();
                });
        });
    });

    it('calls next with an error when searchDoctorsByName fails and status code 400 when theres an error', (done) => {
        const next = jest.fn();
        searchDoctorsByName.mockReturnValueOnce(Promise.reject('This is an error message'));
        doctorsController.doctorsSearch({query: {name: 'randomName'}}, {json: () => {}}, next)
            .then(() => {
                const mockError = new Error('This is an error message');
                mockError.status = 400;
                expect(next).toHaveBeenCalledWith(mockError);
                done();
            });
    });

    it('calls next with an error when addDocumnetIfNotExists fails', (done) => {
        const next = jest.fn();
        searchDoctorsByName.mockReturnValueOnce(Promise.resolve({
            body: {
                data: [{
                    test: 'document',
                }],
            },
        }));
        doctorsModel.addDocumentIfNotExists.mockReturnValue(Promise.reject('This is an error message from adding document'));
        doctorsController.doctorsSearch({query: {name: 'randomName'}}, {json: () => {}}, next)
            .then(() => {
                const mockError = new Error('This is an error message from adding document');
                mockError.status = 400;
                expect(next).toHaveBeenCalledWith(mockError);
                done();
            });

    });
});
