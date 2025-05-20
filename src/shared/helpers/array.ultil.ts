/* eslint-disable */
export function removeElementFirst(arrayItems: any[]): any[] {
  return arrayItems.filter((_, index) => index !== 0);
}

export function removeElementLast(arrayItems: any[]): any[] {
  return arrayItems.filter((_, index) => index !== arrayItems.length - 1);
}

export function removeElementAtIndex(arrayItems: any[], atIndex: number): any[] {
  return arrayItems.filter((_, index) => index !== atIndex);
}
