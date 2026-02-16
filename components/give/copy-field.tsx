"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs text-gray-500 mb-2">{label}</p>
        <p className="font-semibold text-sm text-black">{value}</p>
      </div>

      <button
        onClick={handleCopy}
        className="text-gray-400 hover:text-black transition"
        title="Copy"
      >
        <Copy size={16} />
      </button>
    </div>
  );
}
