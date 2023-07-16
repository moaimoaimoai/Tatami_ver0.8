import Stripe from 'stripe'
import {buffer} from 'micro'

const endpointSecret = 'whsec_be1addb04d45e155fa6a60b8b1a448c85b2335ee81f4c12e94a32f09ec4cae77'
const stripe = new Stripe('pk_test_51NNq26BweimbndG7ZTF4PRIb3YuirtsHFCP0UqtJiHhnnJojYzAPU87AwNeiqmrtginNR33DRJwGIbk0Ffs8fwdJ00Zv3ekPaK', {
  apiVersion: '2020-08-27'
})

export const config = {
    api: {
        bodyParser: false
    }
}
export default async function handler(
  request,
  response
) {
  const sig = request.headers['stripe-signature'];
  const buf = await buffer(request)

  let event;
  try {
    if (!sig) throw new Error("No signature provided")
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (e) {
    const err = e instanceof Error ? e : new Error("Bad Request")
    console.log(err)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log(event)

  return response.status(200).end()
}