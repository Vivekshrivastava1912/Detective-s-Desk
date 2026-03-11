import { Router } from 'express'
import {forgotPasswordController, refreshToken, registerUserController, resetpassword, updateUserDetails, userDetails, verifyForgotPasswordOtp} from '../controllers/user.controller.js'
import { verifyEmailController } from '../controllers/user.controller.js'
import { loginController } from '../controllers/user.controller.js'
import { logoutController } from '../controllers/user.controller.js'
import { uploadAvatar } from '../controllers/user.controller.js'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js'




//------------------------------------------------all routs are define hear-----------------------------------------------------------------//


const userRouter = Router()

userRouter.post('/register', registerUserController)

userRouter.post('/verify-email', verifyEmailController)

userRouter.post('/login', loginController)

userRouter.get('/logout', auth, logoutController)

userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar)

userRouter.put('/update-user',auth,updateUserDetails)

userRouter.put('/forget-password' , forgotPasswordController)

userRouter.put('/verify-forgot-password-otp' , verifyForgotPasswordOtp)

userRouter.put('/reset-password' , resetpassword)

userRouter.post('/refresh-token' , refreshToken)

userRouter.get('/user-details',auth ,userDetails)



export default userRouter