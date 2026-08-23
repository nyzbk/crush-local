# Crush — Free Image Compressor

Compress JPG, PNG and WebP in the browser. No upload, no signup, no watermark.

- Client-side Canvas compression (`createImageBitmap` + `toBlob`)
- Batch + ZIP (JSZip, in-tab)
- Quality slider and optional max dimensions
- AdSense placeholders until Site Ready (`VITE_ADSENSE_LIVE=false`)
- Publisher: `ca-pub-7636435144500691` · Auto ads OFF

## Env (platform-injected)

Do not commit a `.env`. For live ads on Vercel, set:

```
VITE_ADSENSE_LIVE=false
```

Flip to `true` only after AdSense Site Ready.

## Production

- Domain: `crush-local.vercel.app`
- Repo: `nyzbk/crush-local`
