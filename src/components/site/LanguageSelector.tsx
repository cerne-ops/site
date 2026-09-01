import { Globe2 } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <label className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-2.5 py-2 text-xs text-muted-foreground transition hover:border-ember/45 hover:text-foreground">
      <Globe2 className="h-3.5 w-3.5 text-ember" aria-hidden="true" />
      <span className="sr-only">Idioma</span>
      <select
        value={locale}
        aria-label="Selecionar idioma"
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="bg-transparent font-mono text-xs text-foreground outline-none"
      >
        <option value="pt-BR">PT-BR</option>
        <option value="en-US">EN-US</option>
      </select>
    </label>
  );
}
