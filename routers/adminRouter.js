const adminRouter = require('express').Router()
const userModel = require("../models/userModel.js")
const projectModel = require("../models/projectmodel.js")
const bcrypt = require("bcrypt")
const session = require('express-session')
const authguard = require('../services/authguard.js')
const multer = require('../services/multer-config.js')


//AFFICHER MA PAGE ADMIN
adminRouter.get('/login', (req, res) => {
    try {
        res.render("admin/login.twig", {
            'route': '/login'
        })
    } catch (error) {
        res.send(error)
    }
})
//CONNEXION A MON ADMIN
adminRouter.post('/login', async (req, res) => {
    try {
        let user = await userModel.findOne({ pseudo: req.body.username }) //on recherche l'utilisateur
        if (user) { // si il existe
            if (bcrypt.compare(req.body.password, user.password)) { // on compare le mots de passe
                req.session.user = user._id // on stock l'utilisateur en session
                res.redirect('/dashboard') // on redirige vers la future route dashboard
            } else {
                throw { password: "Mauvais mot de passe" } // on releve l'exeption mot de passe
            }
        } else {
            throw { email: "Cet utilisateur n'est pas enregistrer" } // on releve l'exeption si l'user n'existe pas 
        }
    } catch (error) {
        //on rend la vue connexion avec l'erreur 
        res.render('admin/login.twig', {

        })
    }
})
//route pour afficher mon dashboard avec mes projet
adminRouter.get('/dashboard', authguard,async (req, res) => {
    try {
        const projects = await projectModel.find()// afficher mes projet
        res.render("admin/dashboard.twig", {
            'route': '/dashboard',
            projects : projects 
        })
    } catch (error) {
        res.send(error)
    }
})

//route pour crée un projet
adminRouter.post('/addForm',authguard,multer.single('image') ,async (req,res) =>{
    try {
        const project = new projectModel(req.body) // cration du projet
        if (req.file) {
            if (req.multerError) {
                throw{errorUpload:"le ficher n'est pas valide"}
            }
            req.body.image = req.file.filename
            project.image = req.file.filename
        }
        project.validateSync()
        await project.save() // sauvegarde en base
        console.log(project);
        res.redirect("/dashboard") // redirection vers dashboard si pas d'erreur de validation
    } catch (error) {
        console.log(error);
        res.render('admin/dashboard.twig')
    }
})
// route pour supprimer un projet
adminRouter.get('/deleteProject/:projectid', authguard, async(req,res) =>{
    try {
        await projectModel.deleteOne ({_id: req.params.projectid})
        res.redirect("/dashboard")
    } catch (error) {
        console.log(error);
        res.render('admin/dashboard.twig')
    }
})
// route afficher la page modifier un projet
adminRouter.get('/updateProject/:projectid', authguard, async (req,res) =>{
    try {
        const project = await projectModel.findById(req.params.projectid);
        if(!project){
            throw {error: "projet introuvable"}
        }
        res.render("admin/updateForm.twig",{
            project:project
        })
    } catch (error) {
        res.render("admin/dashboard.twig")
    }
})
// route pour modifier un projet
adminRouter.post('/updateProject/:projectid', authguard,multer.single('image'), async(req,res) =>{
    try {
        if (req.file) {
            if (req.multerError) {
                throw{errorUpload:"le ficher n'est pas valide"}
            }
            req.body.image = req.file.filename
        }
        await projectModel.updateOne({ _id: req.params.projectid},req.body);
        res.redirect("/dashboard");
    } catch (error) {
        res.render('admin/dashboard.twig',{
            errorDelete: "probleme survenue"
        })
    }
})





module.exports = adminRouter



// loginRouter.get('/haluk', async (req, res) =>{

//         const user = {
//             pseudo: "Haluk",
//             password: await bcrypt.hash("",10)

//         }
//         const newuser = new userModel(user)
//         newuser.save()


// })
