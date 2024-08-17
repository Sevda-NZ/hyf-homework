let total = 0;
let numbers = process.argv.slice(2).length;
if (numbers < 1) return console.log("it should be more than 1 arguments");
process.argv.slice(2).forEach((arg) => {
  if (isNaN(arg)) {
    console.log("Please write a number");
  }
  total += parseFloat(arg);
});

console.log("average", total / numbers);

// console.log(parseFloat("hello"));
