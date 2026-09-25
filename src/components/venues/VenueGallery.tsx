"use client";

import { useRef } from "react";
import { CameraIcon, PlusIcon } from "@/components/shared/icons";
import { Spinner } from "@/components/shared/Spinner";
import { useToast } from "@/components/shared/ToastProvider";
import { useUploadVenueImage } from "@/hooks/useVenues";
import { ApiClientError } from "@/lib/apiClient";
import type { VenueImage } from "@/types";

interface VenueGalleryProps {
  venueId: string;
  images: VenueImage[];
}

/** Community photo strip; uploads go to Cloudflare R2 through the API. */
export function VenueGallery({ venueId, images }: VenueGalleryProps) {
  const { showToast } = useToast();
  const upload = useUploadVenueImage(venueId);
  const input = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      await upload.mutateAsync(file);
      showToast("Photo added to the venue gallery", "success");
    } catch (err) {
      showToast(err instanceof ApiClientError ? err.message : "Could not upload photo", "error");
    }
  }

  return (
    <div className="scrollbar-none -mx-6 flex gap-2 overflow-x-auto px-6">
      <button
        onClick={() => input.current?.click()}
        disabled={upload.isPending}
        className="flex h-20 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-border text-[11px] font-semibold text-text-primary/60 transition-colors hover:border-emerald hover:text-emerald"
      >
        {upload.isPending ? <Spinner /> : <PlusIcon className="h-4 w-4" />}
        Add photo
      </button>
      <input ref={input} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={handleFile} />
      {images.length === 0 && (
        <div className="flex h-20 flex-1 items-center gap-2 rounded-2xl bg-background px-4 text-xs text-text-primary/50">
          <CameraIcon className="h-4 w-4 shrink-0" /> No photos yet — be the first to share one.
        </div>
      )}
      {images.map((image) =>
        image.url ? (
          // eslint-disable-next-line @next/next/no-img-element -- presigned R2 URL
          <img
            key={image.id}
            src={image.url}
            alt="Venue photo"
            className="h-20 w-28 shrink-0 rounded-2xl border border-border object-cover"
          />
        ) : null
      )}
    </div>
  );
}
