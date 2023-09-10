export default function wait(ms = 666) {
  return new Promise((res) => setTimeout(res, ms));
}
