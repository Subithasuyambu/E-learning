import express from 'express'
import dotenv from 'dotenv';   
import { connectdb } from './database/db.js';
import Userroutes from './routes/User.js';
import CourseRoutes from './routes/Courses.js'
import AdminRoutes from './routes/admin.js'
import Razorpay from 'razorpay'
import cors from 'cors'


dotenv.config();


export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret:process.env.Razorpay_Secret,
})

const app = express();  
app.use(express.json());
app.use(cors());

                
const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send("Server")            
})

app.use('/uploads',express.static("uploads"))
app.use('/api', Userroutes); 
app.use('/api', CourseRoutes); 
app.use('/api', AdminRoutes); 

               
app.listen(PORT, () => {    
    console.log(`Server is running on http://localhost:${PORT}`);  
    connectdb();
    

})



























