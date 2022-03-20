/* eslint-disable indent */
const { addBookHandler, getAllBooksHandler, getBookByIdhandler, editBookByIdhandler, deleteBookByIdHandler } = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdhandler
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookByIdhandler
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler
    }
]

module.exports = routes
