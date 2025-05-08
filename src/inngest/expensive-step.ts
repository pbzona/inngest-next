export async function expensiveStep() {
  console.log("🤯 Doing something complicated");
  const arr = [];

  for (let i = 0; i < 100_000_000; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  const n = arr[Math.floor(Math.random() * arr.length)];
  console.log("🤯 Random number is ", n);
  return { randomNumber: n };
}