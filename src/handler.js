/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable semi */
const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const {
        name,
        year = Number,
        author,
        summary,
        publisher,
        pageCount = Number,
        readPage = Number,
        reading = Boolean
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;

    if (readPage === pageCount) {
        finished = true;
    }

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    };

    if (name === undefined || name === '') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    if (name !== undefined && readPage <= pageCount) {
        books.push(newBook);
        const isSuccess = books.filter((book) => book.id === id).length > 0;

        if (isSuccess) {
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id
                }
            });
            response.code(201);
            return response;
        }
    }

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan'
    });
    response.code(500);
    return response;
}

const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    if (name !== undefined) {
        const filteredBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        if (filteredBooks.length > 0) {
            const response = h.response({
                status: 'success',
                message: `Berhasil mengambil ${filteredBooks.length} buku`,
                data: {
                    books: filteredBooks.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher
                    }))
                }
            });
            response.code(200);
            return response;
        } else {
            const response = h.response({
                status: 'fail',
                message: 'Buku tidak ditemukan'
            });
            response.code(404);
            return response;
        }
    }

    if (reading !== undefined) {
        if (reading == 0) {
            const filteredBooks = books.filter((book) => book.reading === false);
            if (filteredBooks.length > 0) {
                const response = h.response({
                    status: 'success',
                    message: `Berhasil mengambil ${filteredBooks.length} buku`,
                    data: {
                        books: filteredBooks.map((book) => ({
                            id: book.id,
                            name: book.name,
                            publisher: book.publisher
                        }))
                    }
                })
                response.code(200);
                return response;
            } else {
                const response = h.response({
                    status: 'fail',
                    message: 'Buku tidak ditemukan'
                });
                response.code(404);
                return response;
            }
        } else {
            const filteredBooks = books.filter((book) => book.reading === true);
            if (filteredBooks.length > 0) {
                const response = h.response({
                    status: 'success',
                    message: `Berhasil mengambil ${filteredBooks.length} buku`,
                    data: {
                        books: filteredBooks.map((book) => ({
                            id: book.id,
                            name: book.name,
                            publisher: book.publisher
                        }))
                    }
                })
                response.code(200);
                return response;
            } else {
                const response = h.response({
                    status: 'fail',
                    message: 'Buku tidak ditemukan'
                });
                response.code(404);
                return response;
            }
        }
    }

    if (finished !== undefined) {
        if (finished == 0) {
            const filteredBooks = books.filter((book) => book.finished === false);
            if (filteredBooks.length > 0) {
                const response = h.response({
                    status: 'success',
                    message: `Berhasil mengambil ${filteredBooks.length} buku`,
                    data: {
                        books: filteredBooks.map((book) => ({
                            id: book.id,
                            name: book.name,
                            publisher: book.publisher
                        }))
                    }
                })
                response.code(200);
                return response;
            } else {
                const response = h.response({
                    status: 'fail',
                    message: 'Buku tidak ditemukan'
                });
                response.code(404);
                return response;
            }
        } else {
            const filteredBooks = books.filter((book) => book.finished === true);
            if (filteredBooks.length > 0) {
                const response = h.response({
                    status: 'success',
                    message: `Berhasil mengambil ${filteredBooks.length} buku`,
                    data: {
                        books: filteredBooks.map((book) => ({
                            id: book.id,
                            name: book.name,
                            publisher: book.publisher
                        }))
                    }
                })
                response.code(200);
                return response;
            } else {
                const response = h.response({
                    status: 'fail',
                    message: 'Buku tidak ditemukan'
                });
                response.code(404);
                return response;
            }
        }
    }

    const response = h.response({
        status: 'success',
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        }
    })
    return response;
};

const getBookByIdhandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((n) => n.id === bookId)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book
            }
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });

    response.code(404);
    return response;
}

const editBookByIdhandler = (request, h) => {
    const { bookId } = request.params;

    const {
        name,
        year = Number,
        author,
        summary,
        publisher,
        pageCount = Number,
        readPage = Number,
        reading = Boolean
} = request.payload;

    const updatedAt = new Date().toISOString();
    let finished = false;

    if (readPage === pageCount) {
        finished = true;
    }

    if (name === undefined || name === '') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    if (name !== undefined && readPage <= pageCount) {
        const index = books.findIndex((book) => book.id === bookId);
        if (index !== -1) {
            books[index] = {
                ...books[index],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                finished,
                reading,
                updatedAt
            };

            const response = h.response({
                status: 'success',
                message: 'Buku berhasil diperbarui'
            });
            response.code(200);
            return response;
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });

    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil dihapus'
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    });

    response.code(404);
    return response;
}

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdhandler, editBookByIdhandler, deleteBookByIdHandler };
