


export type CategoryType = {
    id: number
    title: string
    parent_id: number
    category_id: number
    image: string | null
    link: string
    childrens?: CategoryType[]
  }