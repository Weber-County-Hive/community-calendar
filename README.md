# Community Calendar

Important dates for Utah voters and neighbors, from The Weber County Hive and Utah Hive Politics.
Live site (after GitHub Pages is turned on): https://weber-county-hive.github.io/Community-Calendar/

## Pages
- `index.html` — front page: links to every calendar and the next 8 dates
- `politics.html` — Utah Politics: every election date, deadline and hearing, statewide and by county (county filter)
- `community.html` — Community Events: festivals, fairs, fundraisers, memorials (starts with Weber County; other counties appear as events are added)
- `weber.html`, `davis.html`, `box-elder.html`, `morgan.html`, `wasatch.html`, `salt-lake.html`, `utah-county.html`, `tooele.html` — one politics calendar per county, with statewide dates included

## Files
- `events-data.js` — every date lives here (one list). Instructions are at the top of the file.
- `calendar.js` — shared page script (list view, month view, Add to my calendar, Google Calendar, Share, Facebook)
- `style.css` — blues and greens

## When a Hive case file has a deadline
Add one entry to `events-data.js` with `cal:"politics"`, the county, and the case file link in `caseFile`.
It then shows on the Politics calendar, that county's page and the front page automatically.

## Community events
Add an entry with `cal:"community"` and the county. Put the Facebook event or flyer link in `link`.
Reader submissions: webercountyhive@gmail.com, subject "Calendar Event".
