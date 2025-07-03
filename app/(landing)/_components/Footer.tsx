import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 bg-slate-900 dark:bg-slate-950 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Image src="/logo.svg" alt="EasyAi" width={32} height={32} />
          <span className="text-xl font-bold">EasyAi</span>
        </div>
        <p className="text-slate-400 mb-4">
          AI-powered content generation made simple and efficient.
        </p>
        <div className="flex justify-center gap-6 text-sm text-slate-400">
          <Link href="/sign-in" className="hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/sign-up" className="hover:text-white transition-colors">
            Sign Up
          </Link>
          <Link
            href="/templates/explore"
            className="hover:text-white transition-colors"
          >
            Templates
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
