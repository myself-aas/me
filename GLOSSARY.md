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

**Feed section**:
One titled block of the home feed: the heading, the card, the content it holds, and the link to the route that
carries the rest of it. The feed is a list of these, and a content module never learns which one it is standing in.
_Avoid_: feed item, tile, widget, card
