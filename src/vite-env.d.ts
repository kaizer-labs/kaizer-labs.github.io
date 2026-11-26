/// <reference types="vite/client" />

declare module "virtual:review-articles" {
  const articles: Record<string, string>;
  export default articles;
}

declare module "virtual:review-animations" {
  const animations: Record<string, { gif: string; poster: string; durationSeconds: number }>;
  export default animations;
}
