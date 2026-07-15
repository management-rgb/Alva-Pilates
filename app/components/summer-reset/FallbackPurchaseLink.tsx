import Link from "next/link";

export default function FallbackPurchaseLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href} className="summer-purchase-fallback-link" aria-label={label}>
      <span className="sr-only">{label}</span>
    </Link>
  );
}
