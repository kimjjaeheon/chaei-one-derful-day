import { useState } from "react";
import { Check, Copy, Phone, TrainFront, CarFront } from "lucide-react";
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

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        <iframe
          title={`${venue.name} 지도`}
          src={venue.googleEmbed}
          className="block h-60 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button asChild variant="soft">
          <a href={venue.naverMap} target="_blank" rel="noreferrer">
            네이버 지도
          </a>
        </Button>
        <Button asChild variant="soft">
          <a href={venue.kakaoMap} target="_blank" rel="noreferrer">
            카카오맵
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
