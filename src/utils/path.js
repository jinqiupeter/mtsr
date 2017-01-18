export function basename(path) {
  let m = path.match(/[^/]+$/);
  return m ? m[0] : '';
}
