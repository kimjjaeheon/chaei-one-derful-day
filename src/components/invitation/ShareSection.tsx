import { useState } from "react";
import { Link2, Share2 } from "lucide-react";
import { invitation } from "@/lib/invitation";
import { Button } from "@/components/ui/button";

export function ShareSection() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${invitation.baby.name} 돌잔치 초대장`, url });
        return;
      } catch {
        /* user cancelled */
        return;
      }
    }
    await copy();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section className="px-8 pb-16 pt-4">
      <div className="grid grid-cols-2 gap-2">
        <Button variant="pill" onClick={share}>
          <Share2 /> 초대장 공유
        </Button>
        <Button variant="soft" onClick={copy}>
          <Link2 /> {copied ? "복사되었어요" : "링크 복사"}
        </Button>
      </div>
    </section>
  );
}
