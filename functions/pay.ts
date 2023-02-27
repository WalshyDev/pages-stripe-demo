import Stripe from "stripe";

interface Env {
	STRIPE_API_KEY: string;
}

interface Body {
	price: number;
	cardNumber: string;
	expiry: string;
	cvc: number;
	country: string;
	zipcode: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
	try {
		const body = await request.json<Body>();

		const stripe = new Stripe(env.STRIPE_API_KEY, {
			apiVersion: '2022-11-15',
			httpClient: Stripe.createFetchHttpClient()
		});

		const successUrl = new URL(request.url);
		successUrl.pathname = '/payment_successful';
		const cancelUrl = new URL(request.url);
		cancelUrl.pathname = '/';

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: 'Blob Sticker',
						},
						unit_amount: body.price * 100,
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: successUrl.toString(),
			cancel_url: cancelUrl.toString(),
		});

		return new Response(JSON.stringify({ success: true, data: { redirect_url: session.url } }));
	} catch (e) {
		return new Response(
			// @ts-ignore
			JSON.stringify({ success: false, error: "Payment failed - " + e.message }),
			{ status: 500 }
		);
	}
}
