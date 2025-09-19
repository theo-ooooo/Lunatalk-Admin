import type { Member } from '../../interface'

export default function MemberProfileCard({ member }: { member: Member }) {
  const fallbackImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

  return (
    <div className="flex gap-6 p-6 border rounded-2xl shadow-sm bg-white items-center">
      <img src={member.profileImgUrl || fallbackImage} alt="프로필 이미지" className="w-24 h-24 rounded-full object-cover border" />
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{member.nickname}</h2>
        <p className="text-sm text-muted-foreground">{member.username}</p>
        <p className="text-sm mt-1">전화번호: {member.phone}</p>
        <p className="text-sm">이메일: {member.email}</p>
        <p className="text-sm text-muted-foreground mt-1">가입일: {new Date(member.createdAt).toLocaleString()}</p>
      </div>
    </div>
  )
}
