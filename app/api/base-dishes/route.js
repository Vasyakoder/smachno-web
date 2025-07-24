import { createSupabaseServerClient } from '@/lib/supabaseServerClient'

export async function GET() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from('base_dishes')
    .select('*, dishes(*)')

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
