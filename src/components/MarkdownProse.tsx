import ReactMarkdown from "react-markdown";

interface MarkdownProseProps {
  content: string;
}

export function MarkdownProse({ content }: MarkdownProseProps) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}

