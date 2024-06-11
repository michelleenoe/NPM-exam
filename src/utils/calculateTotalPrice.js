import prices from "@/components/backend/settings";

export function calculateTotalPrice(ticketQuantity, ticketType, campingOptions) {
  const ticketPrice = ticketQuantity * prices[ticketType];
  const addOnPrice = 
    (campingOptions.greenCamping ? prices.greenCamping : 0) +
    (campingOptions.twoPersonTent || 0) * prices.TwoPersonsTent +
    (campingOptions.threePersonTent || 0) * prices.ThreePersonsTent;
    
  return ticketPrice + addOnPrice + prices.fee;
}

//mere overskueligt 

// import  prices  from "@/components/backend/settings";

// export function calculateTotalPrice(ticketQuantity, ticketType, campingOptions) {
//   const ticketPrice = ticketQuantity * (ticketType === "regular" ? prices.regular : prices.vip);
//   const addOnPrice =
//     (campingOptions.greenCamping ? prices.greenCamping : 0) +
//     campingOptions.twoPersonTent * prices.TwoPersonsTent +
//     campingOptions.threePersonTent * prices.ThreePersonsTent;
//   return ticketPrice + addOnPrice + prices.fee;
// }

//kan det skrives nemmere?
