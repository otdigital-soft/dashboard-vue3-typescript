/**
 * Takes an object and order array and returns sorted keys of the object
 * @param data original object
 * @param sortOrder specific order
 * @returns sorted keys
 */
export const sortByCustomOrder = (data: object, sortOrder: string[]) => {
  return Object.keys(data).sort((a, b) => {
    if (!sortOrder.includes(a)) return 1
    if (!sortOrder.includes(b)) return -1
    return sortOrder.indexOf(a) - sortOrder.indexOf(b)
  })
}
