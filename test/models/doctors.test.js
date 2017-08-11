const doctorsModel = require('../../models/doctors');
jest.mock('../../elasticsearchClient');
const client = require('../../elasticsearchClient');

describe('doctorsModel', () => {
    describe('createIndexIfNotExists()', () => {
        it('calls client.indices.create when there is no index', (done) => {
            client.indices.create = jest.fn();
            client.indices.exists.mockReturnValueOnce(Promise.resolve(false))
            doctorsModel.createIndexIfNotExists()
                .then(() => {
                    expect(client.indices.create).toHaveBeenCalled();
                    done();
                });
        });

        it('does not call client.indices.create when there is already an index', (done) => {
            client.indices.create = jest.fn();
            client.indices.exists.mockReturnValueOnce(Promise.resolve(true));
            doctorsModel.createIndexIfNotExists()
                .then(() => {
                    expect(client.indices.create).not.toHaveBeenCalled();
                    done();
                });
        });
    });

    describe('addDocumentIfNotExists()', () => {
        it('calls client.index with a new document when the document does not exist', (done) => {
            client.search.mockReturnValueOnce(Promise.resolve({
                hits: {hits: []},
            }));
            client.index = jest.fn();
            doctorsModel.addDocumentIfNotExists({profile: {slug: 'does not exist'}})
                .then(() => {
                    expect(client.index).toHaveBeenCalledWith({
                        body: {
                            profile: {
                                slug: 'does not exist',
                            },
                        },
                        index: 'doctors',
                        type: 'document',
                    });
                    done();
                });
        });

        it('does not call client.index with a new document when the document already exists', (done) => {
            client.search.mockReturnValueOnce(Promise.resolve({
                hits: {hits: ['hit']},
            }));
            client.index = jest.fn();
            doctorsModel.addDocumentIfNotExists({profile: {slug: 'already exists'}})
                .then(() => {
                    expect(client.index).not.toHaveBeenCalled();
                    done();
                });
        });
    });
});
