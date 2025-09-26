This is a Next.js blog that uses Markdown files for content.

### Tech Stack

*   **Framework:** Next.js
*   **UI:** Chakra UI
*   **Content:** Markdown files, with frontmatter for metadata. Data is also fetched from Airtable and Spotify.
*   **Styling:** Emotion
*   **Linting:** ESLint
*   **Deployment:** Vercel

### Project Structure

*   `content/posts`: Contains the blog posts in Markdown format.
*   `lib/posts.js`: Fetches and processes the blog posts.
*   `pages/posts/[slug].tsx`: Renders individual blog posts.
*   `pages/index.tsx`: The main entry point of the application, likely displaying a list of recent posts.
*   `components`: Contains the React components used throughout the application.
*   `styles`: Contains global styles and themes.
*   `public`: Contains static assets like images and fonts.
*   `next.config.js`: Configuration file for Next.js.
*   `package.json`: Defines the project's dependencies and scripts.
*   `rss-gen.js`: Generates an RSS feed for the blog.
*   `next-sitemap.js`: Generates a sitemap for the blog.
