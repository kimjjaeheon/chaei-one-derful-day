import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolvePhotoSrc } from "@/lib/photo-src";

/** Shows the photo when a src is set, otherwise an empty frame waiting for a photo. */
export function PhotoSlot({
  src,
  alt,
  label = "사진",
  className,
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
}) {
  if (src) {
    return (
      <img
        src={resolvePhotoSrc(src)}
        alt={alt}
        loading="lazy"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${alt} (사진 준비 중)`}
      className={cn("photo-slot flex h-full w-full flex-col items-center justify-center gap-2", className)}
    >
      <ImageIcon className="h-6 w-6 opacity-60" strokeWidth={1.5} />
      <span className="text-xs tracking-wide opacity-80">{label}</span>
    </div>
  );
}
