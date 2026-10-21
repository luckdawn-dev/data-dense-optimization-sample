const TONES: Record<string, string> = {
  // positivos
  paid: "green",
  delivered: "green",

  // em andamento
  authorized: "blue",
  processing: "blue",
  shipped: "blue",
  in_transit: "blue",
  picking: "blue",

  // aguardando
  pending: "yellow",
  high: "yellow",

  // negativos
  cancelled: "red",
  refunded: "red",
  voided: "red",
  returned: "red",
  urgent: "red",

  // neutros
  low: "gray",
  normal: "gray",
  not_started: "gray",
};

/** Retorna o tom de badge para um valor de status (default: gray). */
export function badgeTone(value: string | null): string {
  return TONES[value?.toLowerCase() ?? ""] ?? "gray";
}
