import {pool} from "@/lib/db";let ready:Promise<void>|null=null;
export function ensureSchema(){if(ready)return ready;ready=(async()=>{await pool.query(\`
create extension if not exists pgcrypto;
create table if not exists speakup_users(id uuid primary key default gen_random_uuid(),username text not null unique,password_hash text not null,backup_key_hash text not null,role text not null default 'user' check(role in ('user','admin')),created_at timestamptz not null default now());
create table if not exists speakup_sessions(id uuid primary key default gen_random_uuid(),user_id uuid not null references speakup_users(id) on delete cascade,token_hash text not null unique,created_at timestamptz not null default now(),expires_at timestamptz not null);
create table if not exists speakup_posts(id uuid primary key default gen_random_uuid(),user_id uuid not null references speakup_users(id) on delete cascade,content text not null,created_at timestamptz not null default now());
create index if not exists speakup_posts_created_idx on speakup_posts(created_at desc);
create index if not exists speakup_sessions_token_idx on speakup_sessions(token_hash);
\`)} )();return ready}