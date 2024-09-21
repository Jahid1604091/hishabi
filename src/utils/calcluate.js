// import { paperPrices } from "../data";

function check(A, B, a, b) {
  return A >= a && B >= b;
}

function calculatePerPageSheet(w, l, W, L) {
  /// always take L >= W && l >= w
  let tot1 = 0,
    tot2 = 0;
  let x = Math.floor(L / l); //floor
  let y =  Math.floor(W / w); //flooor
  let L1 = L % l;
  tot1 = x * y;
  if (check(L1, W, w, l)) {
    x = L1 / w;
    y = W / l;
    tot1 += x * y;
  }
  if (check(L, W, w, l)) {
    x =  Math.floor(L / w);
    y =  Math.floor(W / l);
    let W1 = W % l;
    tot2 = x * y;
    if (check(L, W1, l, w)) {
      x = L / l;
      y = W1 / w;
      tot2 += x * y;
    }
  }

  return Math.max(tot1, tot2);
}

export const calculateSheetCost = (
  width,
  height,
  amount,
  width1,
  height1,
  paperType,
  paperPrices
) => {
  let usedPaperSize = Number(width1 * height1);
  let usedPaperSizeInString = `${width1}*${height1}`;

  
  const perPage = Math.floor(calculatePerPageSheet(width, height, width1, height1)) || 0;
  const sheetNeeded = Number(amount / perPage) || 0;

  //calcute per sheet price
  const data = paperPrices?.find(
    (paper) => paper.type == paperType && paper.size == usedPaperSizeInString
  );

  if(data){
    const perSheetPrice = data.price / 500;
    const totalSheetCost = Number(perSheetPrice * sheetNeeded) || 0;
    return { sheetCost: totalSheetCost, perPage, sheetNeeded };
  }
  else{
    return 0;
  }

};
