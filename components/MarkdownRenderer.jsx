"use client";

import copy from "copy-to-clipboard";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism"; 
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-[22px] font-semibold my-4 text-gray-900 dark:text-gray-100">
            {children}
          </h1>
        ),
        p: ({ children }) => (
          <p className="text-[16px] leading-[1.8] text-gray-800 dark:text-gray-300 mb-4 font-sans">
            {children}
          </p>
        ),
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");
          const [copied, setCopied] = React.useState(false);

          const handleCopy = async () => {
            try {
              await copy(codeString);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            } catch {}
          };

          return !inline && match ? (
            <div className="my-4 relative">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-dark-1/80 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs font-mono lowercase">{match[1]}</span>
                <button
                  onClick={handleCopy}
                  className="px-2 py-1 text-xs rounded bg-muted opacity-80 hover:opacity-100 transition"
                  type="button"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <SyntaxHighlighter
                {...props}
                language={match[1]}
                style={nightOwl}
                customStyle={{
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  borderTopLeftRadius: "0px",
                  borderTopRightRadius: "0px",
                  padding: "14px 16px",
                  fontSize: "15px",
                  lineHeight: "1.5",
                  overflowX: "auto",
                  margin: 0,
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              {...props}
              className="bg-gray-200 dark:bg-[#2d333b] text-gray-800 dark:text-gray-200 rounded px-1.5 py-0.5 text-[14px] font-mono"
              style={{
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
              }}
            >
              {children}
            </code>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 text-gray-700 dark:text-gray-400 italic">
            {children}
          </blockquote>
        ),
        br: () => <br className="my-1" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
