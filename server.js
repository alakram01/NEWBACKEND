const express = require('express');
 
const app =express();
const cors =require('cors');

const database ={
    users:[
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'Asdfgh123',
            entries: 0,
            joined: new Date(),
            fullname:'',
            address1: '',
            address2: '',
            city:'',
            province:'',
            zipcode:0

        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date(),
            fullname:'',
            address1: '',
            address2: '',
            city:'',
            province:'',
            zipcode:0
        }

    ]
}

//app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send(database.users);
});

app.post('/signin',(req,res)=>{
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success')
    }
    else{
        res.status(404).json('error logging in');
    }
    
});

app.post('/register',(req,res)=>{
    const{email, name, password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date(),
        fullname:'',
        address1: '',
        address2: '',
        city:'',
        province:'',
        zipcode:0
    })
    res.json(database.users[database.users.length-1])
    
});

app.post('/clientprofile',(req,res)=>{
    const{fullname, address1, address2, city,selectedState, zipcode,id} = req.body;
    database.users[database.users.length-1].fullname=fullname;
    database.users[database.users.length-1].address1=address1;
    database.users[database.users.length-1].address2=address2;
    database.users[database.users.length-1].city=city;
    database.users[database.users.length-1].province=selectedState;
    database.users[database.users.length-1].zipcode=zipcode;    
    res.json(database.users[database.users.length-1])
    
});
app.get('/profile/:id',(req,res)=>{
    const{id} = req.params;
    const found  =false;
    database.users.forEach(user =>{
        if(user.id===id){
       return  res.json(user);
        }     
    })
if(!found){
    res.status(400).json('not found');
}
    
    
});





app.listen(3000);
