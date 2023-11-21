export function upgradeAllValueInObj<T>(arr: Array<T>, newValue: string, index: number): Array<T> {
  const object = arr[index]

  for (const key in object) {
    object[key as keyof T] = newValue as T[Extract<keyof T, string>]
  }

  return [object, ...arr]
}
