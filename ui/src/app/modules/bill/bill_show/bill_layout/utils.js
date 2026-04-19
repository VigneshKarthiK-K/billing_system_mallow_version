function getReturnDenominations({paidAmount, netPrice}) {
  if (paidAmount < netPrice) {
    return false;
  }

  let change = paidAmount - netPrice;

  const notes = [500, 200, 100, 50, 20, 10, 5, 2, 1];
  const deno_object = {};

  for (let note of notes) {
    if (change >= note) {
      const count = Math.floor(change / note);
      deno_object[note] = count;
      change = change % note;
    }
  }

  return deno_object;
}

export { getReturnDenominations }