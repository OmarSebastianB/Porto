import { cookies } from 'next/headers'

const COOKIE_NAME = 'portfolio_editor'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  return Response.json({ ok: true })
}
