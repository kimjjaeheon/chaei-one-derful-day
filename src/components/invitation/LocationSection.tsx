import { useState } from "react";
import {
  ArrowUpRight,
  CarFront,
  Check,
  Copy,
  MapPin,
  Phone,
  TrainFront,
} from "lucide-react";
import { invitation } from "@/lib/invitation";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "./SectionTitle";

export function LocationSection() {
  const { venue } = invitation;
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${venue.name} ${venue.address}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section className="px-8 py-16">
      <SectionTitle en="Location" ko="오시는 길" />
      <div className="text-center">
        <p className="font-display text-lg">{venue.name}</p>
        {venue.hall ? <p className="mt-1 text-sm text-primary">{venue.hall}</p> : null}
        <p className="mt-2 text-sm text-muted-foreground">{venue.address}</p>
        <button
          onClick={copyAddress}
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "주소가 복사되었어요" : "주소 복사"}
        </button>
      </div>

      {/* Main map: Naver Map (tap to open) */}
      <a
        href={venue.naverMap}
        target="_blank"
        rel="noreferrer"
        className="mt-8 block overflow-hidden rounded-2xl border border-border shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="bg-blush-gradient px-6 py-8 text-center">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-paper shadow-soft">
            <MapPin className="h-5 w-5 text-primary" />
          </span>
          <p className="mt-4 font-display text-base tracking-[0.08em]">{venue.name}</p>
          {venue.hall ? <p className="mt-1 text-xs text-primary">{venue.hall}</p> : null}
          <p className="mt-2 text-sm text-muted-foreground">{venue.address}</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground shadow-soft">
            네이버 지도로 열기
            <ArrowUpRight className="h-4 w-4" />
          </span>
          <p className="mt-3 text-xs text-muted-foreground">새 창에서 네이버 지도가 열려요</p>
        </div>
      </a>

      <div className="mt-4">
        <Button asChild variant="soft" className="w-full">
          <a href={venue.kakaoMap} target="_blank" rel="noreferrer">
            카카오맵으로 열기
          </a>
        </Button>
      </div>

      <ul className="mt-10 space-y-5 text-sm">
        <li className="flex gap-3">
          <TrainFront className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="font-display">지하철</p>
            <p className="mt-1 text-muted-foreground">{venue.subway}</p>
          </div>
        </li>
        <li className="flex gap-3">
          <CarFront className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="font-display">주차</p>
            <p className="mt-1 text-muted-foreground">{venue.parking}</p>
          </div>
        </li>
        <li className="flex gap-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="font-display">호텔 문의</p>
            <a href={`tel:${venue.tel}`} className="mt-1 block text-muted-foreground">
              {venue.tel}
            </a>
          </div>
        </li>
      </ul>
    </section>
  );
}
