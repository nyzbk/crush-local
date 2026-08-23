# Crush — Image Compressor MVP Spec

See full operational spec in project artifacts:
`FREE_APPS_SYSTEM/01_ADS_OS/130_IMAGE_COMPRESSOR_MVP_SPEC_SCREENS_STACK_HARD_CONSTRAINTS_RU.md`

## One-liner
Crush — compress and convert images (JPG / PNG / WebP) entirely in the browser. Batch, quality control, max dimensions, ZIP download. No upload. No account. No watermark.

## Hard constraints
- 100% client-side (Canvas)
- No signup
- No watermark
- No upload
- Ads only after-success / mid / footer
iOS Safari critical
- Same AdSense pub: ca-pub-7636435144500691

## Stack
Vite + React 19 + TanStack Router + Tailwind (paper/ink/copper) + pure Canvas or browser-image-compression + JSZip

## Domain
crush-local.vercel.app
