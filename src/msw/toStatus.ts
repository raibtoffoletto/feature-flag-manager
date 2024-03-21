export default function toStatus(status = 200) {
  return new Response(undefined, { status });
}
