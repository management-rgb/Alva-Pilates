type SummerPriceDisplayProps = {
  price: string;
  listPrice?: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "right";
};

const priceSizes = {
  sm: "text-lg sm:text-xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-3xl sm:text-4xl",
  xl: "text-4xl sm:text-5xl",
};

export default function SummerPriceDisplay({
  price,
  listPrice,
  size = "md",
  align = "left",
}: SummerPriceDisplayProps) {
  const alignClass = align === "right" ? "items-end text-right" : "items-start";

  return (
    <div className={`flex flex-col gap-0.5 tabular-nums ${alignClass}`}>
      {listPrice && (
        <span className="font-paragraph text-sm text-charcoal/45 line-through decoration-charcoal/35">
          {listPrice}
        </span>
      )}
      <span
        className={`font-heading font-bold text-charcoal ${priceSizes[size]}`}
      >
        {price}
      </span>
    </div>
  );
}
