import { jsonLdDocument } from '@/lib/schema';

/**
 * Renders a JSON-LD block. Kept in one place so every page emits valid,
 * escaped structured data.
 */
export default function JsonLd({ nodes }: { nodes: unknown[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for the `</script>` terminator below.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLdDocument(nodes)).replace(/</g, '\\u003c'),
      }}
    />
  );
}
