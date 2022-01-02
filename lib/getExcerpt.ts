function parseMarkdown(markdownText: string, char: number) {
  const charLimit = char || 500;
  const htmlText = markdownText
    // hide h3 title
    .toString()
    .replace(/^### (.*$)/gim, "")
    // hide h2 title
    .toString()
    .replace(/^## (.*$)/gim, "")
    // hide h1 title
    .toString()
    .replace(/^# (.*$)/gim, "")
    // replace italic to normal text
    .toString()
    .replace(/^\> (.*$)/gim, "$1")
    // replace bold to normal text
    .toString()
    .replace(/\*\*(.*)\*\*/gim, "$1")
    .toString()
    .replace(/\*(.*)\*/gim, "")
    .toString()
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "")
    .toString()
    .replace(/\[(.*?)\]\((.*?)\)/gim, "$1")
    .toString()
    .replace(/\n$/gim, "");
    

  return htmlText.trim().slice(0, charLimit);
}

export const getExcerpt = (markdownText: string, char: number) => {
  const excerpt = parseMarkdown(markdownText, char);
  return excerpt;
};

type LayoutProps = {
  markdownText: string;
  char?: number;
};


