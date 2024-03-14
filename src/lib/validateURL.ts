export default function validateURL(url?: string | null): boolean {
  return !!url && /^http(s)?:\/\/[^./]*(\.[^./]+)+$/.test(url);
}
