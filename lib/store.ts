import { promises as fs } from 'fs';
import { neon } from '@neondatabase/serverless';
type State={users:any[],sessions:any[],pairs:any[],workouts:any[],favorites:any[]};
let queue=Promise.resolve();
export function transaction<T>(fn:(s:State)=>T|Promise<T>):Promise<T>{
 const job=queue.then(async()=>{
 const initial:State={users:[],sessions:[],pairs:[],workouts:[],favorites:[]};
 if(process.env.DATABASE_URL){
 const sql=neon(process.env.DATABASE_URL);
 await sql`CREATE TABLE IF NOT EXISTS console_state (id integer PRIMARY KEY, data jsonb NOT NULL)`;
 await sql`INSERT INTO console_state VALUES (1, ${JSON.stringify(initial)}::jsonb) ON CONFLICT DO NOTHING`;
 // Optimistic concurrency also coordinates separate serverless instances.
 for(let i=0;i<10;i++){const [row]=await sql`SELECT data, xmin::text AS version FROM console_state WHERE id=1`; const result=await fn(row.data); const updated=await sql`UPDATE console_state SET data=${JSON.stringify(row.data)}::jsonb WHERE id=1 AND xmin::text=${row.version} RETURNING id`;if(updated.length)return result;}
 throw Error('Storage busy. Please retry.');
 }
 await fs.mkdir('.data',{recursive:true});let s=initial;
 try{s=JSON.parse(await fs.readFile('.data/console.json','utf8'))}catch(e:any){if(e.code!=='ENOENT')throw e}
 const result=await fn(s);await fs.writeFile('.data/console.tmp',JSON.stringify(s));await fs.rename('.data/console.tmp','.data/console.json');return result;
 });queue=job.then(()=>{},()=>{});return job;
}
