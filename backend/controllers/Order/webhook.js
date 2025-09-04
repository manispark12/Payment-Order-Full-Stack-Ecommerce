const stripe = require('../../config/stripe');
const orderModel = require('../../models/orderProductModel');
const addToCartModel=require('../../models/cartProduct')
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

// ✅ helper function
async function getLineItems(lineItems) {
  let productItems = [];
  if(lineItems?.data?.length){
  for (const item of lineItems.data) {
    const product=await stripe.products.retrieve(item.price.product)
    const productData={
      productId: product.metadata.productId,
      name: item.description,
      price: item.price.unit_amount / 100,
      quantity: item.quantity,
      image: product.images,

  }
  productItems.push(productData)
}
  }
  return productItems;
}
const webhooks = async (req, res) => {

const sig = req.headers['stripe-signature'];

let event;
try {
  event = stripe.webhooks.constructEvent(
    req.body, 
    sig,
    endpointSecret
  );
} catch (err) {
  console.error("❌ Webhook signature verification failed:", err.message);
  return res.status(400).send(`Webhook Error: ${err.message}`);
}

  switch(event.type){
     case 'checkout.session.completed': 
    const session = event.data.object;
     console.log("✅ Webhook received for session:", session.id);
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id,{
      limit:100,
    });
    console.log("✅ Line items for session:", lineItems.data.length, lineItems.data);


    const productDetails = await getLineItems(lineItems);

    const orderDetails = {
      productDetails:productDetails,
      email: session.customer_details.email,
      userId: session.metadata.userId,
      paymentDetails: {
        paymentId: session.payment_intent,
        payment_method_type: session.payment_method_types,
        payment_status: session.payment_status,
      },
      shipping_options: session.shipping_options.map(s => {
        return{
        ...s,
        shipping_amount: s.shipping_amount / 100 || 0,
      } 
    }),
      totalAmount: session.amount_total / 100,
    };    
      const order = new orderModel(orderDetails);
      const saveOrder=await order.save();
      console.log("✅ Order saved:", saveOrder?._id, saveOrder);
      if(saveOrder?._id){
        const deleteCartItem=await addToCartModel.deleteMany({userId : session.metadata.userId})
      }
    
    break;
    default:
      console.error(`Unhandled event type ${event.type}`);
    }
  return res.sendStatus(200);
};

module.exports = webhooks;
