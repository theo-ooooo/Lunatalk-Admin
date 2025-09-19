const categoriesKey = {
  all: ['categories'],
  detail: (categoryId: number) => [categoriesKey.all, 'category', categoryId],
}

export default categoriesKey
