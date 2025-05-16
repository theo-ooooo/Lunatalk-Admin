export interface PageResponse<T> {
  content: T
  totalPages: number
  totalElements: number
  number: number
  size: number
  first: boolean
  last: boolean
}

export enum VISIBILITY {
  HIDDEN = 'HIDDEN',
  VISIBLE = 'VISIBLE',
}
