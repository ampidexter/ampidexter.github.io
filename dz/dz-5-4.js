function pluralizeRecords(n) {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error('Введите неотрицательное целое число');
    }
    let result = `В результате выполнения запроса было найдено ${n} `;
    if (n % 10 === 1 && n % 100 !== 11) {
      result += 'запись';
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      result += 'записи';
    } else {
      result += 'записей';
    }
    return result;
  }