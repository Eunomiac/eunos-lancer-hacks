const getMajorIdeals = (methods) => ({
    a: `I addressed challenges with ${methods}.`,
    b: "I expressed my heritage, background, or beliefs through my actions.",
    c: "I struggled with issues from my burdens or background."
});
const getBondQuestions = (bQuestion) => ({
    a: { question: "What gives you your power?" },
    b: { question: `${bQuestion.charAt(0)}${bQuestion.slice(1).toLowerCase()}` }
});
const C = {
    bondTypes: {
        harlequin: "The Harlequin",
        titan: "The Titan",
        pathfinder: "The Pathfinder",
        builder: "The Builder",
        magus: "The Magus",
        wolf: "The Wolf",
        fool: "The Fool",
        broker: "The Broker"
    },
    bondPowers: {
        harlequin: [
            {
                name: "Masquerade",
                bond: "harlequin",
                description: "<p class='power-description'>You can always tell if someone is lying, though you don't know the exact nature or extent of their lie.</p>"
            },
            {
                name: "Ridi Pagliacci",
                bond: "harlequin",
                description: "<p class='power-description'>Every session, you can invoke your burdens once each for <b>+1 Accuracy</b> to any roll.</p>"
            },
            {
                name: "Mockingbird",
                bond: "harlequin",
                description: "<p class='power-description'>You can mimic voices and sounds you've heard in the last day or so almost perfectly, granting your actions <b>+1 Accuracy</b> and <b>increased effect</b> where this is relevant.</p>"
            },
            {
                name: "Fast Friends",
                bond: "harlequin",
                description: "<p class='power-description'>When someone can hear and understand you, you can make them friendly to you for a minute. They'll let you into areas, vouch for you, do small favors for you, and so on. Social rolls against them gain <b>+1 Accuracy</b> and <b>increased effect</b>. After a minute, they realize they were manipulated and it won't work on them again in the same session. This power only works on one person at a time.</p>"
            },
            {
                name: "Slip",
                bond: "harlequin",
                frequency: 2,
                description: "<p class='power-description'>You can instantly disappear from sight and reappear somewhere within ten meters or so. You don't have to be able to see where you are going.</p>"
            },
            {
                name: "Gallows Humor",
                bond: "harlequin",
                description: "<p class='power-description'>If you break during a session, all other characters <strong class='emph-green'>clear 2 Stress</strong>.</p>"
            },
            {
                name: "Mercurial",
                bond: "harlequin",
                frequency: 1,
                description: "<p class='power-description'>If nobody else is looking, you can completely change your physical appearance, looking and sounding like an entirely new person (height, weight, build, hair/ clothes, and gender). Whether this physically changes you or is an illusory effect created by visual trickery is up to you. If you're trying to impersonate someone else, your disguise holds up perfectly unless someone knows that person intimately, and even then you get <b>+1 Accuracy</b> on all skill checks to keep the disguise up. You're stuck in this form until you next eat or drink.</p>"
            },
            {
                name: "Spectacular Flourish",
                bond: "harlequin",
                description: "<p class='power-description'>When you roll <b>20+</b> on any skill check, you amaze everyone present with your skill and daring. Anyone watching is stunned momentarily, granting <b>+1 Accuracy</b> and <b>increased effect</b> to the next action you or another PC takes in the same scene.</p>"
            },
            {
                name: "Exuent",
                bond: "harlequin",
                description: "<p class='power-description'>When you and your allies need to escape a bad situation right away, name your escape route and what you're taking with you. There's no roll required, and you always escape, but the GM chooses one:</p><ul class='power-description'><li>You leave something behind (a weapon, a friend, evidence).&nbsp;</li> <li>You end up somewhere perilous or uncomfortable (a garbage chute, a cliff side, a seedy bar).&nbsp;</li> <li>You pick something up on your way out (a hanger-on, pursuers, <b>Stress</b>).&nbsp;</li> <li>You can back out when you learn the cost and name another escape route (the GM might answer differently depending on how you phrase things).</li> </ul><p class='power-description'></p>"
            },
            {
                name: "Quickfingers",
                bond: "harlequin",
                frequency: 1,
                description: "<p class='power-description'>Name a visible nearby object that you could fit or carry in one or both hands. By the start of the next scene, you have possession of it. If you stole it, the person you stole it from will find out within the hour</p>"
            },
            {
                name: "Silvertongue",
                bond: "harlequin",
                prerequisite: "You may only gain this power If you've taken four powers from this bond, including the <b>Veteran Power</b>.",
                frequency: 1,
                description: "<p class='power-description'>Tell a lie to someone. If it's wild and outlandish, anyone who listens wholeheartedly believes it for a minute. If it's merely unbelievable, an hour. If it's plausible, a day. If they want to believe it, a week. They realize it was a lie after the effect wears off.</p>",
                master: true
            }
        ],
        titan: [
            {
                name: "True Grit",
                bond: "titan",
                description: "<p class='power-description'>The first time in a session you break due to <b>Stress</b>, you don't lose control and can still act for the rest of the scene without hindrance.</p>"
            },
            {
                name: "Nothing to Fuck With",
                bond: "titan",
                description: "<p class='power-description'>If anyone causes one of your allies to take <b>Stress</b> in your presence, take <b>+1 Accuracy</b> on all actions against that person for the rest of the session.</p>"
            },
            {
                name: "Ironjaw",
                bond: "titan",
                description: "<p class='power-description'>Increase your maximum <b>Stress</b> by <b>1</b>.</p>"
            },
            {
                name: "Nerve",
                bond: "titan",
                description: "<p class='power-description'>The first time you take any amount of <b>Stress</b> in a session, ignore it.</p>"
            },
            {
                name: "Hammerhand",
                bond: "titan",
                description: "<p class='power-description'>When you use your fists to solve a problem, you roll with <b>+1 Accuracy</b> and <b>increased effect</b>.</p>"
            },
            {
                name: "The Wall",
                bond: "titan",
                description: "<p class='power-description'>If you stand in defense of another person, they cannot take <b>Stress</b> while you are still conscious and you remain within arm's reach. Instead, you take <b>Stress</b> each time they would take <b>Stress</b>. You can't take any action or concentrate on anything else while defending someone.</p>"
            },
            {
                name: "Force of Will",
                bond: "titan",
                frequency: 1,
                description: "<p class='power-description'>Command someone to flee, stop and drop what they're holding, or come to you. They must do so. If the GM decides they are too strong-willed for this to work on them, regain your use of this ability and <strong class='emph-green'>clear 1 Stress</strong>.</p>"
            },
            {
                name: "Absolute Meat",
                bond: "titan",
                description: "<p class='power-description'>If you concentrate and grit your teeth, your personal strength verges on superhuman. You can <strong class='emph-red'>take 2 Stress</strong> and roll a skill check to do one of the following:</p><ul class='power-description'><li>Bust through a wall, door, or floor, even reinforced, with nothing but your body</li><li>Lift, push, or drag a vehicle, mech, or other tremendous weight a short distance</li><li>Withstand forces far beyond the human body such as gale force winds, a mech's strength, or the pull of the void.</li></ul><p class='power-description'>Your action has <b>increased effect</b> if successful.</p>"
            },
            {
                name: "Half Light",
                bond: "titan",
                description: "<p class='power-description'>When you enter a charged or tense scene, you may ask the GM one of both of the following and receive a truthful answer:</p><ul class='power-description'><li>Who's really in charge here?</li><li>What's the biggest danger here?</li></ul><p class='power-description'>You or an ally of your choice gets <b>+1 Accuracy</b> on their next skill check acting on the answer.</p>"
            },
            {
                name: "Strength Beyond Strength",
                bond: "titan",
                frequency: 1,
                description: "<p class='power-description'>You can call on your inner reserves of willpower to act with incredible athleticism, speed, or strength. For the rest of the scene, you can't roll less than a <b>10</b> on any checks involving physical activity (e.g., running, jumping, climbing, hand-to-hand combat, etc). Treat any roll of <b>9 or lower</b> as if you rolled a <b>10</b>.</p>"
            },
            {
                name: "Unbreakable",
                bond: "titan",
                prerequisite: "You may only gain this power If you've taken four powers from this bond, including the <b>Veteran Power</b>.",
                frequency: 1,
                description: "<p class='power-description'>For the rest of this scene, nobody you extend your protection over, can take <b>Stress</b>. Instead, you <strong class='emph-red'>take 1 Stress</strong> when they would take <b>Stress</b>. If this causes you to break, you gain a burden as normal but stay in the scene and don't lose control. For you to extend your protection over someone, they must remain within speaking distance of you.</p>",
                master: true
            }
        ],
        pathfinder: [
            {
                name: "Momentum",
                bond: "pathfinder",
                frequency: 2,
                description: "<p class='power-description'>When you survey a situation, ask one of the following questions and get a truthful answer from the GM:</p><ul class='power-description'><li>How do I think I can get around this obstacle ?</li><li>What's the most direct way forward ?</li><li>Which way do I feel I should be moving ?</li></ul><p class='power-description'>You or an ally of your choice gets <b>+1 Accuracy</b> on their next skill check acting on the answer.</p>"
            },
            {
                name: "Saddleborn",
                bond: "pathfinder",
                description: "<p class='power-description'>Gain <b>+1 Accuracy</b> and <b>increased effect</b> to all skill checks related to the use, driving, piloting, and upkeep of vehicles or mounts of any kind. This includes animals like horses.</p>"
            },
            {
                name: "Feet Up",
                bond: "pathfinder",
                description: "<p class='power-description'>You can forgo any downtime action, including your free Heal Burdens action, to <strong class='emph-green'>clear 3 Stress</strong>.</p>"
            },
            {
                name: "Dabbler",
                bond: "pathfinder",
                description: "<p class='power-description'>Gain <b>+2</b> to a trigger of your choice, up to a max of <b>+6</b>. You can change this bonus around at the end of each downtime.</p>"
            },
            {
                name: "Freesoul",
                bond: "pathfinder",
                description: "<p class='power-description'>You can escape from any restraint, shackle, hold, or prison cell without rolling. Nobody can hold, grab, or restrain you unless you let them. You can choose to conceal this ability if you wish.</p>"
            },
            {
                name: "Lay Burdens",
                bond: "pathfinder",
                description: "<p class='power-description'>Fill in a segment of all burdens when using Heal Burdens for free. If you are healing in a different location than your last downtime, tick another segment on any one burden.</p>"
            },
            {
                name: "Lightspeed",
                bond: "pathfinder",
                description: "<p class='power-description'>When you need to go really, really fast, name your method, your destination, and tell the GM you're pulling out all the stops. You and any of your allies nearby can get there faster than anyone else has before, and can easily outrun anyone you're running from or trying to pursue. Don't roll - you do it -  but the GM chooses two:</p><ul class='power-description'><li>You and your allies are exhausted and <strong class='emph-red'>take 1 Stress</strong>.</li><li>You go off course and end up close to your destination, but not quite there.</li><li> Your vehicle, mount, or method of travel is completely busted and will need repair.</li></ul><p class='power-description'></p>"
            },
            {
                name: "Renaissance",
                bond: "pathfinder",
                description: "<p class='power-description'>At the start of any session, pick one of your triggers. You become an expert at that skill. When you roll it, roll two <b>d20</b>s and pick the highest for the final result. You must pick a new trigger each session, and can't pick the same one twice in a row</p>"
            },
            {
                name: "Feel the Air",
                bond: "pathfinder",
                frequency: 1,
                description: "<p class='power-description'>You can ask the GM up to three of the following about any location you arrive at and receive truthful answers:</p><ul class='power-description'><li>Who lives here or has passed through recently, and where can I find them ?</li><li>Who owns this place, or wants to, and where can I talk to them ?</li><li>What part of this place do people avoid, and why?</li></ul><p class='power-description'>Gain <b>+1 Accuracy</b> and <b>increased effect</b> on your next check acting on the answers. If you ask only one question, <strong class='emph-green'>clear 1 Stress</strong>.</p>"
            },
            {
                name: "Beginner's Luck",
                bond: "pathfinder",
                description: "<p class='power-description'>When you try an activity or skill you've never tried before, you get <b>+1 Accuracy</b> and <b>increased effect</b> to checks related to that skill for the rest of the session. This only ever works once for each activity or skill.</p>"
            },
            {
                name: "Long Road Home",
                bond: "pathfinder",
                frequency: 1,
                prerequisite: "You may only gain this power If you've taken four powers from this bond, including the <b>Veteran Power</b>.",
                description: "<p class='power-description'>Name a location you've been in the last three days. You can make your way back there without rolling. The GM will determine the following about the journey there:</p><ul class='power-description'><li>Was it a long or arduous journey?</li><li>Was the location dangerous, defended, or contested?</li><li>Were you being pursued, tracked, or hunted ?</li></ul><p class='power-description'>For every “yes” answer, <strong class='emph-red'>take 2 Stress</strong>; however, at the beginning of the next scene, you and up to ten other willing people arrive safely there.Don't worry about playing out the journey (just ‘cut' to the next scene as you are arriving) and work backwards to figure out how you got there.</p>",
                master: true
            }
        ],
        builder: [
            {
                name: "Inspiration",
                bond: "builder",
                frequency: 2,
                description: "<p class='power-description'>When an ally takes can see or hear you while making a skill check, you can encourage them to give them <b>+1 Accuracy</b> or <b>increased effect</b>.</p>"
            },
            {
                name: "Secret History",
                bond: "builder",
                frequency: 2,
                description: "<p class='power-description'>When you examine an object or vehicle close enough to touch, you can ask any of the following to the GM and get an honest answer:</p><ul class='power-description'><li>Is this thing broken? If so, how can it be fixed?</li><li>Who touched or used this recently?</li><li>Where has this thing been in the past day or so?</li></ul><p class='power-description'>Gain <b>+1 Accuracy</b> on your next skill check acting on the answers.</p>"
            },
            {
                name: "Untangle",
                bond: "builder",
                description: "<p class='power-description'>When you help someone else Heal Burdens, they clear two extra segments instead of one, and you clear one segment.</p>"
            },
            {
                name: "The Clockmaker",
                bond: "builder",
                description: "<p class='power-description'>Gain <b>increased effect</b> on all project clocks and <b>+1 Accuracy</b> on all skill checks to progress them.</p>"
            },
            {
                name: "Sanctuary",
                bond: "builder",
                description: "<p class='power-description'>Until you take violent action in a scene, you cannot take more than <b>1 Stress</b> at a time from physical harm at the hands of other people.</p>"
            },
            {
                name: "Bilingual",
                bond: "builder",
                frequency: 1,
                description: "<p class='power-description'>For the entirety of a scene, you can talk to objects as if they were people, treating your work on them like a conversation, using social triggers, and so on. Talking to them has the same effect as working on them. Alternatively, you can do the opposite (work on someone like you would a project, using mechanical triggers). You can decide how metaphorical or literal this is. Gain <b>increased effect</b> when you use this ability.</p>"
            },
            {
                name: "Rigger",
                bond: "builder",
                frequency: 2,
                description: "<p class='power-description'>You can create an improvised tool or device. Name its intended purpose and what you built it from (you always have the parts on your person). It provides <b>+1 Accuracy</b> on any skill checks for that purpose, but the first time you use it, roll a <b>d6</b> and check for the following effects:<ol><li>It explodes immediately unless you <strong class='emph-red'>take 1 Stress</strong>.</li><li>It melts something nearby into slag with a loose bolt of energy unless you <strong class='emph-red'>take 1 Stress</strong>.</li><li>It makes a loud noise straight away and every time it is used.</li><li>It seems to have a mind of its own and sometimes activates without you.</li><li>For the rest of the session, you have to remain perfectly still to use it.</li><li>For the rest of the session, you have to feed it extra parts, raw material, or input from your gear or the environment if you want to use it.</li></ol> This item stops working at the end of the session. </p>"
            },
            {
                name: "Comfort",
                bond: "builder",
                frequency: 1,
                description: "<p class='power-description'>When you sit down and listen to a character for a short time, you may ask one of the following questions of the GM (if they're an NPC) or their player (if they are a PC) and receive an honest answer:</p><ul class='power-description'><li>What does this character really want?</li><li>How can I help?</li></ul><p class='power-description'>The GM or player in question can pass this information to you secretly if desired. You gain <b>+1 Accuracy</b> on your next skill check acting on the answer. If the character was a PC, you both <strong class='emph-green'>clear 1 Stress</strong>.</p>"
            },
            {
                name: "Metalbloom",
                bond: "builder",
                frequency: 1,
                description: "<p class='power-description'>For the rest of this scene, you cannot roll less than a <b>10</b> on any skill checks involving the use or understanding of technology. Treat any <b>d20</b> result of a <b>9 or lower</b> as a <b>10</b>.</p>"
            },
            {
                name: "Mender",
                bond: "builder",
                description: "<p class='power-description'>When you wish to fix something broken (a relationship, an object, an alliance), name your approach. You can do it, but the GM chooses one or two things you'll need:</p><ul class='power-description'><li>To bring the disparate parts together in one place.</li><li>To gather specific materials or find more time</li><li>To find out what's missing.</li><li>To be comfortable with not fully fixing it.</li></ul><p class='power-description'>When you have what you need, you can perform a downtime action and play a scene out to fix it. When it's fixed, gain <strong class='emph-blue'>1 XP</strong>.</p>"
            },
            {
                name: "Web of Creation",
                bond: "builder",
                frequency: 1,
                prerequisite: "You may only gain this power If you've taken four powers from this bond, including the <b>Veteran Power</b>.",
                description: "<p class='power-description'>By touching a willing person, an object, or a structure, you can visualize the connections between them or it and other objects, people, or things. You get excellent (but incomplete) information on these people, objects, or similar and how they relate. This information is factual and detailed. You can view up to three points of connection before this power fades. For example, you could visualize something three times removed or three separate things.</p>",
                master: true
            }
        ],
        magus: [
            {
                name: "Heartsight",
                bond: "magus",
                frequency: 2,
                description: "<p class='power-description'>By concentrating momentarily you can sense the ambient emotional state of those close to you. You don't have to be able to see them, but the effect becomes muddled if there are more than a few people close by. Get <b>+1 Accuracy</b> and <b>increased effect</b> on your next check acting on any insight you glean from this.</p>"
            },
            {
                name: "To the Brink",
                bond: "magus",
                description: "<p class='power-description'>If you would take enough <b>Stress</b> to break, roll a <b>d6</b>. On <b>4+</b>, ignore all the <b>Stress</b> you'd take. On <b>6</b>, additionally <strong class='emph-green'>clear 1 Stress</strong>.</p>"
            },
            {
                name: "Eyes of the Void",
                bond: "magus",
                description: "<p class='power-description'>You can see perfectly well in even pitch darkness, fog, or poor weather conditions. Gain <b>+1 Accuracy</b> and <b>increased effect</b> on checks that rely on surveying or observing your surroundings. You can see even fine detail up to a mile away unaided.</p>"
            },
            {
                name: "Possession",
                bond: "magus",
                frequency: 2,
                description: "<p class='power-description'>Ask a dark presence deep inside of you for advice on a course of action. The GM answers and you get either <b>+1 Accuracy</b> or <b>increased effect</b> on your next action following this advice (GM choice).</p>"
            },
            {
                name: "Blackblood",
                bond: "magus",
                description: "<p class='power-description'>You may clear two segments from any of your burdens for <b>+1 Accuracy</b> on any skill check.</p>"
            },
            {
                name: "Skincrawl",
                bond: "magus",
                description: "<p class='power-description'>If there's any question about who acts first in a scene, it's you. You get an itch, tic, or bad feeling when you or someone you consider close to you is in immediate danger.</p>"
            },
            {
                name: "Geist",
                bond: "magus",
                description: "<p class='power-description'>When you touch someone skin to skin and <strong class='emph-red'>take 1 Stress</strong>, you can see through their eyes and experience their sensations and ambient emotional state, even after breaking contact, although you can do little but observe. They are unaware of and unharmed by your presence. This lasts until the end of the scene, or until you use this ability again, and while you're concentrating on it, you cannot do anything yourself except sit in quiet focus, otherwise the effect ends. PCs must be willing.</p>"
            },
            {
                name: "Plunder the Void",
                bond: "magus",
                frequency: 1,
                description: "<p class='power-description'>When you strike out alone and enter a dark and distant place, nobody - PC or NPC - can find you and you may ask the GM one question about a situation at hand. They must answer truthfully with “yes”, “no”, or “unclear”. Whether this is merely a mental space or a different realm entirely is up to you and your GM. You return to reality where you left it at the start of the next scene.</p>"
            },
            {
                name: "Instinctive",
                bond: "magus",
                frequency: 2,
                description: "<p class='power-description'>Describe a course of action to the GM that you plan to take in the same scene. You will receive guidance from the GM in the form of a feeling that is truthful, if unclear. The GM can choose boon (good outcomes), bane (bad outcomes), or chaos (a mix of good and bad outcomes).</p>"
            },
            {
                name: "Unveil",
                bond: "magus",
                frequency: 2,
                description: "<p class='power-description'>Choose someone present. If you stare straight at them you can ask “what does this person fear right now?” of the GM (if they're an NPC) or their player (if they're a PC) and receive an honest answer. You get <b>+1 Accuracy</b> on your next skill check acting on the answer. If a PC answers, they may <strong class='emph-green'>clear 1 Stress</strong>.</p>"
            },
            {
                name: "Pierce the Gate",
                bond: "magus",
                frequency: 1,
                prerequisite: "You may only gain this power If you've taken four powers from this bond, including the <b>Veteran Power</b>.",
                description: "<p class='power-description'>By concentrating and remaining still, you can witness a scene, place, or person you have seen before as if you were physically present. You can't interact with anything there, nobody is aware of you, and you can do nothing but observe as a detached mind for the duration. You have all your normal senses, and the effect lasts for the rest of the scene. To view a place, you have to have been there. To view a person, you have to have seen their face. The scene does not need to take place at the same time (it could be in the near past or future), though if it's not at the present, it becomes blurry and indistinct and is reduced to impressions.</p>",
                master: true
            }
        ],
        wolf: [
            {
                name: "Go for a Walk",
                bond: "wolf",
                description: "<p class='power-description'> If you go off by yourself to accomplish a task, name your goal. You'll return to the group next scene successful, having accomplished it off-screen, but the GM chooses one</p><ul class='power-description'><li>You have to hurt someone innocent.</li><li>You raise an alarm, come back with pursuers, or start a ticking clock.</li><li>You come back hurt: <strong class='emph-red'>take 2 Stress</strong>.</li></ul><p class='power-description'>If the task was too dangerous, difficult, or complicated to accomplish alone, the GM will tell you that when you return, but will also tell you exactly what needs to be done to finish it. Gain <b>increased effect</b> when you take action to finish the task.</p>"
            },
            {
                name: "Cornered",
                bond: "wolf",
                description: "<p class='power-description'>When you break, gain <b>+1 Accuracy</b> and <b>increased effect</b> on all skill checks for the next scene.</p>"
            },
            {
                name: "Scarcoat",
                bond: "wolf",
                description: "<p class='power-description'>Your maximum <b>Stress</b> increases by <b>1</b> for each burden you currently have.</p>"
            },
            {
                name: "Discipline",
                bond: "wolf",
                description: "<p class='power-description'>If an ally fails a skill check, you can both <strong class='emph-red'>take 1 Stress</strong> for them to immediately reroll it. They must keep the new result.</p>"
            },
            {
                name: "Blood Scent",
                bond: "wolf",
                description: "<p class='power-description'>If someone or something is bleeding, gain <b>+1 Accuracy</b> and <b>increased effect</b> on any action made to intimidate, track, or harm them</p>"
            },
            {
                name: "Pounce",
                bond: "wolf",
                frequency: 1,
                description: "<p class='power-description'>You take an action before any NPCs have the chance to act, giving you a free roll. Hostile NPCs can't deal harm or consequences to you as a part of this roll (they're too slow), although you can still fail or suffer other consequences normally.</p>"
            },
            {
                name: "Tear Throat",
                bond: "wolf",
                description: "<p class='power-description'>You can instantly kill any NPC in arm's reach of you without rolling, but must first pay the cost. The GM chooses one:</p><ul class='power-description'><li>You are wracked by guilt and unable to use this ability again until the next session.</li><li>You take a burden.</li></ul><p class='power-description'></p>"
            },
            {
                name: "Ultimatum",
                bond: "wolf",
                frequency: 2,
                description: "<p class='power-description'>You look someone in the face, lock eyes with them, and name what you need. They either give you what you want, right now, or they choose one:</p><ul class='power-description'><li>They flee the scene (they always get away).</li><li>They escalate the situation (resorting to physical violence, calling in backup, raising the stakes, etc).</li></ul><p class='power-description'></p>"
            },
            {
                name: "It's Nothing",
                bond: "wolf",
                description: "<p class='power-description'>At the end of each session, <strong class='emph-green'>clear 3 Stress</strong> if you didn't let anyone tend to you, help you, heal you, or comfort you (even if they tried).</p>"
            },
            {
                name: "Don't Tell Me the Odds",
                bond: "wolf",
                description: "<p class='power-description'>Gain <b>+1 Accuracy</b> on all actions in a scene where you are clearly outnumbered, outgunned, or backed into a corner.</p>"
            },
            {
                name: "Wick",
                bond: "wolf",
                frequency: 1,
                prerequisite: "You may only gain this power If you've taken four powers from this bond, including the <b>Veteran Power</b>.",
                description: "<p class='power-description'>This scene, ignore all <b>Stress</b> from anyone not important enough to merit a name, and take <b>increased effect</b> on all actions to evade, fight, subdue, or intimidate them.</p>",
                master: true
            }
        ],
        fool: [
            {
                name: "Rescue",
                bond: "fool",
                frequency: 1,
                description: "<p class='power-description'>When you fail a skill check, you can let a nearby character step in and bail you out. That character gets <strong class='emph-blue'>1 XP</strong> and can immediately reroll the check as if they were making it, with <b>+1 Accuracy</b>. They take any consequences (including <b>Stress</b>) instead of you.</p>"
            },
            {
                name: "Punching Bag",
                bond: "fool",
                description: "<p class='power-description'>When someone causes you <b>Stress</b>, your allies gain <b>+1 Accuracy</b> on actions against them for the rest of the scene.</p>"
            },
            {
                name: "The Sun",
                bond: "fool",
                frequency: 1,
                description: "<p class='power-description'>Gain <b>increased effect</b> on all actions for the rest of the scene.</p>"
            },
            {
                name: "The Moon",
                bond: "fool",
                frequency: 1,
                description: "<p class='power-description'>Reduce all <b>Stress</b> suffered by <b>1</b>, to a minimum of <b>1</b>, for the rest of the scene.</p>"
            },
            {
                name: "Joyluck Wind Thrower",
                bond: "fool",
                frequency: 1,
                description: "<p class='power-description'>When you roll an unmodified <b>20</b> on the dice for a skill check, you may succeed in your task is and describe how you totally blow past everyone's expectations (even your own). Your action ticks <b>5 segments</b> on any relevant clocks, and you may give someone else present <strong class='emph-blue'>1 XP</strong>.</p>"
            },
            {
                name: "Inspired Heroism",
                bond: "fool",
                frequency: 1,
                description: "<p class='power-description'>Once a session, when you succeed on a <strong class='emph-heroic'>Heroic</strong> skill check, all allies present gain <strong class='emph-blue'>1 XP</strong> and <strong class='emph-green'>clear 1 Stress</strong>.</p>"
            },
            {
                name: "All-In",
                bond: "fool",
                description: "<p class='power-description'>When you push yourself to help another character on a <strong class='emph-risky'>Risky</strong> or <strong class='emph-heroic'>Heroic</strong> skill check, it costs you no <b>Stress</b>. You still share in any consequences by helping.</p>"
            },
            {
                name: "Heart of Hearts",
                bond: "fool",
                frequency: 1,
                description: "<p class='power-description'>When you and your group are in a tough spot, you can flash back to a scene from your past or hometown and describe how your memory of that time inspires you in the current moment. You can treat your next roll as though you rolled an unmodified <b>20</b>. You can only ever use this ability three times; after that, replace it with a new power from this bond.</p>"
            },
            {
                name: "Stroke of Luck",
                bond: "fool",
                description: "<p class='power-description'>When you fail a skill check and take <b>Stress</b>, put yourself into danger, or seriously mess up, tell the GM you stumble onto something lucky of their choice a way forward, an opportunity, or a lucky break. You or another character gain <b>+1 Accuracy</b> on the next check acting on this stroke of luck.</p>"
            },
            {
                name: "Learn by Example",
                bond: "fool",
                frequency: 2,
                description: "<p class='power-description'>At the start of any session, choose another character to be your mentor (whether they are willing or unwilling is up to them). Twice in that session, you may ask them for advice before making a skill check. If you follow their advice, gain <b>+1 Accuracy</b> on that check. If they spurn your request or give you obviously harmful advice, take <b>+1 Accuracy</b> on a check for actions that ignore them.</p>"
            },
            {
                name: "The World",
                bond: "fool",
                frequency: 1,
                prerequisite: "You may only gain this power If you've taken four powers from this bond, including the <b>Veteran Power</b>.",
                description: "<p class='power-description'>For the rest of the scene, treat any final result of <b>9 or lower</b> on one of your skill checks as <b>10+</b>. This means you cannot fail skill checks (you might still take consequences for rolling a <b>10-19</b> on <strong class='emph-risky'>Risky</strong> or <strong class='emph-heroic'>Heroic</strong> checks).</p>",
                master: true
            }
        ],
        broker: [
            {
                name: "Cosmocephalos",
                bond: "broker",
                frequency: 2,
                description: "<p class='power-description'>When someone else makes a skill check, give them <b>+1 Accuracy</b> by telling the GM how you planned, prepared, or accounted for this situation.</p>"
            },
            {
                name: "Perfect Little Universe",
                bond: "broker",
                description: "<p class='power-description'>Each downtime, you or another PC gain an extra downtime action.</p>"
            },
            {
                name: "Little Consequence",
                bond: "broker",
                frequency: 1,
                description: "<p class='power-description'>When you would take blame, personal fallout, or physical harm as a result of your actions, you have may another willing character nearby take the consequences instead of you after you learn what they are. If they do, they take <strong class='emph-blue'>1 XP</strong>.</p>"
            },
            {
                name: "The Ledger",
                bond: "broker",
                description: "<p class='power-description'>Any time, you may ask any character what they want from you right now (service, time, attention, apologies, aid, information, a favor). If you give it to them as described, you can write their name in your ledger. Once their name is in there, you can invoke the ledger any time. When you invoke someone's name in the ledger, any roll you make against them with a result of <b>9 or lower</b> is treated as a <b>10</b> for the rest of the session, then it loses its power over them.</p>"
            },
            {
                name: "Favors Owed",
                bond: "broker",
                description: "<p class='power-description'>If a nearby character will take consequences from their actions, you can offer to take those consequences instead. If they accept, you get a favor with them. You can cash this favor in any time to force them to help you with any skill check without spending <b>Stress</b> and share in the consequences, or defer to you on a decision. You can only hold one favor from each character at a time.</p>"
            },
            {
                name: "Contingency Plans",
                bond: "broker",
                frequency: 2,
                description: "<p class='power-description'>When you or someone else takes consequences as a result of their actions, you can reduce their severity by describing how you intervene, manipulate, or otherwise change the outcome. This cannot eliminate the consequences entirely, just reduce them. Any <b>Stress</b> suffered is reduced by <b>1</b>.</p>"
            },
            {
                name: "Beg, Borrow, or Steal",
                bond: "broker",
                frequency: 1,
                description: "<p class='power-description'>When you need the right tool for the job (a disguise, a power tool, a weapon, loose currency, identity papers) you can choose to have it right now. The tool gives you <b>+1 Accuracy</b> and <b>increased effect</b> on actions but it was stolen or “borrowed” from someone, and they will track you down by next downtime. The tool stops working at the end of the session or if you use this ability again to get a new tool.</p>"
            },
            {
                name: "Immaculate",
                bond: "broker",
                description: "<p class='power-description'>You are always the best dressed in any given situation. You are never unprepared for any situation involving clothing and have access to all manner of uniforms, disguises, costumes, formalwear, and so on. In situations where this helps, gain <b>+1 Accuracy</b> and <b>increased effect</b>.</p>"
            },
            {
                name: "Spider",
                bond: "broker",
                frequency: 1,
                description: "<p class='power-description'>When you need something done without involving yourself or your group, you can call one of your many contacts. Pick up to three of the following words to describe how they get it done for you: <b>quiet, clean, quick</b>. For each word you pick, the GM chooses one thing you will need to get your contact, or else owe them after the job is done:</p><ul class='power-description'><li>collateral</li><li>proof, payment, or assurances</li><li>extraction</li></ul><p class='power-description'>For each word you don't pick, they don't do it that way at all; however, they will always get the job done. The scale of what they need is concurrent with the scale of the request you make of them, which might make the request impossible unless you rephrase it.</p>"
            },
            {
                name: "Seal in Blood",
                bond: "broker",
                frequency: 1,
                prerequisite: "You may only gain this power if you've taken four or more powers from this bond, including the <b>Veteran Power</b>.",
                description: "<p class='power-description'>When you make a deal with a willing person, name the terms of the deal (parties, duration, and services rendered), then shake hands. If you do, any person (including you) that breaks the deal suffers a baleful curse. They rapidly become deathly ill. If they're an NPC, they are too sick to do anything for the duration of one mission and are essentially helpless. If they are a PC, they gain a “deathly ill” burden.</p><p class='power-description'>If the deal is broken by one party, the other suffers no consequences and the seal is lifted, ending this effect. Otherwise the seal lasts indefinitely or until the terms of the deal are fulfilled.</p>",
                master: true
            }
        ]
    },
    bondPowersMap: {
        AbsoluteMeat: "titan",
        AllIn: "fool",
        BegBorroworSteal: "broker",
        BeginnersLuck: "pathfinder",
        Bilingual: "builder",
        Blackblood: "magus",
        BloodScent: "wolf",
        Comfort: "builder",
        ContingencyPlans: "broker",
        Cornered: "wolf",
        Cosmocephalos: "broker",
        Dabbler: "pathfinder",
        Discipline: "wolf",
        DontTellMetheOdds: "wolf",
        Exuent: "harlequin",
        EyesoftheVoid: "magus",
        FastFriends: "harlequin",
        FavorsOwed: "broker",
        FeeltheAir: "pathfinder",
        FeetUp: "pathfinder",
        ForceofWill: "titan",
        Freesoul: "pathfinder",
        GallowsHumor: "harlequin",
        Geist: "magus",
        GoforaWalk: "wolf",
        HalfLight: "titan",
        Hammerhand: "titan",
        HeartofHearts: "fool",
        Heartsight: "magus",
        Immaculate: "broker",
        Inspiration: "builder",
        InspiredHeroism: "fool",
        Instinctive: "magus",
        Ironjaw: "titan",
        ItsNothing: "wolf",
        JoyluckWindThrower: "fool",
        LayBurdens: "pathfinder",
        LearnbyExample: "fool",
        Lightspeed: "pathfinder",
        LittleConsequence: "broker",
        LongRoadHome: "pathfinder",
        Masquerade: "harlequin",
        Mender: "builder",
        Mercurial: "harlequin",
        Metalbloom: "builder",
        Mockingbird: "harlequin",
        Momentum: "pathfinder",
        Nerve: "titan",
        NothingtoFuckWith: "titan",
        PerfectLittleUniverse: "broker",
        PiercetheGate: "magus",
        PlundertheVoid: "magus",
        Possession: "magus",
        Pounce: "wolf",
        PunchingBag: "fool",
        Quickfingers: "harlequin",
        Renaissance: "pathfinder",
        Rescue: "fool",
        RidiPagliacci: "harlequin",
        Rigger: "builder",
        Saddleborn: "pathfinder",
        Sanctuary: "builder",
        Scarcoat: "wolf",
        SealinBlood: "broker",
        SecretHistory: "builder",
        Silvertongue: "harlequin",
        Skincrawl: "magus",
        Slip: "harlequin",
        SpectacularFlourish: "harlequin",
        Spider: "broker",
        StrengthBeyondStrength: "titan",
        StrokeofLuck: "fool",
        TearThroat: "wolf",
        TheClockmaker: "builder",
        TheLedger: "broker",
        TheMoon: "fool",
        TheSun: "fool",
        TheWall: "titan",
        TheWorld: "fool",
        TotheBrink: "magus",
        TrueGrit: "titan",
        Ultimatum: "wolf",
        Unbreakable: "titan",
        Untangle: "builder",
        Unveil: "magus",
        WebofCreation: "builder",
        Wick: "wolf"
    },
    bondBoons: {
        harlequin: {
            name: "Boon of Chaos",
            bond: "harlequin",
            prerequisite: "If you have two or more powers from this bond, you can choose a power from any other bond instead of one from this bond when you would gain a power. You can do this twice. If you have at least one <b>Veteran Power</b>, gain <b><em>the Boon of Chaos</em></b>.",
            description: "<span class='bond-ideal bond-boon'>At the end of the session, if there was a particularly funny or chaotic moment or scene, describe it. Give someone who was part of the fun or chaos <strong class='emph-blue'>1 XP</strong>.</span>",
            boon: true
        },
        titan: {
            name: "Boon of Iron",
            bond: "titan",
            prerequisite: "If you have two or more powers from this bond, you can choose a power from any other bond instead of one from this bond when you would gain a power. You can do this twice. If you have at least one <b>Veteran Power</b>, gain <b><em>the Boon of Iron</em></b>.",
            description: "<span class='bond-ideal bond-boon'>At the end of the session, if anyone (yourself included) performed an extraordinary or inspiring feat of athleticism, acrobatics, or physical force, describe it. Give someone who witnessed or participated in it <strong class='emph-blue'>1 XP</strong>.</span>",
            boon: true
        },
        pathfinder: {
            name: "Boon of the Traveler",
            bond: "pathfinder",
            prerequisite: "If you have two or more powers from this bond, you can choose a power from any other bond instead of one from this bond when you would gain a power. You can do this twice. If you have at least one <b>Veteran Power</b>, gain <b><em>the Boon of the Traveler</em></b>.",
            description: "<span class='bond-ideal bond-boon'>At the end of each session, if you were inspired by the sights, smells, sounds, or sensations of a particular place, describe them. Give someone you shared them with <strong class='emph-blue'>1 XP</strong>.</span>",
            boon: true
        },
        builder: {
            name: "Boon of the Forge",
            bond: "builder",
            prerequisite: "If you have two or more powers from this bond, you can choose a power from any other bond instead of one from this bond when you would gain a power. You can do this twice. If you have at least one <b>Veteran Power</b>, gain <b><em>the Boon of the Forge</em></b>.",
            description: "<span class='bond-ideal bond-boon'>At the end of each session, if you completed a project, show it off to everyone. Give someone who admires it <strong class='emph-blue'>1 XP</strong>.</span>",
            boon: true
        },
        magus: {
            name: "Boon of Revelation",
            bond: "magus",
            prerequisite: "If you have two or more powers from this bond, you can choose a power from any other bond instead of one from this bond when you would gain a power. You can do this twice. If you have at least one <b>Veteran Power</b>, gain <b><em>the Boon of Revelation</em></b>.",
            description: "<span class='bond-ideal bond-boon'>At the end of the session, if you found a scene troubling, exciting, or terrifying, describe why. Give someone who felt similarly <strong class='emph-blue'>1 XP</strong>.</span>",
            boon: true
        },
        wolf: {
            name: "Boon of the Fang",
            bond: "wolf",
            prerequisite: "If you have two or more powers from this bond, you can choose a power from any other bond instead of one from this bond when you would gain a power. You can do this twice. If you have at least one <b>Veteran Power</b>, gain <b><em>the Boon of the Fang</em></b>.",
            description: "<span class='bond-ideal bond-boon'>At the end of the session, if you think the party fought their way out of a bad situation, describe it, and give someone who you thought fought as hard as you <strong class='emph-blue'>1 XP</strong>.</span>",
            boon: true
        },
        fool: {
            name: "Boon of the Star",
            bond: "fool",
            prerequisite: "If you have two or more powers from this bond, you can choose a power from any other bond instead of one from this bond when you would gain a power. You can do this twice. If you have at least one <b>Veteran Power</b>, gain <b><em>the Boon of the Star</em></b>.",
            description: "<span class='bond-ideal bond-boon'>If you or anyone else succeeded on at least one Heroic skill check, describe what happened. Give someone else who witnessed it <strong class='emph-blue'>1 XP</strong>.</span>",
            boon: true
        },
        broker: {
            name: "Boon of Order",
            bond: "broker",
            prerequisite: "If you have two or more powers from this bond, you can choose a power from any other bond instead of one from this bond when you would gain a power. You can do this twice. If you have at least one <b>Veteran Power</b>, gain <b><em>the Boon of Order</em></b>.",
            description: "<span class='bond-ideal bond-boon'>At the end of each session, if you can describe how everything went to plan, do so. Give someone you think followed the plan <strong class='emph-blue'>1 XP</strong>.</span>",
            boon: true
        }
    },
    bondMajorIdeals: {
        harlequin: getMajorIdeals("cunning, subterfuge, or deceit"),
        titan: getMajorIdeals("strength, leadership, or force"),
        pathfinder: getMajorIdeals("curiosity, exploration, or understanding"),
        builder: getMajorIdeals("diplomacy, creativity, or empathy"),
        magus: getMajorIdeals("passion, faith, or intuition"),
        wolf: getMajorIdeals("precision, coldness, or intimidation"),
        fool: getMajorIdeals("perseverance, learning, or sheer dumb luck"),
        broker: getMajorIdeals("manipulation, influence, or elegance")
    },
    bondMinorIdeals: {
        harlequin: ["I struggled against or humiliated the powerful.", "I pretended to be someone else for a time.", "I charmed my way out of a charged situation.", "I obtained a guarded, hidden, or secret object or piece of information."],
        titan: ["I protected someone weaker than myself.", "I led from the front.", "I won a competition, friendly or otherwise.", "I took harm, blame, penance, or burden for someone else."],
        pathfinder: ["I smelled, heard, or tasted something new.", "I learned a new skill or trade, or gained a new level of mastery in one I already knew.", "I met and conversed with an expert.", "I beheld a unique, interesting, or beautiful sight."],
        builder: ["I made a new friend or ally.", "I defused a potentially violent or charged situation.", "I helped to soothe or heal someone's pain.", "I created a new object, organization, or alliance, or mended one that was broken."],
        magus: ["I witnessed something terrifying, mind-bending, or glorious.", "I acted on my first impulse.", "I questioned my own senses, beliefs, or sense of self.", "My stated intuition or gut feeling about something turned out to be right."],
        wolf: ["I showed someone how it's done.", "I revealed an ugly truth about the world.", "My pain or weakness became apparent despite my efforts to hide it.", "I got someone to back down or back off."],
        fool: ["Someone else helped me out of a bad situation.", "I learned from my own vulnerability or weakness.", "I threw myself into a situation without planning or preparation.", "Someone taught me something useful, comforting, or painful."],
        broker: ["I kept my hands clean of the dirty work.", "I proved that I was the most qualified to handle a situation.", "Someone found me attractive, intriguing, or frightening.", "Despite my best efforts, we went wildly off the plan."]
    },
    bondQuestions: {
        harlequin: getBondQuestions("WHAT WEIRD QUIRKS DO YOU HAVE?"),
        titan: getBondQuestions("WHAT WEAPONS DO YOU WIELD?"),
        pathfinder: getBondQuestions("WHERE HAVE YOU TRAVELED IN YOUR DREAMS?"),
        builder: getBondQuestions("WHAT DO YOU SPEAK WITH?"),
        magus: getBondQuestions("WHAT ARE YOUR NIGHTMARES ABOUT?"),
        wolf: getBondQuestions("WHAT MUST YOU KEEP HIDDEN AT ALL COSTS?"),
        fool: getBondQuestions("WHO'S ROOTING FOR YOU BACK HOME?"),
        broker: getBondQuestions("WHAT DO YOU VALUE?")
    },
    clockColors: ["#c21f26", "#2175c2", "#22c25e", "#7522c2", "#c2a122"],
    get randomColor() {
        return this.clockColors[Math.floor(Math.random() * this.clockColors.length)];
    },
    barBrawlConfigs: {
        none: {},
        Kuenaimaku: {
            hp: {
                id: "hp",
                ignoreMin: true,
                ignoreMax: false,
                mincolor: "#FF0000",
                maxcolor: "#80FF00",
                position: "bottom-inner",
                attribute: "derived.hp",
                visibility: 50,
                indentLeft: 30,
                indentRight: null,
                shareHeight: true,
                otherVisibility: 30,
                ownerVisibility: -1,
                gmVisibility: -1,
                style: "fraction",
                label: "",
                invert: false,
                subdivisions: null,
                subdivisionsOwner: false,
                fgImage: "",
                bgImage: "",
                opacity: null,
                order: 0,
                max: null
            },
            structure: {
                id: "structure",
                attribute: "derived.structure",
                mincolor: "#1F9EFF",
                maxcolor: "#1F9EFF",
                position: "bottom-inner",
                visibility: 50,
                indentLeft: null,
                indentRight: 70,
                shareHeight: true,
                subdivisions: 4,
                subdivisionsOwner: true,
                order: 1,
                otherVisibility: 30,
                ownerVisibility: -1
            },
            stress: {
                id: "stress",
                mincolor: "#FF7B00",
                maxcolor: "#FF7B00",
                position: "bottom-outer",
                attribute: "derived.stress",
                visibility: 50,
                indentLeft: null,
                indentRight: 70,
                shareHeight: true,
                subdivisions: 4,
                subdivisionsOwner: true,
                order: 2,
                otherVisibility: 30,
                ownerVisibility: -1
            },
            heat: {
                id: "heat",
                ignoreMax: true,
                ignoreMin: false,
                mincolor: "#700000",
                maxcolor: "#ff0000",
                position: "bottom-outer",
                attribute: "derived.heat",
                visibility: 50,
                indentLeft: 30,
                indentRight: 0,
                shareHeight: true,
                otherVisibility: 30,
                ownerVisibility: -1,
                gmVisibility: -1,
                style: "fraction",
                label: "",
                invert: false,
                subdivisions: null,
                subdivisionsOwner: false,
                fgImage: "",
                bgImage: "",
                opacity: null,
                order: 3,
                max: null
            },
            burn: {
                id: "burn",
                mincolor: "#992222",
                maxcolor: "#992222",
                position: "top-outer",
                attribute: "burn",
                visibility: 50,
                order: 4,
                max: null,
                otherVisibility: 50,
                ownerVisibility: -1
            },
            overshield: {
                id: "overshield",
                mincolor: "#222299",
                maxcolor: "#222299",
                position: "top-outer",
                attribute: "overshield",
                visibility: 50,
                order: 5,
                max: null,
                otherVisibility: 50,
                ownerVisibility: -1
            }
        },
        Bolts: {
            bar1: {
                id: "bar1",
                ignoreMin: true,
                ignoreMax: false,
                mincolor: "#FF0000",
                maxcolor: "#80FF00",
                position: "bottom-inner",
                attribute: "derived.hp",
                visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS
            },
            bar2: {
                id: "bar2",
                ignoreMax: true,
                ignoreMin: false,
                mincolor: "#700000",
                maxcolor: "#ff0000",
                position: "bottom-inner",
                attribute: "derived.heat",
                visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS
            },
            burn: {
                id: "burn",
                mincolor: "#992222",
                maxcolor: "#992222",
                position: "top-outer",
                attribute: "burn",
                visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS
            },
            overshield: {
                id: "overshield",
                mincolor: "#222299",
                maxcolor: "#222299",
                position: "top-outer",
                attribute: "overshield",
                visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS
            }
        },
        Valkyrion: {
            bar1: {
                id: "bar1",
                ignoreMin: true,
                ignoreMax: false,
                mincolor: "#FF0000",
                maxcolor: "#80FF00",
                position: "bottom-inner",
                attribute: "derived.hp",
                visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                indentLeft: 30,
                indentRight: null,
                shareHeight: true
            },
            structure: {
                id: "structure",
                attribute: "derived.structure",
                mincolor: "#1F9EFF",
                maxcolor: "#1F9EFF",
                position: "bottom-inner",
                visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                indentLeft: null,
                indentRight: 70,
                shareHeight: true,
                subdivisions: 4,
                subdivisionsMatchesMax: true,
                subdivisionsOwner: true
            },
            stress: {
                id: "stress",
                mincolor: "#FF7B00",
                maxcolor: "#FF7B00",
                position: "bottom-outer",
                attribute: "derived.stress",
                visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                indentLeft: null,
                indentRight: 70,
                shareHeight: true,
                subdivisions: 4,
                subdivisionsMatchesMax: true,
                subdivisionsOwner: true
            },
            bar2: {
                id: "bar2",
                ignoreMax: true,
                ignoreMin: false,
                mincolor: "#700000",
                maxcolor: "#ff0000",
                position: "bottom-outer",
                attribute: "derived.heat",
                visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                indentLeft: 30,
                indentRight: 0,
                shareHeight: true
            },
            burn: {
                id: "burn",
                mincolor: "#992222",
                maxcolor: "#992222",
                position: "top-outer",
                attribute: "burn",
                visibility: CONST.TOKEN_DISPLAY_MODES.OWNER
            },
            overshield: {
                id: "overshield",
                mincolor: "#222299",
                maxcolor: "#222299",
                position: "top-outer",
                attribute: "overshield",
                visibility: CONST.TOKEN_DISPLAY_MODES.OWNER
            }
        },
        dodgepong: {
            mech: {
                bar1: {
                    id: "bar1",
                    ignoreMin: true,
                    ignoreMax: false,
                    mincolor: "#FF0000",
                    maxcolor: "#80FF00",
                    position: "bottom-inner",
                    attribute: "derived.hp",
                    visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    indentLeft: 30,
                    indentRight: null,
                    shareHeight: true,
                    label: "HP",
                    style: "fraction"
                },
                structure: {
                    id: "structure",
                    attribute: "derived.structure",
                    mincolor: "#1F9EFF",
                    maxcolor: "#1F9EFF",
                    position: "bottom-inner",
                    visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    indentLeft: null,
                    indentRight: 70,
                    shareHeight: true,
                    subdivisions: 4,
                    subdivisionsMatchesMax: true,
                    subdivisionsOwner: true,
                    hideFull: true
                },
                stress: {
                    id: "stress",
                    mincolor: "#FF7B00",
                    maxcolor: "#FF7B00",
                    position: "bottom-outer",
                    attribute: "derived.stress",
                    visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    indentLeft: null,
                    indentRight: 70,
                    shareHeight: true,
                    subdivisions: 4,
                    subdivisionsMatchesMax: true,
                    subdivisionsOwner: true,
                    hideFull: true
                },
                bar2: {
                    id: "bar2",
                    ignoreMax: true,
                    ignoreMin: false,
                    mincolor: "#700000",
                    maxcolor: "#ff0000",
                    position: "bottom-outer",
                    attribute: "derived.heat",
                    visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    indentLeft: 30,
                    indentRight: 0,
                    shareHeight: true,
                    label: "Heat",
                    style: "fraction"
                },
                burn: {
                    id: "burn",
                    mincolor: "#992222",
                    maxcolor: "#992222",
                    position: "top-outer",
                    attribute: "burn",
                    visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    subdivisions: 5,
                    subdivisionsMatchesMax: true,
                    subdivisionsOwner: true,
                    hideEmpty: true
                },
                overshield: {
                    id: "overshield",
                    mincolor: "#222299",
                    maxcolor: "#222299",
                    position: "top-outer",
                    attribute: "overshield",
                    visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    subdivisions: 5,
                    subdivisionsMatchesMax: true,
                    subdivisionsOwner: true,
                    hideEmpty: true
                }
            },
            npc: {
                bar1: {
                    id: "bar1",
                    ignoreMin: true,
                    ignoreMax: false,
                    mincolor: "#FF0000",
                    maxcolor: "#80FF00",
                    position: "bottom-inner",
                    attribute: "derived.hp",
                    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    indentLeft: 30,
                    indentRight: null,
                    shareHeight: true,
                    label: "HP",
                    style: "fraction"
                },
                structure: {
                    id: "structure",
                    attribute: "derived.structure",
                    mincolor: "#1F9EFF",
                    maxcolor: "#1F9EFF",
                    position: "bottom-inner",
                    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    indentLeft: null,
                    indentRight: 70,
                    shareHeight: true,
                    subdivisions: 4,
                    subdivisionsMatchesMax: true,
                    subdivisionsOwner: true
                },
                stress: {
                    id: "stress",
                    mincolor: "#FF7B00",
                    maxcolor: "#FF7B00",
                    position: "bottom-outer",
                    attribute: "derived.stress",
                    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    indentLeft: null,
                    indentRight: 70,
                    shareHeight: true,
                    subdivisions: 4,
                    subdivisionsMatchesMax: true,
                    subdivisionsOwner: true
                },
                bar2: {
                    id: "bar2",
                    ignoreMax: true,
                    ignoreMin: false,
                    mincolor: "#700000",
                    maxcolor: "#ff0000",
                    position: "bottom-outer",
                    attribute: "derived.heat",
                    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    indentLeft: 30,
                    indentRight: 0,
                    shareHeight: true,
                    label: "Heat",
                    style: "fraction"
                },
                burn: {
                    id: "burn",
                    mincolor: "#992222",
                    maxcolor: "#992222",
                    position: "top-outer",
                    attribute: "burn",
                    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.OWNER
                },
                overshield: {
                    id: "overshield",
                    mincolor: "#222299",
                    maxcolor: "#222299",
                    position: "top-outer",
                    attribute: "overshield",
                    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.OWNER
                }
            },
            pilot: {
                bar1: {
                    id: "bar1",
                    ignoreMin: true,
                    ignoreMax: false,
                    mincolor: "#FF0000",
                    maxcolor: "#80FF00",
                    position: "bottom-inner",
                    attribute: "derived.hp",
                    visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    indentLeft: null,
                    indentRight: null,
                    shareHeight: true,
                    label: "HP",
                    style: "fraction"
                },
                overshield: {
                    id: "overshield",
                    mincolor: "#222299",
                    maxcolor: "#222299",
                    position: "top-outer",
                    attribute: "overshield",
                    visibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.ALWAYS
                }
            },
            deployable: {
                bar1: {
                    id: "bar1",
                    ignoreMin: true,
                    ignoreMax: false,
                    mincolor: "#FF0000",
                    maxcolor: "#80FF00",
                    position: "bottom-inner",
                    attribute: "derived.hp",
                    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    indentLeft: null,
                    indentRight: null,
                    shareHeight: true,
                    label: "HP",
                    style: "fraction"
                },
                bar2: {
                    id: "bar2",
                    ignoreMax: true,
                    ignoreMin: false,
                    mincolor: "#700000",
                    maxcolor: "#ff0000",
                    position: "bottom-outer",
                    attribute: "derived.heat",
                    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    indentLeft: null,
                    indentRight: null,
                    shareHeight: true,
                    label: "Heat",
                    style: "fraction"
                },
                burn: {
                    id: "burn",
                    mincolor: "#992222",
                    maxcolor: "#992222",
                    position: "top-outer",
                    attribute: "burn",
                    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.OWNER
                },
                overshield: {
                    id: "overshield",
                    mincolor: "#222299",
                    maxcolor: "#222299",
                    position: "top-outer",
                    attribute: "overshield",
                    visibility: CONST.TOKEN_DISPLAY_MODES.OWNER,
                    otherVisibility: CONST.TOKEN_DISPLAY_MODES.OWNER
                }
            }
        }
    }
};
export default C;
