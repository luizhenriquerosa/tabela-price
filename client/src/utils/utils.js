export function toCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function toTaxFormat(value) {
  return `${value.toLocaleString("pt-BR")} %`;
}

export function toFormattedNumber(value) {
  return value.toLocaleString("pt-BR");
}

export function toMonthExtensive(value) {
  return `${value.toLocaleString("pt-BR")} meses`;
}
