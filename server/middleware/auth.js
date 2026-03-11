import jwt from 'jsonwebtoken';


// is file me middleware bana rahe hai 

const auth = async (request, response, next) => {


    try {
        // const token = request.cookies.accessToken ||
        //     (request.headers.authorization.split(" ")[1])
        // console.log('token', token)

const token = request.cookies.accessToken || 
                      (request.headers.authorization && request.headers.authorization.split(" ")[1]);
        if (!token) {
            return response.status(401).json({
                message: "Unauthorized access , no token provided"
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
        if (!decode) {
            return response.status(401).json({
                message: "Unauthorized access , invalid token",
                error: true,
                success: false

            })
        }

        request.userId = decode.id

        next()

        console.log('decode', decode)
    }


    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
export default auth;