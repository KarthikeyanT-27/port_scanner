const express = require("express")
const cors=require("cors")
const app=express();
const { exec } = require("child_process");
const port=5000;

app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("backend is running")
});


app.post("/scan",(req,res)=>{
    const {ip,sp,ep}=req.body;
    console.log(ip)
    if(!ip||sp==null||ep==null){
        return res.status(400).send("invvalid entry")
    }

    const cmd=`python3 portscanner.py ${ip} ${sp} ${ep}`

    exec(cmd,(error,stdout,stderr)=>{
       if (error) {
       return res.status(500).json({"error":stderr || error.message})
        
       }
        try {
        result=JSON.parse(stdout)
        res.json(result)    
        } catch (error) {
            console.log(error)
        }
    });
});

app.listen(port,()=>{
    console.log(`Server is listening on ${port} `)
})