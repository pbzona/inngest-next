export async function cheapStep() {
  console.log("😎 Doing something simple");
  const n = Math.floor(Math.random() * 100);
  return { randomNumber: n };
}