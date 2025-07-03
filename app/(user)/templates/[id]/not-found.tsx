import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <Image src="/404.png" alt="Not Found" height={200} width={200} className="mb-6 " />

      <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        Template Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Sorry, the template you are looking for does not exist or may have been
        removed.
      </p>
      <Link
        href="/templates"
        className="inline-block px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
      >
        Back to Templates
      </Link>
    </div>
  );
}
