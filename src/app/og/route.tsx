import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { baseURL, renderContent } from '@/app/resources'
import { getTranslations } from 'next-intl/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title') || 'Portfolio'

    // Fetch Inter font from Google Fonts
    const fontData = await fetch(
        'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZJhiI2B.woff2'
    ).then((res) => res.arrayBuffer())

    const t = await getTranslations()
    const { person } = renderContent(t)

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    padding: '8rem',
                    background: '#151515',
                    fontFamily: 'Inter',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4rem',
                        fontStyle: 'normal',
                        color: 'white',
                    }}
                >
                    <span
                        style={{
                            fontSize: '8rem',
                            fontWeight: 700,
                            letterSpacing: '-0.05em',
                            whiteSpace: 'pre-wrap',
                            textWrap: 'balance',
                        }}
                    >
                        {title}
                    </span>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5rem'
                        }}
                    >
                        <img 
                            src={'https://' + baseURL + person.avatar}
                            style={{
                                width: '12rem',
                                height: '12rem',
                                objectFit: 'cover',
                                borderRadius: '100%',
                            }}
                            alt={person.name}
                        />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem'
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '4.5rem',
                                    fontWeight: 700,
                                    whiteSpace: 'pre-wrap',
                                    textWrap: 'balance',
                                }}
                            >
                                {person.name}
                            </span>
                            <span
                                style={{
                                    fontSize: '3rem',
                                    fontWeight: 500,
                                    whiteSpace: 'pre-wrap',
                                    textWrap: 'balance',
                                    opacity: '0.6'
                                }}
                            >
                                {person.role}
                            </span>
                        </div>
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
                    data: fontData,
                    style: 'normal',
                    weight: 700
                }
            ]
        }
    )
}