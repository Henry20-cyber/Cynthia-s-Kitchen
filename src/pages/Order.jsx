import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Trash2,
  MapPin,
  UserRound,
  Phone,
  MessageSquare,
  ClipboardCheck,
} from "lucide-react";
import { useCart } from "../hooks/useCart";

const formatNaira = (kobo) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(kobo / 100);

const ADDITIONAL_ORDER_CHARGE_KOBO = 400 * 100;

const initialForm = {
  customerName: "",
  phone: "",
  address: "",
  notes: "",
};

export default function Order() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    changeQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setFormMessage("");
  }

  function handleCheckout(event) {
    event.preventDefault();

    const nextErrors = {};

    if (form.customerName.trim().length < 2) {
      nextErrors.customerName = "Enter your full name.";
    }

    const normalizedPhone = form.phone.replace(/[\s()-]/g, "");

    if (!/^(?:\+?234|0)[789][01]\d{8}$/.test(normalizedPhone)) {
      nextErrors.phone = "Enter a valid Nigerian mobile number.";
    }

    if (form.address.trim().length < 10) {
      nextErrors.address = "Enter a complete delivery address.";
    }

    if (cartItems.length === 0) {
      setFormMessage("Your cart is empty. Add a meal before checkout.");
      return;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormMessage("Please correct the highlighted fields.");
      return;
    }

    setFormMessage(
      "Your details are valid. Online checkout will be enabled after secure order processing is implemented.",
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
      <Link
        to="/menu"
        className="inline-flex items-center gap-2 text-sm font-medium text-orange-700 hover:text-orange-800"
      >
        <ArrowLeft size={17} />
        Continue shopping
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
          Your selection
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Your order</h1>
        <p className="mt-2 text-stone-500">
          Review your meals and enter your delivery details.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 px-5 py-16 text-center">
          <ShoppingBag size={44} className="mx-auto text-stone-400" />
          <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-stone-500">
            Explore our menu and add a meal to get started.
          </p>
          <Link
            to="/menu"
            className="mt-6 inline-flex rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Browse menu
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-orange-100 p-2.5 text-orange-700">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Your meals</h2>
                  <p className="text-sm text-stone-500">
                    Check your selections before continuing.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <article
                    key={item.key}
                    className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-stone-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-stone-500">
                          Protein: {item.proteinName}
                        </p>
                        <p className="mt-2 font-semibold text-orange-700">
                          {formatNaira(item.unitPriceKobo)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.key)}
                        aria-label={`Remove ${item.name}`}
                        className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => changeQuantity(item.key, -1)}
                        className="h-9 w-9 rounded-lg border border-stone-200 hover:bg-stone-50"
                      >
                        −
                      </button>

                      <span className="min-w-5 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => changeQuantity(item.key, 1)}
                        className="h-9 w-9 rounded-lg border border-stone-200 hover:bg-stone-50"
                      >
                        +
                      </button>

                      <span className="ml-auto font-bold">
                        {formatNaira(item.unitPriceKobo * item.quantity)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="mt-4 text-sm font-medium text-red-600 hover:text-red-800"
              >
                Clear entire cart
              </button>
            </section>

            <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-orange-100 p-2.5 text-orange-700">
                  <ClipboardCheck size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Delivery details</h2>
                  <p className="text-sm text-stone-500">
                    Tell us where to deliver your order.
                  </p>
                </div>
              </div>

              <form
                id="checkout-form"
                onSubmit={handleCheckout}
                noValidate
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="customerName"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <UserRound size={16} />
                    Full name
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    autoComplete="name"
                    value={form.customerName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    aria-invalid={Boolean(errors.customerName)}
                    aria-describedby={
                      errors.customerName ? "customerName-error" : undefined
                    }
                    className={inputClass}
                  />
                  {errors.customerName && (
                    <p
                      id="customerName-error"
                      className="mt-1.5 text-sm text-red-600"
                    >
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Phone size={16} />
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 08012345678"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-sm text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <MapPin size={16} />
                    Delivery address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    rows={3}
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Street, area, city, and useful directions"
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={
                      errors.address ? "address-error" : undefined
                    }
                    className={inputClass}
                  />
                  {errors.address && (
                    <p
                      id="address-error"
                      className="mt-1.5 text-sm text-red-600"
                    >
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <MessageSquare size={16} />
                    Order notes
                    <span className="font-normal text-stone-400">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    maxLength={500}
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Special instructions for your order"
                    className={inputClass}
                  />
                </div>

                {formMessage && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="rounded-xl bg-orange-50 p-3 text-sm leading-6 text-orange-800"
                  >
                    {formMessage}
                  </p>
                )}
              </form>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold">Order summary</h2>

            <div className="mt-5 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.key}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span className="text-stone-600">
                    {item.name} × {item.quantity}
                    <span className="block text-xs text-stone-400">
                      {item.proteinName}
                    </span>
                  </span>
                  <span className="shrink-0 font-medium">
                    {formatNaira(item.unitPriceKobo * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-between border-t border-stone-200 pt-4 text-sm text-stone-600">
              <span>Items ({cartCount})</span>
              <span>{formatNaira(cartSubtotal)}</span>
            </div>

            <div className="mt-5 flex justify-between border-t border-stone-200 pt-4 text-sm text-stone-600">
              <span>Subtotal</span>
              <span>{formatNaira(cartSubtotal)}</span>
            </div>

            <div className="mt-3 flex justify-between text-sm text-stone-600">
              <span>Additional order charge</span>
              <span>{formatNaira(ADDITIONAL_ORDER_CHARGE_KOBO)}</span>
            </div>

            <div className="mt-4 flex justify-between border-t border-stone-200 pt-4 text-lg font-bold">
              <span>Total</span>
              <span>
                {formatNaira(cartSubtotal + ADDITIONAL_ORDER_CHARGE_KOBO)}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-stone-500">
              The additional order charge is ₦400 per order. Any applicable
              delivery fee will be confirmed before payment.
            </p>

            <button
              type="submit"
              form="checkout-form"
              className="mt-6 w-full rounded-xl bg-orange-600 px-5 py-3.5 font-semibold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Continue to checkout
            </button>

            <Link
              to="/menu"
              className="mt-4 block text-center text-sm font-medium text-orange-700 hover:text-orange-800"
            >
              Add more meals
            </Link>

            <p className="mt-5 text-center text-xs leading-5 text-stone-400">
              No payment will be taken at this stage.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
