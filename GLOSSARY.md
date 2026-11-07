# Portfolio

A personal research portfolio published as a static Next.js export. The vocabulary below is what this repo calls
its own content and page concepts; the architecture vocabulary (module, interface, seam, depth) comes from the
shared design language and is not repeated here.

## Language

**Page record**:
The single module per route that holds that route's identity — path, title, description, heading, intro and
structured-data node — and nothing about how it renders.
_Avoid_: page metadata (too narrow, excludes the copy), page config, content entry

**Intro**:
The prose that sits between a page's heading and its data, explaining what the reader is looking at. Plain text
and inline links only; a page's body is not an intro.
_Avoid_: description (that is the meta description), body, blurb, copy

**Embedded**:
A content module rendered inside the home feed rather than on its own route. An embedded module carries no page
record, so it renders no heading and no intro.
_Avoid_: inline, preview, widget view
