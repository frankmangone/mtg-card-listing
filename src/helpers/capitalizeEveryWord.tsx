export const capitalizeEveryWord = (s: string) => {
  if (typeof s !== "string") return ""
  return s.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
}
