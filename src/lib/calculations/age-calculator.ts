/**
 * Calculates age based on birth date
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if birthday has occurred this year
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}

/**
 * Calculates length of service between join date and retirement date
 */
export function calculateLengthOfService(
  joinDate: Date,
  retireDate: Date
): number {
  const years = retireDate.getFullYear() - joinDate.getFullYear();
  const months = retireDate.getMonth() - joinDate.getMonth();

  if (months < 6) return years;
  return years + 0.5;
}

/**
 * Converts a number to a formatted string with Indian number system
 */
export function formatCurrency(number: number): string {
  if (number <= 999) return number.toString();

  if (number <= 99999) return `${(number / 1000).toFixed(2)} thousand`;

  if (number <= 9999999) return `${(number / 100000).toFixed(2)} lakh`;

  if (number <= 999999999) return `${(number / 10000000).toFixed(2)} crore`;

  return `${(number / 1000000000).toFixed(2)} arab`;
}

/**
 * Finds the closest higher value in an array
 */
export function findClosestHigherValue(arr: number[], target: number): number {
  let closest = Infinity;

  for (const num of arr) {
    if (num > target && num < closest) {
      closest = num;
    }
  }

  return closest;
}
