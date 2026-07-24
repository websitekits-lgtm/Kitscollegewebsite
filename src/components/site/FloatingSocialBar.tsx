import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

// Icon + brand color are fixed per platform; only the URL is admin-editable (Admin Dashboard → Social Links)
const PLATFORM_CONFIG: Record<string, { color: string; icon: JSX.Element; fallbackHref: string }> = {
  Facebook: {
    color: "bg-[#1877F2] hover:bg-[#1558c0]",
    fallbackHref: "https://www.facebook.com/people/Kits-Campus-Connect/pfbid0KLC9PqhXETBMnss3JMUzfZY7QWQ2fzWf57omnkj2NNVr9Y8YaAaWSFKrVFYWkDu5l/?mibextid=ZbWKwL",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  Instagram: {
    color: "bg-gradient-to-b from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] hover:opacity-90",
    fallbackHref: "https://www.instagram.com/kitscampusconnect/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  WhatsApp: {
    color: "bg-[#25D366] hover:bg-[#1da851]",
    fallbackHref: "https://whatsapp.com/channel/0029VasnSLCCxoB1P0R8WI1C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  "Twitter / X": {
    color: "bg-[#000000] hover:bg-[#333]",
    fallbackHref: "https://twitter.com/kitsmobile5",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  "Google Maps": {
    color: "bg-[#EA4335] hover:bg-[#c5382d]",
    fallbackHref: "https://maps.app.goo.gl/1LasRd1U7WGwf9sr5",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M12 0C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.812 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
      </svg>
    ),
  },
  Telegram: {
    color: "bg-[#26A5E4] hover:bg-[#1e8bc3]",
    fallbackHref: "https://t.me/kitscampusconncet",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.148-.001.472.034.683.207a.75.75 0 01.253.483c.024.14.05.457.03.706-.181 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
};

const DEFAULT_ORDER = ["Facebook", "Instagram", "WhatsApp", "Twitter / X", "Google Maps", "Telegram"];

export const FloatingSocialBar = () => {
  const [links, setLinks] = useState<{ platform: string; url: string }[]>(
    DEFAULT_ORDER.map((platform) => ({ platform, url: PLATFORM_CONFIG[platform].fallbackHref })),
  );

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("social_links")
      .select("platform, url")
      .eq("enabled", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) setLinks(data);
      });
  }, []);

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-0.5">
      {links.map(({ platform, url }) => {
        const config = PLATFORM_CONFIG[platform];
        if (!config) return null;
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            className={cn(
              "group flex items-center gap-0 overflow-hidden text-white shadow-md transition-all duration-300 ease-out",
              "h-10 w-10 rounded-r-lg hover:w-36",
              config.color,
            )}
          >
            <span className="flex size-10 shrink-0 items-center justify-center">{config.icon}</span>
            <span className="whitespace-nowrap text-xs font-semibold pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75">
              {platform}
            </span>
          </a>
        );
      })}
    </div>
  );
};
