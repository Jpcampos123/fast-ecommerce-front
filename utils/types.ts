type Description = {
  content: string
  composition: string
  how_to_use: string
}

type Installments = {
  count: number
  value: number
}

type Variant = {
  value: string
  label: string
}

export type ProductItem = {
  name: string
  image: string
  uri: string
  value: number
  description?: Description
  installments?: Installments
  variants?: Variant[]
}
