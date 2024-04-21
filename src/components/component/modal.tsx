"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Toaster } from "~/components/ui/sonner";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";

export function Modal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="fixed flex h-screen w-screen items-center justify-center bg-black/80 "
      onClose={onDismiss}
    >
      <ScrollArea className={"h-screen w-fit rounded-md " + className ?? ""}>
        {children}
      </ScrollArea>
      <Button onClick={onDismiss} className="fixed right-10 top-4">
        Close
      </Button>
      <Toaster />
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
