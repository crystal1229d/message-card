import { createImagePrompt } from '@/src/lib/prompt/image'
import { NextResponse, NextRequest } from 'next/server'
import OpenAI from 'openai'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
console.log('openai', openai)
export async function POST(req: NextRequest) {
  const { keyword, color, style, additionalDescription } = await req.json()

  try {
    if (!keyword || keyword.length === 0) throw new Error('No Image keyword')
    if (!color || color.length === 0) throw new Error('No Image color')
    if (!style || style.length === 0) throw new Error('No Image style')

    if (keyword?.length > 20) throw new Error('Image keyword is too long')
    if (color?.length > 20) throw new Error('Image color is too long')
    if (style?.length > 20) throw new Error('Image style is too long')
    if (color?.length > 20) throw new Error('Image color is too long')
    if (additionalDescription?.length > 50)
      throw new Error('Image Description is too long')

    const prompt = createImagePrompt
      .replace('[$keyword]', keyword ?? 'Christmas')
      .replace('[$color]', color ?? 'green')
      .replace('[$style]', style ?? 'Oil Painting')
      .replace('[$additionalDescription]', additionalDescription ?? '')
    console.log('prompt ', prompt)
    const response = await openai.images.generate({
      model: 'dall-e-3',
      n: 1,
      size: '1024x1024',
      prompt,
    })
    console.log('response', response)
    return new NextResponse(JSON.stringify(response), { status: 200 })
  } catch (err) {
    console.log('err ', err)
    return new NextResponse('Sever Error', { status: 500 })
  }
}
