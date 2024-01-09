function fibb(n) {
    if (n < 0 || n > 1000 || !Number.isInteger(n)) {
      throw new Error('Введите целое неотрицательное число до 1000');
    }
    if (n === 0) {
      return 0;
    }
    let a = 0;
    let b = 1;
    for (let i = 2; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  }