import UserModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'


// refresh token ban rah hai jo 30 days tak rahe ga 


const generatedRefreshToken = async(userId)=>{

    const token = await jwt.sign({
        id: userId
    }, process.env.SECRET_KEY_REFRESH_TOKEN,
        {
            expiresIn: '30d'
        }
    )

  const updateRefreshTokenUser = await UserModel.updateOne(
    { _id: userId },
    { refresh_token: token

    }
    
  )


    return token


}
export default generatedRefreshToken