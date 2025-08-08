import mongoose from "mongoose"

const connectDb= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,
            {dbName:"KarbonTODO"})
         console.log("DB Connected with mongodb")   
        
    }

    catch(error){
        console.log(error)
    };
    
}
export default connectDb