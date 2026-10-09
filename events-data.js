// Weber County Hive Community Calendar — event list
// Add one entry per event. Order doesn't matter; the pages sort by date.
//
// HOW IT FITS TOGETHER
// - Every dated item from a Hive repo (a referendum deadline, a hearing, a protest deadline, an
//   election date) goes in as cal:"politics" with its county. It then shows up in THREE places
//   automatically: the Politics calendar, that county's calendar page, and the front page's
//   "Coming up" list. Put the case file in caseFile so readers can click back to it.
// - Festivals, fairs, fundraisers, parades, memorials and other community events go in as
//   cal:"community" with their county. They show on the Community Events calendar.
//
// id:        short unique name, used in the event's share link (e.g. "roy-prop-10-signatures")
// cal:       "politics" or "community"
// county:    "statewide" or a county key: weber, davis, boxelder, morgan, wasatch, saltlake, utah, tooele
// type:      "election", "deadline", "meeting" (public meeting or hearing), "community" (festival, fair,
//            fundraiser, parade...) or "memorial" (dedications, remembrances)
// title:     event name
// date:      first day, "YYYY-MM-DD"
// endDate:   last day for multi-day events ("" if one day)
// start/end: times in 24-hour "HH:MM" ("" for all-day)
// place:     where ("" if none)
// desc:      one or two plain sentences
// link:      where the date comes from: official notice, Facebook event, news report, etc.
// linkLabel: what that link is, e.g. "vote.utah.gov", "Facebook event", "FOX 13"
// repo:      Hive repo this date belongs to, e.g. "Referendums" ("" if none)
// caseFile:  link to the Hive case file or page about it ("" if none)
// from:      "hive" (added by the Hive) or "reader" (sent in by a reader)
// tentative: true if the date isn't final yet
// added:     date added, "YYYY-MM-DD"

const SITE = {
  name: "Community Calendar",
  pagePublished: "Oct 4, 2026",
  pageUpdated: "Oct 9, 2026",
  email: "webercountyhive@gmail.com",
  url: "https://weber-county-hive.github.io/Community-Calendar/"
};

// The counties. To open a new county, add it here and copy weber.html to its file name
// (change the CAL_COUNTY line near the bottom). The Community Events page picks up new counties on its own.
const COUNTIES = {
  weber:    { name:"Weber County",     file:"weber.html" },
  davis:    { name:"Davis County",     file:"davis.html" },
  boxelder: { name:"Box Elder County", file:"box-elder.html" },
  morgan:   { name:"Morgan County",    file:"morgan.html" },
  wasatch:  { name:"Wasatch County",   file:"wasatch.html" },
  saltlake: { name:"Salt Lake County", file:"salt-lake.html" },
  utah:     { name:"Utah County",      file:"utah-county.html" },
  tooele:   { name:"Tooele County",    file:"tooele.html" }
};

const EVENTS = [
  // ===== POLITICS · statewide =====
  { id:"ballots-mail-2026", cal:"politics", county:"statewide", type:"election", title:"Ballots begin mailing to active registered voters", date:"2026-10-13", endDate:"", start:"", end:"", place:"", desc:"County clerks begin mailing general-election ballots. Watch your mailbox.", link:"https://vote.utah.gov", linkLabel:"vote.utah.gov", repo:"", caseFile:"", from:"hive", tentative:false, added:"2026-10-04" },
  { id:"fec-q3-reports-2026", cal:"politics", county:"statewide", type:"deadline", title:"Federal campaign reports due (through Sept. 30)", date:"2026-10-15", endDate:"", start:"", end:"", place:"", desc:"Quarterly reports for U.S. House and Senate campaigns, covering money through Sept. 30, are due. The Hive will update the UT-2 case file with them.", link:"https://www.fec.gov", linkLabel:"fec.gov", repo:"Candidates 2026", caseFile:"https://weber-county-hive.github.io/candidates2026/ut2-moore-crosby.html", from:"hive", tentative:false, added:"2026-10-04" },
  { id:"registration-deadline-2026", cal:"politics", county:"statewide", type:"deadline", title:"Regular voter registration deadline", date:"2026-10-23", endDate:"", start:"17:00", end:"", place:"", desc:"Last day for regular voter registration, 5 p.m. Same-day registration is available on Election Day with two forms of valid ID.", link:"https://vote.utah.gov", linkLabel:"vote.utah.gov", repo:"", caseFile:"", from:"hive", tentative:false, added:"2026-10-04" },
  { id:"election-day-2026", cal:"politics", county:"statewide", type:"election", title:"General Election Day", date:"2026-11-03", endDate:"", start:"07:00", end:"20:00", place:"Your county's vote centers", desc:"Polls and vote centers are open 7 a.m. to 8 p.m. Drop boxes close at 8 p.m.", link:"https://vote.utah.gov", linkLabel:"vote.utah.gov", repo:"Voter Quick Scan 2026", caseFile:"https://weber-county-hive.github.io/Voter-Quick-Scan-2026/", from:"hive", tentative:false, added:"2026-10-04" },

  // ===== POLITICS · Weber County =====
  { id:"powder-mountain-e6863-protest", cal:"politics", county:"weber", type:"deadline", title:"Protest deadline: Powder Mountain water application E6863", date:"2026-10-07", endDate:"", start:"", end:"", place:"", desc:"Last day to file a protest on Powder Mountain's application for nine wells and 1,000 acre-feet of water.", link:"https://weber-county-hive.github.io/Transparency/weber-hive-powder-mountain-water.html", linkLabel:"Wells at the Top", repo:"Transparency", caseFile:"https://weber-county-hive.github.io/Transparency/weber-hive-powder-mountain-water.html", from:"hive", tentative:false, added:"2026-10-04" },
  { id:"roy-prop-10-signatures", cal:"politics", county:"weber", type:"deadline", title:"Roy Prop 10 referendum signatures due", date:"2026-10-08", endDate:"", start:"", end:"", place:"Roy", desc:"Signatures for the referendum on Roy's property-tax increase are due, as reported by FOX 13.", link:"https://webercountyhive.substack.com/p/roys-oct-8-deadline-whats-riding", linkLabel:"Weber County Hive story", repo:"Referendums", caseFile:"https://webercountyhive-coder.github.io/referendum/roy-prop-10-tax-referendum.html", from:"hive", tentative:false, added:"2026-10-04" },
  { id:"weber-early-voting-2026", cal:"politics", county:"weber", type:"election", title:"Early in-person voting, Weber County", date:"2026-10-27", endDate:"2026-10-30", start:"12:00", end:"18:00", place:"Weber Center basement vote center, 2380 Washington Blvd., Ogden", desc:"Early in-person voting, noon to 6 p.m. Call Weber County Elections at 801-399-8034 to confirm before you go.", link:"https://weber-county-hive.github.io/candidates2026/weber-2026-voter-guide.html", linkLabel:"Weber County voter guide", repo:"Candidates 2026", caseFile:"https://weber-county-hive.github.io/candidates2026/weber-2026-voter-guide.html", from:"hive", tentative:false, added:"2026-10-04" },
  { id:"weber-election-day-2026", cal:"politics", county:"weber", type:"election", title:"Election Day vote centers, Weber County", date:"2026-11-03", endDate:"", start:"07:00", end:"20:00", place:"Weber County Fairgrounds Exhibit Hall, 1000 N 1200 W, Ogden; Ogden Valley Branch Library, 131 S 7400 E, Huntsville", desc:"Vote centers are open 7 a.m. to 8 p.m. Drop boxes close at 8 p.m.", link:"https://weber-county-hive.github.io/candidates2026/weber-2026-voter-guide.html", linkLabel:"Weber County voter guide", repo:"Candidates 2026", caseFile:"https://weber-county-hive.github.io/candidates2026/weber-2026-voter-guide.html", from:"hive", tentative:false, added:"2026-10-04" },

  // ===== POLITICS · Wasatch County =====
  { id:"wasatch-ballots-dropboxes-2026", cal:"politics", county:"wasatch", type:"election", title:"Ballots mailed; drop boxes open 24/7", date:"2026-10-13", endDate:"", start:"", end:"", place:"Drop boxes in Charleston, Hideout, Heber City, Midway and Wallsburg", desc:"Ballots begin mailing, and Wasatch County's drop boxes open around the clock.", link:"https://weber-county-hive.github.io/candidates2026/wasatch-2026-voter-guide.html", linkLabel:"Wasatch County voter guide", repo:"Candidates 2026", caseFile:"https://weber-county-hive.github.io/candidates2026/wasatch-2026-voter-guide.html", from:"hive", tentative:false, added:"2026-10-04" },
  { id:"wasatch-early-voting-2026", cal:"politics", county:"wasatch", type:"election", title:"Early in-person voting, Wasatch County", date:"2026-10-27", endDate:"2026-10-30", start:"09:00", end:"16:00", place:"County Administration Building, 25 N. Main St., Heber City", desc:"Early in-person voting, 9 a.m. to 4 p.m.", link:"https://weber-county-hive.github.io/candidates2026/wasatch-2026-voter-guide.html", linkLabel:"Wasatch County voter guide", repo:"Candidates 2026", caseFile:"https://weber-county-hive.github.io/candidates2026/wasatch-2026-voter-guide.html", from:"hive", tentative:false, added:"2026-10-04" },
  { id:"wasatch-election-day-2026", cal:"politics", county:"wasatch", type:"election", title:"Election Day polling, Wasatch County", date:"2026-11-03", endDate:"", start:"07:00", end:"20:00", place:"County Administration Building, 25 N. Main St., Heber City", desc:"The County Administration Building is the only polling location. Drop boxes close at 8 p.m. Bring picture ID.", link:"https://weber-county-hive.github.io/candidates2026/wasatch-2026-voter-guide.html", linkLabel:"Wasatch County voter guide", repo:"Candidates 2026", caseFile:"https://weber-county-hive.github.io/candidates2026/wasatch-2026-voter-guide.html", from:"hive", tentative:false, added:"2026-10-04" },

  // ===== POLITICS · Utah County =====
  { id:"eagle-mountain-r62-referendum-vote", cal:"politics", county:"utah", type:"election", title:"Eagle Mountain tax referendum vote (tentative)", date:"2027-08-10", endDate:"", start:"", end:"", place:"Eagle Mountain", desc:"Special election on the referendum against Resolution R-62-2026, Eagle Mountain's 69.81% property tax rate increase. The date is printed on the city's referendum petition. Sponsors say Utah law appears to allow a tax measure only in November, so this date may change. The Hive is still researching.", link:"https://eaglemountain.gov/wp-content/uploads/2026/09/Eagle-Mountain-Referendum-Petition.pdf", linkLabel:"Eagle Mountain referendum petition", repo:"Referendums", caseFile:"https://webercountyhive-coder.github.io/referendum/eagle-mountain-tax-referendum-2.html", from:"hive", tentative:true, added:"2026-10-08" },

  // ===== COMMUNITY =====
  { id:"sunset-agent-orange-memorial-unveiling", cal:"community", county:"davis", type:"memorial", title:"Agent Orange memorial unveiling (tentative)", date:"2026-11-11", endDate:"", start:"", end:"", place:"Sunset City Veterans Memorial Park, behind Sunset City Hall, Sunset", desc:"An unveiling of the memorial to Vietnam veterans exposed to Agent Orange is tentatively planned around Veterans Day. Date and time not yet confirmed.", link:"https://www.ksl.com/article/51626769/agent-orange-memorial-in-sunset-sought-by-syracuse-vietnam-war-veteran-largely-complete", linkLabel:"KSL", repo:"News Spotlights", caseFile:"https://weber-county-hive.github.io/Utah-Hive-News-Spotlights/sunset-agent-orange-memorial.html", from:"reader", tentative:true, added:"2026-10-04" }
];
