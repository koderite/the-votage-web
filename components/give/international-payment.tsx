import Image from "next/image";
import { Button } from "../ui/button";

export default function InternationalPayment() {
  return (
    <div className="rounded-2xl bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] px-6 py-8">
      <div className="grid place-items-center mb-6">
        <Image
          src="/img/give/banklogo.svg"
          alt="Bank Logo"
          width={30}
          height={30}
          className="mb-4"
        />
        <h1 className="font-display-light text-black">Bank Transfer</h1>
      </div>

      <div className="mt-3">
        <div className="p-6">
          <div className="flex gap-4 items-center ">
            <Image
              src="/img/give/banklogo.svg"
              alt="Bank Logo"
              width={30}
              height={30}
            />

            <div>
              <h1 className="text-black font-medium">International Payment</h1>
              <p className="text-sm text-text-body">
                Pay securely in USD with your Card
              </p>
            </div>
          </div>
        </div>
        <Button className="w-full" variant="black">
          Make payment
        </Button>
      </div>

      <div className="mt-4">
        <div className="p-6">
          <div className="flex gap-4 items-center mb-6 ">
            <Image
              src="/img/give/banklogo.svg"
              alt="Bank Logo"
              width={30}
              height={30}
            />

            <div>
              <h1 className="text-black font-medium">
                You can make payment Locally
              </h1>
              <p className="text-sm text-text-body">
                Instant Transfer via Paystack
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-text-body text-xs">Select Funds</label>
              <select className="w-full border text-text-body text-sm border-gray-300 rounded-md p-2 mt-1">
                <option value="general">General Fund</option>
                <option value="missions">Missions Fund</option>
                <option value="building">Building Fund</option>
              </select>
            </div>
            <div>
              <label className="text-text-body text-xs">Amount</label>
              <input
                type="text"
                className="w-full border border-gray-300 text-sm placeholder:text-text-body text-text-body rounded-md p-2 mt-1"
                placeholder="Enter amount"
              />
            </div>
            <div className="col-span-2">
              <label className="text-text-body text-xs">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 text-sm placeholder:text-text-body text-text-body rounded-md p-2 mt-1"
                placeholder="Anastasia@gmail.com"
              />
            </div>

            <Button className="w-full col-span-2" variant="black">
              Proceed to payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
