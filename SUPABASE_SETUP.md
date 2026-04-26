# Supabase Table Setup

To make the contact form work, please run the following SQL in your Supabase SQL Editor:

```sql
create table enquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  project_type text,
  budget_range text,
  message text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table enquiries enable row level security;

-- Allow public insert (for the contact form)
create policy "Allow public insert" on enquiries
  for insert with check (true);

-- Allow authenticated users to view enquiries (admin view)
create policy "Allow authenticated view" on enquiries
  for select using (auth.role() = 'authenticated');
```
