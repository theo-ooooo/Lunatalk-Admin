const membersKey = {
  all: ['members'],
  detail: (memberId: number) => ['member', memberId],
  pagenation: (page: number) => ['members', page],
  ordersPagenation: (memberId: number, page: number) => ['member', memberId, 'orders', page],
}

export default membersKey
