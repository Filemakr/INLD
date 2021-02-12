var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool')
var table = 'users'
const imageToBase64 = require('image-to-base64');

/* GET home page. */



router.get('/cg',(req,res)=>{
    imageToBase64("https://deloservices.com/assets/img/tass2.jpeg") // Image URL
    .then(
        (response) => {
           res.send(response); // "iVBORw0KGgoAAAANSwCAIA..."
        }
    )
    .catch(
        (error) => {
           res.send(error); // Logs an error if there was one
        }
    )
})


router.get('/', function(req, res, next) {
 res.send('hi')
});


router.post('/signup',upload.single('image'), (req, res) => {
    let body = req.body;
    console.log("req.body",req.body)
    body['image'] = req.file.filename;
    console.log("body aayi",req.body)
 pool.query(`insert into ${table} set ?`, body, (err, result) => {
        if(err) res.json(err)
        else res.json({ 
        	    status : '200',
        	    description:'success' })
   
    })
   
    });



router.post('/profile',(req,res)=>{
	pool.query(`select * from ${table} where userid = ${req.body.userid}`,(err,result)=>{
		if(err) throw err;
		else res.json(result);
	})
})



router.get('/home',(req,res)=>{
    pool.query(`select * from home order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})


router.post('/wishes',(req,res)=>{
    pool.query(`select * from wishes where status = '${req.body.status}' order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})


router.post('/delete',(req,res)=>{
    pool.query(`delete from ${table} where id = ${req.body.id}`,(err,result)=>{
        if(err) throw err;
        else {
            res.json({
                status:'200',
                description:'success'
            })
        }
    })
})


router.post('/edit',(req,res)=>{
    pool.query(`select * from ${table} where id = ${req.body.id}`,(err,result)=>{
        if(err) throw err;
        else {
            res.json({
                status:'200',
                result:result,
                description:'success'
            })
        }
    })
})






router.post('/update',upload.single('image'), (req, res) => {
    let body = req.body;
 body['image'] = req.file.filename;
   console.log(body)
   pool.query(`update ${table} set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) throw err;
       else {
            res.json({
                status:'200',
                result:result,
                description:'success'
            })
        }
    })
})


router.post('/message', (req, res) => {
    let body = req.body;
    pool.query(`insert into message set ?`, body, (err, result) => {
        if(err) res.json(err)
        else res.json({ 
                status : '200',
                description:'success' })
   
    })
   
    });







router.post('/image',upload.single('image'), (req, res) => {
    let body = req.body;
    console.log("req.body",req.body)
    body['image'] = req.file.filename;
    console.log("body aayi",req.body)
 pool.query(`insert into image set ?`, body, (err, result) => {
        if(err) res.json(err)
        else res.json({ 
                status : '200',
                description:'success',
                image : req.body.image

                 })
   
    })
   
    });




router.post('/getimage',(req,res)=>{
    pool.query(`select * from image where userid= ${req.body.userid} order by id desc limit 1`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})

router.post('/check_url',(req,res)=>{
    let body = req.body
    console.log("urlaaya ha",req.body)
    res.json({
        msg:'200'
    })
})





router.post('/images',upload.single('image'), (req, res) => {
    let body = req.body;
    console.log("req.body",req.body)
    body['image'] = req.file.filename;
    console.log("body aayi",req.body)




 pool.query(`insert into images set ?`, body, (err, result) => {
        if(err) res.json(err)
        else {
res.json({
    msg:req.body.image
})
        }
   
    })
   
    });


router.get('/send',(req,res)=>{
    console.log('re',req.session.text)
    res.send(req.session.text)
})




module.exports = router;
