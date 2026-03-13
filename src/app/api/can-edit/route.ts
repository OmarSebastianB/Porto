import { cookies } from 'next/headers'

const COOKIE_NAME = 'portfolio_editor'

export async function GET() {
  const secret = process.env.EDIT_SECRET
  if (!secret) {
    return Response.json({ canEdit: false })
  }
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const canEdit = token === secret
  return Response.json({ canEdit })
}
