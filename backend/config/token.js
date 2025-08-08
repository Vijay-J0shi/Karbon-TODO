import jwt from "jsonwebtoken"

//Here I am configuring the JWT with UserID
const getToken= async(userId)=>{
    try{
        let token= jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7D"})
        return token
    }catch(error){
        console.log(`token error is : ${error} `)
    } 
}

export default getToken