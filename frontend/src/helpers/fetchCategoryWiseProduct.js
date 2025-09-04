
const {default: SummaryApi} = require("../common")

const fetchCategoryWiseProduct = async(category) =>{
    const response = await fetch(SummaryApi.categoryWiseProduct.url,{
        method: "POST",
        headers :{
            "content-type":"application/json",
        },
        body: JSON.stringify({
             category
        })

    })

    const dataResponse = await response.json()
    console.log("Api response", dataResponse);
    return dataResponse

}
export default fetchCategoryWiseProduct