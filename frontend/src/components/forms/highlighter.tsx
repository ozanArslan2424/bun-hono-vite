import { cn } from "@/lib/utils";
import { useMemo, useRef, useState } from "react";

type SyntaxHighlighterProps = {
  fixedHeight?: string;
};

export function SyntaxHighlighter({ fixedHeight }: SyntaxHighlighterProps) {
  const [content, setContent] = useState<string>("");
  const [height, setHeight] = useState<string>("8rem");

  function handleHeightChange(height: number) {
    setHeight(`${height}px`);
  }

  return (
    <div
      className={cn(
        "relative flex w-full max-w-2xl rounded-md border bg-zinc-300",
        "*:text-md *:h-full *:w-full *:whitespace-pre-wrap *:rounded-md *:bg-transparent *:p-4 *:font-mono *:font-medium",
      )}
      style={{
        height: fixedHeight ? fixedHeight : height,
        maxHeight: fixedHeight ? fixedHeight : "none",
        overflowY: "scroll",
      }}
    >
      <TextInput
        onChange={setContent}
        onHeightChange={handleHeightChange}
        initialHeight={fixedHeight}
      />
      <TextView content={content} />
    </div>
  );
}

function TextInput({
  onChange,
  onHeightChange,
  initialHeight,
}: {
  onChange: (value: string) => void;
  onHeightChange: (height: number) => void;
  initialHeight?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = initialHeight ? initialHeight : "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      onHeightChange(textareaRef.current.scrollHeight);
    }
  }

  return (
    <textarea
      ref={textareaRef}
      className="absolute flex-grow resize-none overflow-hidden text-transparent caret-black outline-none"
      onChange={handleChange}
    />
  );
}

type MatchProps = {
  regex: RegExp;
  className: string;
};

const defaultRegex = {
  step: /[A-Za-z]+\s\d:/i,
  floating: /\d+\.\d+/,
  number: /\d+/,
  percent: /%/,
  operator: /\s[+\-<>[\]/*%^=]\s/,
  paranthesis: /[()]/,
  colon: /:\s/i,
  keyword: /[A-Za-z]+:\s/i,
};

const TextView = ({
  content,
  matchRules,
}: {
  content: string;
  matchRules?: MatchProps[];
}) => {
  const defaultMatches = useMemo(() => {
    const matches: MatchProps[] = [
      { regex: defaultRegex.step, className: "bg-yellow-400/30" },
      { regex: defaultRegex.colon, className: "bg-rose-400/30" },
      { regex: defaultRegex.keyword, className: "bg-rose-400/30" },
      { regex: defaultRegex.floating, className: "bg-emerald-400/30" },
      { regex: defaultRegex.number, className: "bg-emerald-400/30" },
      { regex: defaultRegex.percent, className: "bg-emerald-400/30" },
      { regex: defaultRegex.paranthesis, className: "bg-emerald-400/30" },
      { regex: defaultRegex.operator, className: "bg-indigo-400/30" },
    ];
    if (matchRules) {
      matches.push(...matchRules);
    }
    return matches;
  }, [matchRules]);

  const splitter = useMemo(() => {
    return new RegExp(
      `(${defaultMatches.map((match) => match.regex.source).join("|")})`,
    );
  }, [defaultMatches]);

  function processContent(text: string) {
    return text.split(splitter).map((part, index) => {
      for (const match of defaultMatches) {
        if (match && match.regex.test(part)) {
          return (
            <span key={index} className={cn(match.className)}>
              {part}
            </span>
          );
        }
      }
      return part;
    });
  }

  return (
    <div className="pointer-events-none absolute">
      {processContent(content)}
    </div>
  );
};
