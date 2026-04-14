import { createClient } from '@supabase/supabase-js'

const supabaseUrl='https://jwyeihxfcgdruzleryeh.supabase.co'
const supabaseAnonKey='sb_publishable_hTLJUjxLUKmo7sd5eEb4Bg_KXeldbdo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
    