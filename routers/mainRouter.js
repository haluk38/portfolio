const mainRouter = require('express').Router()
const projectModel = require("../models/projectmodel.js")

mainRouter.get('/accueil', (req, res) =>{
    try {
        res.render("portfolio/homePage.twig",{
            'route':'/accueil'
        })
    } catch (error) {
        res.send(error)
    }
})
mainRouter.get('/about', (req,res) =>{
    try {
        res.render("portfolio/aboutPage.twig",{
            'route':'/about'
        })
    } catch (error) {
        res.send(error)
    }
})
mainRouter.get('/portfolio', async (req,res) =>{
    try {
        const project = await projectModel.find()
        res.render("portfolio/portfolioPage.twig",{
            projects : project,
            'route':'/portfolio'
            
        })
    } catch (error) {
        res.send(error)
    }
})
mainRouter.get('/contact', (req,res) =>{
    try {
        res.render("portfolio/contactPage.twig",{
            'route':'/contact'
        })
    } catch (error) {
        res.send(error)
    }
})


module.exports = mainRouter