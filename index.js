const expRef = require('express')
const sqlRef = require('mysql2')
const bodyparser = require('body-parser')
const cors=require('cors')

const app = expRef()
app.use(cors())

//DB connect
const db = sqlRef.createConnection(
    {
        "host":"localhost",
        "user":"root",
        "password":"Saranya@1971",
        "database":"account"
    }
)
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Database Connected")
    }

    
})
//get mapping
app.get('/listAll',async(req,res)=>{
    const sql ="select * from details"
    db.query(sql,(err,records)=>{
        if(err){
            res.status(400).json({"error":err.message})
        }
        if(records.length==0){
            res.status(201).json({"error":"no records are found"})
        }
        res.status(200).json({records})

        
    })
})

// app.post('/insert',async(req,res)=>{
//     const {acc_number,acc_holder,acc_balance} = req.body
//     const sql = "insert into account_details values (?,?,?)"
//     //update mec_students set DOB=?, Age=? where id=?
//     db.query(sql,[acc_number,acc_holder,acc_balance],(err,result)=>{
//         if(err){
//             res.status(500).json({"error":err.message})
//         }
//         res.status(200).json({"message":result.affectedRows})
//     })
//})

app.listen(1122,()=>{
    console.log("My server is running")
})
