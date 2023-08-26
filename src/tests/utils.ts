export function matchBrokenText(text: string) {
  return (_: string, el: Element | null) =>
    new RegExp(`^${text}$`, 'gi').test(el?.textContent ?? '');
}
