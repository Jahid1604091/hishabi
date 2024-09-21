export function convertToBanglaNumber(number) {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  
    const convertDigit = (digit) => banglaDigits[digit];
  
    return number?.toString().replace(/\d/g, (digit) => convertDigit(digit));
  }