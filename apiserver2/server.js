const express =require('express')
const mysql = require('mysql')
const app =express();
app.use(express.json())

//connecting to database 
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'product'
})
connection.connect((err)=>{
    if (err){
        console.log('errr connection to database')
        return
    }
    console.log('connection to database success')
})

// Create route
// app.post('/create',async(req,res)=>
// {
//     const {name,detail,price,image,color}=req.body

//     try{
//         connection.query(
//             "INSERT INTO flower(name, detail, price, image, color) VALUES(?,?,?,?,?)",[name,detail,price,image,color],(err,results,fields)=>{
//                 if(err){
//                     console.log('error while inserting a flower into the database',err)
//                     return res.status(400).send();
//                 }
//                 return res.status(200).json({message:"new user succesfully created!"})
//             }
//         )//query คือ การ insert data
//     }
//     catch(err){
//         console.log(err)
//         return res.status(500).send();
//     }
// })


//READ
app.get('/read',async(req,res)=>{
    try{
        connection.query(
            "SELECT * FROM product",(err,results,fields)=>{
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



//READ single user from db
app.get('/read/single/:id',async(req,res)=>{
    const id=req.params.id
    try{
        connection.query(
            "SELECT * FROM flower WHERE id = ?",[id],(err,results,fields)=>{
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


//UPDATE

app.patch('/update/:id',async(req,res)=>{
    const id=req.params.id
    const newName = req.body.newName
    try{
        connection.query(
            "UPDATE flower SET name = ? WHERE id = ?",[newName,id],(err,results,fields)=>{
                if(err){
                    console.log(err)
                    return res.status(400).send();
                }
                return res.status(200).json({message:"name updated success"})
            }
        )
    }catch(err){
        console.log(err);
        return res.status(500).send()
    }

})


//DELETE
app.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
   
    try{
        connection.query(
            "DELETE FROM flower WHERE id = ?",[id],(err,results,fields)=>{
                if(err){
                    console.log(err)
                    return res.status(400).send();
                }
                if (results.affectedRows===0){
                    return res.status(404).json({message:"error delete no success"});
                }
                return res.status(200).json({message:"name deleted success"})
            }
        )
    }catch(err){
        console.log(err);
        return res.status(500).send()
    }

})


//create cart
app.post('/create/cart',async(req,res)=>
{
    const {id_flower,image_flower,price_flower,name_flower}=req.body

    try{
        connection.query(
            "INSERT INTO cart(id_flower,image_flower,price_flower,name_flower) VALUES(?,?,?,?)",[id_flower,image_flower,price_flower,name_flower],(err,results,fields)=>{
                if(err){
                    console.log('error while inserting a flower into the database',err)
                    return res.status(400).send();
                }
                return res.status(200).json({message:"new user succesfully created!"})
            }
        )//query คือ การ insert data
    }
    catch(err){
        console.log(err)
        return res.status(500).send();
    }
})

// READ cart
// app.get('/read/cart',async(req,res)=>{
//     try{
//         connection.query(
//             "SELECT * FROM cart",(err,results,fields)=>{
//                 if(err){
//                     console.log(err)
//                     return res.status(400).send();
//                 }
//                 return res.status(200).json(results)
//             }
//         )
//     }catch(err){
//         console.log(err);
//         return res.status(500).send()
//     }

// })
// REad CART
app.get('/read/cart', (req, res) => {
    connection.query("SELECT * FROM cart", (err, results, fields) => {
        if (err) {
            console.log(err);
            return res.status(400).send();
        }
        return res.status(200).json(results);
    });
});

// DELETE CART
app.delete('/delete/cart/:id',async(req,res)=>{
    const id=req.params.id
    
    try{
        connection.query(
            "DELETE FROM cart WHERE id = ?",[id],(err,results,fields)=>{
                if(err){
                    console.log(err)
                    return res.status(400).send();
                }
                if (results.affectedRows===0){
                    return res.status(404).json({message:"error delete no success"});
                }
                return res.status(200).json({message:"name deleted success"})
            }
        )
    }catch(err){
        console.log(err);
        return res.status(500).send()
    }

})




app.listen(3000,()=>console.log('nodejs run on port 3000'));//เลือกใช้ port 3000