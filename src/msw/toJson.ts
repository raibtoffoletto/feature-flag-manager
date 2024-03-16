export default function toJson(obj: object) {
  return new Response(JSON.stringify(obj), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
