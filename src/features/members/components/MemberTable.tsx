'use client'

import { useNavigate } from 'react-router'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Member } from '../interface/index'

export default function MemberTable({ members }: { members: Member[] }) {
  const navigate = useNavigate()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>로그인ID</TableHead>
          <TableHead>닉네임</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>휴대폰번호</TableHead>
          <TableHead>가입일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.memberId} onClick={() => navigate(`/members/edit/${member.memberId}`)} className="cursor-pointer hover:bg-muted transition-colors">
            <TableCell>{member.memberId}</TableCell>
            <TableCell>{member.username}</TableCell>
            <TableCell>{member.nickname}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{member.phone}</TableCell>
            <TableCell>{new Date(member.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
