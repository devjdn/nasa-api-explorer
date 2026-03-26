"use client";

import * as React from "react";
import { Button } from "../button";
import {
  ShareIcon,
  LinkIcon,
  ImagesIcon,
  XIcon,
  AlertTriangle,
  Download,
  CheckIcon,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "../dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "../separator";
import { snapdom } from "@zumer/snapdom";
import ShareableApodCard from "./shareable-apod-card";
import { motion, AnimatePresence } from "motion/react";

type ShareActionProps = {
  mediaUrl?: string;
  externalUrl?: string;
  title: string;
  date: string;
  copyright?: string;
};

export default function ShareActions({
  mediaUrl,
  title,
  date,
  copyright,
}: ShareActionProps) {
  const shareableImageRef = React.useRef<HTMLDivElement>(null);
  const [isImageReady, setIsImageReady] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [copiedImage, setCopiedImage] = React.useState(false);

  React.useEffect(() => {
    setIsImageReady(false);
  }, [mediaUrl]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyImage = async () => {
    if (!mediaUrl) return;
    await navigator.clipboard.writeText(mediaUrl);
    setCopiedImage(true);
    setTimeout(() => setCopiedImage(false), 2000);
  };

  const downloadShareableImage = React.useCallback(async () => {
    if (!shareableImageRef.current || !isImageReady) return;
    const node = shareableImageRef.current;

    try {
      await document.fonts.ready;

      await new Promise((resolve) => setTimeout(resolve, 100));

      const result = await snapdom(node, {
        dpr: window.devicePixelRatio * 2,
        cache: "disabled",
        embedFonts: true,
        width: 1080,
        height: 1350,
      });

      return await result.download({
        type: "png",
        filename: title,
        embedFonts: true,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isImageReady, title]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} size={"sm"}>
          <ShareIcon />
          <span className="">Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="corner-caps px-0">
        <DialogHeader className="flex flex-row gap-8 items-center justify-between px-3">
          <DialogTitle>Share</DialogTitle>
          <DialogDescription className="sr-only">
            Share this APOD with others.
          </DialogDescription>
          <DialogClose className="text-muted-foreground hover:text-foreground transition-colors">
            <XIcon className="size-5" />
          </DialogClose>
        </DialogHeader>

        <Separator />

        <div className="px-3">
          {mediaUrl ? (
            <div key={mediaUrl} ref={shareableImageRef} className="">
              <ShareableApodCard
                title={title}
                date={date}
                copyright={copyright ?? undefined}
                imageUrl={mediaUrl}
                onImageLoad={() => setIsImageReady(true)}
              />
            </div>
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <AlertTriangle />
                </EmptyMedia>
                <EmptyTitle>Video Downloads Unavailable</EmptyTitle>
                <EmptyDescription>
                  Only images can be downloaded and shared as shareable preview
                  cards.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>

        <Separator />

        <DialogFooter className="px-3 grid md:grid-cols-3 gap-2">
          {mediaUrl && (
            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={downloadShareableImage}
              disabled={!isImageReady}
              className="cursor-pointer"
            >
              <Download />
              <span className="">Download</span>
            </Button>
          )}

          <Button
            variant={"secondary"}
            size={"sm"}
            onClick={copyLink}
            className="cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {copiedLink ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center justify-center gap-2"
                >
                  <CheckIcon />
                  <span className="">Copied</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center justify-center gap-2"
                >
                  <LinkIcon />
                  <span className="">Copy Link</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {mediaUrl && (
            <Button variant={"secondary"} size={"sm"} onClick={copyImage}>
              <AnimatePresence>
                {copiedImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <CheckIcon />
                    <span className="">Copied</span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <ImagesIcon />
                    <span className="">Copy Image</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
