const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Three simple steps to create amazing content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Choose Template
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Select from 50+ pre-built AI templates or create your own
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Fill Details
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Provide your content requirements and context
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Generate & Use
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Get your AI-generated content instantly, ready to use
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
