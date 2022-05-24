const { response } = require("express");
const {Category} = require("../models");

// Get categorys with paginate  & user data
const getCategorys = async (req, res = response )=>{
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [ total, categorys ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limit ))]);    
        res.json({ total, categorys })
    }
// Get a category  - populate make a return of the user data 
const getCategory = async (req, res = response )=>{
    const {id} = req.params; 
    const category = await Category.findById(id)
            .populate('user', 'nombre')
        res.json(category)
    }
// Create a new Category
const createCategory = async (req, res = response) => {
    //Read the body - Capitalize
    const nombre = req.body.nombre.toUpperCase(); 
    // Match using findOne - Category Exist?
    const categoryDB = await Category.findOne({ nombre });
        if (categoryDB){
            return res.status(400).json({ msg: `La categoria ${categoryDB.nombre}, ya existe` });
        }
    // Generate data to save
    const data = {
        nombre,
        user: req.user._id
    }
    //Create a new instance of Category - set of data
    const category = new Category( data );
    // Save at DB
        await category.save();
    //Response
        res.status(201).json(category);
    }

module.exports = {createCategory, getCategorys, getCategory}