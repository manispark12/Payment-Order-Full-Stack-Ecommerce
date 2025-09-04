const productModel = require('../../models/productModel')

const filterProductController = async(req, res) =>{
    try{
        const categoryList = req?.body?.category || []
        const regexCategoryList = categoryList.map(cat => new RegExp(`^${cat}$`, 'i'));

        const product = await productModel.find({
            category : {
                "$in": regexCategoryList
            }
        })

        res.json({
            data : product,
            message : "product",
            error: false, 
            success : true
        })
    }catch(err){
        res.json({
            message:err.message || err,
            error: true,
            success : false
        })
    }

}
module.exports = filterProductController