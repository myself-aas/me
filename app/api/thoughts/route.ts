import { NextResponse } from 'next/server';
import { getAllThoughts } from '@/lib/thoughts';

export async function GET() {
  const thoughts = getAllThoughts();
  return NextResponse.json(thoughts);
}
