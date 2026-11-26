import reviewAnimations from "virtual:review-animations";
import type { ArticleFlowKind } from "../components/ArticleFlow";

export interface ArticleAnimationAsset {
  gif: string;
  poster: string;
  durationSeconds: number;
}

// Only explicitly reviewed media belongs in the production map. The local
// virtual module remains empty in production and never reads private files.
export const approvedFlowPreviews: Record<ArticleFlowKind, ArticleAnimationAsset> = {
  "regression-verdict": {
    gif: "/media/flows/regression-verdict.gif",
    poster: "/media/flows/regression-verdict.png",
    durationSeconds: 19.51,
  },
  "feedback-lifecycle": {
    gif: "/media/flows/feedback-lifecycle.gif",
    poster: "/media/flows/feedback-lifecycle.png",
    durationSeconds: 21.51,
  },
  "window-splitting": {
    gif: "/media/flows/window-splitting.gif",
    poster: "/media/flows/window-splitting.png",
    durationSeconds: 19.01,
  },
};

export const articleFlowPreviews: Record<string, ArticleAnimationAsset> = {
  ...approvedFlowPreviews,
  ...reviewAnimations,
};
