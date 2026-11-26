import { useCallback, useEffect, useId, useRef, useState } from "react";
import { articleFlowPreviews, type ArticleAnimationAsset } from "../data/flow-previews";
import type { ArticleFlowKind } from "./ArticleFlow";
import "../styles/article-flow-preview.scss";

type PlaybackState = "ready" | "playing" | "stopped" | "finished" | "error";

const previewCopy: Record<ArticleFlowKind, { title: string; description: string; alt: string }> = {
  "regression-verdict": {
    title: "Watch evidence become a verdict",
    description: "A synthetic comparison checks artifacts, completion, and coverage before comparing records and duplicate counts.",
    alt: "Evidence gates lead to a comparison of scoped records and their duplicate counts.",
  },
  "feedback-lifecycle": {
    title: "Follow a rule from observation to review",
    description: "A synthetic feedback item moves through evidence, candidate checks, human review, and a versioned rule.",
    alt: "A feedback lifecycle connects an observation to evidence, reviewed rule changes, and verification.",
  },
  "window-splitting": {
    title: "Watch a request split without skipping work",
    description: "A synthetic request splits into smaller windows. A failed child holds the parent checkpoint until its retry completes.",
    alt: "A request tree splits into child windows while partition checkpoints track completion.",
  },
};

const knownKinds = new Set<string>(Object.keys(previewCopy));

// Match the same complete fence payload as ArticleBody, without mistaking an
// interactive example quoted inside another fenced block for a live example.
export function getArticlePreviewKind(content: string): ArticleFlowKind | undefined {
  let fence: { marker: string; interactive: boolean; body: string[] } | undefined;
  for (const line of content.replace(/\r\n?/g, "\n").split("\n")) {
    if (!fence) {
      const opening = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
      if (opening) fence = { marker: opening[1], interactive: opening[2].trim() === "interactive", body: [] };
      continue;
    }
    const closing = line.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/)?.[1];
    if (closing && closing[0] === fence.marker[0] && closing.length >= fence.marker.length) {
      const kind = fence.body.join("\n").trim();
      if (fence.interactive && knownKinds.has(kind)) return kind as ArticleFlowKind;
      fence = undefined;
    } else {
      fence.body.push(line);
    }
  }
  return undefined;
}

function LoadedPreview({ kind, asset }: { kind: ArticleFlowKind; asset: ArticleAnimationAsset }) {
  const id = useId();
  const figureRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const autoplayHandled = useRef(false);
  const playingRef = useRef(false);
  const inViewRef = useRef(false);
  const visibleRef = useRef(typeof document !== "undefined" && document.visibilityState === "visible");
  const reducedRef = useRef(typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const explicitMotionRef = useRef(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(visibleRef.current);
  const [reducedMotion, setReducedMotion] = useState(reducedRef.current);
  const [explicitMotion, setExplicitMotion] = useState(false);
  const [phase, setPhase] = useState<PlaybackState>("ready");
  const [run, setRun] = useState(0);
  const [loadedRun, setLoadedRun] = useState(0);
  const [gifFailed, setGifFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const observerSupported = typeof IntersectionObserver !== "undefined";
  const copy = previewCopy[kind];

  const clearTimer = useCallback(() => {
    if (timerRef.current !== undefined) clearTimeout(timerRef.current);
    timerRef.current = undefined;
  }, []);

  const stop = useCallback((nextPhase: PlaybackState = "stopped") => {
    clearTimer();
    playingRef.current = false;
    explicitMotionRef.current = false;
    setExplicitMotion(false);
    setPhase(nextPhase);
  }, [clearTimer]);

  const start = useCallback((explicit: boolean) => {
    if (!inViewRef.current || !visibleRef.current || gifFailed || posterFailed) return;
    if (reducedRef.current && !explicit) return;
    clearTimer();
    autoplayHandled.current = true;
    playingRef.current = true;
    explicitMotionRef.current = explicit;
    setExplicitMotion(explicit);
    setRun((current) => current + 1);
    setPhase("playing");
  }, [clearTimer, gifFailed, posterFailed]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      reducedRef.current = mediaQuery.matches;
      setReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches && playingRef.current) stop();
    };
    const updateVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
      setVisible(visibleRef.current);
      if (!visibleRef.current && playingRef.current) stop();
    };
    updateMotion();
    updateVisibility();
    mediaQuery.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);

    const observer = observerSupported ? new IntersectionObserver((entries) => {
      const entry = entries[0];
      const entered = Boolean(entry?.isIntersecting && entry.intersectionRatio >= .15);
      inViewRef.current = entered;
      setInView(entered);
      if (!entered && playingRef.current) stop();
    }, { threshold: [0, .15] }) : undefined;
    if (observer && figureRef.current) observer.observe(figureRef.current);

    return () => {
      observer?.disconnect();
      mediaQuery.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      clearTimer();
      playingRef.current = false;
    };
  }, [clearTimer, observerSupported, stop]);

  useEffect(() => {
    if (!inView || !visible || autoplayHandled.current) return;
    // A first entry with reduced motion remains static until the user requests a run.
    autoplayHandled.current = true;
    if (!reducedMotion) start(false);
  }, [inView, reducedMotion, start, visible]);

  const playing = phase === "playing" && inView && visible && (!reducedMotion || explicitMotion);

  useEffect(() => {
    if (!playing || loadedRun !== run || !playingRef.current || !inViewRef.current || !visibleRef.current) return;
    if (reducedRef.current && !explicitMotionRef.current) return;
    timerRef.current = setTimeout(() => stop("finished"), asset.durationSeconds * 1000);
    return clearTimer;
  }, [asset.durationSeconds, clearTimer, loadedRun, playing, run, stop]);

  const status = phase === "error" ? "The preview is unavailable. The interactive controls below still work."
    : !observerSupported ? "Static preview. Try the interactive controls below."
    : playing ? "Playing once. Stop returns to the static overview."
    : phase === "finished" ? "Walkthrough complete. Replay starts from the beginning."
    : phase === "stopped" ? "Animation stopped. Replay starts from the beginning."
    : reducedMotion ? "Motion reduced. Select Replay animation to watch once."
    : "Watch the flow, then try the controls below.";

  return <figure className="article-flow-preview" ref={figureRef} data-flow-preview-kind={kind} data-animation-state={playing ? "playing" : phase} aria-labelledby={`${id}-title`}>
    <div className="article-flow-preview__media">
        {posterFailed ? <div className="article-flow-preview__placeholder" id={`${id}-image`}>{copy.alt}</div> : <img className="article-flow-preview__image" id={`${id}-image`} key={playing ? `animation-${run}` : "poster"} src={playing ? `${asset.gif}${asset.gif.includes("?") ? "&" : "?"}play=${run}` : asset.poster} width="960" height="720" decoding="async" alt={copy.alt} aria-describedby={`${id}-description`} data-preview-frame={playing ? "animated" : "poster"} onLoad={() => { if (playing) setLoadedRun(run); }} onError={() => { if (playing) setGifFailed(true); else setPosterFailed(true); stop("error"); }} />}
    </div>
    <figcaption className="article-flow-preview__caption">
      <div className="article-flow-preview__meta"><span className="article-flow-preview__badge"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m7 4 8 6-8 6V4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>Animated walkthrough</span><span className="article-flow-preview__synthetic">Synthetic example</span></div>
      <strong className="article-flow-preview__title" id={`${id}-title`}>{copy.title}</strong>
      <p className="article-flow-preview__description" id={`${id}-description`}>{copy.description}</p>
      <div className="article-flow-preview__footer">
      <p className="article-flow-preview__status" role="status" aria-live="polite" aria-atomic="true">{status}</p>
      <div className="article-flow-preview__actions" role="group" aria-label="Walkthrough playback">
        <button className="article-flow-preview__button" type="button" aria-controls={`${id}-image`} disabled={!inView || !visible || gifFailed || posterFailed} onClick={() => start(true)}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 6a7 7 0 1 1-1 7M4 2v5H9" /></svg>Replay animation</button>
        <button className="article-flow-preview__button article-flow-preview__button--secondary" type="button" aria-controls={`${id}-image`} disabled={!playing} onClick={() => stop()}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="5" y="5" width="10" height="10" rx="1" /></svg>Stop animation</button>
      </div>
      </div>
    </figcaption>
  </figure>;
}

export function ArticleFlowPreview({ kind }: { kind: ArticleFlowKind }) {
  const asset = articleFlowPreviews[kind];
  if (!asset?.gif || !asset.poster || !Number.isFinite(asset.durationSeconds) || asset.durationSeconds <= 0) return null;
  return <LoadedPreview key={kind} kind={kind} asset={asset} />;
}
