import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ======================================
// API KEY
// ======================================

// Render Environment Variable
const API_KEY =
process.env.GEMINI_API_KEY;

// ======================================
// HOME ROUTE
// ======================================

app.get("/", (req, res) => {

res.json({

name: "INFINITY AI",

owner: "Pratap Sir",

status: "Running"

});

});

// ======================================
// CHAT ROUTE
// ======================================

app.post("/chat", async (req, res) => {

try{

const { message } =
req.body;

const response =
await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,

{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

contents:[

{

parts:[

{

text:message

}

]

}

]

})

}

);

const data =
await response.json();

res.json(data);

}

catch(error){

res.status(500).json({

error:
error.message

});

}

});

// ======================================
// START SERVER
// ======================================

const PORT =
process.env.PORT
||
3000;

app.listen(

PORT,

()=>{

console.log(

"================================"

);

console.log(

"INFINITY AI Backend Running"

);

console.log(

"Owner : Pratap Sir"

);

console.log(

"Port : " + PORT

);

console.log(

"================================"

);

}

);
