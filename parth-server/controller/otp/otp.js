
import * as StudentObj  from "../../model/student.model.js"; 
import { sendMail } from "../../util/email.js";
import { otpmodal } from "../../model/otpmodel.js";
 export const otpButton= async(req,res)=>
{

const{email}=req.body;

try{
    console.log(email)
    const auth4=await StudentObj.Student.findOne({email})
            console.log(auth4);
            if(!auth4)
            {
                return  res.json({
                    message:"invalid email"
                })
            }
    
 const otp=await sendMail(email)

 const otpAuth=new otpmodal({email,otp})
 await otpAuth.save();
res.status(200).json(
    {
        message:`otp is  a sent:${otp}`
    }
)
}
catch(error)
{
    res.status(400).json(
        {
            message:error
        }
    )
}

}

