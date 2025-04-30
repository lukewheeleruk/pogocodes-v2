export function formatCode(code) {
  //argument is a 12-digit number, and I want to return it as a string with dashes after 4 and 8 digits
  //e.g. 123456789012 -> "1234-5678-9012"
  if (code.length !== 12) {
    throw new Error("Code must be 12 digits");
  }
  return `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8)}`;
}

export function formatTeamNameForBadge(team) {
  //argument is a string, and I want to return it as a string with the first letter capitalized
  //e.g. "valor" -> "Valor"
  if (!team) {
    return null;
  }
  //I want a switch statement here, if team is "valor", return "V", if team is "mystic", return "M", if team is "instinct", return "I"
  switch (team) {
    case "valor":
      return "V";
    case "mystic":
      return "M";
    case "instinct":
      return "I";
    default:
      return null;
  }
}
