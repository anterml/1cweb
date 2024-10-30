
import { read } from '$app/server';
// @ts-ignore
import { writeFile } from 'node:fs/promises';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const fileName = url.searchParams.get('fileName')
  try {
    const result = read(`/src/lib/types/${fileName}.ts`)
    return result
  } catch(e) {
    return new Response("")
  }
};

export const POST: RequestHandler = async ({ url, request }) => {
  const fileName = url.searchParams.get('fileName') || ''

  if(!fileName)
    return error(400, `fileName ${fileName} is missing.`)

  const text = await new Response(request.body).text()

  console.log("save code in file", fileName)
  console.log('body', text)

  //await writeFile(`./src/lib/types/${fileName}.ts`, text)
  await writeFile(`./src/lib/types/${fileName}.ts`, text)
  return new Response("ok")
};