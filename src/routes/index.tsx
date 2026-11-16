import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { invitation } from "@/lib/invitation";
import { PhotoSlot } from "@/components/invitation/PhotoSlot";
import { Reveal } from "@/components/invitation/Reveal";
import { SectionTitle } from "@/components/invitation/SectionTitle";
import { CalendarSection } from "@/components/invitation/CalendarSection";
import { LocationSection } from "@/components/invitation/LocationSection";
import { ShareSection } from "@/components/invitation/ShareSection";
import { GalleryLightbox } from "@/components/invitation/GalleryLightbox";
import { normalizeSiteUrl, ogImageUrl } from "@/lib/og";

const title = `${invitation.baby.name} 첫 번째 생일에 초대합니다`;
const description = `${invitation.dateLabel} · ${invitation.venue.name}`;
// Set at build time by the GitHub Pages workflow (e.g. https://<user>.github.io/<repo>).
const rawSiteUrl = import.meta.env["VITE_SITE_URL"] as string | undefined;
const siteUrl = normalizeSiteUrl(rawSiteUrl);
const ogImage = ogImageUrl(rawSiteUrl, invitation.photos.thumbnail);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(siteUrl ? [{ property: "og:url", content: siteUrl }] : []),
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { name: "twitter:image", content: ogImage },
          ]
        : []),
    ],
  }),
  component: Index,
});

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2 text-primary/60" aria-hidden>
      <span className="h-px w-10 bg-border" />
      <span className="text-xs">✿</span>
      <span className="h-px w-10 bg-border" />
    </div>
  );
}

function Index() {
  const { baby, parents, photos, venue } = invitation;
  const viewable = photos.gallery.filter((src) => src);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-[440px] bg-paper shadow-card">
        {/* Cover */}
        <header className="bg-blush-gradient px-8 pb-14 pt-16 text-center">
          <Reveal>
            <p className="font-script text-3xl text-primary">{baby.englishName}'s First Birthday</p>
            <p className="mt-3 text-xs tracking-[0.4em] text-muted-foreground">{invitation.dateShort}</p>
          </Reveal>

          <Reveal delay={150} className="mt-10">
            <div className="mx-auto aspect-[4/5] w-full overflow-hidden rounded-t-full border-4 border-paper shadow-card">
              <PhotoSlot src={photos.main} alt={`${baby.name} 대표 사진`} label="대표 사진" />
            </div>
          </Reveal>

          <Reveal delay={300} className="mt-10">
            <h1 className="font-display text-3xl tracking-[0.2em]">{baby.name}</h1>
            <p className="mt-3 text-sm text-muted-foreground">첫 번째 생일에 초대합니다</p>
          </Reveal>
        </header>

        {/* Invitation message */}
        <section className="px-8 py-16 text-center">
          <Reveal>
            <SectionTitle en="Invitation" ko="초대합니다" />
            <div className="space-y-5 font-display text-[15px] leading-8 text-foreground/90">
              <p>
                작고 소중한 저희 딸 {baby.firstName}가
                <br />
                어느덧 첫 번째 생일을 맞이하게 되었습니다.
              </p>
              <p>
                건강하게 자라준 {baby.firstName}의 첫걸음을
                <br />
                늘 아껴주신 고마운 분들과 함께
                <br />
                축하하고 싶습니다.
              </p>
              <p>
                귀한 걸음 하시어
                <br />
                {baby.firstName}의 앞날을 축복해 주세요.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <Divider />
            <p className="mt-6 font-display text-base leading-8">
              <span className="text-muted-foreground">아빠</span> {parents.father}
              <span className="mx-3 text-border">|</span>
              <span className="text-muted-foreground">엄마</span> {parents.mother}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              의 딸 <span className="font-display text-foreground">{baby.firstName}</span>
            </p>
          </Reveal>
        </section>

        <div className="bg-blush-gradient">
          <Reveal>
            <CalendarSection />
          </Reveal>
        </div>

        {/* Gallery */}
        <section className="px-8 py-16">
          <Reveal>
            <SectionTitle en="Gallery" ko="채이의 일 년" />
            <div className="grid grid-cols-2 gap-2">
              {photos.gallery.map((src, i) =>
                src ? (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setOpenIndex(viewable.indexOf(src))}
                    aria-label={`사진 ${i + 1} 크게 보기`}
                    className="aspect-square overflow-hidden rounded-xl transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <PhotoSlot src={src} alt={`${baby.name} 사진 ${i + 1}`} />
                  </button>
                ) : (
                  <div key={i} className="aspect-square overflow-hidden rounded-xl">
                    <PhotoSlot alt={`${baby.name} 사진 ${i + 1}`} label={`사진 ${i + 1}`} />
                  </div>
                ),
              )}
            </div>
            {viewable.length > 0 && (
              <p className="mt-4 text-center text-xs text-muted-foreground">사진을 누르면 크게 볼 수 있어요</p>
            )}
            <GalleryLightbox
              photos={viewable}
              index={openIndex}
              onIndexChange={setOpenIndex}
              onClose={() => setOpenIndex(null)}
              altPrefix={`${baby.name} 사진`}
            />
          </Reveal>
        </section>

        <div className="bg-blush-gradient">
          <Reveal>
            <LocationSection />
          </Reveal>
        </div>

        <Reveal>
          <section className="px-8 pb-6 pt-16 text-center">
            <p className="font-display text-[15px] leading-8 text-foreground/90">
              바쁘신 와중에도 {baby.firstName}의 첫 생일을
              <br />
              함께 축하해 주셔서 진심으로 감사합니다.
            </p>
          </section>
          <ShareSection />
        </Reveal>

        <footer className="border-t border-border px-8 py-8 text-center">
          <p className="font-script text-xl text-primary">with love, {baby.englishName}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {invitation.dateShort} · {venue.name}
          </p>
        </footer>
      </article>
    </main>
  );
}
