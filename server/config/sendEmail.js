import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config()


// resend ki API key ko env file se le raha hai

if (!process.env.RESEND_API){
    console.log("provide RESEND_API in side the env file")
}

// resend me se email bhejne ke liye Resend ka instance bana raha hai


const resend = new Resend(process.env.RESEND_API);

// sendEmail function jo email bhejne ke liye use hota hai

const sendEmail = async({ sendTo, subject, html})=>{

    try{
 const { data, error } = await resend.emails.send({
    from: 'DETECTIVES-S_DESK_BY_VIVEK <onboarding@resend.dev>',
    to: sendTo,
    subject: subject,
    html: html,
  });

  if(error){
    return console.error({error})
  } return data ;
    }
    catch(error){
        console.log(error)
    }
}


//end of sendEmail function
export default sendEmail;

