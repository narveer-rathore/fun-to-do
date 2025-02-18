export type SelectType = {
  defaultValue: string,
  onChange: (value: string) => void,
  name: string,
  labels: Record<string, string>,
  label: string,
  values: string[]
}


export type FilterSelectType = {
  defaultValue: string,
  onChange: (value: string) => void,
  extraOptions?: string[]
}
