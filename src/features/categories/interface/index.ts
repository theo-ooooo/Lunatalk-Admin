export interface Category {
  categoryId: number
  categoryName: string
  status: string
  visibility: VISIBILITY
  productCount?: number
}

export enum VISIBILITY {
  HIDDEN = 'HIDDEN',
  VISIBLE = 'VISIBLE',
}
