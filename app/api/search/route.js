import { NextResponse } from 'next/server';
import { searchChapters } from '@/lib/content';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const results = searchChapters(q);
  return NextResponse.json({ results });
}
