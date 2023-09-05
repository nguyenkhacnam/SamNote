import { NextResponse } from 'next/server'
 
export async function POST() {
  const res = await fetch('http://14.225.7.179:18011/register', {
  })
  const data = await res.json()
 
  return NextResponse.json({ data })
}