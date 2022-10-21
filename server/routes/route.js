const routes=require('express').Router();
const controller=require('../controller/controller');




routes.route('/api/categories').post(controller.createCategories).get(controller.get_Categories);
routes.route('/api/transaction').post(controller.createTransaction)
.get(controller.getTransaction).delete(controller.deleteTransaction);


routes.route('/api/labels').get(controller.getLabels);
module.exports=routes;
