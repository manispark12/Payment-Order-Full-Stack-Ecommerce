const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')

async function UploadProductController(req,res){
    try{
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")

        }
        const { _id, ...resBody} = req.body
        
        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
        res.json({
            message: "Product update successfully",
            data: updateProduct,
            success:true,
            error: false
        })
        
    }
        catch(err){
            res.status(400).json({
                   messsage:  err.message || err,
                error: false,
                success: true,
          
             
            })
        }
    }
module.exports = UploadProductController