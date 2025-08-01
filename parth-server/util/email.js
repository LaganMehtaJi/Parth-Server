import nodemailer from 'nodemailer';
import randomString from 'randomstring';
console.log("ENV Check:", process.env.SMTP_MAIL, process.env.SMTP_APP_PASS);

    
function genertateOtp()
{
    return randomString.generate(
        {
            length:6,
            charset:"numeric"
        }
    )
}

 export async function sendMail(email)
{
const otp1=genertateOtp()
    try{
        const transporter=nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure:true,
            
            auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_APP_PASS
          }

        })
        
        const data= await transporter.sendMail({
            from: `"Parth" <${process.env.SMTP_MAIL}>`,
            to:email,
           subject: `Forget password  - ${new Date().toLocaleTimeString()}`,
            text: `Welcome to Parth`,
            html:`<h1> your one time password valid for 1 minute ${otp1}</h1>`

        })
        console.log(data)
    
    }
    catch(error)
    {
        res.status(400).json(
            {
                message:error
            }
        )
    }
    return otp1
    
}
