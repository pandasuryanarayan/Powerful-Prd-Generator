'use client';

import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { clsx } from 'clsx';
import { Copy, Check } from 'lucide-react';
import { cleanSectionContent } from '@/lib/nara-client';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  sectionId?: string;
  onSectionClick?: (id: string) => void;
}

function CodeBlock({ className, children, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const isBlock = className?.includes('language-') || String(children).includes('\n');
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isBlock) {
    return (
      <code
        className="rounded-md bg-[#f1f1ee] px-1.5 py-0.5 font-mono text-[13px] font-semibold text-[#c2410c] border border-[#deded8]/60"
        {...props}
      >
        {children}
      </code>
    );
  }

  const language = className?.replace(/language-/, '') || 'text';

  return (
    <div className="relative group my-5 overflow-hidden rounded-xl border border-[#334155] bg-[#0f172a] shadow-md">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b]/80 border-b border-[#334155] text-xs text-[#94a3b8]">
        <span className="font-mono uppercase text-[11px] font-semibold tracking-wider text-[#cbd5e1]">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded bg-white/10 px-2 py-1 text-[11px] text-white hover:bg-white/20 transition-all"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" /> Copied
            </>
          ) : (
            <>
              <Copy size={12} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed text-[#f8fafc] font-mono">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  // Normalize AI raw content (handles JSON objects, escaped newlines, outer markdown code fences)
  const normalized = useMemo(() => {
    const cleaned = cleanSectionContent(content);
    return cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }, [content]);

  return (
    <div className={clsx('markdown-body text-[#171717]', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1({ children }) {
            return (
              <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#171717] mt-8 mb-4 tracking-tight border-b border-[#deded8] pb-3">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#171717] mt-7 mb-3 tracking-tight border-b border-[#f1f1ee] pb-2">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#171717] mt-6 mb-2">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="text-[16px] font-semibold text-[#171717] mt-5 mb-2">
                {children}
              </h4>
            );
          },
          p({ children }) {
            return (
              <p className="text-[#374151] leading-[1.7] my-3 text-[15px]">
                {children}
              </p>
            );
          },
          ul({ children }) {
            return (
              <ul className="list-disc list-outside pl-6 my-3 space-y-1.5 text-[#374151] text-[15px]">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="list-decimal list-outside pl-6 my-3 space-y-1.5 text-[#374151] text-[15px]">
                {children}
              </ol>
            );
          },
          li({ children }) {
            return (
              <li className="leading-relaxed pl-1">
                {children}
              </li>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-[#f97316] bg-[#fff1e8]/50 pl-4 py-2.5 my-4 rounded-r-xl italic text-[#475569]">
                {children}
              </blockquote>
            );
          },
          hr() {
            return <hr className="my-8 border-t border-[#deded8]" />;
          },
          table({ children }) {
            return (
              <div className="my-6 overflow-x-auto rounded-xl border border-[#deded8] shadow-xs">
                <table className="min-w-full divide-y divide-[#deded8] text-sm text-left">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-[#f7f7f5] text-[#171717] font-semibold">
                {children}
              </thead>
            );
          },
          tbody({ children }) {
            return (
              <tbody className="divide-y divide-[#deded8] bg-white text-[#374151]">
                {children}
              </tbody>
            );
          },
          tr({ children }) {
            return (
              <tr className="hover:bg-[#fafaf9] transition-colors">
                {children}
              </tr>
            );
          },
          th({ children }) {
            return (
              <th className="px-4 py-3 font-semibold text-[#171717] text-xs uppercase tracking-wider">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-4 py-3 text-sm leading-normal">
                {children}
              </td>
            );
          },
          code: CodeBlock,
          strong({ children }) {
            return <strong className="font-bold text-[#171717]">{children}</strong>;
          },
          em({ children }) {
            return <em className="italic text-[#374151]">{children}</em>;
          },
          a({ href, children }) {
            const safeHref = href && /^https?:\/\//.test(href) ? href : '#';
            return (
              <a
                href={safeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f97316] font-medium hover:text-[#ea580c] underline underline-offset-2"
              >
                {children}
              </a>
            );
          },
          input({ type, checked }) {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  readOnly
                  className="rounded border-[#deded8] text-[#f97316] mr-2 align-middle focus:ring-0"
                />
              );
            }
            return null;
          },
        }}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}