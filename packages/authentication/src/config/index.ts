import * as dotenv from 'dotenv'
dotenv.config();

export default {
    tokenValidator : {
        issuer: process.env.ISSUER || "",
        algorithms: process.env.ALGORITHMS || '',
        audience:  process.env.AUDIENCE || "",
        securityKey: process.env.SECURITY_KEY || "",
    }
}