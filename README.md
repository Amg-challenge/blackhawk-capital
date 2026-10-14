# BlackHawk Capital

A fluid photographic/editorial website for the AMC 2026 student project.

The opening retains the original Portfolio Performance photograph (landscape-05).
The fund name is displayed as text, with the supplied black PNG in the sidebar
and the supplied white PNG in the footer. The flying eagle has been removed.

Approach uses a faint, static watermark of the official eagle. Performance uses
original mountain line artwork. Research now uses landscape-02, a distinctly
warmer Alpine sunset. The third photograph remains landscape-06.

Scrolling remains native. Light parallax, softened photo boundaries and short
content fades give continuity between sections without scroll snapping or a
full-photo background across the entire page. Reduced-motion preferences disable
these movements and keep all content readable.

Large 4:5 portrait areas are retained. The technical allocation section is absent;
the report and notebook remain the analytical record.

## Files

- index.html: page structure.
- assets/institutional.css: layout, edge dissolves and subtle visual textures.
- assets/site.js: navigation, document tabs, rendering and scroll-linked effects.
- assets/content.js: team, document links and future verified live performance.
- asset_sources.json: photograph URLs and supplied logo fingerprints.

These files are the current source of truth. Earlier one-off authoring scripts
outside this folder should not be rerun to regenerate the site.

Open index.html locally, or use the repository's GitHub Pages configuration
(main, root directory). Set portrait paths and document URLs in content.js when
verified material is available. Live performance remains unpublished.

## Google Sites requirement

AMC requires the group's final website to use Google Sites. This code updates
the visual base and does not create the Google Site. The content and assets can
be reused in native sections; Google Sites also supports full-page embeds. Test
the final URL and file permissions before submission.

Official guidance: https://support.google.com/sites/answer/90569?hl=en
