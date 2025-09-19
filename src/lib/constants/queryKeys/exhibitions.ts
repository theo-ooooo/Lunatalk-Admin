export const exhibitionsQueryKey = {
  all: ['exhibitions'],
  detail: (id: number) => [...exhibitionsQueryKey.all, 'detail', id],
}

export const exhibitionKeys = exhibitionsQueryKey
