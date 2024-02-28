export function numberFormat(number: number | string) {
  let numb: number = 0;
  if (typeof number === "string") {
    numb = parseFloat(number);
  } else {
    numb = number;
  }
  numb.toFixed(2);
  return numb.toLocaleString("en-US");
}
