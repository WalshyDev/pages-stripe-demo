import type { ChangeEvent } from 'react';

interface PriceInputProps {
	setPrice: (value: number) => void;
	price: '' | number;
}

export default function PriceInput({ setPrice, price }: PriceInputProps) {
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		const value = e.target.value;
		const intVal = Number.parseInt(value);

		if (value !== '' && (!/[0-9]*/g.test(value) || Number.isNaN(intVal))) {
			e.preventDefault();
			return;
		}

		setPrice(intVal);
	}

	return (
		<div>
			<label htmlFor="price" className="block text-sm font-medium text-gray-700">
				Price
			</label>
			<div className="relative mt-1 rounded-md shadow-sm">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<span className="text-gray-500 sm:text-sm">$</span>
				</div>
				<input
					type="text"
					name="price"
					id="price"
					className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					placeholder="0.00"
					aria-describedby="price-currency"
					onChange={(e) => onChange(e)}
					value={Number.isNaN(price) ? '' : price}
				/>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
					<span className="text-gray-500 sm:text-sm" id="price-currency">
						USD
					</span>
				</div>
			</div>
		</div>
	)
}
