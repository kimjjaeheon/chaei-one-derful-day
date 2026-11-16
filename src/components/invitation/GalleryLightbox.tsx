import { useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { resolvePhotoSrc } from "@/lib/photo-src";
import { stepIndex } from "@/lib/gallery";

/** Full-screen photo viewer with prev/next buttons, arrow keys and swipe. */
export function GalleryLightbox({
  photos,
  index,
  onIndexChange,
  onClose,
  altPrefix,
}: {
  photos: readonly string[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  altPrefix: string;
}) {
  const touchStartX = useRef<number | null>(null);
  const open = index !== null && photos.length > 0;
  const current = index ?? 0;
  const go = (delta: number) => onIndexChange(stepIndex(current, delta, photos.length));

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col text-paper outline-none"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            const end = e.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (start == null || end == null) return;
            const dx = end - start;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
        >
          <DialogPrimitive.Title className="sr-only">사진 크게 보기</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            좌우 버튼이나 화살표 키, 밀어서 다음 사진을 볼 수 있어요.
          </DialogPrimitive.Description>

          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm tracking-[0.2em] opacity-80" aria-live="polite">
              {current + 1} / {photos.length}
            </span>
            <DialogPrimitive.Close
              className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 transition-colors hover:bg-paper/20"
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6">
            {open && (
              <img
                key={photos[current]}
                src={resolvePhotoSrc(photos[current])}
                alt={`${altPrefix} ${current + 1}`}
                className="max-h-full max-w-full select-none rounded-lg object-contain animate-in fade-in-0 duration-300"
                draggable={false}
              />
            )}

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="이전 사진"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/15 backdrop-blur-sm transition-colors hover:bg-paper/30"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="다음 사진"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/15 backdrop-blur-sm transition-colors hover:bg-paper/30"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
