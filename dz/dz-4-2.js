function cesar(str, shift, action) {
    const alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    const alphabetLength = alphabet.length;
    const normalizedShift = ((shift % alphabetLength) + alphabetLength) % alphabetLength;
    const shiftedAlphabet =
      action === 'decode'
        ? alphabet.slice(normalizedShift) + alphabet.slice(0, normalizedShift)
        : alphabet.slice(-normalizedShift) + alphabet.slice(0, -normalizedShift);
    let result = '';
  
    for (let i = 0; i < str.length; i++) {
      const char = str[i].toLowerCase();
      const index = alphabet.indexOf(char);
  
      if (index === -1) {
        result += str[i];
      } else {
        const shiftedChar = shiftedAlphabet[index];
        result += str[i] === str[i].toUpperCase() ? shiftedChar.toUpperCase() : shiftedChar;
      }
    } 
    return result;
  }