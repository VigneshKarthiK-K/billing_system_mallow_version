const getTotalAmount = (values) => {
    let total = 0;

    Object.entries(values).forEach(([key, val]) => {
      const count = Number(val) || 0;
      const denomination = Number(key);
      total += denomination * count;
    });

    return total
}

export { getTotalAmount }