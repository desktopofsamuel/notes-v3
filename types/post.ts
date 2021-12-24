export type PostType = {
    frontmatter: {
      date: string;
      category: string;
      tags: [string];
      title: string;
      socialImage?: string;
    };
    slug: string;
    content: any;
    excerpt: string;
};
