export function validateFields(cin, pin) {
  if (cin.length !== 21) {
    return {
      error: `Invalid CIN: ${cin}. CIN should be exactly 21 characters.`,
    };
  }
  if (pin.length !== 6) {
    return {
      error: `Invalid PIN: ${pin}. PIN should be exactly 6 characters.`,
    };
  }
  return null;
}
