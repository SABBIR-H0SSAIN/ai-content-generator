export const templateSeederData = [
  {
    title: "Blog Content Generator",
    description:
      "Generate SEO-friendly blog articles based on your topic, keywords, and tone.",
    icon: "/template-icons/blog.png",
    prompt:
      "Given the blogTitle and optional keywords, write a comprehensive, SEO-optimized blog article. Include a catchy title, engaging introduction, well-structured headings, and a strong conclusion. Use a natural, informative tone. Format the output for a rich text editor.",
    forms: [
      {
        label: "Enter Blog Title / Topic",
        placeholder: "e.g. Benefits of Remote Work",
        type: "input",
        required: true,
        rowspan: 1,
        context: "Blog Title",
      },
      {
        label: "Optional Keywords (comma separated)",
        placeholder: "e.g. remote work, productivity, work from home",
        type: "input",
        required: false,
        rowspan: 1,
        context: "Keywords",
      },
    ],
  },

  {
    title: "Code Generator",
    description:
      "Generate working code snippets in any programming language based on a description.",
    icon: "/template-icons/code.png",
    prompt:
      "Given a detailed description and programming language, generate clean, well-commented, and efficient code. Explain any non-trivial logic in comments. Return the code in a code block for a rich text editor.",
    forms: [
      {
        label: "Code Description and Language",
        placeholder: "e.g. A C++ program to reverse a string",
        type: "textarea",
        required: true,
        rowspan: 3,
        context: "Code generation prompt",
      },
    ],
  },

  {
    title: "Product Description Generator",
    description:
      "Generate engaging, SEO-friendly product descriptions based on product details and target audience.",
    icon: "/template-icons/document.png",
    prompt:
      "Using the productName, features, and targetAudience, write a compelling, SEO-optimized product description. Highlight unique selling points and tailor the tone to the audience. Format for a rich text editor.",
    forms: [
      {
        label: "Enter Product Name",
        placeholder: "e.g. Wireless Bluetooth Headphones",
        type: "input",
        required: true,
        rowspan: 1,
        context: "Product Name",
      },
      {
        label: "Key Features (comma separated)",
        placeholder: "e.g. 40hr battery, noise cancellation, fast charging",
        type: "textarea",
        required: true,
        rowspan: 2,
        context: "Features",
      },
      {
        label: "Target Audience",
        placeholder: "e.g. Gamers, Audiophiles, Commuters",
        type: "input",
        required: false,
        rowspan: 1,
        context: "Audience",
      },
    ],
  },

  {
    title: "Product Review Generator",
    description:
      "Generate authentic, detailed product reviews based on product features and customer type.",
    icon: "/template-icons/product-review.png",
    prompt:
      "Given the productName, productFeatures, and customerPersona, write a natural, detailed, and balanced product review. Highlight strengths, mention any minor drawbacks, and provide a clear recommendation. Format for a rich text editor.",
    forms: [
      {
        label: "Product Name",
        placeholder: "e.g. Noise Cancelling Bluetooth Headphones",
        type: "input",
        required: true,
        rowspan: 1,
      },
      {
        label: "Key Features",
        placeholder:
          "e.g. 40-hour battery, Active Noise Cancellation, Fast charging",
        type: "textarea",
        required: true,
        rowspan: 2,
      },
      {
        label: "Customer Persona (optional)",
        placeholder: "e.g. Tech enthusiast, frequent traveler, casual user",
        type: "input",
        required: false,
        rowspan: 1,
      },
    ],
  },

  {
    title: "Email Template Generator",
    description:
      "Generate professional, personalized email templates for different situations.",
    icon: "/template-icons/gmail.png",
    prompt:
      "Given the emailTopic, recipientDetails, and emailTone, generate a complete, professional email template including subject line, greeting, body, and closing. Personalize the content and format for a rich text editor.",
    forms: [
      {
        label: "Email Topic or Purpose",
        placeholder: "e.g. Request for meeting, Job offer, Product inquiry",
        type: "input",
        required: true,
        rowspan: 1,
      },
      {
        label: "Tone of Email",
        placeholder: "e.g. Formal, Friendly, Persuasive",
        type: "input",
        required: false,
        rowspan: 1,
      },
      {
        label: "Additional Notes (optional)",
        placeholder: "Any extra info you'd like to include in the email",
        type: "textarea",
        required: false,
        rowspan: 3,
      },
    ],
  },

  {
    title: "FAQ Section Generator",
    description:
      "Automatically generate a list of frequently asked questions and answers based on your product or service.",
    icon: "/template-icons/question-mark.png",
    prompt:
      "Given the productName and keyDetails, generate a list of 5 frequently asked questions and their answers. Make the questions relevant and the answers clear. Format for a rich text editor.",
    forms: [
      {
        label: "Product or Service Name",
        placeholder: "e.g. Cloud Storage App",
        type: "input",
        required: true,
        rowspan: 1,
        context: "Product Name",
      },
      {
        label: "Key Details (comma separated)",
        placeholder: "e.g. Unlimited storage, secure encryption, mobile access",
        type: "textarea",
        required: true,
        rowspan: 2,
        context: "Key Details",
      },
    ],
  },

  {
    title: "Shell Command Helper",
    description:
      "Generate, explain, or debug shell commands for Linux, macOS, and Windows environments.",
    icon: "/template-icons/coding-shell.png",
    prompt:
      "Given the commandRequest and taskType, either generate a shell command, explain the given command, or debug and suggest corrections. Use clear explanations and format output for a rich text editor, with code blocks where needed.",
    forms: [
      {
        label: "Describe what you need the command to do",
        placeholder:
          "Find all .log files in the current directory and its subdirectories",
        type: "textarea",
        required: true,
        rowspan: 3,
        context: "Command Request",
      },
      {
        label: "Preferred Shell (optional)",
        placeholder: "Bash, Zsh, or PowerShell",
        type: "input",
        required: false,
        rowspan: 1,
        context: "Preferred Shell",
      },
    ],
  },

  {
    title: "English Grammar Check",
    description:
      "Corrects grammar, spelling, and punctuation mistakes in English text.",
    icon: "https://cdn-icons-png.flaticon.com/128/12596/12596700.png",
    prompt:
      "Correct the grammar, spelling, and punctuation in the provided text. Return only the corrected text in rich text editor format.",
    forms: [
      {
        label: "Text to Correct",
        placeholder: "Paste your text here...",
        type: "textarea",
        required: true,
        rowspan: 3,
        context: "Text needing grammar correction",
      },
    ],
  },

  {
    title: "Regex Generator",
    description:
      "Create a regular expression based on a natural language description.",
    icon: "/template-icons/regex.png",
    prompt:
      "Given a pattern description, generate a regular expression pattern and provide a brief explanation. Return the regex in a code block and the explanation below.",
    forms: [
      {
        label: "Pattern Description",
        placeholder: "Example: Match a valid email address",
        type: "textarea",
        required: true,
        rowspan: 2,
        context: "Regex requirement description",
      },
    ],
  },

  {
    title: "API Docs Generator",
    description:
      "Automatically generate API documentation based on given API code or schema.",
    icon: "/template-icons/application.png",
    prompt:
      "Given API code or schema, generate clean, well-structured API documentation. Use Markdown formatting and include endpoint details, parameters, and example requests/responses.",
    forms: [
      {
        label: "API Code/Schema",
        placeholder: "Paste your API routes or OpenAPI schema",
        type: "textarea",
        required: true,
        rowspan: 4,
        context: "API content for documentation",
      },
    ],
  },

  {
    title: "SQL Query Optimizer",
    description: "Review and optimize SQL queries for performance.",
    icon: "/template-icons/database-management.png",
    prompt:
      "Analyze the provided SQL query for performance issues and suggest an optimized version. Explain any changes and best practices. Format for a rich text editor.",
    forms: [
      {
        label: "SQL Query",
        placeholder: "Paste your SQL query here...",
        type: "textarea",
        required: true,
        rowspan: 3,
        context: "SQL query for optimization",
      },
    ],
  },

  {
    title: "Code Debugger",
    description:
      "Analyze your code for bugs and issues, and suggest fixes with explanations.",
    icon: "/template-icons/code-review.png",
    prompt:
      "Analyze the provided code, detect bugs or issues, and suggest clear fixes along with explanations. Return the corrected code in a rich text editor format inside a code block.",
    forms: [
      {
        label: "Paste the code you want to debug",
        placeholder: "Paste your buggy code here...",
        type: "textarea",
        required: true,
        rowspan: 4,
      },
      {
        label: "Describe the issue (optional)",
        placeholder:
          "e.g. The loop runs infinitely or variable not defined error",
        type: "textarea",
        required: false,
        rowspan: 2,
      },
    ],
  },

  {
    title: "Code Complexity Analyzer",
    description:
      "Analyze code complexity and identify areas for simplification.",
    icon: "/template-icons/complexity.png",
    prompt:
      "Analyze the provided code for complexity and suggest simplification opportunities. Highlight any redundant or overly complex logic. Format for a rich text editor.",
    forms: [
      {
        label: "Code to Analyze",
        placeholder: "Paste your code...",
        type: "textarea",
        required: true,
        rowspan: 4,
        context: "Code for complexity analysis",
      },
    ],
  },

  {
    title: "JSON Formatter",
    description: "Format and beautify your JSON data for better readability.",
    icon: "/template-icons/json.png",
    prompt:
      "Format and beautify the provided JSON. Return the result in a code block for easy copying.",
    forms: [
      {
        label: "JSON Data",
        placeholder: "Paste your JSON...",
        type: "textarea",
        required: true,
        rowspan: 3,
        context: "JSON data to format",
      },
    ],
  },

  {
    title: "Code to Pseudocode Converter",
    description:
      "Translate code into simple, readable pseudocode for easier understanding.",
    icon: "/template-icons/layers.png",
    prompt:
      "Convert the provided code into clear, step-by-step pseudocode. Use plain language and avoid technical jargon. Return only the pseudocode.",
    forms: [
      {
        label: "Code to Convert",
        placeholder: "Paste your code...",
        type: "textarea",
        required: true,
        rowspan: 3,
        context: "Code for pseudocode conversion",
      },
    ],
  },

  {
    title: "Social Media Caption Generator",
    description:
      "Create catchy, engaging captions for social media posts based on your topic and platform.",
    icon: "/template-icons/facebook.png",
    prompt:
      "Given the postTopic and platform, generate multiple catchy and engaging social media captions. Tailor the style to the platform and make the captions shareable. Format for a rich text editor.",
    forms: [
      {
        label: "Enter Post Topic",
        placeholder: "e.g. New Product Launch",
        type: "input",
        required: true,
        rowspan: 1,
        context: "Post Topic",
      },
      {
        label: "Social Media Platform",
        placeholder: "e.g. Instagram, Twitter, LinkedIn",
        type: "input",
        required: true,
        rowspan: 1,
        context: "Platform",
      },
    ],
  },
];
