import {Pool} from "pg";declare global{var speakupPool:Pool|undefined}
export const pool=global.speakupPool??new Pool({connectionString:process.env.DATABASE_URL,max:3,ssl:process.env.DATABASE_URL?.includes("localhost")?false:{rejectUnauthorized:false}});
if(process.env.NODE_ENV!=="production")global.speakupPool=pool;