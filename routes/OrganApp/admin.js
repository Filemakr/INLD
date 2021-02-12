var express = require('express');
var router = express.Router();

var upload = require('../multer');
var pool = require('../pool')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('OrganApp/admin',{msg:''})
});


router.post('/login',(req,res)=>{
    console.log(req.body)
	pool.query(`select * from admin where email = '${req.body.email}' and password ='${req.body.password}'`,(err,result)=>{
		if(err) throw err;
		else if(result[0]){
           req.session.adminid = result[0].id;
           res.redirect('/organ-donation/admin/dashboard')
		}
		else{
			res.render('OrganApp/admin',{msg:'Invalid Credentials'})
		}
	})
})


router.get('/dashboard',(req,res)=>{
	if(req.session.adminid){
     res.render('OrganApp/dashboard')
	}
	else{
	res.render('OrganApp/admin',{msg:'Please Login'})
	}
})



router.get('/dashboard/user-request',(req,res)=>{
    if(req.session.adminid){
     res.render('OrganApp/UserRequest')
    }
    else{
    res.render('OrganApp/admin',{msg:'Please Login'})
    }
})


router.get('/dashboard/user-list',(req,res)=>{
    if(req.session.adminid){
     res.render('OrganApp/UserList')
    }
    else{
    res.render('OrganApp/admin',{msg:'Please Login'})
    }
})








router.post('/insert',upload.single('image'), (req, res) => {
    let body = req.body;
    console.log("req.body",req.body)
    body['image'] = req.file.filename;
    console.log("body aayi",req.body)
 pool.query(`insert into wishes set ?`, body, (err, result) => {
        if(err) res.json(err)
        else  res.redirect('/admin/dashboard')
   
    })
   
    });



router.get('/show',(req,res)=>{
	pool.query(`select * from wishes order by id desc`,(err,result)=>{
		if(err) throw err;
		else res.json(result)
	})
})




router.get('/delete', (req, res) => {
    const { id } = req.query
    pool.query(`delete from wishes where id = ${id}`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

router.post('/update', (req, res) => {
    console.log(req.body)
    pool.query(`update wishes set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})



router.post('/update_image',upload.single('image'), (req, res) => {
    let body = req.body;

    body['image'] = req.file.filename

    pool.query(`update wishes set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) throw err;
       else  res.redirect('/admin/dashboard')
    })
})


//Home Start

router.get('/home',(req,res)=>{
	res.render('Home')
})







router.post('/insert/home',upload.single('image'), (req, res) => {
    let body = req.body;
    console.log("req.body",req.body)
    body['image'] = req.file.filename;
    console.log("body aayi",req.body)
 pool.query(`insert into home set ?`, body, (err, result) => {
        if(err) res.json(err)
        else  res.redirect('/admin/home')
   
    })
   
    });



router.get('/home/show',(req,res)=>{
	pool.query(`select * from home order by id desc`,(err,result)=>{
		if(err) throw err;
		else res.json(result)
	})
})




router.get('/home/delete', (req, res) => {
    const { id } = req.query
    pool.query(`delete from home where id = ${id}`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})


router.get('/messages',(req,res)=>{
	pool.query(`select * from message order by id desc`,(err,result)=>{
		if(err) throw err;
		else res.render('message',{result})
	})
})


router.get('/logout',(req,res)=>{
	req.session.adminid= null;
	res.redirect('/admin')
})






module.exports = router;