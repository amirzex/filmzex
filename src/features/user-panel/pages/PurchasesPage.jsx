import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiX,
  FiMonitor,
  FiSmartphone,
  FiTablet,
  FiTv,
  FiDownload,
  FiFilm,
  FiZap,
  FiArrowLeft,
  FiCreditCard,
  FiLock,
  FiShield,
} from "react-icons/fi";
import Toast from "@/shared/ui/Toast";
import { PanelShell } from "@/features/user-panel/components/PanelShell";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Watch on one device",
    monthly: 4.99,
    yearly: 49.99,
    accent: "from-gray-600 to-gray-500",
    border: "border-gray-600/50",
    popular: false,
    features: {
      resolution: "720p HD",
      devices: 1,
      downloads: false,
      ads: true,
      spatial: false,
      earlyAccess: false,
    },
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Best for couples & roommates",
    monthly: 9.99,
    yearly: 99.99,
    accent: "from-red-600 to-rose-500",
    border: "border-red-500/50",
    popular: true,
    features: {
      resolution: "1080p Full HD",
      devices: 2,
      downloads: true,
      ads: false,
      spatial: false,
      earlyAccess: false,
    },
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Ultimate cinema at home",
    monthly: 14.99,
    yearly: 149.99,
    accent: "from-amber-500 to-orange-500",
    border: "border-amber-500/40",
    popular: false,
    features: {
      resolution: "4K Ultra HD + HDR",
      devices: 4,
      downloads: true,
      ads: false,
      spatial: true,
      earlyAccess: true,
    },
  },
];

const COMPARE_ROWS = [
  { key: "resolution", label: "Video quality", type: "text" },
  { key: "devices", label: "Screens at once", type: "text" },
  { key: "downloads", label: "Offline downloads", type: "bool" },
  { key: "ads", label: "Ad-free streaming", type: "invert" },
  { key: "spatial", label: "Spatial audio", type: "bool" },
  { key: "earlyAccess", label: "Early access titles", type: "bool" },
];

const STEPS = ["Plan", "Payment", "Done"];

const DEMO_TOAST =
  "This is a fake page — just for show / demo flow. No real payment will be charged.";

const priceOf = (plan, billing) =>
  billing === "monthly" ? plan.monthly : plan.yearly;

const formatCardNumber = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
};

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

function StepIndicator({ step }) {
  const index = step === "plans" ? 0 : step === "payment" ? 1 : 2;
  return (
    <div className="mb-8 flex items-center justify-center gap-2 sm:gap-3">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                i < index
                  ? "bg-emerald-500 text-white"
                  : i === index
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-500"
              }`}
            >
              {i < index ? <FiCheck className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`hidden text-sm sm:inline ${
                i === index ? "text-white" : "text-gray-500"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-px w-6 sm:w-10 ${
                i < index ? "bg-emerald-500/60" : "bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function PlansStep({
  billing,
  setBilling,
  selected,
  setSelected,
  onContinue,
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
          Membership
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Choose your plan
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400 sm:text-base">
          Unlimited movies & TV shows. Cancel anytime. Pick a plan that fits how
          you watch.
        </p>
      </motion.div>

      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
          {["monthly", "yearly"].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setBilling(mode)}
              className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition-all ${
                billing === mode
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        {billing === "yearly" && (
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Save up to 2 months with yearly billing
          </span>
        )}
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {PLANS.map((plan, index) => {
          const isSelected = selected === plan.id;
          return (
            <motion.button
              key={plan.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setSelected(plan.id)}
              className={`relative flex flex-col rounded-2xl border bg-gray-800/50 p-5 text-left backdrop-blur-sm transition-all ${
                isSelected
                  ? `${plan.border} ring-2 ring-red-500/40 scale-[1.02]`
                  : "border-gray-700/80 hover:border-gray-500"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-red-600 to-rose-500 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">
                  Most popular
                </span>
              )}
              <div
                className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${plan.accent}`}
              />
              <h2 className="text-xl font-bold text-white">{plan.name}</h2>
              <p className="mt-1 text-xs text-gray-400">{plan.tagline}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">
                  ${priceOf(plan, billing).toFixed(2)}
                </span>
                <span className="text-sm text-gray-400">
                  /{billing === "monthly" ? "mo" : "yr"}
                </span>
              </div>
              <ul className="mt-5 flex flex-1 flex-col gap-2.5 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <FiFilm className="h-4 w-4 text-red-400" />
                  {plan.features.resolution}
                </li>
                <li className="flex items-center gap-2">
                  <FiMonitor className="h-4 w-4 text-red-400" />
                  {plan.features.devices} screen
                  {plan.features.devices > 1 ? "s" : ""} at once
                </li>
                <li className="flex items-center gap-2">
                  {plan.features.downloads ? (
                    <FiCheck className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <FiX className="h-4 w-4 text-gray-600" />
                  )}
                  Downloads
                </li>
                <li className="flex items-center gap-2">
                  {!plan.features.ads ? (
                    <FiCheck className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <FiX className="h-4 w-4 text-gray-600" />
                  )}
                  Ad-free
                </li>
              </ul>
              <div
                className={`mt-6 w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-colors ${
                  isSelected
                    ? "bg-red-600 text-white"
                    : "bg-white/5 text-gray-300"
                }`}
              >
                {isSelected ? "Selected" : "Select plan"}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/5 bg-white/[0.03] px-6 py-4 text-gray-400">
        {[
          { icon: FiTv, label: "TV" },
          { icon: FiMonitor, label: "Laptop" },
          { icon: FiTablet, label: "Tablet" },
          { icon: FiSmartphone, label: "Phone" },
          { icon: FiDownload, label: "Offline" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm">
            <Icon className="h-4 w-4 text-red-400/80" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="mb-10 overflow-x-auto rounded-2xl border border-gray-700/60">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-700/60 bg-gray-800/40">
              <th className="px-4 py-3 font-medium text-gray-400">
                Compare features
              </th>
              {PLANS.map((plan) => (
                <th
                  key={plan.id}
                  className={`px-4 py-3 font-semibold ${
                    selected === plan.id ? "text-red-400" : "text-white"
                  }`}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr
                key={row.key}
                className="border-b border-gray-800/80 last:border-0"
              >
                <td className="px-4 py-3 text-gray-400">{row.label}</td>
                {PLANS.map((plan) => {
                  const value = plan.features[row.key];
                  let cell;
                  if (row.type === "text") {
                    cell = <span className="text-gray-200">{value}</span>;
                  } else if (row.type === "invert") {
                    cell = !value ? (
                      <FiCheck className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <FiX className="h-4 w-4 text-gray-600" />
                    );
                  } else {
                    cell = value ? (
                      <FiCheck className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <FiX className="h-4 w-4 text-gray-600" />
                    );
                  }
                  return (
                    <td key={plan.id} className="px-4 py-3">
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-950/40 to-gray-900/40 px-6 py-8 text-center">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FiZap className="h-4 w-4 text-amber-400" />
          Selected:{" "}
          <span className="font-semibold text-white">
            {PLANS.find((p) => p.id === selected)?.name}
          </span>{" "}
          · ${priceOf(PLANS.find((p) => p.id === selected), billing).toFixed(2)}
          /{billing === "monthly" ? "mo" : "yr"}
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="w-full max-w-sm rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-red-900/40 transition hover:brightness-110 active:scale-[0.98]"
        >
          Continue to payment
        </button>
        <p className="max-w-md text-xs text-gray-500">
          By continuing you agree to our Terms of Use. You can cancel anytime
          from Account settings.
        </p>
      </div>
    </>
  );
}

function PaymentStep({
  plan,
  billing,
  onBack,
  onPay,
  paying,
  showDemoToast,
}) {
  const [form, setForm] = useState({
    name: "",
    card: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});
  const [method, setMethod] = useState("card");

  const amount = priceOf(plan, billing);
  const tax = +(amount * 0.08).toFixed(2);
  const total = +(amount + tax).toFixed(2);

  const update = (field, value) => {
    let next = value;
    if (field === "card") next = formatCardNumber(value);
    if (field === "expiry") next = formatExpiry(value);
    if (field === "cvc") next = value.replace(/\D/g, "").slice(0, 4);
    setForm((prev) => ({ ...prev, [field]: next }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    if (method !== "card") return true;
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (form.card.replace(/\s/g, "").length < 16)
      next.card = "Enter a 16-digit card number";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) next.expiry = "Use MM/YY";
    if (form.cvc.length < 3) next.cvc = "Invalid CVC";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showDemoToast();
    if (!validate()) return;
    onPay({ ...form, method, total });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
    >
      <button
        type="button"
        onClick={onBack}
        disabled={paying}
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white disabled:opacity-50"
      >
        <FiArrowLeft className="h-4 w-4" />
        Change plan
      </button>

      <div className="mb-8 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
          Checkout
        </p>
        <h1 className="text-3xl font-bold text-white">Payment details</h1>
        <p className="mt-2 text-sm text-gray-400">
          Enter any fake card info — nothing is charged or stored.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-700/60 bg-gray-800/40 p-5 sm:p-6"
        >
          <p className="mb-4 text-sm font-medium text-gray-300">Pay with</p>
          <div className="mb-6 grid grid-cols-2 gap-2">
            {[
              { id: "card", label: "Credit card", icon: FiCreditCard },
              { id: "paypal", label: "PayPal", icon: FiShield },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMethod(id)}
                disabled={paying}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition ${
                  method === id
                    ? "border-red-500/50 bg-red-500/10 text-white"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {method === "card" ? (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-gray-400">
                  Name on card
                </label>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Alex Rivera"
                  disabled={paying}
                  className="w-full rounded-xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-red-500/50"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-gray-400">
                  Card number
                </label>
                <div className="relative">
                  <input
                    value={form.card}
                    onChange={(e) => update("card", e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                    disabled={paying}
                    className="w-full rounded-xl border border-gray-700 bg-gray-900/60 px-4 py-3 pr-10 text-sm tracking-wider text-white outline-none placeholder:text-gray-600 focus:border-red-500/50"
                  />
                  <FiCreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                </div>
                {errors.card && (
                  <p className="mt-1 text-xs text-red-400">{errors.card}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs text-gray-400">
                    Expiry
                  </label>
                  <input
                    value={form.expiry}
                    onChange={(e) => update("expiry", e.target.value)}
                    placeholder="MM/YY"
                    inputMode="numeric"
                    disabled={paying}
                    className="w-full rounded-xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-red-500/50"
                  />
                  {errors.expiry && (
                    <p className="mt-1 text-xs text-red-400">{errors.expiry}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-gray-400">
                    CVC
                  </label>
                  <input
                    value={form.cvc}
                    onChange={(e) => update("cvc", e.target.value)}
                    placeholder="123"
                    inputMode="numeric"
                    disabled={paying}
                    className="w-full rounded-xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-red-500/50"
                  />
                  {errors.cvc && (
                    <p className="mt-1 text-xs text-red-400">{errors.cvc}</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-600 bg-gray-900/40 px-4 py-8 text-center">
              <p className="text-sm text-gray-300">
                You&apos;ll be redirected to a fake PayPal login.
              </p>
              <p className="mt-1 text-xs text-gray-500">Demo only — no redirect.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={paying}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
          >
            {paying ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing…
              </>
            ) : (
              <>
                <FiLock className="h-4 w-4" />
                Pay ${total.toFixed(2)}
              </>
            )}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <FiLock className="h-3 w-3" />
            Encrypted demo checkout — no real charge
          </p>
        </form>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl border border-gray-700/60 bg-gray-800/40 p-5 sm:p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Order summary
          </h2>
          <div className="mb-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-white">{plan.name} plan</p>
                <p className="mt-0.5 text-xs text-gray-400">{plan.tagline}</p>
                <p className="mt-2 text-xs capitalize text-gray-500">
                  Billed {billing}
                </p>
              </div>
              <p className="font-semibold text-white">
                ${amount.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="space-y-2 border-t border-gray-700/60 pt-4 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Tax (est.)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-700/60 pt-3 text-base font-bold text-white">
              <span>Total due today</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <ul className="mt-5 space-y-2 text-xs text-gray-500">
            <li className="flex items-center gap-2">
              <FiCheck className="h-3.5 w-3.5 text-emerald-400" />
              Cancel anytime
            </li>
            <li className="flex items-center gap-2">
              <FiCheck className="h-3.5 w-3.5 text-emerald-400" />
              Instant access after payment
            </li>
            <li className="flex items-center gap-2">
              <FiCheck className="h-3.5 w-3.5 text-emerald-400" />
              {plan.features.resolution} streaming
            </li>
          </ul>
        </aside>
      </div>
    </motion.div>
  );
}

function SuccessStep({ plan, billing, total, onAgain }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-md py-10 text-center"
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
        <FiCheck className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-bold text-white">You&apos;re all set</h1>
      <p className="mt-3 text-sm text-gray-400">
        Fake payment completed for the{" "}
        <span className="font-medium text-white">{plan.name}</span> plan (
        {billing}). Nothing was charged.
      </p>
      <div className="mt-6 rounded-2xl border border-gray-700/60 bg-gray-800/40 px-5 py-4 text-left text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Plan</span>
          <span className="text-white">{plan.name}</span>
        </div>
        <div className="mt-2 flex justify-between text-gray-400">
          <span>Amount</span>
          <span className="text-white">${total.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex justify-between text-gray-400">
          <span>Status</span>
          <span className="text-emerald-400">Demo success</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onAgain}
        className="mt-8 w-full rounded-xl border border-gray-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
      >
        Start over
      </button>
    </motion.div>
  );
}

const SubscriptionPage = () => {
  const [step, setStep] = useState("plans");
  const [billing, setBilling] = useState("monthly");
  const [selected, setSelected] = useState("standard");
  const [paying, setPaying] = useState(false);
  const [paidTotal, setPaidTotal] = useState(0);
  const [toastOpen, setToastOpen] = useState(false);

  const plan = PLANS.find((p) => p.id === selected);

  const showDemoToast = useCallback(() => setToastOpen(true), []);
  const closeToast = useCallback(() => setToastOpen(false), []);

  useEffect(() => {
    if (step !== "plans") return undefined;
    const timer = setTimeout(showDemoToast, 600);
    return () => clearTimeout(timer);
  }, [step, showDemoToast]);

  useEffect(() => {
    if (step === "payment") showDemoToast();
  }, [step, showDemoToast]);

  const handlePay = () => {
    setPaying(true);
    const amount = priceOf(plan, billing);
    const total = +(amount + amount * 0.08).toFixed(2);
    setTimeout(() => {
      setPaidTotal(total);
      setPaying(false);
      setStep("success");
      showDemoToast();
    }, 1800);
  };

  return (
    <PanelShell>
      <div className="mx-auto max-w-5xl">
        <StepIndicator step={step} />

        <AnimatePresence mode="wait">
          {step === "plans" && (
            <motion.div
              key="plans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <PlansStep
                billing={billing}
                setBilling={setBilling}
                selected={selected}
                setSelected={setSelected}
                onContinue={() => setStep("payment")}
              />
            </motion.div>
          )}

          {step === "payment" && (
            <PaymentStep
              key="payment"
              plan={plan}
              billing={billing}
              paying={paying}
              onBack={() => setStep("plans")}
              onPay={handlePay}
              showDemoToast={showDemoToast}
            />
          )}

          {step === "success" && (
            <SuccessStep
              key="success"
              plan={plan}
              billing={billing}
              total={paidTotal}
              onAgain={() => {
                setStep("plans");
                setPaidTotal(0);
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <Toast open={toastOpen} message={DEMO_TOAST} onClose={closeToast} />
    </PanelShell>
  );
};

export default SubscriptionPage;
