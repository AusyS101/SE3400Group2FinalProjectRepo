import {validOrigin} from '../../../lib/origin';
import {NextRequest,NextResponse} from 'next/server';
import {randomBytes,scryptSync,timingSafeEqual,createHash} from 'crypto';
import {transaction} from '../../../lib/store';
export const runtime='nodejs';
const hash=(s:string)=>createHash('sha256').update(s).digest('hex');
export async function POST(req:NextRequest){
 try{
 if(!validOrigin(req.headers,req.url))return NextResponse.json({error:'Invalid origin'},{status:403});
 const b=await req.json();const token=req.cookies.get('session')?.value||'';let cookie:string|undefined;
 const data=await transaction(async s=>{
 const session=s.sessions.find(x=>x.token===hash(token)&&x.expires>Date.now());let user=s.users.find(x=>x.id===session?.user);
 const safe=(u:any)=>u?{id:u.id,name:u.name,username:u.username}:null;
 const login=(u:any)=>{cookie=randomBytes(32).toString('hex');s.sessions.push({token:hash(cookie),user:u.id,expires:Date.now()+86400000});user=u;return {user:safe(u)}};
 if(b.action==='login'||b.action==='register'){
 if(typeof b.username!=='string'||typeof b.password!=='string')throw Error('Enter username and password.');
 const username=b.username.trim().toLowerCase();let u=s.users.find(x=>x.username===username);
 if(b.action==='register'){if(!/^[a-z0-9_]{3,30}$/.test(username)||b.password.length<8)throw Error('Use a 3–30 character username and a password of at least 8 characters.');if(u)throw Error('Username already exists.');const salt=randomBytes(16).toString('hex');u={id:randomBytes(16).toString('hex'),username,name:String(b.name||username).slice(0,60),salt,password:scryptSync(b.password,salt,64).toString('hex')};s.users.push(u)}
 else if(!u||!timingSafeEqual(Buffer.from(u.password,'hex'),scryptSync(b.password,u.salt,64)))throw Error('Incorrect username or password.');
 return login(u);
 }
 if(b.action==='logout'){s.sessions=s.sessions.filter(x=>x.token!==hash(token));s.pairs=s.pairs.filter(x=>x.secret!==b.secret);cookie='';return {}}
 if(b.action==='pairCreate'){const code=randomBytes(24).toString('hex'),secret=randomBytes(24).toString('hex');s.pairs.push({code,secret,expires:Date.now()+300000});return {code,secret}}
 if(b.action==='pairApprove'){if(!user)throw Error('Sign in first.');const p=s.pairs.find(x=>x.code===b.code&&x.expires>Date.now()&&!x.used);if(!p)throw Error('Pairing code expired or already used.');p.user=user.id;return {}}
 if(b.action==='pairPoll'){const p=s.pairs.find(x=>x.code===b.code&&x.secret===b.secret&&!x.used);if(!p||p.expires<Date.now())throw Error('Pairing code expired. Generate a new code.');if(p.user){p.used=true;return login(s.users.find(x=>x.id===p.user))}return {waiting:true}}
 if(b.action==='state')return {user:safe(user),history:s.workouts.filter(x=>x.user===user?.id),favorites:s.favorites.filter(x=>x.user===user?.id).map(x=>x.map)};
 if(!user)throw Error('Please sign in.');
 if(b.action==='favorite'){s.favorites=s.favorites.filter(x=>!(x.user===user.id&&x.map===b.map));if(b.enabled)s.favorites.push({user:user.id,map:b.map});return {}}
 if(b.action==='save'){const w=b.workout;if(!w||!Number.isFinite(w.seconds)||w.seconds<0)throw Error('Invalid workout.');if(!s.workouts.some(x=>x.id===w.id&&x.user===user.id))s.workouts.push({...w,user:user.id});return {}}
 throw Error('Unknown action.');
 });const response=NextResponse.json(data);if(cookie!==undefined)response.cookies.set('session',cookie,{httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production',path:'/',maxAge:cookie?86400:0});return response;
 }catch(e:any){return NextResponse.json({error:e.message||'Unable to save. Please retry.'},{status:400})}
}
