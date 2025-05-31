export default function PaymentMethodButton({
  isPaymentMethod,
  SetPaymentFunc,
  PaymentMethod
}) {
  return (
    <button
      className={`w-[150px] h-[40px] ${
        isPaymentMethod === PaymentMethod
          ? "border-2 border-red-500 text-red-500"
          : "border-2 border-gray-300 text-gray-500"
      }`}
      onClick={() => {
        SetPaymentFunc(PaymentMethod);
      }}
    >
      {PaymentMethod}
    </button>
  );
}
