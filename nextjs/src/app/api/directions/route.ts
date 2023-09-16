import {NextRequest, NextResponse} from 'next/server'

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const sourceId = url.searchParams.get('sourceId');
  const destinationId = url.searchParams.get('destinationId');
  const response = await fetch(`${process.env.API_URL}directions?sourceId=${sourceId}&destinationId=${destinationId}`, {
    next: {
      revalidate: 300,
    },
  });
  return NextResponse.json(await response.json());
}