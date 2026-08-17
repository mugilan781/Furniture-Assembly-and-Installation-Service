/* =========================================================
   ASSEMBLIO — Blog Post Data
   Single source of truth for blog-details.html (?id=N)
   ========================================================= */

'use strict';

const BLOG_AUTHORS = {
  thomas: {
    name: 'Thomas Reid',
    role: 'Founder & Lead Installer',
    avatar: 'T',
    bio: 'Thomas is the founder of ASSEMBLIO and has been in the furniture installation industry since 2012. A trained carpenter with an eye for architectural detail, he leads our team and writes in-depth guides to help homeowners get the most out of their spaces.',
    short: '12 years in the furniture installation industry. Trained carpenter, kitchen fitting specialist, and author of 24 guides.'
  },
  marcus: {
    name: 'Marcus Williams',
    role: 'Senior Installation Specialist',
    avatar: 'M',
    bio: 'Marcus is our electrical integration engineer and TV wall mounting expert. Specialist in concealed cable routing, plasterboard anchors, and smart home AV setups, he writes about everything wall-mounted.',
    short: '8 years in the field. TV wall mounting, cable concealment and smart home AV specialist across London.'
  },
  layla: {
    name: 'Layla Hassan',
    role: 'Kitchen Fitting Lead',
    avatar: 'L',
    bio: 'Layla leads our kitchen and bespoke division. Trained in modular kitchen systems and worktop fabrication, she plans every project down to the millimetre before a single cabinet is lifted.',
    short: '10 years of kitchen fitting experience. Modular systems, worktop scribing and appliance integration specialist.'
  }
};

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Complete Guide to Furniture Assembly: What Professionals Know That You Don\'t',
    category: 'Assembly Guide',
    image: 'images/blog-hero.jpg',
    author: 'thomas',
    date: 'August 15, 2026',
    readTime: '12 min read',
    views: '2,847 views',
    description: 'The Complete Guide to Furniture Assembly — Expert tips from ASSEMBLIO on flat-pack systems, tools, and professional techniques.',
    tags: ['Assembly', 'Flat-Pack', 'Professional Tips'],
    topics: ['Assembly', 'Flat-Pack', 'IKEA', 'Professional Tips', 'DIY vs Pro'],
    related: [4, 3, 7],
    content: `
      <p><strong>Every year, thousands of homeowners attempt to assemble their own furniture</strong> — and thousands of those end up with wonky wardrobes, stripped cam bolts, or worse, unstable beds that collapse weeks later. As professional installers with over a decade of experience, we've seen it all. This guide shares the knowledge that separates a professional from a well-meaning DIYer.</p>

      <h2>Understanding Flat-Pack Assembly Systems</h2>
      <p>Modern flat-pack furniture uses several distinct fastening systems. Understanding which system your furniture uses before you start is the single most important thing you can do.</p>
      <ul>
        <li><strong>Cam and dowel system</strong> — Used by IKEA and most major retailers. Requires precise hole alignment and careful torque on the cam bolt.</li>
        <li><strong>Confirmat screw system</strong> — Common in German-manufactured furniture. Requires a specific drill bit and screwdriver tip.</li>
        <li><strong>Sleeve nut and bolt</strong> — Often used for beds and heavier frames. These can strip easily if overtightened.</li>
        <li><strong>Click-fit systems</strong> — Modern systems with pre-installed connectors. Appear simple but require exact panel alignment before engagement.</li>
      </ul>

      <blockquote>"The number one mistake people make is rushing the early stages. Read the instructions once before touching any part. Then read them again."</blockquote>

      <h2>The Pre-Assembly Checklist</h2>
      <p>Before you tighten a single bolt, our team always runs through this checklist:</p>
      <ol style="list-style:decimal;">
        <li>Lay out all panels on a clean, padded surface to avoid scratches</li>
        <li>Sort and count all hardware — compare against the parts list</li>
        <li>Identify all cam bolts, dowels, and screws before starting</li>
        <li>Check panel orientation — most panels have a 'correct' face direction</li>
        <li>Pre-assemble all cam bolts in their channels before joining panels</li>
      </ol>

      <h2>Common Mistakes That Cost Money</h2>
      <p>After 10,000+ assemblies, here are the mistakes we see most frequently:</p>

      <h3>1. Over-tightening cam bolts</h3>
      <p>Cam bolts should be turned to approximately 135 degrees — usually about a half-turn from where they catch. Over-tightening strips the cam housing in the panel, creating irreparable damage to the furniture. We use a torque-limited screwdriver for this exact reason.</p>

      <h3>2. Assembling on carpet</h3>
      <p>Carpet creates an uneven assembly surface, meaning your furniture is built out of square from the start. Always assemble on a hard floor, or use plywood boards to create a flat reference surface.</p>

      <h3>3. Skipping the square check</h3>
      <p>Every carcass must be checked for square before tightening fully. Use a large set square or measure diagonals — they should be equal. A wardrobe assembled 5mm out of square will never hang a door correctly.</p>

      <blockquote>"Level isn't the same as square. A piece can be perfectly level and still be twisted. We always check both."</blockquote>

      <h2>When to Call a Professional</h2>
      <p>Some assemblies should always be handled by professionals:</p>
      <ul>
        <li>Any furniture over 200kg, including solid wood wardrobes and bed frames</li>
        <li>Wall-mounted items that require weight-bearing fixing into masonry or stud walls</li>
        <li>Modular kitchen units where alignment affects doors and worktops</li>
        <li>Furniture in rental properties where damage liability is a concern</li>
      </ul>
      <p>The cost of professional assembly is almost always far less than the cost of repairing damaged furniture or a wall.</p>
    `
  },
  {
    id: 2,
    title: 'How to Plan Your Furniture Layout Before Assembly Day',
    category: 'Interior Design',
    image: 'images/blog1.jpg',
    author: 'layla',
    date: 'August 10, 2026',
    readTime: '5 min read',
    views: '1,204 views',
    description: 'Save time and avoid costly mistakes with these expert pre-assembly planning techniques from ASSEMBLIO.',
    tags: ['Planning', 'Layout', 'Interior Design'],
    topics: ['Planning', 'Layout', 'Interior Design', 'Space Planning', 'Storage'],
    related: [7, 6, 5],
    content: `
      <p><strong>Planning is free. Rework costs money.</strong> In our experience, the difference between a smooth assembly day and a frustrating one is decided days before the flat-pack boxes arrive. A little forethought about layout saves time, protects your walls, and — most importantly — keeps the finished room looking intentional.</p>

      <h2>Measure the Room, Twice</h2>
      <p>Start with the room, not the furniture. Measure the full dimensions, then note the obstacles: radiators, sockets, door swing arcs, and the clearance you need to open drawers and wardrobe doors. A 60cm wardrobe needs more than 60cm of floor space once doors are open.</p>
      <p>Our rule of thumb is to allow at least 90cm of walking space in front of any storage unit, and to check that every door can swing at least 90 degrees without hitting another piece.</p>

      <h2>Plan the Assembly Route</h2>
      <p>Before assembly day, decide exactly where each piece will be built. Large wardrobes and cabinets should be assembled in the room where they will live — moving a fully assembled wardrobe through a narrow hallway is a two-person job even when it fits. Clear the route early: remove rugs, move fragile items, and protect the floor with boards along the path.</p>

      <blockquote>"A common surprise is the staircase. If a wardrobe won't fit up the stairs, it gets assembled in the bedroom — so the hallway needs to be clear before our van arrives."</blockquote>

      <h2>Check Door and Lift Access</h2>
      <p>Flat-pack boxes are heavy and awkward. Confirm your building has a working lift if you live above the ground floor, and measure the widest door frame on the route. Most wardrobes arrive in boxes around 200cm long — they can usually be tilted through doorways, but planning avoids last-minute gymnastics.</p>

      <h2>Create a Landing Zone</h2>
      <p>Set aside a clear area for boxes, hardware, and tools. A tidy landing zone means parts don't get lost, panels don't get leaned against radiators, and the installer can work at full speed from minute one.</p>

      <h2>The Layout Paper Test</h2>
      <p>Before committing to a floor plan, cut pieces of paper to scale and move them around on a graph of your room. It sounds old-fashioned, but it is the fastest way to test whether a proposed layout works — and it costs nothing.</p>
      <p>When in doubt, our team includes a free layout consultation with every assembly booking. Send us your room measurements and we'll confirm the arrangement before you buy a single unit.</p>
    `
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Choosing a TV Wall Mount',
    category: 'TV Mounting',
    image: 'images/service-tv.jpg',
    author: 'marcus',
    date: 'August 3, 2026',
    readTime: '7 min read',
    views: '1,893 views',
    description: 'Fixed, tilting, or full-motion? Discover which TV wall mount type suits your room and wall from ASSEMBLIO.',
    tags: ['TV Mounting', 'AV', 'Wall Fixings'],
    topics: ['TV Mounting', 'AV', 'Wall Fixings', 'Concealed Cables', 'Home Cinema'],
    related: [1, 7, 5],
    content: `
      <p><strong>Fixed, tilting, or full-motion?</strong> It's the first question every customer asks, and the honest answer is: it depends on your room, your wall, and how you watch television. Here's how we help customers choose — and why the mount itself is rarely the hard part.</p>

      <h2>The Three Mount Types Explained</h2>
      <h3>Fixed mounts</h3>
      <p>The cheapest and lowest-profile option — the TV sits flush against the wall. Choose this when the screen is at eye level from your main seating position and you never need to move it. It's also the safest choice for bedrooms where a heavy screen hangs above the bed.</p>
      <h3>Tilting mounts</h3>
      <p>Adds 5–15 degrees of downward tilt. Ideal for TVs mounted slightly above eye level, such as above a fireplace or in a kitchen. Tilt compensates for the angle and reduces glare from ceiling lights.</p>
      <h3>Full-motion mounts</h3>
      <p>Arms extend, swivel and tilt, pulling the screen away from the wall. Choose this for corner rooms, open-plan spaces where you watch from different zones, or when you need access behind the screen. Just remember: full-motion mounts sit further from the wall and can look bulkier.</p>

      <blockquote>"A full-motion mount is rarely about the TV — it's about the room. If you can see the screen clearly from your seat with a fixed mount, a fixed mount is the right choice."</blockquote>

      <h2>Know Your Wall</h2>
      <p>This is where installation gets serious. On a solid brick or block wall, we use expanding masonry bolts rated for the combined weight of the mount and TV. On plasterboard stud walls, the mount must be fixed through the plasterboard into the timber studs — never into the board alone.</p>
      <ul>
        <li><strong>Brick / block</strong> — masonry anchors with a minimum pull-out rating of 60kg per fixing</li>
        <li><strong>Timber stud</strong> — locate the studs with a density scanner; fix with heavy-duty wood screws</li>
        <li><strong>Metal stud</strong> — use toggle anchors rated for metal stud widths</li>
        <li><strong>Plasterboard alone</strong> — avoid entirely for anything over 10kg</li>
      </ul>

      <h2>VESA Sizes and Weight Ratings</h2>
      <p>Every TV has a VESA pattern — the distance between the four mounting holes on the back, such as 200×200 or 400×400. The mount must support both your VESA pattern and your TV's weight. Never use adaptor plates to bridge mismatched patterns; it weakens the whole assembly.</p>

      <h2>Concealed Cabling Changes Everything</h2>
      <p>Nothing ruins a clean installation like cables trailing down the wall. In-floor power sockets, in-wall conduit, and brush plates make a genuinely flush finish possible. It adds an hour of work, but the result is worth it — and it's one of the most common requests we receive.</p>
      <p>Finally, always keep 5cm of clearance behind the TV for airflow. Overheating is the most common cause of premature panel failure, and it's entirely preventable.</p>
    `
  },
  {
    id: 4,
    title: 'Why Floating Shelves Need Professional Installation',
    category: 'How-To',
    image: 'images/service-shelf.jpg',
    author: 'thomas',
    date: 'July 28, 2026',
    readTime: '4 min read',
    views: '986 views',
    description: 'A badly hung shelf can become a safety hazard. Here is what a professional checks first when installing floating shelves.',
    tags: ['Shelves', 'Fixings', 'Safety'],
    topics: ['Shelves', 'Fixings', 'Safety', 'DIY vs Pro', 'Hollow Wall'],
    related: [1, 3, 6],
    content: `
      <p><strong>A floating shelf looks effortless</strong> — which is exactly why it isn't. The hidden bracket has to carry the full weight of the shelf and everything on it, and the margin for error is zero: a shelf that tilts a few millimetres is visibly wrong, and a shelf that pulls out of the wall is a genuine hazard.</p>

      <h2>What Holds a Floating Shelf Up?</h2>
      <p>Almost every floating shelf uses either two to four steel rods that slide into the shelf, or a wall-mounted bracket that the shelf slides over. In both cases the fixing quality matters more than the shelf itself. A £300 oak shelf hanging from two loose plastic plugs is still a £300 accident waiting to happen.</p>

      <h2>The Wall Is the Whole Job</h2>
      <p>Before any drilling, a professional checks three things: the wall material, the presence of cables and pipes, and the load you intend to put on the shelf.</p>
      <ul>
        <li><strong>Brick and block walls</strong> — masonry anchors drilled into the brick, never the mortar joints</li>
        <li><strong>Stud walls</strong> — the bracket must land on timber studs or use rated cavity fixings</li>
        <li><strong>Plasterboard</strong> — fine for decorative loads up to 8kg with the right hollow-wall anchors</li>
      </ul>
      <p>A cable detector sweep is non-negotiable. Nails and screws in the wrong place can end up inside a live cable — damage that costs hundreds to repair and creates a real safety risk.</p>

      <blockquote>"We carry a stud detector, a cable detector, and a spirit level that's calibrated twice a year. There's no such thing as 'close enough' with a shelf."</blockquote>

      <h2>Level Is Only the Beginning</h2>
      <p>An experienced installer checks level in both directions, ensures the shelf sits flush against the wall (walls are rarely straight), and confirms the bracket engages fully before loading. A shelf that looks level but rocks on its bracket will only get worse with weight.</p>

      <h2>Know Your Load</h2>
      <p>A bookshelf filled with hardbacks can easily exceed 30kg. If you plan to display heavy items, tell your installer — the fixing plan changes completely. It's far cheaper to plan for the load in advance than to re-drill the wall later.</p>
    `
  },
  {
    id: 5,
    title: '10 Things to Check Before Your Kitchen Is Fitted',
    category: 'Kitchen',
    image: 'images/service-kitchen.jpg',
    author: 'layla',
    date: 'July 20, 2026',
    readTime: '6 min read',
    views: '1,541 views',
    description: 'Avoid costly surprises. Our checklist ensures your kitchen fitting goes smoothly from day one.',
    tags: ['Kitchen', 'Fitting', 'Planning'],
    topics: ['Kitchen', 'Fitting', 'Planning', 'Appliances', 'Worktops'],
    related: [7, 2, 1],
    content: `
      <p><strong>A kitchen fitting is a sequence of decisions</strong> — and the ones you make before the cabinets arrive matter most. Over a decade of kitchen installations, we've seen the same small oversights cause big delays. Here are the ten checks we run with every customer before lifting a single cabinet.</p>

      <h2>The Pre-Fit Checklist</h2>
      <ol style="list-style:decimal;">
        <li><strong>Service isolation.</strong> Know where your water stopcock, gas shut-off and electric consumer unit are — and make sure they're accessible.</li>
        <li><strong>Floor level.</strong> A kitchen floor out of level by even 5mm causes visible gaps at the worktop. Check with a long spirit level before cabinets arrive.</li>
        <li><strong>Wall squareness.</strong> Victorian houses are rarely square. Corner cabinets in particular need accurate wall measurements.</li>
        <li><strong>Appliance dimensions.</strong> Confirm the exact cut-out sizes for your dishwasher, hob and extractor — never trust the website copy alone.</li>
        <li><strong>Worktop delivery.</strong> Solid stone tops are templated before fitting. Book templating at least two weeks ahead.</li>
        <li><strong>Plumbing positions.</strong> If pipework must move, it's cheaper to do it before cabinets go in.</li>
        <li><strong>Ventilation.</strong> Extractor ducting routes need to be planned, not improvised.</li>
        <li><strong>Power points.</strong> Behind-cabinet sockets for appliances must be signed off before the backs go on.</li>
        <li><strong>Packaging and waste.</strong> Kitchens generate astonishing amounts of cardboard. Arrange a skip or recycling collection in advance.</li>
        <li><strong>Access.</strong> Confirm cabinets can physically reach the room — width, stairs, and lift access all matter.</li>
      </ol>

      <blockquote>"The most common delay we see isn't a broken cabinet — it's a floor that's out of level. It's a ten-minute check that saves a full day."</blockquote>

      <h2>Worktop Scribing and the 'Millimetre Promise'</h2>
      <p>Every wall bows slightly, which is why a professional worktop fitter scribes the top to the wall rather than relying on measurements. It's the difference between a kitchen that looks designed and one that looks assembled.</p>

      <h2>When the Checklist Becomes a Contract</h2>
      <p>We send every customer this same checklist before their fit, and we're happy to review it with you over a video call. It takes twenty minutes and it's saved hundreds of kitchens from expensive surprises.</p>
    `
  },
  {
    id: 6,
    title: 'Creating a Luxury Home Office on a Budget',
    category: 'Interior Design',
    image: 'images/gallery1.jpg',
    author: 'thomas',
    date: 'July 14, 2026',
    readTime: '8 min read',
    views: '2,013 views',
    description: 'You don\'t need to spend thousands to achieve a high-end home office aesthetic. Here\'s how — from ASSEMBLIO.',
    tags: ['Office', 'Design', 'Budget'],
    topics: ['Office', 'Design', 'Budget', 'Built-ins', 'Lighting'],
    related: [2, 7, 3],
    content: `
      <p><strong>A luxury home office isn't about spending</strong> — it's about planning. The most impressive spaces we install aren't the ones with the most expensive desks; they're the ones where storage is invisible, light is controlled, and every surface has a purpose. Here's how to get that look without the six-figure budget.</p>

      <h2>Start with Built-in Storage</h2>
      <p>Nothing says 'designed' like storage that fits the room exactly. A floor-to-ceiling unit built into an alcove uses space a freestanding cabinet can't, and it hides the visual clutter that makes a room feel cheap. Flat-pack PAX systems installed flush with the wall are a fraction of the cost of bespoke joinery — and with professional installation, they look remarkably close to it.</p>

      <h2>Invest Where It Shows</h2>
      <p>Spend on the surfaces you touch and see constantly: a good chair, task lighting with warm dimming, and a solid desk. Save on everything that can be hidden — cable trays, under-desk drawers and utility shelving can be budget items without anyone noticing.</p>

      <blockquote>"People walk into a £40,000 office and assume the desk is expensive. Usually it's the lighting, the storage and the cables that cost nothing and made everything look expensive."</blockquote>

      <h2>The Three-Light Rule</h2>
      <p>Every high-end space we photograph has at least three light sources: general ceiling light, task light on the desk, and an accent light on a shelf or wall. Layered lighting instantly adds depth — and it's the cheapest upgrade in the room.</p>

      <h2>Hide the Cables, Change the Room</h2>
      <p>Concealed cable routing is the single biggest transformation you can make. We regularly install desks with hidden channels, floor grommets and behind-wall conduit for under £300 of the project budget. It's the difference between a setup and a space.</p>

      <h2>Finish the Details</h2>
      <p>Once storage, light and cables are right, the finishing touches matter: consistent drawer handles, a door that closes softly, and shelf edges aligned to the millimetre. These are the details our installers obsess over — and they're exactly what reads as 'luxury'.</p>
    `
  },
  {
    id: 7,
    title: 'IKEA vs Bespoke: Which Wardrobe System is Right for You?',
    category: 'Assembly Guides',
    image: 'images/gallery3.jpg',
    author: 'thomas',
    date: 'July 7, 2026',
    readTime: '9 min read',
    views: '1,732 views',
    description: 'A thorough comparison of modular flat-pack systems versus custom-built wardrobe solutions from ASSEMBLIO.',
    tags: ['Wardrobes', 'IKEA', 'Bespoke'],
    topics: ['Wardrobes', 'IKEA', 'Bespoke', 'Storage', 'PAX'],
    related: [5, 6, 2],
    content: `
      <p><strong>It's the question we hear most</strong>: should I buy a PAX system from IKEA or commission bespoke joinery? Both can give you a beautiful, organised wardrobe. The difference is in your room, your timeline, and how you plan to use the space over the next ten years.</p>

      <h2>What PAX Does Brilliantly</h2>
      <p>IKEA's PAX system is genuinely excellent for most rooms. The range of internal fittings — drawers, pull-out trouser racks, shoe shelves and lighting — is unmatched at the price. The frame dimensions are standard, which makes planning predictable, and replacement parts are available for decades after purchase.</p>
      <p>Where PAX struggles is against awkward architecture. Alcoves are rarely exactly 100cm wide, ceilings are rarely exactly 236cm high, and that's where a professionally installed system earns its keep: custom end panels, scribed filler strips and adjustable feet take up the slack between the furniture and the real world.</p>

      <h2>What Bespoke Gives You</h2>
      <p>Bespoke joinery wins on three fronts: exact dimensions, material choice, and longevity. A fitted wardrobe can meet a sloped ceiling, wrap around a chimney breast, and use oak or walnut to match the room. It's also built to last — quality joinery outlives its first renovation.</p>

      <blockquote>"The honest answer is that most London homes need a hybrid: a PAX-style modular interior with bespoke front panels. You get the organisation of modular and the finish of joinery."</blockquote>

      <h2>Comparing the Real Numbers</h2>
      <ul>
        <li><strong>PAX with professional installation</strong> — from £750 for a 2m run, fitted to the millimetre</li>
        <li><strong>Bespoke fitted wardrobe</strong> — from £3,500 depending on materials and complexity</li>
        <li><strong>Timeline</strong> — PAX can be fitted within a week; bespoke takes four to eight weeks</li>
        <li><strong>Resale</strong> — both add value, but fully fitted wardrobes are the stronger selling point</li>
      </ul>

      <h2>Making the Decision</h2>
      <p>If you have standard dimensions, a reasonable budget and a timeline — start with PAX and add bespoke touches later. If your room is awkward, your ceiling is sloped, or the wardrobe is the centrepiece of a master bedroom — budget for joinery. And if you're somewhere in between, book a consultation: we install both, and we'll tell you which one suits your room without an agenda.</p>
    `
  }
];

const getPost = (id) => BLOG_POSTS.find(p => p.id === id) || BLOG_POSTS[0];