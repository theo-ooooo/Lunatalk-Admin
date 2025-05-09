export interface Category {
  categoryId: number
  categoryName: string
  status: string
  visibility: VISIBILITY
}

export enum VISIBILITY {
  HIDDEN = 'HIDDEN',
  VISIBLE = 'VISIBLE',
}
