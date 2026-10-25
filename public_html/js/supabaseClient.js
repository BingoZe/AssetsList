const SUPABASE_URL = 'https://gtpfoxzbmbwzkyftucpp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_v3OhTgpOiov8q6mJ3mxdig_sLHoGnAy';

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

window.supabaseClient = supabaseClient;

console.log('Supabase conectado');
