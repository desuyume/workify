export const isNumber = (num: number | string): boolean => {
  return typeof +num === 'number' && isFinite(+num)
}
