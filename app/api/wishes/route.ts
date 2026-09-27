import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || '').trim().slice(0, 100);
    const message = String(body.message || '').trim().slice(0, 1000);

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and wish are required.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('wishes').insert({ name, message });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Could not save your wish. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 });
  }
}
