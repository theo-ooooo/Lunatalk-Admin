export const productsKey = {
  all: ({ page, productName }: { page: number; productName?: string }) => ['products', page, productName],
  detail: (productId: number) => ['product', productId],
}
