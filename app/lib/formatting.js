export function formatCode(code) {
  //argument is a 12-digit number, and I want to return it as a string with dashes after 4 and 8 digits
  //e.g. 123456789012 -> "1234-5678-9012"
  if (code.length !== 12) {
    throw new Error("Code must be 12 digits");
  }
  return `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8)}`;
}
