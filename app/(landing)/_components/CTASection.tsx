import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Join thousands of creators who are already using EasyAi to create
            amazing content.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/sign-in">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 min-w-[280px]"
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Start Creating Now
              </Button>
            </Link>
            <Link href="/templates/explore">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 dark:border-slate-600 px-12 py-6 text-xl font-semibold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 min-w-[280px]"
              >
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
