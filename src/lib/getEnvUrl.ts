export default function getEnvUrl(url: string, path: string, key: string) {
  return `${url.replace(/\/*$/, '')}/${path.replaceAll('/', '')}/${key}`;
}
