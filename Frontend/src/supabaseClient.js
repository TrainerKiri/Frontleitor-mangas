import { createClient } from '@supabase/supabase-js';

// Coloque as suas credenciais do Supabase aqui
const supabase = createClient('https://gehnrqouvbpfgttoebwg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaG5ycW91dmJwZmd0dG9lYndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzODYyMTQsImV4cCI6MjA1Njk2MjIxNH0.IO_NJKVg_m8r-tnRZ3rbbLCLkIgXq_27RfeLCYXv_Jk');

export default supabase;
