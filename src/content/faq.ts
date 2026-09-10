export type FaqItem = { q: string; a: string };

export const FAQ: FaqItem[] = [
  {
    q: "Does Crush upload my photos to a server?",
    a: "No. Crush never posts image bytes to an API. After you pick files, the browser reads them with FileReader / createImageBitmap, draws them onto a Canvas, and encodes a new blob with canvas.toBlob. That work happens in this tab’s memory. Closing the tab discards the bitmaps. Hosting may log that you requested the HTML page (IP, user-agent), which is normal for any public site, but those logs do not contain your photos. You can load Crush, disconnect from the network, and still compress files that are already on the device.",
  },
  {
    q: "Do I need an account or email to compress images?",
    a: "No signup, no magic link, no “free 5 images then paywall.” Crush is a single-purpose page: choose files, set quality and optional max width or height, tap Compress, download. There is no cloud quota because there is no cloud job. If a batch fails it is almost always this device running out of RAM on very large phone photos, not a product limit we invented. We do not store a user id, and we do not email you a download link.",
  },
  {
    q: "Will Crush stamp a watermark on the result?",
    a: "Never. The output file is whatever the browser encoder produced: JPG, PNG, or WebP pixels only. We do not composite a logo, we do not append EXIF “processed by Crush,” and we do not wrap the download in a branded ZIP name unless you choose batch ZIP (the archive is named for convenience, the images inside are unstamped). If you need a mark for a client, add it in an editor. This tool’s job is smaller files, not branding.",
  },
  {
    q: "Which formats can I drop in, and what comes out?",
    a: "Typical inputs: JPEG (.jpg / .jpeg), PNG, WebP, BMP, and GIF (first frame only — Crush is not an animation compressor). Output is JPEG, PNG, or WebP, depending on what you pick and what this browser can encode. If WebP encoding is missing on an older engine, Crush falls back to JPEG so you still get a download instead of a silent failure. HEIC/HEIF from iPhone Camera is a different codec; use HEIC Local for that conversion, then bring the JPEG here if you still need a smaller file.",
  },
  {
    q: "When does JPEG look blocky, and what quality should I use?",
    a: "JPEG splits the picture into 8×8 blocks and throws away high-frequency detail. Below about 50–60 on Crush’s slider you start to see squares in skies, ringing around sharp type, and muddy skin. For photos destined for email or a CMS, 75–85 is the useful band: most people cannot tell them from the original at phone size, and the file often drops by half or more. Screenshots and UI with thin lines should not be JPEG at all — use PNG or WebP. If you already see blocks, raising quality cannot invent lost detail; re-export from the original instead of crushing a crushed JPEG again.",
  },
  {
    q: "When should I pick WebP instead of JPEG?",
    a: "WebP (lossy) usually beats JPEG at the same visual quality because it spends bits more efficiently on edges. Use WebP when the destination actually accepts it: modern Chrome, Edge, Firefox, recent Safari, and most current CMSs. Use JPEG when you are sending to a printer portal, an old Outlook client, or a form that still rejects .webp. Lossless PNG remains the right pick for screenshots, logos with hard edges, and anything that must survive many re-exports. Crush lets you try the same source at JPEG 80 and WebP 80 and compare the two file sizes before you commit to a ZIP.",
  },
  {
    q: "Why does a PNG sometimes barely shrink — or even grow?",
    a: "PNG is lossless. Crush re-encodes the bitmap and drops extra chunks (text comments, large metadata) which often trims screenshots. A photo saved as PNG is already a poor fit: the format was not designed for camera noise, so the file stays huge. Converting that photo to JPEG or WebP is the real win. Conversely, a tiny 24-color icon that was already run through a PNG optimizer may grow a few hundred bytes after Canvas round-trip because browsers do not use the same filters as oxipng. If the output is larger, keep the original or switch format instead of forcing PNG.",
  },
  {
    q: "Can I resize and compress in one pass?",
    a: "Yes. Set a max width, a max height, or both. Crush keeps aspect ratio and fits the image inside that box (it does not stretch). This matters more than the quality slider for 12-megapixel phone photos headed to WhatsApp, a slide deck, or a product grid that only shows 800 CSS pixels. Encoding a 4000-pixel JPEG at quality 80 still wastes bytes if you display it at 640. Leave both fields empty to keep the original pixel size. Crush will not upscale a small image to “fill” the box.",
  },
  {
    q: "Is there a file-count or daily limit?",
    a: "We do not meter downloads. The ceiling is this device: decoding many 20-megapixel photos at once can hit Safari or Chrome memory guards, and Crush will refuse a file that looks unsafe rather than freeze the tab. On a phone, compress in batches of a handful instead of dropping a whole camera roll. On a laptop, larger batches and ZIP are fine. If a single file fails, try lowering max dimensions first — a 2048-pixel cap is enough for almost any web use and uses far less RAM than a 48-megapixel original.",
  },
  {
    q: "Is the ZIP still private if I download all files at once?",
    a: "Yes. The archive is built in the tab with JSZip from the blobs already in memory. Nothing is uploaded to zip “in the cloud.” The ZIP is only a container so you do not tap Download twenty times. iOS Safari sometimes prefers the Share sheet for a single blob; Crush uses that path when a raw download would vanish. The photos inside the ZIP are the same unwatermarked files you would get one-by-one.",
  },
  {
    q: "Does Crush work on iPhone and iPad?",
    a: "Yes, as a web app in Safari (and other iOS browsers that use WebKit). Drag-and-drop is awkward on phones, so use the file picker. After compress, if the download does not appear in Files, use the Share sheet Crush offers and save the image to Photos. iOS may apply EXIF orientation when creating the bitmap; Crush draws the upright pixels so you do not get a sideways JPEG. Very large Live Photos are still two assets — Crush compresses the still, not the video clip.",
  },
  {
    q: "Does Crush keep EXIF, GPS, or color profiles?",
    a: "Usually no. Canvas encoding produces a fresh file. GPS coordinates, camera serial, and most metadata do not survive toBlob. That is useful if you are posting a photo and do not want a map pin attached — but it also means you should not use Crush as an archival master. Keep the original if you need IPTC captions or a print ICC profile. If your only goal is to strip location, know that Crush does that as a side effect of re-encoding, not as a dedicated redaction tool.",
  },
  {
    q: "Can I compress animated GIFs or video?",
    a: "GIF: only the first frame is drawn to canvas, so you will get a still. Video (MP4, MOV) is out of scope — Crush is an image compressor, not a transcode farm. For HEIC bursts and Live Photo stills, convert the still first, then crush it. Sending a movie into the dropzone will be rejected by the type guard rather than silently producing a broken JPEG.",
  },
  {
    q: "Who runs Crush and how do I report a broken file?",
    a: "Crush is a free local-first tool from Ultimatum, a brand-marketing studio. Write to ultaultimatum@gmail.com with the browser name, device, input format, and whether the failure was encode, download, or ZIP. Do not attach private photos unless you accept that email is not an end-to-end vault. We cannot restore a file you already closed out of the tab — there is no server copy. Product questions that are already answered on How to and JPG vs WebP will get a pointer to those pages.",
  },
  {
    q: "Why does a photo still look bad after I send it in WhatsApp?",
    a: "Because the chat probably recoded it as a photo. Crush cannot switch WhatsApp’s encoder off. Start from the camera original, cap the long edge around 1600 px, JPEG 75–85, then attach the result as a document / file when the app allows. Saving an image from an old bubble and running that through Crush will not restore detail. Full path: the WhatsApp guide.",
  },
  {
    q: "Gmail turned my photos into a Drive link. Did Crush fail?",
    a: "No. Gmail does that when the message attachments go over about 25 MB in total. MIME encoding also inflates the files. Cap width, encode JPEG 75–85, add the new sizes, and leave headroom. Crush does not send mail and does not create a Drive link. Details: the email guide.",
  },
  {
    q: "I tapped download on iPhone and nothing landed in Files. Where is the picture?",
    a: "Safari often ignores a raw blob download. Use Share on the result and Save Image to Photos or Save to Files. Then check the new file’s size so you do not attach the original by mistake. Encode fewer 48MP stills at a time if the tab reloads. Step-by-step: the iPhone guide.",
  },
  {
    q: "Should I pick WebP for WhatsApp or for a visa form?",
    a: "Usually no. Many chats and almost all bureaucratic uploaders still want JPEG. WebP is the smaller file on a modern website that already serves WebP. If the destination list says .jpg, obey the list. Compare one hero on the quality page before you batch.",
  },
];

export const whatsappFaq: FaqItem[] = FAQ.filter((item) =>
  [
    "Why does a photo still look bad after I send it in WhatsApp?",
    "Should I pick WebP for WhatsApp or for a visa form?",
    "When does JPEG look blocky, and what quality should I use?",
    "Does Crush work on iPhone and iPad?",
  ].includes(item.q),
);

export const emailFaq: FaqItem[] = FAQ.filter((item) =>
  [
    "Gmail turned my photos into a Drive link. Did Crush fail?",
    "Should I pick WebP for WhatsApp or for a visa form?",
    "Can I resize and compress in one pass?",
    "When should I pick WebP instead of JPEG?",
  ].includes(item.q),
);

export const iphoneFaq: FaqItem[] = FAQ.filter((item) =>
  [
    "I tapped download on iPhone and nothing landed in Files. Where is the picture?",
    "Does Crush work on iPhone and iPad?",
    "Does Crush keep EXIF, GPS, or color profiles?",
    "Is there a file-count or daily limit?",
  ].includes(item.q),
);

export const targetFaq: FaqItem[] = [
  {
    q: "Is this the same as the quality slider on the homepage?",
    a: "No. The homepage asks how the picture should look. This page asks for a number of bytes. It retries JPEG quality then long-edge size, up to 14 encodes, and reports a miss instead of pretending the file is under the cap.",
  },
  {
    q: "Why did a PNG become JPEG?",
    a: "Under a 500 KB cap, PNG of a photo almost never fits. This page switches to JPEG and labels the row. Keep PNG only when the destination requires it and the cap is large enough.",
  },
  {
    q: "I picked 200 KB for WhatsApp. Will the chat still recode it?",
    a: "Yes, possibly. 200 KB and 1 MB here are file-on-disk presets before you send. WhatsApp can still recode after you tap send. That recode is documented on the WhatsApp page, not in this control.",
  },
  {
    q: "The row says still over cap after 14 tries. Is the tool broken?",
    a: "No. Fourteen encodes is the stop so a huge PNG cannot freeze the tab. Crop the frame or change format. This encoder will not invent a 50 KB lossless PNG of a 48 MP photo.",
  },
];

