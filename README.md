# BlackHawk Capital

An alternating photographic/editorial website for the AMC 2026 student project.

The opening uses the original Portfolio Performance photograph (landscape-05).
The fund name is displayed as text, with the official black PNG in the navigation
sidebar and the official white PNG in the dark footer. Both supplied PNGs are
copied without modifying their pixels.

Approach uses a white editorial layout; Research combines the original alpine
photograph with a light, rounded document sheet; Performance uses an off-white
background; Team combines a photographic banner with large 4:5 portrait areas.
The technical allocation table is intentionally omitted from the website. The
report and notebook remain the full analytical record.

## Opening eagle

The eagle is a photorealistic image generated with the built-in image_gen tool,
with a transparent background. CSS animates it in one 14-second glide on page
entry. It is not filmed wildlife footage. Reduced-motion settings suppress the
glide. The exact generation prompt is stored in eagle_asset.json and repeated
in asset_sources.json. The animation remains inside the opening photograph.

## Files

- index.html: page structure.
- assets/institutional.css: editorial/photographic layout and eagle glide.
- assets/content.js: team, document links and future live results.
- assets/site.js: menu, research tabs and content rendering.
- assets/eagle-glide.png: generated transparent eagle.
- asset_sources.json: photograph URLs and official asset fingerprints.

Open index.html in a browser to view the website locally. It is compatible with
the existing GitHub Pages configuration (main, root directory).

Set each team member's photo path in assets/content.js when portraits are supplied.
Keep document URLs and live performance empty until verified material is ready.

## Google Sites requirement

The AMC general guidelines require Google Sites. This source revision updates
the visual base, and does not create the group's Google Site. The content and
assets can be reused in native Google Sites sections. Google Sites also supports
full-page website embeds. Test the final Google Sites URL and document access
before submission.

Official guidance: https://support.google.com/sites/answer/90569?hl=en

## Review

The layout has been checked at desktop and phone widths. Menu and research-tab
interaction, local assets, no horizontal overflow and enlarged portrait areas
have been verified. The technical portfolio section and global photographic
scroll layer are absent. No analytical report or notebook files were changed.
