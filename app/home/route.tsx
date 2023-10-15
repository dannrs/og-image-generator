import { ImageResponse } from '@vercel/og'
import { ogHomeImageSchema } from '@/lib/og'

export const runtime = 'edge'

const interRegular = fetch(
  new URL('../../assets/fonts/Inter-Regular.ttf', import.meta.url)
).then(res => res.arrayBuffer())

const barlowBold = fetch(
  new URL('../../assets/fonts/Barlow-Bold.ttf', import.meta.url)
).then(res => res.arrayBuffer())

function capitalize(str: string): string {
  if (str.length === 0) {
    return str
  }

  const firstChar = str.charAt(0).toUpperCase()
  const restOfString = str.slice(1)

  return firstChar + restOfString
}

export async function GET(req: Request): Promise<ImageResponse> {
  try {
    const fontRegular = await interRegular
    const fontBold = await barlowBold

    const url = new URL(req.url)
    const values = ogHomeImageSchema.parse(Object.fromEntries(url.searchParams))
    const title =
      values.title.length > 140
        ? `${values.title.substring(0, 140)}...`
        : values.title
    const route = capitalize(values.route)
    const { mode } = values
    const paint = mode === 'dark' ? '#CECDC3' : '#100F0F'

    return new ImageResponse(
      (
        <div
          tw='flex relative flex-col p-12 min-h-screen w-full items-center justify-center'
          style={{
            color: paint,
            background: mode === 'dark' ? '#100F0F' : '#FFFCF0'
          }}
        >
          <div tw='flex flex-col items-center justify-center'>
            <svg
              width='224'
              height='224'
              viewBox='0 0 26 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='0.8'
                y='0.8'
                width='24.4'
                height='24.4'
                stroke={paint}
                stroke-width='0.4'
                rx={3}
              />
              <path
                d='M7 4C11.6863 6.34315 19 10 19 10L7 16L19 22'
                stroke={paint}
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
            <div
              tw='flex justify-center items-start text-4xl font-bold pl-2 pt-4 pb-2'
              style={{ fontFamily: 'Barlow', fontWeight: 'normal' }}
            >
              {values.route === 'home' ? '' : `${route} - `} {title}
            </div>
            <div
              tw='flex text-[1.68rem]'
              style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
            >
              danni.my.id{values.route === 'home' ? '' : `/${values.route}`}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontRegular,
            weight: 400,
            style: 'normal'
          },
          {
            name: 'Barlow',
            data: fontBold,
            weight: 700,
            style: 'normal'
          }
        ]
      }
    )
  } catch (error) {
    return new Response(`Failed to generated image`, { status: 500 })
  }
}
