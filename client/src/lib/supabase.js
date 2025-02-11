import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://gdpojtdcyjcuolxmdzsr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkcG9qdGRjeWpjdW9seG1kenNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMzA2NTIsImV4cCI6MjA0NzYwNjY1Mn0.mtJngiSrKVeorwU0oDMowqNYbNv0LJADMioRhVmX0I0"
);
