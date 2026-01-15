import express from "express"
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT 
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import cors from "cors";
// import { createServer } from "http";
import { Server } from "socket.io";
import http from "http"


// app use
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());

const server = http.createServer(app)

// const httpServer = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://supchat-messenger-app.netlify.app",
  },
});

// connect DB
import "./db/connectioon.js"

// Importing files
import {Users}  from "./models/Users.models.js"
import {Conversations} from "./models/Conversation.models.js";
import { Messages } from "./models/Messages.models.js"




//socket.io
let users = [];
io.on('connection', socket => {
    console.log('User Connected', socket.id);

    socket.on('addUser', userId => {
        const isUserExist = users.find(user => user.userId === userId)
        if(!isUserExist){
            const user = { userId, socketId: socket.id}
            users.push(user);
            io.emit('getUsers', users);
        }

    });

    socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId}) => {
    const receiver =  users.find( user => user.userId === receiverId )
    const sender = users.find(user => user.userId === senderId)
    const user = await Users.findById(senderId)
    if (receiver) {
        io.to(receiver.socketId).emit('getMessage', {
            senderId,
            message,
            conversationId,
            receiverId,
            user: {id: user._id, fullName: user.fullName, email: user.email}

        })
    } if( sender){
        io.to(sender.socketId).emit('getMessage', {
            senderId,
            message,
            conversationId,
            receiverId,
            user: {id: user._id, fullName: user.fullName, email: user.email}

        })
    }

    })

    socket.on('disconnect', ()=>{
        users = users.filter(user => user.socketId !== socket.id)
        io.emit('getUsers', users)
    })
    // io.emit('getUsrs', socket.userId)
})



// routes
app.get("/greet", (req,res)=>{
res.send("Good Morning")
})

app.post("/api/register", async (req,res, next)=>{
    try {
        const {fullName, email, password} = req.body;

        if(!fullName || !email || !password){
            res.status(400).send("Please fill all required fields")
        }else {
            const isAlreadyExist = await Users.findOne({email} )

            if(isAlreadyExist){
                res.status(400).send("user already exist")
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new Users({fullName, email, password: hashedPassword})

            await newUser.save()

            return res.status(200).send("user registered successfully")
            


        }
    } catch(error){
        console.log("Error of user registration", error);
        
    }
})

app.post('/api/login', async (req, res)=>{
    try{
        const {email, password}= req.body;
        if(!email || !password){
            res.status(400).send('Please fill all required fields')
        }else{
            const user = await Users.findOne({email})

            if(!user){
                res.status(400).send("User email or password is incorrect")
            } else{
                const validateUser = await bcrypt.compare(password, user.password)
                if(!validateUser){
                    res.status(400).send("User email or password is incorrect")
                }else{
                    const payload = {
                        userId: user.id,
                        email: user.email
                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "THIS_IS_JWT_SECRET_KEY";

                    jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: 84600}, async (err, token)=>{
                        await Users.updateOne({ _id: user._id },{
                            $set: {token}
                        })
                        user.save();
                        return res.status(200).json({ user: {id: user._id, email: user.email, fullName: user.fullName}, token: token})

                    })


                }
            }
        }


    }catch(error){
        console.log("Error of user login", error);
        
    }
})

app.post('/api/conversation', async (req,res)=>{
    try {
        const { senderId, receiverId } = req.body
        const newConversation = new Conversations({ members: [senderId, receiverId] });
        await newConversation.save();
        res.status(200).send("Conversation Created successfully")
        
    } catch (error) {
        
    }
})

app.get('/api/conversations/:userId', async (req,res)=>{
    try {
        const userId = req.params.userId;
        const conversations = await Conversations.find({ members: { $in: [userId] } });
        const conversationUserData = await Promise.all(conversations.map(async (conversation)=>{
            const receiverId = conversation.members.find((member)=> member !== userId)
            const user = await Users.findById(receiverId)

            return { user: {receiverId: user._id, email: user.email, fullName: user.fullName}, conversationId: conversation._id }
        }))
        res.status(200).json(conversationUserData);
        
    } catch (error) {
        console.log("Error in Conversation", error); 
    }
})

app.post('/api/message', async (req,res)=>{
    try {
        const { conversationId, senderId, message, receiverId =""}= req.body;
        if(!senderId || !message) return res.status(400).send('Please fill all required fields');
        if(conversationId === "new" && receiverId){
            const newConversation = new Conversations({ members: [senderId, receiverId]});
            await newConversation.save();
            const newMessage = new Messages( { conversationId: newConversation._id, senderId, message});
            await newMessage.save();
            return res.status(200).send('Messages sent successfully')
        }else if(!conversationId || !receiverId){
            return res.status(400).send("Please fill all required fields")
        }
        const newMessage = new Messages({conversationId, senderId, message});
        await newMessage.save();
        res.status(200).send('Message sent successfully')
        
    } catch (error) {
        console.log(error, "error came in message");
    }
})

app.get('/api/message/:conversationId', async (req,res)=>{
    try {
        const checkMessages = async (conversationId) =>{
            const messages = await Messages.find({ conversationId});
        const messageUserData =await Promise.all(messages.map(async (message)=>{
            const user = await Users.findById(message.senderId);
            return {user: {id: user._id, email: user.email, fullName: user.fullName}, message: message.message}

        }))
        res.status(200).json(await messageUserData)
        }
        const conversationId = req.params.conversationId;
        if(conversationId === "new"){
            const checkConversation = await Conversations.find({members: { $all: [req.query.senderId, req.query.receiverId]}})
            if(checkConversation.length > 0){
                checkMessages(checkConversation[0]._id)
            }else{
                return res.status(200).json([])
            }
        }else{
            checkMessages(conversationId)
        }

    } catch (error) 
    { console.log(error, "error is conversationId");
    
        
    }
})

app.get('/api/users/:userId', async (req,res)=>{ 
    try {
        const userId = req.params.userId;
        const users = await Users.find({ _id: { $ne: userId }});
        const userData = await Promise.all(users.map(async (user)=>{
            return {user: {email: user.email, fullName: user.fullName, receiverId: user._id}}
        }))
        res.status(200).json(userData)
        
    } catch (error) {
        console.log(error, "error in Users");
        
        
    }
})

// app listen
server.listen(process.env.PORT  , ()=>{
console.log(`server is listeing at ${process.env.PORT} + socket is running at ${process.env.port}`)})
