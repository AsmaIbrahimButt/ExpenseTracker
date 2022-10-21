const model=require('../model/model');


// post categories
async function createCategories(req,res){
    const Create=new model.Categories({
    type:"Investment",
    color:"#FCBE44",  //dark
    })

await Create.save(function(err){
if(!err) return res.json(Create);
return res.status(400).json({message:`Error while creating categories ${err}`});

})
}

// get request
async function get_Categories(req,res){
   let data=await model.Categories.find({})
   let filter= await data.map(v=>Object.assign({},{type:v.type,color:v.color}));
   return res.json(filter);

}

// post tracation request
async function createTransaction(req,res){
    if(!req.body) return res.status(400).json("Post http data not provided");
    let {name,type,amount}=req.body;

    const create=await new model.Transaction(
        {
         name,
         type,
         amount,
         date:new Date()

        }
    );


create.save(function(err){
if(!err) return res.json(create);
return res.status(400).json({message:`Error wile creating transaction ${err}`});
});



}




// get request

async function getTransaction(req,res){
let data=await model.Transaction.find({});
return res.json(data);

}

// delete request transaction
async function deleteTransaction(req,res)
{
    if(!req.body) res.status(400).json({message:"Request body not found"});
    await model.Transaction.deleteOne(req.body,function(err){
    if(!err) res.json("Record Deleted...!");
    }).clone().catch(function(err){res.json("Error while deleting Transaction Record")});
}


// get request for labels
async function getLabels(req, res){

    model.Transaction.aggregate([
        {
            $lookup : {
                from: "categories",
                localField: 'type',
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}));
        res.json(data);
    }).catch(error => {
        res.status(400).json("Looup Collection Error");
    })

}


module.exports = {
    createCategories,
    get_Categories,
    createTransaction,
    getTransaction,
    deleteTransaction,
    getLabels

}