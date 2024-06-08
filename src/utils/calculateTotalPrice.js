import  prices  from "@/components/backend/settings";

export function calculateTotalPrice(ticketQuantity, ticketType, campingOptions) {
  const ticketPrice = ticketQuantity * (ticketType === "regular" ? prices.regular : prices.vip);
  const addOnPrice =
    (campingOptions.greenCamping ? prices.greenCamping : 0) +
    campingOptions.twoPersonTent * prices.TwoPersonsTent +
    campingOptions.threePersonTent * prices.ThreePersonsTent;
  return ticketPrice + addOnPrice + prices.fee;
}

//kan det skrives nemmere?

