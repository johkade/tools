export function capitalizeFirst(s: string | undefined) {
  if (!s) return ""
  return s.charAt(0).toUpperCase() + s.slice(1)
}
