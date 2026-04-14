import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('Missing env vars')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function run() {
  const { data, error } = await supabase
    .from('favorites')
    .select('*, product:products(*)')
    
  console.log('Raw data without user filter:', JSON.stringify(data, null, 2))
  console.log('Error:', error)
}
run()
