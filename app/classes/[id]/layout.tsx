import type { Metadata } from "next";
import { getAllClasses, getClassById } from "../../lib/data";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllClasses().map((c) => ({ id: c._id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const classItem = getClassById(id);
  if (!classItem) return { title: "Class not found" };

  const name = classItem.className.trim();
  const plain = classItem.description.replace(/\*\*/g, "").replace(/\s+/g, " ");
  const description =
    plain.length > 155 ? `${plain.slice(0, 152).replace(/\s+\S*$/, "")}…` : plain;

  return {
    title: `${name} | Reformer Pilates in Valencia, CA`,
    description,
    alternates: { canonical: `/classes/${id}` },
    openGraph: { images: [{ url: classItem.classImage, alt: name }] },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
