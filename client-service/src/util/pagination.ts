export const paginate = (arr, page = 1, limit =10) => {
    const offset = limit * (page - 1);
    const paginatedItems = arr.slice(offset, limit * page);
    const totalPages = Math.ceil(arr.length / limit);
    return {
        previousPage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: arr.length,
        totalPages: totalPages,
        items: paginatedItems
    };
}
