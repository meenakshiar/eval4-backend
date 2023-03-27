const express = require('express');
const { Connection } = require('./config/db');
const { PostRoute } = require('./routes/postRoute')
const { userRoute } = require('./routes/userRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// app.get('/', (res)=>{
//     res.send('POSTS MANAGEMENT SYSTEM')
// })
app.use('/users', userRoute);
app.use('/posts', PostRoute);

app.listen(process.env.PORT, async () => {
    try {
        await Connection;
        console.log('Connected');
    } catch (error) {
        console.log({ msg: error.message });
    }
    console.log('Server is running');
})