var express = require('express');
var router = express.Router();

var upload = require('../multer');
var pool = require('../pool')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    msg : 'run'
  })
});



router.post('/register',(req,res)=>{
    let body = req.body
    pool.query(`select name from organ_register where number = ${req.body.number}`,(err,result)=>{
        if(err) throw err;
        else if(result[0]){
         res.json({
            msg:'number already exists'
         })
        }
        else{
    pool.query(`insert into organ_register set ?`,body,(err,result)=>{

        if(err) throw err;
        else {
            res.json({
                msg:'success'
            })
        }
    })
        }
    })
})



router.post('/login',(req,res)=>{
    let body = req.body
     pool.query(`select * from organ_register where number = ${req.body.number} and password = '${req.body.password}'`,(err,result)=>{

        if(err) throw err;
        else if(result[0]){
             res.json({
                msg:'success'
            })
        }
        else {
            res.json({
                msg:'Invalid'
            })
        }
    })
})



router.post('/forgot-password',(req,res)=>{
    let body = req.body
    console.log("body",req.body)
     pool.query(`update organ_register set ? where number = ?`, [req.body, req.body.number], (err, result) => {
        if(err) throw err;
       else {
            res.json({
                status:'200',
               
            })
        }
    })
})





router.post('/add-donor', (req, res) => {
    let body = req.body;
 pool.query(`insert into organ_donor set ?`, body, (err, result) => {
        if(err) res.json(err)
        else  {
             res.json({
                status:'200',
                 })
        }
   
    })
   
    });



router.post('/request-donor', (req, res) => {
    let body = req.body;
 pool.query(`insert into organ_request set ?`, body, (err, result) => {
        if(err) res.json(err)
        else  {
             res.json({
                status:'200',
                 })
        }
   
    })
   
    });



router.get('/donor-list',(req,res)=>{
	pool.query(`select * from organ_donor order by id desc`,(err,result)=>{
		if(err) throw err;
		else res.json(result)
	})
})



router.get('/all-donor-request',(req,res)=>{
    pool.query(`select * from organ_donor where status is null order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})





router.get('/reject-donor', (req, res) => {
    const { id } = req.query
    pool.query(`delete from organ_donor where id = ${id}`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

router.post('/accept-donor', (req, res) => {
    console.log(req.body)
    pool.query(`update organ_donor set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})



router.get('/request-donor-list', (req, res) => {

    pool.query(`select * from organ_request order by id desc`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})



router.get('/user-list', (req, res) => {

    pool.query(`select * from organ_register order by id desc`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})


router.post('/list',(req,res)=>{
    console.log('body',req.body)
    pool.query(`select * from organ_donor where blood_group = '${req.body.blood_group}' and organ_name = '${req.body.organ_name}' and status is not null`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})


router.post('/single-details',(req,res)=>{
    pool.query(`select * from organ_donor where id = '${req.body.id}'`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})




router.post('/single-user',(req,res)=>{
    pool.query(`select * from organ_register where number = '${req.body.number}'`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})




router.get('/get_all_donor_list',(req,res)=>{
    pool.query(`select * from organ_donor where status is not null`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})






router.post('/user-list/delete',(req,res)=>{
    pool.query(`delete from organ_register where id = '${req.body.id}'`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})




router.post('/organ-donor-delete',(req,res)=>{
    pool.query(`delete from organ_request where id = '${req.body.id}'`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})







module.exports = router;