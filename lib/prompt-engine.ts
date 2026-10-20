// lib/prompt-engine.ts
// SERVER-ONLY: seluruh template prompt ada di sini dan tidak ikut ke bundle browser.
import 'server-only';
import type { GeneratorInput, Storyboard, Scene, Niche, AspectRatio, ViralHook } from '@/types/prompt';
import { viralHooks } from '@/lib/catalog';

const environmentDescriptions: Record<string, string> = {
  'Old Warehouse': 'abandoned old warehouse with dusty wooden floors, broken windows with blue daylight streaming through, rusty metal shelves, cobwebs, and scattered debris. Blue-tinted natural lighting.',
  'Abandoned Garage': 'abandoned garage with concrete floor, oil stains, old tools hanging on walls, dim fluorescent lighting flickering, dusty car parts scattered around.',
  'Attic': 'dusty attic with wooden beams, old trunks, cobwebs, single window with soft daylight, vintage items covered in dust sheets.',
  'Basement': 'dark basement with concrete walls, exposed pipes, single bare bulb, damp floor, old boxes stacked in corners.',
  'Beach': 'sandy beach with gentle waves, driftwood, seashells, golden sunlight, ocean horizon in background.',
  'Forest': 'dense forest with tall trees, moss-covered ground, dappled sunlight through canopy, ferns and mushrooms.',
  'Junkyard': 'rusty junkyard with piles of scrap metal, old tires, broken machinery, overgrown weeds, industrial atmosphere.',
  'Studio': 'professional photography studio with seamless backdrop, softbox lighting, clean minimal environment.',
  'Ancient Ruins': 'ancient stone ruins with moss-covered pillars, crumbling walls, overgrown vines, mystical atmosphere with golden hour lighting.',
  'Open Field': 'vast open field with green grass, distant mountains, clear sky, natural sunlight.',
  'Desk Setup': 'organized desk setup with wooden surface, task lamp, books, small plants, cozy workspace atmosphere.',
  'Luxury Workshop': 'luxury artisan workshop with marble countertops, brass tools, warm lighting, premium materials displayed elegantly.',
  'Mystical Forest': 'mystical dark forest with ancient twisted trees, bioluminescent mushrooms, purple-blue mist, ethereal moonlight filtering through canopy, magical atmosphere.',
};

const storyArcs: Record<Niche, string[]> = {
  restoration: ['DISCOVERY - DIRTY', 'TEARDOWN - DISASSEMBLY', 'PARTS CLEANING', 'REASSEMBLY', 'DETAILING & POLISH', 'FINAL REVEAL'],
  treasure: ['THE SEARCH', 'CLUE FOUND', 'EXCAVATION', 'BREAKING THROUGH', 'TREASURE SPOTTED', 'TREASURE REVEAL'],
  construction: ['LAND SURVEY', 'FOUNDATION', 'STRUCTURE BUILD', 'ROOFING', 'INTERIOR', 'GRAND OPENING'],
  'mini-world': ['LANDSCAPE SETUP', 'TINY FOUNDATION', 'WALLS BUILD', 'ROOF ADD', 'DETAILING', 'MINIATURE MASTERPIECE'],
  luxury: ['RAW MATERIALS', 'CUTTING', 'SHAPING', 'ASSEMBLY', 'POLISHING', 'LUXURY SHOWCASE'],
  evolution: ['PRIMITIVE STATE', 'EARLY FORM', 'MID EVOLUTION', 'ADVANCED FORM', 'NEAR FINAL', 'FINAL EVOLUTION'],
};

const sceneTemplates: Record<Niche, string[]> = {
  restoration: [
    'SCENE 1 - DISCOVERY: {condition} {fullObject} lying untouched and super dirty in {ENV_DESC}, completely assembled but abandoned. {camera} shot, {lighting}, {detail}. Style: {style}. OBJECT LOCK: {fullObject} has distinctive {material} texture with heavy rust/dirt patterns, scratches, fully assembled but dirty, no cleaning yet. Type: {objectType}. {viralHookScene1}',
    'SCENE 2 - TEARDOWN: Same {fullObject} in same {ENV_DESC}. Teardown process begins - unscrewing, disassembling {objectType} into individual parts, screws, wheels, body separated. Precision screwdriver, satisfying disassembly. {camera}, {lighting}. OBJECT LOCK: Same {fullObject} being disassembled into parts, same {material} texture still dirty, {objectType} parts laid out in same {ENV_DESC}. {viralHookScene2}',
    'SCENE 3 - PARTS CLEANING: All separated parts of {fullObject} laid out on workbench in same {ENV_DESC}. Each {material} part being cleaned individually with soapy water, brush, foam, ultrasonic cleaner. Satisfying ASMR cleaning of small parts. {style} visuals, {detail}. OBJECT LOCK: Same parts from same {fullObject}, same {material}, same {objectType} lineage, all parts visible, cleaning in progress. {viralHookScene3}',
    'SCENE 4 - REASSEMBLY: Same cleaned parts of {fullObject} in same {ENV_DESC} being reassembled back together. Precision reassembly, screwing parts, wheels attached, body joined. {camera}, {lighting}. OBJECT LOCK: Same {fullObject} parts from previous scenes, now clean {material}, reassembling into same {objectType} shape. {viralHookScene4}',
    'SCENE 5 - DETAILING & POLISH: Same reassembled {fullObject} in same {ENV_DESC}, now clean but needing final polish. Microfiber cloth, polishing compound, perfect reflections emerging. {camera}, {lighting}, {detail}. OBJECT LOCK: Same {fullObject}, reassembled, {material} shines, {objectType} identical to Scene 1 shape. {viralHookScene5}',
    'SCENE 6 - FINAL REVEAL: Same {fullObject} in same {ENV_DESC}, fully restored and reassembled. Luxury showcase, slow cinematic orbit, pristine condition, like new. {lighting}, {detail}. OBJECT LOCK: Same {fullObject}, {material} like new, {objectType} fully restored, identical shape to Scene 1 but clean. {viralHookScene6}',
  ],
  treasure: [
    'SCENE 1 - SEARCH: Wide shot of {ENV_DESC} with {condition} condition, no treasure visible yet, only empty ground searching for {fullObject}. {camera}, {lighting}. OBJECT LOCK: Hidden {fullObject} will be {objectType} made of {material} with unique ancient markings, but NOT visible in this scene. {viralHookScene1}',
    'SCENE 2 - CLUE: Same {ENV_DESC}. Ancient clue discovered related to {fullObject}, map or symbol on stone wall. {camera}, {detail}. OBJECT LOCK: Same location, {fullObject} still hidden, {material} markings hinted only. {viralHookScene2}',
    'SCENE 3 - EXCAVATION: Digging process begins in same {ENV_DESC} for {fullObject}. Dirt flying, {style} visuals, excavation tools in action. OBJECT LOCK: Same environment, {objectType} not yet visible. {viralHookScene3}',
    'SCENE 4 - BREAKTHROUGH: Breaking through final layer in same {ENV_DESC}. Tension builds. {camera}, dramatic {lighting}. Tiny glimpse of {material} {fullObject} appears under dirt. OBJECT LOCK: Same location, {objectType} glimpse only. {viralHookScene4}',
    'SCENE 5 - SPOTTED: Same {ENV_DESC}. {material} {fullObject} spotted with magical glow emerging from dirt. {detail}. OBJECT LOCK: Same environment, {objectType} half buried, {material} glow. {viralHookScene5}',
    'SCENE 6 - REVEAL: Same {ENV_DESC}. {fullObject} fully revealed and lifted from same location. Epic cinematic reveal. {lighting}, {detail}. OBJECT LOCK: Same environment, {fullObject} {material} markings glow, {objectType} fully visible. {viralHookScene6}',
  ],
  construction: [
    'SCENE 1 - SURVEY: {condition} empty land in {ENV_DESC}, no building yet, only surveying stakes and empty grass for future {fullObject}. Drone shot, {lighting}. OBJECT LOCK: Future {fullObject} will be {objectType} with distinctive {material} features but not visible yet. {viralHookScene1}',
    'SCENE 2 - FOUNDATION: Same {ENV_DESC}. Foundation being laid for {fullObject}, concrete pouring, steel bars, trench only. {camera}, {detail}. OBJECT LOCK: Same location, {objectType} foundation only, {material} base. {viralHookScene2}',
    'SCENE 3 - STRUCTURE: Same {ENV_DESC}. Structure of {fullObject} rising from same foundation, walls being built, {material} walls. Time-lapse, {style}. OBJECT LOCK: Same environment, {objectType} walls only, no roof yet. {viralHookScene3}',
    'SCENE 4 - ROOFING: Same {ENV_DESC}. Roof installation on same {fullObject}, {material} roof, crane lifting. {camera}, {lighting}. OBJECT LOCK: Same location, {objectType} roofing only. {viralHookScene4}',
    'SCENE 5 - INTERIOR: Same {ENV_DESC}. Interior work on same {fullObject}, {material} interior, painting, flooring. {camera}, {detail}. OBJECT LOCK: Same building, {objectType} interior only. {viralHookScene5}',
    'SCENE 6 - OPENING: Same {ENV_DESC}. Grand opening of completed {fullObject}, {material} finish, lights on. Cinematic, {lighting}. OBJECT LOCK: Same location transformed, {fullObject} finished. {viralHookScene6}',
  ],
  'mini-world': [
    'SCENE 1 - SETUP: Macro setup of empty tiny landscape in {ENV_DESC}, starting from {condition}, no building yet, only messy base for future {fullObject}. {camera}, {lighting}, {detail}. OBJECT LOCK: Future {fullObject} will be {objectType} made of {material} with tiny details, not built yet. {viralHookScene1}',
    'SCENE 2 - FOUNDATION: Same {ENV_DESC}. Tiny foundation being laid for {fullObject}, miniature tools, {material} base, {style} visuals. OBJECT LOCK: Same desk/environment, {objectType} foundation only. {viralHookScene2}',
    'SCENE 3 - WALLS: Same {ENV_DESC}. Walls being built for {fullObject} on same foundation, {material} walls. {camera}, {detail}. OBJECT LOCK: Same miniature location, {objectType} walls only. {viralHookScene3}',
    'SCENE 4 - ROOF: Same {ENV_DESC}. Roof being added to {fullObject}, {material} roof. {lighting}, {style}. OBJECT LOCK: Same environment, {objectType} roof only, {material}. {viralHookScene4}',
    'SCENE 5 - DETAILING: Same {ENV_DESC}. Tiny detailing work on same {fullObject}, {material} paint and textures, tiny furniture. {camera}, {detail}. OBJECT LOCK: Same location, {objectType} detailing only. {viralHookScene5}',
    'SCENE 6 - MASTERPIECE: Same {ENV_DESC}. Completed {fullObject}, macro cinematic shot, {material} details, warm glow. {lighting}. OBJECT LOCK: Same environment, {fullObject} all {material} details visible, finished {objectType}. {viralHookScene6}',
  ],
  luxury: [
    'SCENE 1 - MATERIALS: {condition} raw {material} for {fullObject} display in {ENV_DESC}, scattered unprocessed, no cutting yet. {camera}, {lighting}. OBJECT LOCK: Final {fullObject} will be {objectType} showcasing premium {material} quality, raw state only now. {viralHookScene1}',
    'SCENE 2 - CUTTING: Same {ENV_DESC}. Precision cutting of {material} for {fullObject}, sparks, craftsmanship. {style}, {detail}. OBJECT LOCK: Same workshop, {objectType} cutting only, {material}. {viralHookScene2}',
    'SCENE 3 - SHAPING: Same {ENV_DESC}. Shaping and forming the {fullObject} from {material}, {objectType} form emerging, artisan hands at work. {camera}. OBJECT LOCK: Same environment, {objectType} shaping only, {material}. {viralHookScene3}',
    'SCENE 4 - ASSEMBLY: Same {ENV_DESC}. Assembly process of {fullObject}, {material} parts, {objectType} coming together. {style}, {lighting}. OBJECT LOCK: Same workshop, {objectType} assembly only. {viralHookScene4}',
    'SCENE 5 - POLISHING: Same {ENV_DESC}. Final polishing of {fullObject}, {material} mirror-like finish, {objectType} shine. {camera}, {detail}. OBJECT LOCK: Same environment, {objectType} polishing only. {viralHookScene5}',
    'SCENE 6 - SHOWCASE: Same {ENV_DESC}. Same {fullObject} fully completed, {objectType} luxury showcase on pedestal, {material} premium. Dramatic {lighting}, {detail}. OBJECT LOCK: Same workshop, {fullObject} premium {material} quality evident, finished {objectType}. {viralHookScene6}',
  ],
  evolution: [
    'SCENE 1 - PRIMITIVE: {condition} of {fullObject} resting completely still in {ENV_DESC}, no movement, {objectType} egg/cell static, {material} shell. {camera}, {lighting}. OBJECT LOCK: {fullObject} has distinctive {material} texture and unique color pattern, {objectType} primitive state only, no growth. {viralHookScene1}',
    'SCENE 2 - EARLY FORM: Same {fullObject} in same {ENV_DESC}. Early transformation begins, {objectType} subtle cracks and tiny movement, {material} shifting. {style}, {detail}. OBJECT LOCK: Same forest/location, same {objectType}, same lighting, same {material} texture evolving slightly. {viralHookScene2}',
    'SCENE 3 - MID EVOLUTION: Same {fullObject} in same {ENV_DESC}. Mid-transformation, {objectType} noticeable growth, {material} skin/texture changing. {camera}, {lighting}. OBJECT LOCK: Same environment, same {objectType} type, {material} texture more complex. {viralHookScene3}',
    'SCENE 4 - ADVANCED: Same {fullObject} in same {ENV_DESC}. Advanced {objectType} form emerging, complex {material} details, bigger size. {style}, {detail}. OBJECT LOCK: Same location, same {objectType}, same {material} base. {viralHookScene4}',
    'SCENE 5 - NEAR FINAL: Same {fullObject} in same {ENV_DESC}. Near-final {objectType} state, almost complete transformation, {material} perfected. {camera}. OBJECT LOCK: Same environment, same {objectType}, {material} texture perfected. {viralHookScene5}',
    'SCENE 6 - FINAL: Same {fullObject} in same {ENV_DESC}. Final {objectType} evolution revealed, majestic final form, {material} full glory, cinematic {lighting}, {detail}. OBJECT LOCK: Same location throughout, {fullObject} {material} texture and color pattern fully evolved, identical environment, same {objectType} lineage. {viralHookScene6}',
  ],
};

const viralHookPrompts: Record<ViralHook, string[]> = {
  none: ['', '', '', '', '', ''],
  'magnetic-mud': [
    'VIRAL HOOK: Object completely buried under thick black magnetic mud/slime, only faint shape visible, mud dripping slowly, satisfying ooze texture.',
    'VIRAL HOOK: Hand pulls {fullObject} from magnetic mud, thick mud peeling off in satisfying chunks, slime stretching, reveals dirty {material} underneath.',
    'VIRAL HOOK: Mud-covered parts on workbench, mud still dripping, satisfying mud removal with brush.',
    'VIRAL HOOK: Clean parts emerging from mud bath, transformation from mud-black to clean {material}.',
    'VIRAL HOOK: Final polish removes last mud residue, {material} shines through.',
    'VIRAL HOOK: Side-by-side before-after: magnetic mud vs pristine {fullObject}, satisfying contrast.',
  ],
  'laser-cleaning': [
    'VIRAL HOOK: Close-up {material} surface with heavy rust, no cleaning yet, anticipating laser.',
    'VIRAL HOOK: Precision disassembly still, laser tool visible in background, hint of tech.',
    'VIRAL HOOK: HIGH-POWER LASER BEAM cleaning - red laser line sweeps across {material} parts, rust instantly vaporizes into smoke, satisfying laser cleaning, sparks, no water needed, futuristic tech.',
    'VIRAL HOOK: Laser-cleaned parts being reassembled, {material} perfectly clean from laser, no residue.',
    'VIRAL HOOK: Final laser polish pass, {material} mirror finish from laser, ultra satisfying.',
    'VIRAL HOOK: Laser vs brush comparison, {fullObject} gleams, futuristic restoration showcase.',
  ],
  'exploded-float': [
    'VIRAL HOOK: {fullObject} fully assembled but about to explode, anticipation.',
    'VIRAL HOOK: EXPLODED VIEW - All parts of {fullObject} floating in mid-air, separated, zero gravity, each {material} part floating with perfect spacing, cinematic exploded diagram, satisfying floating parts, screws floating.',
    'VIRAL HOOK: Floating parts being cleaned mid-air, each {material} part rotating while cleaning spray hits, zero gravity cleaning.',
    'VIRAL HOOK: Floating clean parts flying back together, assembling mid-air, satisfying magnetic snap, {objectType} reassembly in air.',
    'VIRAL HOOK: Reassembled {fullObject} still floating, rotating slowly, floating showcase.',
    'VIRAL HOOK: Floating to grounded - {fullObject} gently lands on pedestal, final floating showcase to grounded luxury.',
  ],
  'chrome-dip': [
    'VIRAL HOOK: {fullObject} dirty matte black, about to be dipped.',
    'VIRAL HOOK: Dirty parts ready for chrome dip, vat of liquid chrome visible.',
    'VIRAL HOOK: CHROME DIP - Each {material} part being dipped into liquid chrome/metallic paint vat, emerges instantly mirror chrome, satisfying dip, liquid dripping, color transformation from dirty to chrome {material}.',
    'VIRAL HOOK: Chrome-dipped parts being reassembled, mirror reflections, {material} ultra glossy.',
    'VIRAL HOOK: Final chrome polish, {fullObject} reflects environment like mirror, chrome {material}.',
    'VIRAL HOOK: Before-after: rusted vs chrome {fullObject}, insane transformation, luxury mirror finish.',
  ],
  'pressure-wash': [
    'VIRAL HOOK: Super dirty {fullObject} close-up, caked mud, anticipating pressure wash.',
    'VIRAL HOOK: Disassembled dirty parts piled, pressure washer nozzle visible, anticipation.',
    'VIRAL HOOK: PRESSURE WASHER 3000 PSI - High-pressure water jet blasts {material} parts, dirt instantly stripped in satisfying lines, water spray, mud flying off, ASMR pressure wash, clean stripe reveals {material}.',
    'VIRAL HOOK: Clean wet parts dripping water, being reassembled while still wet, water droplets on {material}.',
    'VIRAL HOOK: Final rinse, {fullObject} dripping clean, water beads on {material}.',
    'VIRAL HOOK: Pressure wash line - dirty vs clean split screen, satisfying contrast.',
  ],
  'cut-in-half': [
    'VIRAL HOOK: {fullObject} intact but marked with cutting line, angle grinder ready.',
    'VIRAL HOOK: CUT IN HALF - Angle grinder cuts {fullObject} in half, sparks flying, reveals internal {material} structure, cross-section view, satisfying cut, what is inside? Internal mechanism visible.',
    'VIRAL HOOK: Both halves laid open, each half being cleaned inside-out, internal {material} details cleaned.',
    'VIRAL HOOK: Halves being rejoined/welded back, or displayed as cut-open showcase, internal {material} visible.',
    'VIRAL HOOK: Detailed cleaning of cut edge, internal {material} polished.',
    'VIRAL HOOK: Cut-open final showcase, {fullObject} cut in half display, internal anatomy visible, educational + satisfying.',
  ],
  'asmr-tapping': [
    'VIRAL HOOK: ASMR TAPPING - Close-up fingers tapping on dirty {material} {fullObject}, scratching rust with fingernail, scraping dirt, tapping sounds, scratching sounds, satisfying texture sounds, super macro.',
    'VIRAL HOOK: ASMR disassembly - screwdriver tapping, unscrewing sounds amplified, each screw drop sound, satisfying teardown sounds.',
    'VIRAL HOOK: ASMR cleaning - brush bristles scratching {material}, scraping, satisfying scratch sounds, foam bubbles popping.',
    'VIRAL HOOK: ASMR reassembly - clicking parts together, snap sounds, screw tightening sounds.',
    'VIRAL HOOK: ASMR polishing - microfiber rubbing {material}, squeaky clean sounds, tapping final {fullObject}.',
    'VIRAL HOOK: ASMR showcase - tapping pristine {fullObject}, knocking on clean {material}, satisfying clean sound.',
  ],
  'time-reverse': [
    'VIRAL HOOK: TIME REVERSE EFFECT - {fullObject} pristine and clean, but time reverse hint, everything will rewind.',
    'VIRAL HOOK: Reverse disassembly - parts flying apart in reverse, actually assembly in reverse, mind-bending reverse teardown.',
    'VIRAL HOOK: Reverse cleaning - dirt un-cleaning? No, reverse shows dirt being removed in reverse, satisfying rewind clean.',
    'VIRAL HOOK: Reverse assembly - parts assembling in reverse order, reverse satisfying.',
    'VIRAL HOOK: Near final but reverse effect building.',
    'VIRAL HOOK: FINAL REVERSE REVEAL - Play video backwards for mind-blowing effect: clean {fullObject} transforms back to dirty, then forward again, loop effect.',
  ],
};

const forbiddenByNiche: Record<Niche, string[]> = {
  restoration: [
    "SCENE 1 FORBIDDEN: NO teardown, NO disassembly, NO parts separated, NO cleaning, NO soap, NO water, NO brush contact, fully assembled dirty only",
    "SCENE 2 FORBIDDEN: NO cleaning, NO soap, NO water, NO reassembly, only disassembly into parts, teardown only",
    "SCENE 3 FORBIDDEN: NO reassembly, NO fully assembled object, NO final polish, only cleaning individual dirty parts laid out",
    "SCENE 4 FORBIDDEN: NO dirty parts, NO disassembly, NO final polish, only clean parts being reassembled",
    "SCENE 5 FORBIDDEN: NO dirty, NO disassembly, NO teardown, only final detailing and polishing of reassembled object",
    "SCENE 6 FORBIDDEN: NO dirt, NO rust, NO disassembled parts, NO teardown, fully restored and reassembled showcase only",
  ],
  treasure: [
    "SCENE 1 FORBIDDEN: NO treasure visible, NO chest, NO gold, NO jewel, NO clue visible, only empty environment searching",
    "SCENE 2 FORBIDDEN: NO excavation, NO digging, NO treasure visible, only clue/map discovery",
    "SCENE 3 FORBIDDEN: NO breakthrough, NO glimpse of treasure, only digging dirt",
    "SCENE 4 FORBIDDEN: NO full reveal, NO open chest, only small glimpse under dirt",
    "SCENE 5 FORBIDDEN: NO fully lifted treasure, only spotted glow in ground",
    "SCENE 6 FORBIDDEN: NO empty hole only, treasure must be fully revealed",
  ],
  construction: [
    "SCENE 1 FORBIDDEN: NO foundation, NO concrete, NO walls, NO roof, NO structure, empty land only",
    "SCENE 2 FORBIDDEN: NO walls, NO roof, NO interior, NO finished building, foundation only",
    "SCENE 3 FORBIDDEN: NO roof, NO interior, NO finished building, structure/walls only",
    "SCENE 4 FORBIDDEN: NO interior work, NO finished building, roofing only",
    "SCENE 5 FORBIDDEN: NO exterior construction, NO grand opening, interior work only",
    "SCENE 6 FORBIDDEN: NO construction materials, NO unfinished state, finished building only",
  ],
  'mini-world': [
    "SCENE 1 FORBIDDEN: NO building, NO walls, NO roof, empty base only",
    "SCENE 2 FORBIDDEN: NO walls, NO roof, foundation only",
    "SCENE 3 FORBIDDEN: NO roof, NO detailing, walls only",
    "SCENE 4 FORBIDDEN: NO interior detailing, NO furniture, roof only",
    "SCENE 5 FORBIDDEN: NO empty state, detailing only, no major construction",
    "SCENE 6 FORBIDDEN: NO unfinished state, finished miniature only",
  ],
  luxury: [
    "SCENE 1 FORBIDDEN: NO cutting, NO shaping, NO assembly, NO polishing, raw materials only",
    "SCENE 2 FORBIDDEN: NO shaping, NO assembly, NO polishing, cutting only",
    "SCENE 3 FORBIDDEN: NO assembly, NO polishing, shaping only",
    "SCENE 4 FORBIDDEN: NO polishing, NO showcase, assembly only",
    "SCENE 5 FORBIDDEN: NO raw materials, NO cutting, polishing only",
    "SCENE 6 FORBIDDEN: NO raw state, NO tools in action, luxury showcase only",
  ],
  evolution: [
    "SCENE 1 FORBIDDEN: NO movement, NO hatching, NO cracking, NO growth, NO limbs, static egg/primitive only, completely still",
    "SCENE 2 FORBIDDEN: NO large growth, NO advanced form, NO final form, only subtle early cracks and tiny movement",
    "SCENE 3 FORBIDDEN: NO final form, NO advanced wings/details fully formed, mid evolution only",
    "SCENE 4 FORBIDDEN: NO final evolution, NO baby to adult instant jump, advanced form only",
    "SCENE 5 FORBIDDEN: NO primitive state, NO egg, near final only",
    "SCENE 6 FORBIDDEN: NO egg, NO primitive, final majestic form only",
  ],
};

const videoInstructionsByNiche: Record<Niche, string[]> = {
  restoration: [
    "[VIDEO LOCK SCENE 1: NO teardown, NO disassembly, NO cleaning action, NO human hands cleaning, NO soap. {fullObject} is completely untouched, assembled, super dirty and static. Only subtle camera movement - slow push-in macro. Background STABLE. TYPE LOCK: {objectType}. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 2: TEARDOWN ONLY - Disassembly of {fullObject} into parts, unscrewing bolts, wheels removed, body separated, satisfying teardown. NO cleaning yet, still dirty parts. Background STABLE. Keep {objectType} parts from same object. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 3: PARTS CLEANING ONLY - All separated dirty parts of {fullObject} laid out, individual cleaning with soapy water, brush, foam, ultrasonic cleaner, ASMR cleaning of each {material} part. NO reassembly yet. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 4: REASSEMBLY ONLY - Clean parts of {fullObject} being reassembled back together, screws tightened, wheels attached, satisfying reassembly, transformation from parts to whole. NO disassembly, NO cleaning. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 5: DETAILING & POLISH ONLY - Final polishing of reassembled {fullObject}, microfiber, compound, perfect reflections, pristine. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 6: FINAL SHOWCASE ONLY - Slow cinematic orbit showcase of fully restored {fullObject}, luxury lighting, no teardown, no cleaning. Background STABLE. Final {objectType} showcase. {viralHookVideo}]",
  ],
  treasure: [
    "[VIDEO LOCK SCENE 1: Empty environment only, no treasure. Slow search camera pan, atmospheric, no {fullObject} visible. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 2: Discovery of clue for {fullObject}, map unfolding, symbol glowing, no digging. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 3: Digging and excavation for {fullObject}, dirt flying, shovel action, hole deeper, no treasure yet. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 4: Breaking final layer, tension, small glimpse of {material} {fullObject} under dirt. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 5: {fullObject} spotted with glow, half buried, magical light. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 6: Full epic reveal, {fullObject} lifted, cinematic. Background STABLE. {viralHookVideo}]",
  ],
  construction: [
    "[VIDEO LOCK SCENE 1: Empty land survey only for {fullObject}, drone slow push, no building. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 2: Foundation pouring for {fullObject}, concrete, steel, trench. Time-lapse foundation. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 3: Walls rising for {fullObject}, bricks/wood stacking, structure build. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 4: Roof installation for {fullObject}, crane lifting. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 5: Interior work for {fullObject}, painting, flooring. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 6: Grand opening of {fullObject}, lights on, finished building showcase. Background STABLE. {viralHookVideo}]",
  ],
  'mini-world': [
    "[VIDEO LOCK SCENE 1: Empty base only, no {fullObject} building. Macro setup. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 2: Tiny foundation laid for {fullObject}, miniature tools. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 3: Walls built for {fullObject}, tiny bricks. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 4: Roof added to {fullObject}, tiny tiles. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 5: Detailing for {fullObject}, tiny furniture, paint. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 6: Finished {fullObject} showcase, macro cinematic. Background STABLE. {viralHookVideo}]",
  ],
  luxury: [
    "[VIDEO LOCK SCENE 1: Raw {material} static display for {fullObject}, no tools action. Studio lighting. Background STABLE. OBJECT TYPE: {objectType}. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 2: Precision cutting of {material} for {fullObject}, sparks, craftsmanship. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 3: Shaping and forming {fullObject}, {objectType} form emerging, artisan hands. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 4: Assembly of {fullObject}, {material} parts, {objectType} coming together. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 5: Polishing {fullObject} to mirror finish, {material} shine, {objectType}. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 6: Luxury showcase of {fullObject} on pedestal, dramatic lighting. Background STABLE. {objectType} final. {viralHookVideo}]",
  ],
  evolution: [
    "[VIDEO LOCK SCENE 1: {fullObject} primitive state completely static, no movement, egg still, subtle breathing only, no hatching. Background STABLE. TYPE LOCK: {objectType}. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 2: Early subtle changes of {fullObject}, small cracks, tiny wiggle, early transformation begins. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 3: Mid evolution growth of {fullObject}, limbs forming, noticeable growth. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 4: Advanced form of {fullObject} emerging, bigger, complex details. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 5: Near final state of {fullObject}, almost complete, majestic. Background STABLE. {viralHookVideo}]",
    "[VIDEO LOCK SCENE 6: Final evolution of {fullObject} majestic reveal, cinematic. Background STABLE. Same {objectType} lineage. {viralHookVideo}]",
  ],
};

const MASTER_LOCK_TEMPLATE = `[CRITICAL CONSISTENCY LOCK - Scene {sceneNumber} of {totalScenes}:
⚠ BACKGROUND LOCKED: {ENV_DESC} - EXACTLY same environment, no change, no replacement, no new props
⚠ TIME & LIGHTING LOCKED: {lighting} - Keep same time of day
⚠ OBJECT LOCK v2.4 VIRAL: {fullObject} - This is {objectType} made of {material} - Same shape, size, color, texture, identical pattern as Scene 1 - MUST stay as {objectType}
⚠ PARTS LOCK: All parts must come from same {fullObject} from Scene 1, do not introduce new parts
⚠ MATERIAL LOCK: {material} - Keep material consistent
⚠ TYPE LOCK: {objectType} - Must remain {objectType}
⚠ VIRAL HOOK LOCK: {viralHookLabel} - {viralHookDesc}
⚠ CAMERA: {camera} - Consistent style
⚠ STYLE: {style} - Consistent
⚠ ASPECT RATIO: {aspectRatio} - Must be consistent
⚠ {forbidden}]`;

export function generateStoryboard(input: GeneratorInput): Storyboard {
  const numScenes = input.duration / 10;
  const arc = storyArcs[input.niche].slice(0, numScenes);
  const templates = sceneTemplates[input.niche].slice(0, numScenes);
  const videoInstructions = videoInstructionsByNiche[input.niche].slice(0, numScenes);
  const forbiddenList = forbiddenByNiche[input.niche].slice(0, numScenes);
  const aspectRatio = input.aspectRatio || '9:16';
  const envDesc = environmentDescriptions[input.environment] || input.environment;
  const viralHook = input.viralHook || 'none';
  const viralHookData = viralHooks.find(h => h.value === viralHook) || viralHooks[0];
  const viralPrompts = viralHookPrompts[viralHook].slice(0, numScenes);

  const objectType = input.objectType || "Toy";
  const material = input.material || "Metal";
  const fullObject = `${input.objectName} (${objectType} - ${material})`;

  const scenes: Scene[] = arc.map((arcTitle, index) => {
    const sceneNumber = index + 1;
    const viralSceneHook = viralPrompts[index] || '';
    
    let description = templates[index]
      .replaceAll('{condition}', input.condition || 'Aged')
      .replaceAll('{object}', input.objectName || 'Object')
      .replaceAll('{fullObject}', fullObject)
      .replaceAll('{material}', material)
      .replaceAll('{objectType}', objectType)
      .replaceAll('{ENV_DESC}', envDesc)
      .replaceAll('{environment}', input.environment)
      .replaceAll('{camera}', input.camera || 'Cinematic')
      .replaceAll('{lighting}', input.lighting || 'Natural')
      .replaceAll('{detail}', input.detailLevel || 'High Detail')
      .replaceAll('{style}', input.style || 'Photorealistic')
      .replaceAll('{aspectRatio}', aspectRatio)
      .replaceAll('{viralHookScene1}', index === 0 ? viralSceneHook : '')
      .replaceAll('{viralHookScene2}', index === 1 ? viralSceneHook : '')
      .replaceAll('{viralHookScene3}', index === 2 ? viralSceneHook : '')
      .replaceAll('{viralHookScene4}', index === 3 ? viralSceneHook : '')
      .replaceAll('{viralHookScene5}', index === 4 ? viralSceneHook : '')
      .replaceAll('{viralHookScene6}', index === 5 ? viralSceneHook : '');

    // Clean up unused viral placeholders
    description = description.replaceAll(/{viralHookScene\d}/g, '').trim();
    // Inject viral hook if placeholder system missed
    if (viralSceneHook && !description.includes('VIRAL HOOK')) {
      description += ` ${viralSceneHook}`;
    }

    const masterLock = MASTER_LOCK_TEMPLATE
      .replace('{sceneNumber}', sceneNumber.toString())
      .replace('{totalScenes}', numScenes.toString())
      .replaceAll('{ENV_DESC}', envDesc)
      .replaceAll('{object}', input.objectName || 'Object')
      .replaceAll('{fullObject}', fullObject)
      .replaceAll('{material}', material)
      .replaceAll('{objectType}', objectType)
      .replaceAll('{style}', input.style || 'Photorealistic')
      .replaceAll('{camera}', input.camera || 'Cinematic')
      .replaceAll('{lighting}', input.lighting || 'Natural')
      .replaceAll('{aspectRatio}', aspectRatio)
      .replaceAll('{viralHookLabel}', viralHookData.label)
      .replaceAll('{viralHookDesc}', viralHookData.description)
      .replace('{forbidden}', forbiddenList[index]);

    const videoLock = videoInstructions[index]
      .replaceAll('{fullObject}', fullObject)
      .replaceAll('{object}', input.objectName || 'Object')
      .replaceAll('{material}', material)
      .replaceAll('{objectType}', objectType)
      .replaceAll('{viralHookVideo}', viralSceneHook);

    const finalPrompt = `${description}\n\n${masterLock}\n${videoLock}`;

    return {
      id: sceneNumber,
      title: `${arcTitle}${viralHook !== 'none' ? ` [${viralHookData.icon} ${viralHookData.label}]` : ''}`,
      description: finalPrompt.trim(),
      duration: 10,
    };
  });

  return {
    projectName: input.projectName || 'Untitled Project',
    totalDuration: input.duration,
    aspectRatio: aspectRatio as AspectRatio,
    scenes,
  };
}
