const express =require('express')
const mysql2 = require('mysql2')
const app =express();
const connection = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'users_has_carts'
})
connection.connect((err)=>{
    if (err){
        console.log('errr connection to database')
        return
    }
    console.log('connection to database success')
})


app.get('/cart/:id_order',async(req,res)=>{
  const id_order = req.params.id_order
    try{
        connection.query(
            "SELECT id_fower FROM detailOrder WHERE id_order = ?",[id_order],(err,results,fields)=>{
                if(err){
                    console.log(err)
                    return res.status(400).send();
                }
                return res.status(200).json(results)
            }
        )
    }catch(err){
        console.log(err);
        return res.status(500).send()
    }
})
app.get('/fowerproduct/single/:id_fower',async(req,res)=>{
    const id_fower = req.params.id_fower
    try{
        connection.query(
            "SELECT * FROM fowerproduct WHERE id_fower = ?",[id_fower],(err,results,fields)=>{
                if(err){
                    console.log(err)
                    return res.status(400).send();
                }
                return res.status(200).json(results)
            }
        )
    }catch(err){
        console.log(err);
        return res.status(500).send()
    }
})
//fo
app.get('/fowerproduct',async(req,res)=>{
    const id_fower = req.params.id_fower
    try{
        connection.query(
            "SELECT * FROM fowerproduct",[id_fower],(err,results,fields)=>{
                if(err){
                    console.log(err)
                    return res.status(400).send();
                }
                return res.status(200).json(results)
            }
        )
    }catch(err){
        console.log(err);
        return res.status(500).send()
    }
})





app.use(express.json())
app.listen(3000,()=>console.log('nodejs run on port 3000'));