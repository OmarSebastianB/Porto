import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const COOKIE_NAME = 'portfolio_editor'
const MAX_AGE = 60 * 60 * 24 * 365 // 1 year

export async function POST(request: NextRequest) {
  const secret = process.env.EDIT_SECRET
  if (!secret) {
    return Response.json({ ok: false, error: 'Not configured' }, { status: 503 })
  }
  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'Invalid body' }, { status: 400 })
  }
  if (body.password !== secret) {
    return Response.json({ ok: false, error: 'Wrong password' }, { status: 401 })
  }
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  })
  return Response.json({ ok: true })
}
