import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://clmauxireerjpgirlklz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbWF1eGlyZWVyanBnaXJsa2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxMjM1MjIsImV4cCI6MjAwMDY5OTUyMn0.xFCSrbgOd5Zdze-9Y9yrPcULJ49Liu9EurrvGq1s9sk')