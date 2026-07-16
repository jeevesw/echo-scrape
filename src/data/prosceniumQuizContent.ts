// src/data/prosceniumQuizContent.ts
//
// Proscenium "Accessibility in Events" quiz — all content.
// Everything here comes from the Proscenium whitepaper. Nothing is invented advice.
//
// DO NOT let an AI assistant rewrite the copy in this file. It has been through a
// deliberate anti-slop pass. Regenerating it will reintroduce em dashes, "it's not X
// it's Y" constructions, and the clipped rhythm we spent a pass removing.
// Edit by hand or not at all.

export type State = "todo" | "started" | "doing" | "unsure";
export type Stage = "registration" | "pre-event" | "arrival" | "during" | "post-event";
export type Mode = "ahead" | "unsure" | "starting" | "balanced";

export interface QuizOption {
  id: string;
  label: string;
  state: State;
}

export interface QuizQuestion {
  id: string;
  stage: Stage;
  /** Baseline questions feed the celebration panel but are excluded from mode detection. */
  baseline: boolean;
  question: string;
  /** Last option must always be the "I'm not sure" one. shuffleFixedLast() pins it. */
  options: QuizOption[];
}

export interface RecommendationCopy {
  headline: string;
  body: string[];
}

export interface Practice {
  id: string;
  name: string;
  impact: number; // 1-5
  effort: number; // 1-5
  copy: {
    todo: RecommendationCopy; // also served for "unsure"
    started: RecommendationCopy;
    doing: RecommendationCopy;
  };
}

export const STAGE_LABELS: Record<Stage, string> = {
  registration: "Registration",
  "pre-event": "Pre-Event Communication",
  arrival: "Arrival",
  during: "During the Event",
  "post-event": "Post-Event",
};

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "b1",
    stage: "registration",
    baseline: true,
    question: "Do your events cover ADA requirements and auditory aids as standard?",
    options: [
      { id: "b1-a", label: "Always, it's built into how we plan", state: "doing" },
      { id: "b1-b", label: "Usually, though it depends on the venue", state: "started" },
      { id: "b1-c", label: "Only when somebody asks", state: "todo" },
      { id: "b1-d", label: "I'm not sure", state: "unsure" },
    ],
  },
  {
    id: "b2",
    stage: "registration",
    baseline: true,
    question: "Do you capture dietary requirements ahead of time and cater to them?",
    options: [
      { id: "b2-a", label: "Always, it's on every registration form", state: "doing" },
      { id: "b2-b", label: "Usually, for the bigger events", state: "started" },
      { id: "b2-c", label: "Not routinely", state: "todo" },
      { id: "b2-d", label: "I'm not sure", state: "unsure" },
    ],
  },
  {
    id: "q1",
    stage: "registration",
    baseline: false,
    question:
      "At registration, do you ask attendees an open question about what they need to enjoy the event?",
    options: [
      { id: "q1-a", label: "Yes, we ask openly rather than from a fixed list", state: "doing" },
      { id: "q1-b", label: "We ask, but only with tick-box options", state: "started" },
      { id: "q1-c", label: "No, we don't ask", state: "todo" },
      { id: "q1-d", label: "I'm not sure what our form asks", state: "unsure" },
    ],
  },
  {
    id: "q2",
    stage: "registration",
    baseline: false,
    question: "Has your registration site been checked against ADA and WCAG standards?",
    options: [
      { id: "q2-a", label: "Yes, we've verified it", state: "doing" },
      { id: "q2-b", label: "Partly, or we've added an accessibility plugin", state: "started" },
      { id: "q2-c", label: "No, it's never been checked", state: "todo" },
      { id: "q2-d", label: "I'm not sure, that sits with our platform provider", state: "unsure" },
    ],
  },
  {
    id: "q3",
    stage: "pre-event",
    baseline: false,
    question:
      'Do attendees get a "know before you go" guide covering event flow, loud moments, lighting changes, venue maps and break times?',
    options: [
      { id: "q3-a", label: "Yes, everyone gets one before every event", state: "doing" },
      { id: "q3-b", label: "We send something, but it's light on this kind of detail", state: "started" },
      { id: "q3-c", label: "No, attendees find out on the day", state: "todo" },
      { id: "q3-d", label: "I'm not sure what goes out pre-event", state: "unsure" },
    ],
  },
  {
    id: "q4",
    stage: "arrival",
    baseline: false,
    question:
      "If somebody has requested an accommodation, is there a named person meeting them on arrival?",
    options: [
      { id: "q4-a", label: "Yes, somebody's briefed and expecting them", state: "doing" },
      { id: "q4-b", label: "Sometimes, depending on the event", state: "started" },
      { id: "q4-c", label: "No, they join the general registration queue", state: "todo" },
      { id: "q4-d", label: "I'm not sure how that's handled on-site", state: "unsure" },
    ],
  },
  {
    id: "q5",
    stage: "during",
    baseline: false,
    question: "Do your events include a quiet space attendees can use?",
    options: [
      { id: "q5-a", label: "Yes, a proper quiet room, signposted", state: "doing" },
      { id: "q5-b", label: "We've done it once or twice", state: "started" },
      { id: "q5-c", label: "No, we haven't offered one", state: "todo" },
      { id: "q5-d", label: "I'm not sure", state: "unsure" },
    ],
  },
  {
    id: "q6",
    stage: "during",
    baseline: false,
    question:
      "Do you offer sensory kits, with things like fidget tools, earplugs, social battery pins or sunglasses?",
    options: [
      { id: "q6-a", label: "Yes, available at every event", state: "doing" },
      { id: "q6-b", label: "We've trialled something like it", state: "started" },
      { id: "q6-c", label: "No", state: "todo" },
      { id: "q6-d", label: "I'm not sure", state: "unsure" },
    ],
  },
  {
    id: "q7",
    stage: "during",
    baseline: false,
    question:
      "Do you flag overstimulating moments in advance, through signage, handouts or an advisory list?",
    options: [
      { id: "q7-a", label: "Yes, attendees know what's coming and when", state: "doing" },
      { id: "q7-b", label: "Sometimes, for the loudest moments", state: "started" },
      { id: "q7-c", label: "No", state: "todo" },
      { id: "q7-d", label: "I'm not sure", state: "unsure" },
    ],
  },
  {
    id: "q8",
    stage: "post-event",
    baseline: false,
    question: "Does your post-event survey ask specifically about accessibility?",
    options: [
      { id: "q8-a", label: "Yes, and it shapes the next event", state: "doing" },
      { id: "q8-b", label: "There's a general comments box", state: "started" },
      { id: "q8-c", label: "No, we don't ask about it", state: "todo" },
      { id: "q8-d", label: "I'm not sure what's on our survey", state: "unsure" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Practices — impact/effort scores PENDING SIGN-OFF from Mark & Chuck
// ---------------------------------------------------------------------------

export const PRACTICES: Record<string, Practice> = {
  q1: {
    id: "q1",
    name: "Open needs question at registration",
    impact: 5,
    effort: 1,
    copy: {
      todo: {
        headline: "Just ask the question",
        body: [
          "Add one open question to your registration form: what do you need to enjoy the event? Leave it as a text box, so people can tell you things you'd never have thought to ask about. Somebody mentions they're sensitive to loud noise, you mention the fireworks, and thirty seconds of admin has saved their evening.",
          "This is the cheapest item on the list and the one everything else depends on. Once you know what people actually need, you can stop guessing, and stop paying for accommodations nobody asked for.",
        ],
      },
      started: {
        headline: "Open it up",
        body: [
          "You're already asking, which puts you ahead of most. The limitation of a tick-list is that it can only ever return the needs you thought of when you built it, and the requests worth hearing tend to be the ones nobody predicted. Those only turn up when there's an empty box to write in.",
          "Same field, same form, with one constraint taken off it.",
        ],
      },
      doing: {
        headline: "You ask, and you ask openly",
        body: [
          "Everything else on this list gets cheaper and easier once you're working from real information, which is why this small thing matters more than its size suggests. You've got it.",
        ],
      },
    },
  },
  q2: {
    id: "q2",
    name: "Accessible registration site",
    impact: 3,
    effort: 3,
    copy: {
      todo: {
        headline: "Check the front door",
        body: [
          "An accommodation nobody can request is an accommodation you don't provide, and if your registration form can't be navigated by keyboard or read by a screen reader, that's exactly what's happening. W3 publish free tools that will tell you where you stand against ADA and WCAG, and plugins like AccessiBe or UserWay close a good deal of the gap without touching the build.",
          "In most cases this lives with your registration platform, so it's usually one email to your vendor.",
        ],
      },
      started: {
        headline: "Finish the check",
        body: [
          "A plugin covers a lot of ground and it's the right first move. Run the W3 tools once to see what's left over; usually it comes down to colour contrast and keyboard navigation, and both are quick to fix.",
        ],
      },
      doing: {
        headline: "Your front door works",
        body: [
          "Verifying a registration site is unglamorous work that almost nobody does, and it means every accommodation you offer further down the journey can actually be reached by the people who need it.",
        ],
      },
    },
  },
  q3: {
    id: "q3",
    name: "Know-before-you-go guide",
    impact: 4,
    effort: 2,
    copy: {
      todo: {
        headline: "Tell them what's coming",
        body: [
          "Send everyone a guide covering the shape of the day: where the loud moments are, when the lights change, which spaces get crowded, when the breaks fall, plus a map of the venue. For a neurodivergent attendee that's the difference between arriving prepared and arriving braced for anything. For everyone else it's simply a good guide.",
          "You've got all of this in the run of show already, so it's a document rather than a workstream, and it earns its keep on the day: most of what your team gets asked at the desk is answered in it.",
        ],
      },
      started: {
        headline: "Add the sensory detail",
        body: [
          'You\'re communicating before the event, which is most of the work. What tends to be missing is specificity. "Doors at seven" tells an attendee nothing useful, whereas "there\'s a pyro moment around 8:15 and the room goes dark just before it" tells them everything they need. That\'s a paragraph.',
        ],
      },
      doing: {
        headline: "Nobody's arriving blind",
        body: [
          "Your attendees know the shape of the day before they get there, which lowers anxiety for the people who need it and lowers the support load on your team at the same time.",
        ],
      },
    },
  },
  q4: {
    id: "q4",
    name: "Arrival support",
    impact: 3,
    effort: 2,
    copy: {
      todo: {
        headline: "Meet them at the door",
        body: [
          "When somebody tells you at registration that they need something, the worst outcome is arriving to find no trace of it. Have a named person expecting them, and give them a short walk of the space: restrooms, exits, the quiet room, who to find if they need help.",
          "There's no capex here and nothing to procure, just one person on the desk who's been briefed. Arrival is where an attendee works out how the day is going to go, and for most of them it gets spent standing in a queue.",
        ],
      },
      started: {
        headline: "Make it the default",
        body: [
          "It works when you do it; the gap is that it depends on which event it is and who happens to be on the desk. From the attendee's side, that's a coin flip. Put it in the briefing template and it stops being somebody's decision to make.",
        ],
      },
      doing: {
        headline: "Somebody's expecting them",
        body: [
          "The request an attendee made at registration is honoured the moment they walk in, which closes a loop that most events leave hanging.",
        ],
      },
    },
  },
  q5: {
    id: "q5",
    name: "Quiet space",
    impact: 5,
    effort: 2,
    copy: {
      todo: {
        headline: "Give people somewhere to go",
        body: [
          "A quiet space is the accommodation attendees ask for most often, and the clearest signal you can send that somebody thought about them. The Neu Project can help design one properly, though the version that works is often just a room with the lights down, no music playing, and a sign on the door.",
          "Look at your venue contract before you budget for it, because there's a good chance you're already paying for breakout space you're not using. And watch who ends up using the room. It'll be the person taking a call, the person who needs ten minutes before a keynote, the person who didn't sleep. Quiet rooms turn out to be good for everybody, which is rather the point.",
        ],
      },
      started: {
        headline: "Make it permanent, and put it on the map",
        body: [
          "You've run one, so you know it works. Two things turn a trial into a fixture: it goes on the venue map, and it goes in the pre-event comms. A quiet room nobody knows about is just a room.",
        ],
      },
      doing: {
        headline: "There's somewhere to go",
        body: [
          "Signposted, available, used. This is the thing attendees remember and mention afterwards, and it tells everyone in the building that the event was designed with them in mind.",
        ],
      },
    },
  },
  q6: {
    id: "q6",
    name: "Sensory kits",
    impact: 3,
    effort: 3,
    copy: {
      todo: {
        headline: "Small things, big signal",
        body: [
          "A sensory kit can hold fidget tools, noise-cancelling earbuds, sunglasses for bright rooms, notebooks, colouring books, and social battery pins that let somebody signal how much conversation they're up for without having to say it out loud. The Neu Project, Eventwell and KultureCity will all help you put one together. Build to the event, too, because an awards dinner and a trade show floor call for completely different things.",
          "One honest note. This is the only item here with a real per-head cost and a procurement lead time attached, so it's the one to plan rather than improvise. It's on the list because it's the most tangible thing you can put in somebody's hand.",
        ],
      },
      started: {
        headline: "Scale what worked",
        body: [
          "You've trialled it, which means you're holding information most people don't have: you know what got picked up and what got left on the table. Cut whatever nobody touched. The kit gets smaller, cheaper and better all at once.",
        ],
      },
      doing: {
        headline: "You've made it tangible",
        body: [
          "Kits are the accommodation attendees carry around and take home with them, and they're the one that quietly tells the rest of the room that this event thought about people.",
        ],
      },
    },
  },
  q7: {
    id: "q7",
    name: "Sensory advisory",
    impact: 3,
    effort: 1,
    copy: {
      todo: {
        headline: "Flag the loud bits",
        body: [
          "Put out signage or a handout marking the moments that might overwhelm somebody: pyro, strobe lighting, sustained volume, the crush at the doors when the room turns over. Given the heads-up, an attendee can decide for themselves whether to sit that bit out.",
          "You know where every one of those moments is already, because they're in the run of show. This costs you a page and some signage, and it's one of the things attendees thank you for.",
        ],
      },
      started: {
        headline: "Cover the whole run",
        body: [
          "You're flagging the obvious ones, which handles the pyro and the strobes. What catches people out tends to be less dramatic: the crush at the doors, the ten seconds of darkness before a reveal, the band that starts up without warning during dinner. Walk the run of show once with that lens and you'll find them.",
        ],
      },
      doing: {
        headline: "No surprises",
        body: [
          "Attendees can make their own call about what to sit out, which hands them back some control over their own day. That's the whole point of it.",
        ],
      },
    },
  },
  q8: {
    id: "q8",
    name: "Accessibility in feedback",
    impact: 4,
    effort: 1,
    copy: {
      todo: {
        headline: "Ask, because they won't",
        body: [
          "Add two questions to the survey you're already sending: was there anything that made the event harder to enjoy, and what would have helped?",
          "This one matters more than its size suggests. Only 15% of attendees with a mental health condition or neurodivergence would feel confident asking an organiser for support, which means the problem stays invisible by default. You don't get complaints. What you get is people who quietly don't come back, who never tell you why, and who never appear in a post-event report as anything except a smaller number.",
          "Asking is the only way any of that surfaces. And as the whitepaper puts it, people like being asked.",
        ],
      },
      started: {
        headline: "A comments box gets you the confident ones",
        body: [
          "An open box catches the people who were always going to speak up, which is roughly the 15% who'd feel comfortable raising it anyway. Everybody else needs asking directly, and by name, before they'll say a word. Put accessibility in the question itself.",
        ],
      },
      doing: {
        headline: "You're closing the loop",
        body: [
          "You ask, so you learn, which makes you the rare event that gets better at this every year rather than guessing again from scratch.",
        ],
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Mode copy
// ---------------------------------------------------------------------------

export const MODE_COPY: Record<Mode, { headline: string; body: string[] }> = {
  balanced: {
    headline: "You're further along than most",
    body: [
      "Several of the things that make an event work for neurodivergent attendees are already part of how you run yours, which puts you in a smaller group than you'd probably guess. Of attendees with a mental health condition or neurodivergence, 88% feel event organisers don't understand their needs, so whatever you're doing is landing.",
      "What follows is the next handful of things we'd look at, in the order we'd look at them.",
    ],
  },
  starting: {
    headline: "Let's start with what's easy",
    body: [
      "Nearly everything that makes an event work for neurodivergent attendees is quick and cheap; the reason it doesn't happen is that it's rarely anybody's actual job. Luckily, the items that make the biggest difference happen to be the ones that cost the least, so this is a good place to be starting from.",
      "Here's where we'd begin.",
    ],
  },
  unsure: {
    headline: "Not sure? That's useful to know",
    body: [
      "Plenty of this might already be happening at your events without ever crossing your desk, since quiet rooms and sensory kits usually sit with production or ops. So we've set out what good looks like at each stage of the attendee journey, along with the question we'd take to whoever owns it.",
      "Come back with a yes and you're ahead of most events out there. Come back with a no and you've found your starting point.",
    ],
  },
  ahead: {
    headline: "You're ahead of the field",
    body: [
      "Most of what we'd normally recommend is already part of how you work, which is rare, and in our experience it usually means somebody senior decided this mattered and then backed it.",
      // TODO: Ahead-mode CTA is an open decision. See spec section 11, item 2.
      "So the conversation we'd want to have with you is a different one: what happens once the basics are handled, and how far the thinking can go from there.",
    ],
  },
};

export const PANEL_HEADINGS: Record<Mode, { primary: string; secondary?: string; celebration: string }> = {
  balanced: { primary: "Where to go next", celebration: "What you're already doing" },
  starting: { primary: "Start here", secondary: "Then these", celebration: "What you're already doing" },
  unsure: { primary: "Worth checking", celebration: "What you're already doing" },
  ahead: { primary: "The two we'd still look at", celebration: "What you're already doing" },
};

// ---------------------------------------------------------------------------
// Celebration panel
// ---------------------------------------------------------------------------

export const BASELINE_COPY: Record<string, { headline: string; body: string }> = {
  b1: {
    headline: "ADA requirements and auditory aids",
    body: "Built into how you plan, every time. It's the floor, and plenty of events still fall through it.",
  },
  b2: {
    headline: "Dietary requirements",
    body: "Captured up front and catered to, without anybody having to make a case for themselves first.",
  },
};

export const CELEBRATION_FRAMING = [
  "Notice what those two have in common. Nobody argues about whether to ask people about allergies any more; it's simply how events get run. And it got that way because somebody decided it mattered before anybody made them.",
  "You already accommodate the needs of people's diets with what you offer them to eat. Everything above is that same instinct, pointed at their brains and what you offer them to experience.",
];

// ---------------------------------------------------------------------------
// Hero + capture
// ---------------------------------------------------------------------------

export const HERO = {
  eyebrow: "Accessibility in Events",
  headline: "How accessible are your events, really?",
  body: [
    "Ten questions, about two minutes. At the end you'll get a short set of recommendations based on what you're already doing, drawn from our Accessibility in Events whitepaper.",
    "No score, no league table. Just the next few things worth doing, in the order we'd do them.",
  ],
  cta: "Start the quiz",
};

export const CAPTURE = {
  headline: "Want this as a document?",
  body: "We'll email your recommendations over, so you can forward them to your team or take them to whoever owns the run of show.",
  fieldLabel: "Email address",
  submit: "Send my recommendations",
  whitepaperHeadline: "Plus the full Accessibility in Events whitepaper",
  whitepaperBody:
    "Featuring insights from Ava X. Rigelhaupt, DEIA + Autism Consultant, and Megan Henshall, founder of The Neu Project.",
  whitepaperCover: "/proscenium/whitepaper-cover.webp",
  whitepaperFile: "/proscenium/accessibility-in-events-whitepaper.pdf",
};

// ---------------------------------------------------------------------------
// Brand tokens — applied inline on the page wrapper, never to :root
// ---------------------------------------------------------------------------

// Sampled from the Accessibility in Events whitepaper, page 5.
// NOT from the brand guidelines — off-guideline but on-brand for the companion quiz.
export const PROSCENIUM_GRADIENT =
  "linear-gradient(115deg, #721740 0%, #601050 52%, #4F1456 100%)";

export const PROSCENIUM_TOKENS: Record<string, string> = {
  "--background": "310 63% 20%",          // fallback under the gradient
  "--foreground": "0 0% 100%",            // headlines, pure white
  "--body-text": "312 27% 94%",           // #F4EEF2, off-white — halation guard
  "--muted-foreground": "310 15% 81%",    // #D6C9D2, AA on the lightest end
  "--primary": "0 0% 100%",               // buttons are WHITE
  "--primary-foreground": "310 100% 14%", // Plum #46003A label on them
  "--card": "0 0% 100%",
  "--card-foreground": "310 100% 14%",
  "--border": "0 0% 100%",
  "--accent": "0 0% 100%",                // selected option fill
  "--accent-foreground": "310 100% 14%",
  "--ring": "0 0% 100%",                  // focus ring MUST be white on this ground
  "--radius": "0.5rem",
};
