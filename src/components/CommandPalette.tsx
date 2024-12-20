"use client";

import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch, useMatches, KBarResults, Action } from "kbar";
import { Kbd } from "@nextui-org/react";
import { ReactNode } from "react";
import { HomeIcon, RectangleStackIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

interface ActionItem extends Action {
  icon?: ReactNode;
  shortcut?: string[];
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === "string") return <div className="p-3 text-xs text-muted-foreground uppercase">{item}</div>;
        
        const actionItem = item as ActionItem;
        return (
          <div
            className={`p-4 flex items-center justify-between cursor-pointer ${
              active ? "bg-primary/20" : "bg-transparent"
            }`}
          >
            <div className="flex items-center gap-2">
              {actionItem.icon && <span className="w-4 h-4">{actionItem.icon}</span>}
              <span>{actionItem.name}</span>
            </div>
            {actionItem.shortcut?.length && (
              <div className="flex items-center gap-2">
                {actionItem.shortcut.map((shortcut: string) => (
                  <Kbd key={shortcut}>{shortcut}</Kbd>
                ))}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}

export function CommandPalette({ children }: { children: ReactNode }) {
  const actions: ActionItem[] = [
    {
      id: "home",
      name: "Home",
      shortcut: ["h"],
      keywords: "home homepage landing",
      icon: <HomeIcon />,
      perform: () => (window.location.pathname = "/"),
    },
    {
      id: "blog",
      name: "Blog",
      shortcut: ["b"],
      keywords: "blog posts articles",
      icon: <RectangleStackIcon />,
      perform: () => (window.location.pathname = "/blog"),
    },
    {
      id: "about",
      name: "About",
      shortcut: ["a"],
      keywords: "about info",
      icon: <InformationCircleIcon />,
      perform: () => (window.location.pathname = "/about"),
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="bg-black/50 backdrop-blur-sm z-50 fixed inset-0">
          <KBarAnimator className="w-full max-w-xl bg-background border rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <KBarSearch className="w-full bg-transparent border-none outline-none" />
            </div>
            <RenderResults />
            <div className="p-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Press</span>
                <Kbd keys={["command"]}>K</Kbd>
                <span>to open this menu anywhere</span>
              </div>
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
} 