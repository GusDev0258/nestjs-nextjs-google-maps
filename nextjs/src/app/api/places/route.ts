import {NextRequest, NextResponse} from 'next/server'

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');
  const response = await fetch(`${process.env.API_URL}places?search=${search}`, {
    next: {
      revalidate: 60,
    },
  });
  return NextResponse.json(await response.json());
}