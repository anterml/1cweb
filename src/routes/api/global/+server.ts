
import { read } from '$app/server'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url }) => {
  const fileName = url.searchParams.get('fileName')

  try {
    const result = read(`/src/lib/snippets/${fileName}.ts`)
    return result
  } catch(e) {
    return new Response("")
  }
}