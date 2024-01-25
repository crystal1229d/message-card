import { createImagePrompt } from '@/src/lib/prompt/image'
import { NextRequest, NextResponse } from 'next/server'

type KarloImageFormat = 'webp' | 'jpeg' | 'png' // 이미지 파일 형식, 다음 중 하나 webp, jpeg, png (기본값: webp)
type KarloScale = 2 | 4 // 확대 배율, 2 또는 4 중 하나 (기본값: 2)
type KarloReturnType = 'url' | 'base64_string' // 결과 반환 형식, 다음 중 하나 url, base64_string (기본값: url)
type KarloScheduler = 'decoder_ddim_v_prediction' | 'decoder_ddpm_v_prediction' // 디코더를 통한 노이즈 제거 단계에서 사용할 스케줄러 다음 중 1 (기본값: decoder_ddim_v_prediction), decoder_ddpm_v_prediction
type KarloSamples = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 // 생성할 이미지 수 (기본값: 1, 최소: 1, 최대: 8)

interface KarloResponseBase {
  id: string
  model_version: string
}
interface CreateImageByKarloParams {
  prompt?: string // 이미지를 묘사하는 제시어, 영문만 지원 (최대: 256자)
  negative_prompt?: string // 	이미지 생성 시 제외할 요소를 묘사하는 부정 제시어, 영문만 지원 (최대: 256자)
  width?: number // 	이미지 가로 크기, 8의 배수여야 함 (단위: 픽셀, 기본값: 512, 최소: 384, 최대 640)
  height?: number // 	이미지 세로 크기, 8의 배수여야 함 (단위: 픽셀, 기본값: 512, 최소: 384, 최대 640)
  upscale?: boolean // 이미지 크기 확대 여부 true: 확대 false: 확대하지 않음
  scale?: KarloScale
  image_format?: KarloImageFormat // 이미지 파일 형식, 다음 중 하나 webp, jpeg, png (기본값: webp)
  image_quality?: number // 이미지 품질 (기본값: 70, 최소: 1, 최대: 100)
  samples?: KarloSamples
  return_type?: KarloReturnType // 결과 반환 형식, 다음 중 하나 url, base64_string (기본값: url)
  prior_num_inference_steps?: number // 이미지 생성 과정의 노이즈 제거 단계 수 (기본값: 25, 최소: 10, 최대 100)
  prior_guidance_scale?: number // 이미지 생성 과정의 노이즈 제거 척도 (기본값: 5.0, 최소: 1.0, 최대 20.0)
  num_inference_steps?: number // 디코더를 통한 노이즈 제거 단계 수 (기본값: 50, 최소: 10, 최대 100)
  guidance_scale?: number // 디코더를 통한 노이즈 제거 척도 (기본값: 5.0, 최소: 1.0, 최대 20.0)
  scheduler?: KarloScheduler
  seed?: number[] // 각 이미지 생성 작업에 사용할 시드(Seed) 값, 생성할 이미지 수와 같은 길이의 배열이어야 함, 0 이상 4,294,967,295 이하 숫자로 구성,  파라미터 미사용 시 무작위(Random) 시드 값으로 이미지 생성 (기본값: null)
  nsfw_checker?: boolean // 생성할 이미지에 대한 NSFW 검사하기 수행 여부 true: 확인 false: 확인하지 않음 (기본값: false)
}
interface CreateImageByKarloResponse extends KarloResponseBase {
  images: Array<{
    id: string
    seed: number
    image: string
  }>
}

export const POST = async (req: NextRequest) => {
  const { keyword, color, style, additionalDescription } = await req.json()

  try {
    if (!keyword || keyword.length === 0) throw new Error('No Image keyword')
    if (!color || color.length === 0) throw new Error('No Image color')
    if (!style || style.length === 0) throw new Error('No Image style')

    if (keyword?.length > 20) throw new Error('Image keyword is too long')
    if (color?.length > 20) throw new Error('Image color is too long')
    if (style?.length > 20) throw new Error('Image style is too long')
    if (color?.length > 20) throw new Error('Image color is too long')
    if (additionalDescription?.length > 100)
      throw new Error('Image Description is too long')

    const prompt = createImagePrompt
      .replace('[$keyword]', keyword ?? 'Christmas')
      .replace('[$color]', color ?? 'green')
      .replace('[$style]', style ?? 'Oil Painting')
      .replace('[$additionalDescription]', additionalDescription ?? '')

    const response = await fetch(
      'https://api.kakaobrain.com/v2/inference/karlo/t2i',
      {
        method: 'POST',
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PubliC_KAKAO_RESTAPI_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          image_format: 'png',
          height: 384,
          width: 384,
        }),
      },
    )

    if (!response.ok) {
      throw new Error(
        `Kakao API request failed with status: ${response.status}`,
      )
    }
    const responseBody = await response.json()
    const imagesData = (responseBody as CreateImageByKarloResponse).images
    return new NextResponse(JSON.stringify(responseBody), { status: 200 })
  } catch (error) {
    return new NextResponse('Sever Error', { status: 500 })
  }
}

/*
import { createImagePrompt } from '@/src/lib/prompt/image'
import { NextResponse, NextRequest } from 'next/server'
import OpenAI from 'openai'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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
*/
