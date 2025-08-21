"use client"

import Link from "next/link"
import { PORTAL_ITEMS } from "@/constants/portal"

export function PortalGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PORTAL_ITEMS.map((item) => {
        const CardTag = item.disabled ? "div" : Link
        const commonClasses =
          "group rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 data-[disabled=true]:opacity-60 data-[disabled=true]:cursor-not-allowed"
        return (
          <CardTag
            key={item.id}
            href={item.disabled ? undefined : item.href}
            className={commonClasses}
            data-disabled={item.disabled ? true : undefined}
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#551BB3]/10 text-[#551BB3] ring-1 ring-[#551BB3]/20">
                  <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
                </div>
                <span className="absolute -right-1 -bottom-1 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "#A9F04D" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[#292522]">{item.title}</h3>
                  {item.badge ? (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#E2DDD9] text-[#666666] border border-[#E2DDD9]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-[#666666] mt-1">{item.description}</p>
              </div>
            </div>
          </CardTag>
        )
      })}
    </div>
  )
}


