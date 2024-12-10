export default function getPaginationRange(numberOfPages = 0, currentPage = 0) {
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (numberOfPages > totalBlocks) {
        const leftSiblingIndex = Math.max(currentPage - 1, 1);
        const rightSiblingIndex = Math.min(currentPage + 1, numberOfPages);
        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, '...', numberOfPages];
        }

        if (currentPage >= numberOfPages - 3) {
            return [1, '...', numberOfPages - 4, numberOfPages - 3, numberOfPages - 2, numberOfPages - 1, numberOfPages];
        }

        return [1, '...', leftSiblingIndex, currentPage, rightSiblingIndex, '...', numberOfPages];
    }

    return Array.from({ length: numberOfPages }, (_, i) => i + 1);
};