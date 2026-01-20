'use client'

import { useNavigate } from 'react-router'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Member } from '../../interface/index'

export default function MemberTable({ members }: { members: Member[] }) {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800/50">
              <TableHead className="min-w-[60px] sm:w-[80px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">ID</TableHead>
              <TableHead className="min-w-[100px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">로그인ID</TableHead>
              <TableHead className="min-w-[100px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">닉네임</TableHead>
              <TableHead className="min-w-[150px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">이메일</TableHead>
              <TableHead className="min-w-[100px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">휴대폰번호</TableHead>
              <TableHead className="min-w-[140px] sm:w-[180px] font-semibold text-gray-700 dark:text-gray-300 text-xs sm:text-sm">가입일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member.memberId}
                onClick={() => navigate(`/members/${member.memberId}`)}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b"
              >
                <TableCell className="font-mono text-xs text-gray-500 dark:text-gray-400">#{member.memberId}</TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{member.username}</TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{member.nickname}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{member.email}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{member.phone}</TableCell>
                <TableCell className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {new Date(member.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
