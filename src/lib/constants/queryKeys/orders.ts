export const ordersKey = {
  all: (queryString: string) => ['orders', queryString],
  detail: (orderNumber: string) => ['order', orderNumber],
}
