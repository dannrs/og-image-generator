import { ImageResponse } from '@vercel/og'
import { ogBlogImageSchema } from '@/lib/og'

export const runtime = 'edge'

const interRegular = fetch(
  new URL('../../assets/fonts/Inter-Regular.ttf', import.meta.url)
).then(res => res.arrayBuffer())

const barlowBold = fetch(
  new URL('../../assets/fonts/Barlow-Bold.ttf', import.meta.url)
).then(res => res.arrayBuffer())

export async function GET(req: Request): Promise<ImageResponse> {
  try {
    const fontRegular = await interRegular
    const fontBold = await barlowBold

    const url = new URL(req.url)
    const values = ogBlogImageSchema.parse(Object.fromEntries(url.searchParams))
    const title =
      values.title.length > 140
        ? `${values.title.substring(0, 140)}...`
        : values.title
    const { mode } = values
    const paint = mode === 'dark' ? '#CECDC3' : '#100F0F'
    const fontSize = title.length > 100 ? '70px' : '100px'

    return new ImageResponse(
      (
        <div
          tw='flex relative flex-col p-12 w-full h-full items-start'
          style={{
            color: paint,
            background: mode === 'dark' ? '#100F0F' : '#FFFCF0'
          }}
        >
          <div tw='flex items-center justify-center'>
            <svg
              width='48'
              height='48'
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
            <span
              tw='flex justify-center items-start text-2xl font-bold pl-2'
              style={{ fontFamily: 'Barlow', fontWeight: 'normal' }}
            >
              Danni Ramdhani
            </span>
          </div>
          <div tw='flex flex-col flex-1 py-10'>
            <div
              tw='flex text-xl uppercase font-bold tracking-tight'
              style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
            >
              Blog Post
            </div>
            <div
              tw='flex leading-[1.1] text-[80px] font-bold'
              style={{
                fontFamily: 'Barlow',
                fontWeight: 'bold',
                marginLeft: '-3px',
                fontSize
              }}
            >
              {title}
            </div>
          </div>
          <div tw='flex items-center w-full justify-between'>
            <div
              tw='flex text-xl'
              style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
            >
              danni.my.id
            </div>
            <div
              tw='flex items-center text-xl'
              style={{ fontFamily: 'Inter', fontWeight: 'normal' }}
            >
              <svg width='32' height='32' viewBox='0 0 48 48' fill='none'>
                <path
                  d='M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8'
                  stroke={paint}
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M18 36c-9.02 4-10-4-14-4'
                  stroke={paint}
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
              <div tw='flex ml-2'>github.com/dannrs</div>
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
