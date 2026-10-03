"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User={id:string;username:string;role:string};
type Post={id:string;username:string;content:string;createdAt:string};

const projects=[
 {name:"privacy-first/",stars:"open",perm:"-rwxr-xr-x",desc:"Identity-light publishing for first-person experiences, with no email required.",tags:["Next.js","Postgres","open source"]},
 {name:"public-record/",stars:"live",perm:"-rwxr-xr-x",desc:"A chronological record where experiences stay visible without a popularity algorithm.",tags:["React","SQL","SaaS"]},
 {name:"k-freeze/",stars:"secure",perm:"-rwxr-xr-x",desc:"Account recovery built around a private backup secret instead of an inbox.",tags:["Node","scrypt","security"]},
 {name:"admin-shell/",stars:"ready",perm:"-rwxr-xr-x",desc:"A small owner console for moderation while keeping the public surface simple.",tags:["Next.js","API","open source"]}
];

export default function Home(){
 const [posts,setPosts]=useState<Post[]>([]),[user,setUser]=useState<User|null>(null),[content,setContent]=useState(""),[mode,setMode]=useState<"login"|"register"|"recover"|null>(null),[error,setError]=useState(""),[loading,setLoading]=useState(true),[posting,setPosting]=useState(false),[backupKey,setBackupKey]=useState("");

 useEffect(()=>{(async()=>{try{const [p,u]=await Promise.all([fetch("/api/posts",{cache:"no-store"}),fetch("/api/auth/me",{cache:"no-store"})]);const pd=await p.json().catch(()=>({}));const ud=await u.json().catch(()=>({}));setPosts(pd.posts||[]);setUser(ud.user||null)}finally{setLoading(false)}})();},[]);

 async function submit(e:React.FormEvent){e.preventDefault();setError("");if(!user){setMode("login");return}setPosting(true);const r=await fetch("/api/posts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content})});const d=await r.json().catch(()=>({}));setPosting(false);if(!r.ok){setError(d.message||"Could not publish.");return}setPosts(p=>[d.post,...p]);setContent("")}
 async function logout(){await fetch("/api/auth/logout",{method:"POST"});setUser(null)}

 return <main className="terminal-page">
   <div className="crt-scanlines" aria-hidden="true"/>
   <div className="terminal-glow terminal-glow-a"/><div className="terminal-glow terminal-glow-b"/>
   <div className="terminal-window">
     <header className="terminal-bar">
       <div className="traffic"><i className="traffic-red"/><i className="traffic-amber"/><i className="traffic-green"/></div>
       <div className="terminal-path"><strong>speakup</strong><span>@public-record: ~/dev</span></div>
       <nav><a href="#experiences">~/experiences</a><a href="#stack">~/stack</a><a href="#contact">~/contact</a><Link href="/admin">~/admin</Link></nav>
       <div className="availability"><i/> available</div>
     </header>

     <div className="terminal-body">
       <section className="terminal-section hero-terminal">
         <Command text="whoami --full"/>
         <h1 className="terminal-name">SPEAK UP<span className="block-cursor">_</span></h1>
         <div className="terminal-role">&gt; public record for lived experience</div>
         <p className="terminal-intro">A privacy-first place to publish <mark>first-person experiences</mark> about freedom of speech and life where you live. No email. No popularity algorithm. Just a chronological record.</p>
         <div className="meta-checks"><span>[x] no email required</span><span>[x] chronological</span><span>[x] {posts.length.toLocaleString()} records</span></div>
         <div className="command-actions"><button className="cmd-primary" onClick={()=>document.getElementById("share")?.scrollIntoView({behavior:"smooth"})}>$ ls ~/share -&gt;</button><button className="cmd-ghost" onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>./contact --speak</button></div>
       </section>

       <section className="terminal-section">
         <Command text="neofetch"/>
         <div className="neo-card">
           <div className="ascii-avatar"><pre>{`   .--------.
  /  SPEAK   \
 |    UP      |
 |  [ VOICE ] |
  \\          /
   '--------'`}</pre><span>speakup@dev</span></div>
           <div className="neo-info">
             <div className="neo-title">speakup@public-record ----------</div>
             <dl>
              <div><dt>OS</dt><dd>Public Record v1.0</dd></div><div><dt>Host</dt><dd>Web / PostgreSQL</dd></div>
              <div><dt>Role</dt><dd>First-person publishing</dd></div><div><dt>Uptime</dt><dd>Always on / chronological</dd></div>
              <div><dt>Shell</dt><dd>Next.js / API routes</dd></div><div><dt>Stack</dt><dd>TypeScript, React, Postgres</dd></div>
              <div><dt>Focus</dt><dd>Privacy + lived experience</dd></div><div><dt>Status</dt><dd className="amber">available</dd></div>
             </dl>
             <div className="swatches">{["#39ff7a","#2bbf5c","#1c7a3c","#5f8d68","#eafff1","#000000","#143614","#ffd24a"].map((c,i)=><i key={i} style={{background:c}}/>)}</div>
           </div>
         </div>
       </section>

       <section className="terminal-section" id="experiences">
         <Command text="ls -la ~/experiences  # live records"/>
         <div className="terminal-kicker">&gt; selected records</div><h2>Things people wrote and published // drwxr-xr-x</h2>
         {loading?<div className="terminal-empty">loading records...</div>:posts.length?<div className="records-grid">{posts.slice(0,4).map((p,i)=><article className="record-card" key={p.id}><div className="record-top"><strong>record-{String(posts.length-i).padStart(3,"0")}/</strong><span>#{String(posts.length-i).padStart(3,"0")} <em>-rwxr-xr-x</em></span></div><p>{p.content}</p><div className="tags"><b>published</b><span>first-person</span><span>chronological</span></div><div className="record-links"><a href="#share">-&gt; read</a><a href="#share">-&gt; respond</a></div><small>@{p.username} / {new Date(p.createdAt).toLocaleDateString()}</small></article>)}</div>:<div className="terminal-empty">[x] 00 records / be the first person to speak up.</div>}
       </section>

       <section className="terminal-section" id="stack">
         <Command text="cat stack.txt | sort -r"/>
         <div className="terminal-kicker">&gt; proficiency</div><h2>The tools behind the record // system status</h2>
         <div className="skills-panel">{[["TypeScript",95],["Postgres / SQL",90],["React / Next",92],["Node / API",88],["Security",84],["Docker / Deploy",78],["System design",86],["Interface / UI",74]].map(([name,val])=><div className="skill" key={String(name)}><label>{name}</label><div className="meter"><i style={{width:String(val)+"%"}}/></div><strong>{val}%</strong></div>)}</div>
       </section>

       <section className="terminal-section contact-section" id="share">
         <Command text="./share --publish"/>
         <div className="cta-panel"><h2>Speak up<span className="green">. Your record matters.</span></h2><p>{user?<>signed in as <b>@{user.username}</b>. Publish directly to the public record.</>:<>Create an account with a username, password and private backup secret. No email required.</>}</p>
           {user?<form onSubmit={submit}><textarea value={content} onChange={e=>setContent(e.target.value)} maxLength={5000} placeholder="$ write your experience here..."/><div className="composer-line"><span>{content.length}/5000</span><div><button type="button" className="cmd-ghost" onClick={logout}>./logout</button><button className="cmd-primary" disabled={posting||!content.trim()}>{posting?"$ publishing...":"$ publish --now ->"}</button></div></div></form>:<div className="command-actions"><button className="cmd-primary" onClick={()=>setMode("register")}>$ create-account -&gt;</button><button className="cmd-ghost" onClick={()=>setMode("login")}>./sign-in</button></div>}
           {error&&<div className="terminal-error">ERR: {error}</div>}
         </div>
       </section>

       <section className="terminal-section" id="contact">
         <Command text="./contact --hire"/>
         <div className="cta-panel contact-box"><h2>Let's build something <span className="green">together.</span></h2><p>A terminal-native public record, built for simple publishing and privacy-first participation.</p><div className="mail-command">$ mail speakup@reyes.dev<span className="block-cursor">_</span></div><div className="socials"><a href="https://github.com/1btestinng/speakupp">-&gt; github</a><a href="#">-&gt; x</a><a href="#">-&gt; blog</a><a href="#">-&gt; CV.pdf</a></div></div>
       </section>

       <footer className="terminal-footer"><span>$ echo "(c) 2026 Speak Up, built in the terminal, shipped fast" <i className="mini-cursor"/></span><span>last commit: 2h ago, main@ac5e5b0, uptime 99.98%</span></footer>
     </div>
   </div>
   {mode&&<AuthModal mode={mode} close={()=>{setMode(null);setError("")}} success={(u,key)=>{setUser(u);setMode(null);if(key)setBackupKey(key)}}/>}
   {backupKey&&<div className="modal-backdrop"><div className="auth-card backup-terminal"><button className="modal-close" onClick={()=>setBackupKey("")}>×</button><div className="eyebrow">BACKUP SECRET / SAVE THIS NOW</div><h2>Your recovery key.</h2><p>This key is shown once. Store it somewhere private. It can reset your password without email.</p><code>{backupKey}</code><button className="cmd-primary" onClick={()=>setBackupKey("")}>I SAVED IT -&gt;</button></div></div>}
 </main>
}

function Command({text}:{text:string}){return <div className="command-line"><span>cyan@speakup:~/dev $</span> {text}</div>}

function AuthModal({mode,close,success}:{mode:"login"|"register"|"recover";close:()=>void;success:(u:User,key?:string)=>void}){
 const [kind,setKind]=useState(mode),[username,setUsername]=useState(""),[password,setPassword]=useState(""),[backup,setBackup]=useState(""),[newPassword,setNewPassword]=useState(""),[error,setError]=useState("");
 async function go(e:React.FormEvent){e.preventDefault();setError("");let url="/api/auth/login";let body:any={username,password};if(kind==="register")url="/api/auth/register";if(kind==="recover"){url="/api/auth/recover";body={username,backupKey:backup,newPassword}}const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});const d=await r.json().catch(()=>({}));if(!r.ok){setError(d.message||"Something went wrong.");return}if(kind==="recover"){setError("Password reset. You can now sign in.");setKind("login");setPassword("");setBackup("");setNewPassword("");return}success(d.user,d.backupKey)}
 return <div className="modal-backdrop"><div className="auth-card"><button className="modal-close" onClick={close}>×</button><div className="eyebrow">{kind==="login"?"SIGN IN":kind==="register"?"CREATE ACCOUNT":"RECOVER ACCOUNT"}</div><h2>{kind==="login"?"Welcome back.":kind==="register"?"Speak without an inbox.":"Use your backup secret."}</h2><p>{kind==="register"?"No email. No phone. Your username is the public identity attached to your posts.":kind==="recover"?"Enter your username and backup secret to choose a new password.":"Sign in with the credentials you created."}</p><form onSubmit={go}><label>USERNAME<input autoFocus value={username} onChange={e=>setUsername(e.target.value)} required/></label>{kind!=="recover"&&<label>PASSWORD<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>}{kind==="recover"&&<><label>BACKUP SECRET<input value={backup} onChange={e=>setBackup(e.target.value)} placeholder="XXXX-XXXX-XXXX-XXXX-XXXX-XXXX" required/></label><label>NEW PASSWORD<input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required/></label></>}{error&&<div className="terminal-error">ERR: {error}</div>}<button className="cmd-primary">{kind==="login"?"$ sign-in ->":kind==="register"?"$ create-account ->":"$ reset-password ->"}</button></form><div className="auth-switch">{kind==="login"?<><button onClick={()=>setKind("recover")}>./forgot-password</button><button onClick={()=>setKind("register")}>./create-account</button></>:kind==="register"?<button onClick={()=>setKind("login")}>./already-have-account</button>:<button onClick={()=>setKind("login")}>./back-to-sign-in</button>}</div></div></div>
}