import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hcwlifmgmgvtmqnpbuej.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjd2xpZm1nbWd2dG1xbnBidWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUxOTg2OTIsImV4cCI6MTk3MDc3NDY5Mn0.7e0MawmT4iyBVHL5V7AIXl7-K42G4DIq8XBV684xVvE";

// const supabaseUrl = process.env.VUE_SUPABASE_URL
// const supabaseAnonKey = process.env.VUE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
