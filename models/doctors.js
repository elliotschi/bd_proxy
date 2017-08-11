const client = require('../elasticsearchClient');

const INDEX_NAME = 'doctors';

const createIndex = () => client.indices.create({index: INDEX_NAME});

const indexExists = () => client.indices.exists({index: INDEX_NAME});

exports.createIndexIfNotExists = () => {
    return indexExists()
        .then(doesIndexExist => {
            if (!doesIndexExist) {
                return createIndex();
            }
            return;
        });
};

const addDocument = (document) => client.index({
    index: INDEX_NAME,
    type: 'document',
    body: document,
});

const findDocumentBySlug = (doctorSlug) => client.search({
    index: INDEX_NAME,
    body: {
        query: {
            match: {'profile.slug': doctorSlug},
        },
    },
}).then(response => response.hits.hits);

exports.addDocumentIfNotExists = (document) => {
    return findDocumentBySlug(document.profile.slug)
        .then(documents => documents.length > 0)
        .then(documentExists => {
            if (!documentExists) {
                return addDocument(document);
            }
            return;
        });
};
