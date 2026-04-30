import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { animes } from '@/db/schema'; 

export async function GET() {
  const todos = await db.select().from(animes);
  
  return NextResponse.json(todos);
}