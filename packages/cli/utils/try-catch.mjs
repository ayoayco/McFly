export function tryCatch(fn) {
  let error;
  try {
    fn();
  } catch (e) {
    error = e;
  }
  return error;
}
