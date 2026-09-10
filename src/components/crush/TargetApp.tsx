import { useCallback, useMemo, useRef, useState } from "react";
import { Download, ImagePlus, Loader2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdUnit } from "@/components/ads/AdUnit";
import { isAcceptedImage, WARN_FILE_BYTES, type OutputType } from "@/lib/compress";
import {
  SIZE_PRESETS,
  compressToTarget,
  parseTargetBytes,
  type TargetResult,
} from "@/lib/targetSize";
import { zipBlobs } from "@/lib/zip";
import { downloadBlob, formatBytes } from "@/lib/utils";

type Stage = "idle" | "ready" | "working" | "done";

type Item = {
  id: string;
  file: File;
  preview: string;
  error?: string;
  result?: TargetResult & { url: string };
  progress: number;
};

const ACCEPT = "image/jpeg,image/png,image/webp,image/bmp,image/gif,.jpg,.jpeg,.png,.webp,.bmp,.gif";

export function TargetApp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [stage, setStage] = useState<Stage>("idle");
  const [presetId, setPresetId] = useState("200kb");
  const [customValue, setCustomValue] = useState("");
  const [customUnit, setCustomUnit] = useState<"KB" | "MB">("KB");
  const [outputType, setOutputType] = useState<OutputType>("image/jpeg");
  const [dragOver, setDragOver] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  const targetBytes = useMemo(() => {
    const custom = Number(customValue);
    if (customValue.trim() && Number.isFinite(custom) && custom > 0) {
      return parseTargetBytes(custom, customUnit);
    }
    return SIZE_PRESETS.find((p) => p.id === presetId)?.bytes ?? 200 * 1024;
  }, [customValue, customUnit, presetId]);

  const addFiles = useCallback((list: FileList | File[]) => {
    const next: Item[] = [];
    const warnings: string[] = [];
    Array.from(list).forEach((file) => {
      const name = file.name.toLowerCase();
      if (/\.(heic|heif)$/.test(name) || /image\/hei/.test(file.type)) {
        warnings.push(`${file.name} is HEIC. This stills tool does not decode it.`);
        return;
      }
      if (!isAcceptedImage(file)) {
        warnings.push(`${file.name} is not a supported still (JPG, PNG, WebP).`);
        return;
      }
      if (file.size > WARN_FILE_BYTES) {
        warnings.push(`${file.name} is large (${formatBytes(file.size)}). This device may slow down.`);
      }
      next.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      });
    });
    if (warnings.length) setBanner(warnings.join(" "));
    else setBanner(null);
    setItems((prev) => {
      const merged = [...prev, ...next];
      setStage(merged.length ? "ready" : "idle");
      return merged;
    });
  }, []);

  function remove(id: string) {
    setItems((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) {
        URL.revokeObjectURL(item.preview);
        if (item.result) URL.revokeObjectURL(item.result.url);
      }
      const rest = prev.filter((p) => p.id !== id);
      if (!rest.length) setStage("idle");
      return rest;
    });
  }

  function clearAll() {
    items.forEach((item) => {
      URL.revokeObjectURL(item.preview);
      if (item.result) URL.revokeObjectURL(item.result.url);
    });
    setItems([]);
    setStage("idle");
    setBanner(null);
  }

  async function runTarget() {
    if (!items.length) return;
    setStage("working");
    const next = [...items];
    for (let i = 0; i < next.length; i++) {
      const item = next[i];
      if (!item) continue;
      next[i] = { ...item, progress: 8, error: undefined };
      setItems([...next]);
      try {
        const result = await compressToTarget(item.file, targetBytes, outputType);
        if (item.result) URL.revokeObjectURL(item.result.url);
        next[i] = {
          ...item,
          progress: 100,
          error: undefined,
          result: { ...result, url: URL.createObjectURL(result.blob) },
        };
      } catch (err) {
        next[i] = {
          ...item,
          progress: 0,
          error: err instanceof Error ? err.message : "Could not fit this image.",
        };
      }
      setItems([...next]);
    }
    setStage("done");
  }

  async function downloadZip() {
    const files = items
      .filter((item) => item.result)
      .map((item) => ({ name: item.result!.filename, blob: item.result!.blob }));
    if (!files.length) return;
    const blob = await zipBlobs(files);
    await downloadBlob(blob, `crush-target-${files.length}.zip`);
  }

  const misses = items.filter((i) => i.result && !i.result.hit).length;

  return (
    <div>
      <section
        className={`rounded-2xl border border-dashed bg-surface p-6 text-center transition-colors sm:p-10 ${
          dragOver ? "border-copper bg-paper" : "border-line"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
        }}
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-paper text-copper">
          <ImagePlus className="size-6" />
        </div>
        <h2 className="mt-4 font-display text-xl">Drop stills to fit a byte cap</h2>
        <p className="mt-1 text-sm text-muted">JPG, PNG, WebP — encoded in this tab until the file is ≤ the cap, or we stop after 14 tries.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button type="button" variant="copper" onClick={() => inputRef.current?.click()}>
            Choose files
          </Button>
          {items.length > 0 && (
            <Button type="button" variant="outline" onClick={clearAll}>
              Clear all
            </Button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Byte cap</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {SIZE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                setPresetId(preset.id);
                setCustomValue("");
              }}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
                !customValue && presetId === preset.id ? "bg-ink text-paper" : "border border-line bg-paper text-ink"
              }`}
            >
              {preset.label}
              {preset.hint ? <span className="ml-1 text-xs font-normal opacity-80">{preset.hint}</span> : null}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor="customCap" className="text-sm font-medium">
              Custom number
            </label>
            <input
              id="customCap"
              inputMode="decimal"
              placeholder="leave empty to use a preset"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value.replace(/[^\d.]/g, ""))}
              className="mt-2 h-11 w-40 rounded-xl border border-line bg-paper px-3"
            />
          </div>
          <div className="flex gap-2">
            {(["KB", "MB"] as const).map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => setCustomUnit(unit)}
                className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
                  customUnit === unit ? "bg-ink text-paper" : "border border-line bg-paper text-ink"
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
          <p className="text-sm tabular-nums text-muted">Cap: {formatBytes(targetBytes)}</p>
        </div>
        <fieldset className="mt-4">
          <legend className="mb-2 text-sm font-medium">Prefer format</legend>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["image/jpeg", "JPG"],
                ["image/webp", "WebP"],
                ["image/png", "PNG"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setOutputType(value)}
                className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
                  outputType === value ? "bg-ink text-paper" : "border border-line bg-paper text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">PNG under 500 KB is switched to JPEG. The row will say so.</p>
        </fieldset>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button type="button" onClick={() => void runTarget()} disabled={!items.length || stage === "working"} aria-busy={stage === "working"}>
            {stage === "working" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Fitting to {formatBytes(targetBytes)}…
              </>
            ) : (
              `Fit to ${formatBytes(targetBytes)}`
            )}
          </Button>
        </div>
        {banner && <p className="mt-3 text-sm text-copper-deep">{banner}</p>}
      </section>

      {items.length > 0 && (
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-3 sm:flex-row sm:items-center"
            >
              <img
                src={item.result?.url ?? item.preview}
                alt=""
                className="h-20 w-20 shrink-0 rounded-xl bg-paper object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{item.file.name}</p>
                {item.error ? (
                  <p className="text-sm text-copper-deep">{item.error}</p>
                ) : item.result ? (
                  <div className="text-sm tabular-nums">
                    <p className={item.result.hit ? "text-success" : "text-copper-deep"}>
                      {formatBytes(item.result.originalSize)} → {formatBytes(item.result.newSize)}
                      {item.result.hit ? " · under cap" : " · still over cap"}
                    </p>
                    <p className="text-muted">
                      {item.result.iterations} encode{item.result.iterations === 1 ? "" : "s"} · JPEG q
                      {Math.round(item.result.qualityUsed * 100)}
                      {item.result.resized ? ` · edge ${item.result.edgeUsed}px` : " · same pixels"}
                      {item.result.pngToJpeg ? " · PNG→JPEG" : ""}
                    </p>
                    {!item.result.hit ? (
                      <p className="mt-1 text-pretty text-copper-deep">
                        Stopped after {item.result.iterations} tries. Next step is crop the frame or pick another
                        format — this encoder will not invent a smaller PNG photo.
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-sm tabular-nums text-muted">{formatBytes(item.file.size)}</p>
                )}
                {stage === "working" && (
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                    <div className="h-full bg-copper" style={{ width: `${item.progress}%` }} />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {item.result && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void downloadBlob(item.result!.blob, item.result!.filename)}
                  >
                    <Download className="size-4" /> Download
                  </Button>
                )}
                <Button type="button" variant="ghost" size="sm" onClick={() => remove(item.id)} aria-label="Remove">
                  <X className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {stage === "done" && items.some((i) => i.result) && (
        <section className="mt-6 rounded-2xl border border-line bg-paper p-5">
          <p className="font-display text-xl">
            Cap {formatBytes(targetBytes)}
            {misses > 0 ? ` · ${misses} still over` : " · all rows under"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {items.filter((i) => i.result).length > 1 && (
              <Button type="button" variant="copper" onClick={() => void downloadZip()}>
                <Download className="size-4" /> Download ZIP
              </Button>
            )}
            <Button type="button" variant="outline" onClick={clearAll}>
              <Trash2 className="size-4" /> Start over
            </Button>
          </div>
          <AdUnit slot="after-success" />
        </section>
      )}

      {stage === "done" && <AdUnit slot="mid" />}
    </div>
  );
}
