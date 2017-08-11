const validateQueryString = require('../../routes/validateQueryString');

describe('validateQueryString()', () => {
    it('calls next with empty array when req.query is valid', () => {
        const next = jest.fn();
        const mockReq = {
            query: {
                fieldICareAbout: 'yay',
            },
        };
        const validator = validateQueryString(['fieldICareAbout']);
        validator(mockReq, null, next);
        expect(next).toHaveBeenCalledWith();
    });

    it('calls next with error when req.query is invalid', () => {
        const next = jest.fn();
        const mockReq = {
            query: {
                randomField: 'what?',
            },
        };
        const validator = validateQueryString(['fieldICareAbout']);
        validator(mockReq, null, next);
        expect(next).toHaveBeenCalledWith(new Error('Must supply fieldICareAbout in query params'));
    });
});
