import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
import generatedOtp from '../utils/generatedOtp.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import jwt from 'jsonwebtoken';

// ------------------------registration controller hai jise user ka data database me save kar rahe hai-------------------------------------//
export async function registerUserController(request, response) {

    // request se age name email passward milte hai to try block chale ga ather wise catch block chale ga

    try {
        const { name, email, password } = request.body;


        // request se agar name email password nahi milta hai to ye responce aye ga 

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Name, email and password are required.",
                error: true,
                success: false
            })
        }

        // database me cheak kar rah hai ye email pehle se hai to nahi 

        const user = await UserModel.findOne({ email })


        // ager user pehle se hai to ye responce ayega 
        if (user) {
            return response.json({
                message: "User already exists with this email.",
                error: true,
                success: false
            })
        }
        // ager user nahi hai to naya user create hoga 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // payload me name email or hashed password ko rkakh rahe hai 
        const payload = {
            name,
            email,
            password: hashedPassword
        }
        //

        const newUser = new UserModel(payload);
        const save = await newUser.save()

        //user ko email se verify karane ke liye link bana rahe hai
        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        //email bhejne ke liye sendemail ka use kar rahe hai 
        const verifyemail = await sendEmail({
            sendTo: email,
            subject: "Welcome to FlashMart - Verify your email",
            html: verifyEmailTemplate({
                name, url: VerifyEmailUrl
            })
        })

        // jab email verify ho jata hai to ye responce ayega 
        return response.json({
            message: "User registered successfully. Please check your email to verify your account.",
            error: false,
            success: true,
            data: save
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false

        });

    }


    // end of register user controller

}

//---------------------------------------------email me jo link hai use verify kar rahe hai-----------------------------------------------//
export async function verifyEmailController(request, response) {

    // email me link arahi hai usme ek code araha hai jise use karke email verify ho raha hai
    try {
        const { code } = request.body
        const user = await UserModel.findOne({ _id: code })

        //ager code user se match nahi hota hai to ye responce aye ga
        if (!user) {
            return response.status(400).json({
                message: "Invalid verification code....",
                error: true,
                success: false
            })

        }
        //agar user ka email verify ho chuka hai to ye responce ayega 
        const updatedUser = await UserModel.updateOne({
            _id: code
        },
            { verify_email: true })

        return response.json({
            message: "Email verified successfully.",
            error: false,
            success: true
        })


    }


    // ager erroe ata hai to ye responce aye ga 
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
    // end of verify email controller 

}

// -----------------------------------------email or password ke through login kar rahe hai----------------------------------------------//

export async function loginController(request, response) {

    // try block mai email or passward le raha hai 
    try {
        const { email, password } = request.body
        const user = await UserModel.findOne({ email })

        // agar email ya password me se ek bhi missing hai to ye responce aye ga 

        if (!email || !password) {
            return response.status(400).json({
                message: "Email and password are required ....",
                error: true,
                success: false
            })
        }

        //ager user email se match nahi hota hai to ye responce aye ga 

        if (!user) {
            return response.status(400).json({
                message: "User not found with this email.",
                error: true,
                success: false
            })
        }


        // ager user suspende ya inactive ho to ye responce aye ga 

        if (user.status !== "Active") {
            return response.status(400).json({
                message: "Your account is not active. Please contact support.",
                error: true,
                success: false
            })
        }

        // passwaor to data base se match kare ga
        const checkPassword = await bcrypt.compare(password, user.password)

        //ager passwoed match nahi hota to ye responece aye ga 
        if (!checkPassword) {
            return response.status(400).json({
                message: "cheack your password."
                , error: true,
                success: false
            })
        }

        const accesstoken = await generatedAccessToken(user._id)
        const refreshtoken = await generatedRefreshToken(user._id)
        const updateuser = await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }



        response.cookie('accessToken', accesstoken, cookieOptions)
        response.cookie('refreshToken', refreshtoken, cookieOptions)

        return response.json({
            message: "Login successful.",
            error: false,
            success: true,
            data: {
                accesstoken,
                refreshtoken
            }
        })

    }
    catch (error) {

        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }



}

//---------------------------------------------------------logout controller-----------------------------------------------------------//

export async function logoutController(request, response) {
    try {
        // logout karne ke liye cookie jese access or refresh token ko clear kar raha hai
        const userId = request.userId;//midellware se araha hai
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        // cookies ko clear kar rah hai (YAHAN COMMA HATAKAR SEMICOLON LAGAYA HAI)
        response.clearCookie('accessToken', cookieOptions);
        response.clearCookie('refreshToken', cookieOptions);


        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {

            refresh_token: ""
        })

        // logout hone ke bad ye responce ayega 

        return response.json({
            message: "Logout successful...",
            error: false,
            success: true
        })
    }

    // or  ager is me arar aye to ye response aye ga 
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


//-------------------------------------------------------upload user avtar-----------------------------------------------------------------//

export async function uploadAvatar(request, response) {
    try {
        const userId = request.userId; // Auth middleware se mila ID
        const image = request.file; // Multer se mili image

        console.log("Image received:", image?.originalname);

        // 1. Cloudinary par upload karo
        const upload = await uploadImageCloudinary(image);

        // 2. Database update karo
        await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        });

        // 3. Jawab bhejo (Is line se Loop khatam hoga)
        return response.json({
            message: "Profile avatar uploaded successfully.",
            success: true,
            error: false,
            data: {
                _id: userId,
                avatar: upload.url
            }
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//------------------------------------------------------update user details-----------------------------------------------------------------//


export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId
        const { name, email, mobile, password } = request.body

        let hashedPassword = ""
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);

        }

        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashedPassword })

        })
        return response.json({
            message: "updated user successfully...",
            error: false,
            success: true,
            data: updateUser
        })

    }
    catch (error) {
        return response.status(500).json({
            massage: error.massage || error,
            error: true,
            success: false
        })
    }
}

//----------------------------------------------------forgot password not login --------------------------------------------------------------------//


export async function forgotPasswordController(request, response) {

    //  FORGOTPASSWORD --> SENDOTP --> VERIFYOTP --> RESETPASWWORD

    try {
        const { email } = request.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return response.status(400).json({

                message: "Email not available ....",
                error: true,
                success: false

            })
        }

        const otp = generatedOtp()


        const expireTime = new Date(Date.now() + 60 * 60 * 1000)
        //the expire time of otp was 1 hour
        const update = await UserModel.findByIdAndUpdate(user._id, {
            forget_password_otp: otp,
            forget_password_expiry: expireTime.toISOString()
        })

        await sendEmail({
            sendTo: email,
            subject: "Forgot Password from FlashMart",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp
            })
        })


        return response.json({
            message: "please Cheack your email",
            error: false,
            success: true
        })


    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}


//--------------------------------------------------verify forgot password otp ----------------------------------------------------------------------//
export async function verifyForgotPasswordOtp(request, response) {

    try {

        const { email, otp } = request.body
        if (!email || !otp) {
            return response.status(400).json({
                message: "please provide required field email and otp ...",
                erro: true,
                success: false
            })

        }
          

        const user = await UserModel.findOne({ email })
        if (!user) {
            return response.status(400).json({

                message: "Email not available ....",
                error: true,
                success: false

            })
        }

        const currentTime = new Date().toISOString()
        if (user.forget_password_expiry < currentTime) {
            return response.status(400).json({
                message: "OTP is expired",
                error: true,
                success: false
            })


        }


        if (otp != user.forget_password_otp) {
            return response.status(400).json({
                message: "Invalid OTP ...",
                error: true,
                success: false
            })
        }

      

        // if the otp is not expired 
        // if the otp is same as email otp then

     const updateUser = await UserModel.findByIdAndUpdate(user?._id , {
        forget_password_otp : "" ,
        forget_password_expiry :""
     })

        return response.json({
            message: " Verify OTP successfully ... ",
            error: false,
            success: true
        })


    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


//---------------------------------------------------reset password -----------------------------------------------------------------------------------//
export async function resetpassword(request, response) {


    try {
        const { email, newPassword, confirmPassword } = request.body


        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: "Provide required field email , newPasswoed , confirmPassword .... "
            })

        }


        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "Email is not Available",
                error: true,
                success: false

            })
        }

        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "NewPassword and ConfirmPassword Not Same ...",
                error: true,
                success: false
            })
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const update = await UserModel.findByIdAndUpdate(user._id, {
            password: hashedPassword
        })

        return response.json({
            message: "Password Updated Successfully ...",
            error: false,
            success: true
        })

    }
    catch (error) {

        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//-----------------------------------------------------refresh token controller -------------------------------------------------------------------------//
export async function refreshToken(request, response) {

    try {
        const refreshToken = request.cookies.refreshToken || request?.header?.authorization?.split(" ")[1]
        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid token ...",
                error: true,
                success: false
            })
        }


        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)


        if (!verifyToken) {
            return response.status(401).json({
                message: "Token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?._id
        const newAccessToken = await generatedAccessToken(userId)
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        response.cookie('accessToken',newAccessToken,cookieOptions )

        // YAHAN ERROR AUR SUCCESS VALUES KO THEEK KIYA HAI
        return response.json({
            message : "New Access token generated...",
            error : false , 
            success: true , 
            data : {
                accessToken : newAccessToken
            }
        })


    }

    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

// ---------------------------------------------------get login user details ------------------------------------------------------------------------------//
export async function userDetails(request ,response){
    try{
       const userId = request.userId
       console.log(userId)
       const user = await UserModel.findById(userId).select('-password -refresh_token')

       return response.json({
        message : 'user details',
        data : user ,
        error : false ,
        success : true
       })
    }
    catch(error){
        return response.status(500).json({
            message : 'Somthing is wrong..',
            error : true ,
            success : false
        
        })
    }
}