'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    Query: {

        novels: function novels() {
            return {
                name: 'The End',
                genres: ['Horror', 'Action', 'Romance'],
                chapters: [{ volume: 4.4 }]
            };
        }
    }
};