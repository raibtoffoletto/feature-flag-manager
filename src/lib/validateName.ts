export default function validateName(name?: string | null): boolean {
  return !!name && name.length >= 3;
}
