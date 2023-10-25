export function calculateTotalPages(totalItems: number): number {
  const itemsPerPage = 10;
  return Math.ceil(totalItems / itemsPerPage);
}

export function getPageSlice(currentPage: number): [number, number] {
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return [startIndex, endIndex];
}
