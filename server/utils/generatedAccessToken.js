import jwt from 'jsonwebtoken'


// access token generat kar rahe hai jo 5 hours tak rahe ga 


const generatedAccessToken = async(userId) => {

    const token = await jwt.sign({
        id: userId
    }, process.env.SECRET_KEY_ACCESS_TOKEN,
        {
            expiresIn: '5h'
        }
    )
return token


}

export default generatedAccessToken