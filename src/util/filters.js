export const capitalize = function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const trim = function (value) {
  if (!value) return ''
  return value.toString().trim()
}
