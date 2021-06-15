export default function areEqualValues(v1: any, v2: any): boolean {
  if (typeof v2 === 'object' && v2 !== null) {
    return v1 === v2;
  }

  return String(v1) === String(v2);
}
