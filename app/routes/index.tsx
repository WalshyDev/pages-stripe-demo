import { useState } from "react";
import PriceInput from '~/components/PriceInput';

type PaymentState = "unpaid" | "paying" | "failed";

type Price = '' | number;

export default function Index() {
	const [price, setPrice] = useState<Price>('');
	const [paying, setPaying] = useState<PaymentState>("unpaid");

	function pay() {
		setPaying("paying");

		fetch("/pay", { method: "POST", body: JSON.stringify({ price }) })
			.then((res) => res.json<ApiResponse>())
			.then((res) => {
				if (!res.success) {
					setPaying("failed");
					console.error(res.error);
					return;
				}

				// Redirect to Stripe's payment page
				// @ts-ignore
				window.location = res.data!.redirect_url;
			})
			.catch((e) => {
				setPaying("failed");
				console.error(e);
			});
	}

	return (
		<div className="text-center font-bold p-8">
			<h1 className="text-4xl">Stripe Demo</h1>

			<h3 className="text-xl m-2">Pay what you want for a Blob Sticker!</h3>
			<p className="text-sm">
				This is a demo app running in Stripe's test mode. No real payment is done.
			</p>

			<hr className="my-8 mx-auto w-4/5 text-center border-zinc-800" />

			<div className="max-w-lg m-auto">
				<PriceInput
					setPrice={(price) => setPrice(price)}
					price={price}
				/>

				<button
					className={"p-4 border rounded-md my-4 " + (
						paying === "failed" ? "bg-red-300" : "bg-emerald-200"
					)}
					disabled={price === '' || paying === "paying"}
					onClick={() => pay()}
				>
						{paying === "paying"
							? "Paying..."
							: paying === "failed"
							? "Failed :("
							:	`Pay $${price || 0}`
							}
				</button>
			</div>

			<div className="mt-4">
				<p className="text-sm">
					Mock card details:
					<ul>
						<li>* Card number: 4242 4242 4242 4242</li>
						<li>* Expiry: 01/42 (or any future date)</li>
						<li>* CVC: 111 (or any 3 numbers)</li>
					</ul>
				</p>

				See the <a href="https://stripe.com/docs/testing#cards">docs</a> for a list of all available mock card details
			</div>
		</div>
	);
}
