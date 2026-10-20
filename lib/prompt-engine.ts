// lib/prompt-engine.ts  (v3 - klip 10 detik untuk Flow Omni)
// SERVER-ONLY: seluruh template ada di sini dan tidak ikut ke bundle browser.
//
// Konsep: setiap niche punya 7 "keyframe state" (K0..K6) dan 6 "beat" (aksi antar state).
// Durasi 10/20/30/60 detik memilih rentang beat, bukan memotong dari depan:
//   10s = K0->K6 | 20s = K0->K3, K3->K6 | 30s = K0->K2, K2->K4, K4->K6 | 60s = satu beat per klip.
// Akibatnya setiap durasi SELALU berakhir di reveal, dan frame akhir satu klip = frame awal klip berikutnya.
import 'server-only';
import type { GeneratorInput, Storyboard, Scene, Niche, AspectRatio, ViralHook, SceneMethod } from '@/types/prompt';
import { viralHooks, isHookCompatible } from '@/lib/catalog';

type Join = 'extend' | 'chain';
interface Beat { title: string; action: string; audio: string; ownCamera?: boolean }
interface Blueprint { states: string[]; beats: Beat[]; joins: Join[]; oneClip: { action: string; audio: string } }
interface Override { action?: string; state?: string; audio?: string }
interface HookDef {
  open?: Partial<Record<Niche, string>>;
  beats: Partial<Record<Niche, Record<number, Override>>>;
}

// Batas Extend di Flow: total 40 detik per rangkaian (= 4 klip). Cek ulang di akun Anda bila berubah.
const MAX_EXTEND_CLIPS = 4;

// ---------------------------------------------------------------------------
// Kamus terjemahan (UI Indonesia -> nilai prompt Inggris)
// ---------------------------------------------------------------------------
const CONDITION_EN: Record<string, string> = {
  'Penuh Noda': 'covered in stains', 'Berkarat & Lapuk': 'rusty and weathered', 'Cat Mengelupas': 'with peeling paint',
  'Menguning Karena Usia': 'yellowed with age', 'Penuh Goresan': 'covered in scratches', 'Berjamur & Lembap': 'moldy and damp',
  'Lengket & Berminyak': 'sticky and greasy', 'Retak & Rusak': 'cracked and damaged',
  'Terlupakan di Gudang': 'dusty and forgotten after years in storage', 'Rusak Akibat Cat Semprot': 'defaced with spray paint',
  'Terbengkalai Bertahun-tahun': 'abandoned for years', 'Super Kotor': 'extremely dirty',
  'Terkubur Lumpur Magnetik': 'buried in thick black magnetic mud', 'Terperangkap Slime Hitam': 'trapped in black slime',
  'Beku Dalam Es Kotor': 'frozen inside dirty ice',
  'Terkubur Dalam Tanah': 'buried underground', 'Tersembunyi di Gua Gelap': 'hidden in a dark cave',
  'Terendam di Dasar Laut': 'sunken on the seabed', 'Terbungkus Rantai Kuno': 'wrapped in ancient chains',
  'Terjebak di Dalam Peti': 'locked inside a chest', 'Terpendam di Pasir Gurun': 'buried in desert sand',
  'Terkunci di Ruang Rahasia': 'sealed in a secret chamber', 'Terlindungi Monster Penjaga': 'guarded by a stone guardian creature',
  'Tersebar di Beberapa Lokasi': 'hidden in pieces around the area', 'Disamarkan Sebagai Batu Biasa': 'disguised as an ordinary rock',
  'Beku Dalam Es Kristal': 'frozen in crystal ice',
  'Lahan Kosong Berumput': 'an empty grassy lot', 'Tanah Berbatu Keras': 'hard rocky ground', 'Lahan Berawa': 'swampy land',
  'Lereng Bukit Curam': 'a steep hillside', 'Lahan Pasir Gersang': 'barren sandy land', 'Bekas Area Tambang': 'a former mining area',
  'Hutan yang Ditebangi': 'cleared forest land', 'Lahan Rawa Kering': 'dried marshland',
  'Meja Kerja Berantakan': 'a messy workbench', 'Rak Buku Berdebu': 'a dusty bookshelf', 'Dapur Miniatur': 'a miniature kitchen setting',
  'Taman Belakang Rumah': 'a backyard garden patch', 'Kotak Pasir Anak': "a children's sandbox", 'Lemari Tua Berdebu': 'a dusty old cabinet',
  'Jendela Berembun': 'a foggy windowsill', 'Atas Meja Belajar': 'a study desk surface',
  'Bahan Mentah Berantakan': 'scattered raw materials', 'Logam Belum Ditempa': 'unforged raw metal', 'Berlian Kasar': 'rough uncut diamonds',
  'Kulit Mentah': 'raw leather hides', 'Kayu Gelondongan': 'rough wooden logs', 'Kain Belum Dijahit': 'uncut unsewn fabric',
  'Emas Batangan': 'raw gold bars', 'Kristal Belum Diasah': 'unpolished raw crystal',
  'Telur Misterius': 'a mysterious egg', 'Larva Kecil': 'a tiny larva', 'Bentuk Amorf': 'an amorphous blob', 'Makhluk Mini': 'a tiny creature',
  'Organisme Primordial': 'a primordial organism', 'Cangkang Retak': 'a cracked shell', 'Spora Terbang': 'floating spores', 'Sel Tunggal': 'a single cell',
};

const OBJECT_EN: Record<string, string> = {
  'Mobil Porsche Mainan Berkarat': 'toy Porsche car', 'Sepatu Sneaker Vintage 90an': 'vintage 90s sneakers',
  'Jam Tangan Mekanik Antik': 'antique mechanical wristwatch', 'Kamera Analog Tua': 'vintage analog film camera',
  'Console Game Retro Debu': 'retro game console',
  'Peti Harta Karun Mini': 'miniature treasure chest', 'Pedang Naga Kuno': 'ancient dragon sword',
  'Cincin Permata Tersembunyi': 'hidden gemstone ring', 'Peta Rahasia Kuno': 'ancient secret map', 'Topeng Emas Firaun': "golden pharaoh's mask",
  'Rumah Pohon Miniatur': 'miniature treehouse', 'Jembatan Gantung Kayu': 'wooden suspension bridge',
  'Benteng Kastil Lego': 'toy-brick castle fortress', 'Roket Luar Angkasa Mainan': 'toy space rocket', 'Menara Eiffel Mini': 'miniature Eiffel Tower',
  'Kafe Mini di Atas Meja': 'tiny cafe on a table', 'Taman Bonsai Miniatur': 'miniature bonsai garden',
  'Kamar Tidur Boneka Detail': 'detailed dollhouse bedroom', 'Bengkel Mekanik Kecil': 'tiny mechanic workshop', 'Toko Roti Mini Satisfying': 'tiny bakery shop',
  'Jam Tangan Mewah Diamond': 'luxury diamond wristwatch', 'Mobil Sport Klasik Merah': 'classic red sports car',
  'Tas Kulit Branded Premium': 'premium leather handbag', 'Botol Parfum Mewah': 'luxury perfume bottle', 'Perhiasan Kalung Berlian': 'diamond necklace',
  'Naga Kecil Menetas': 'baby dragon hatching', 'Robot Masa Depan': 'futuristic robot', 'Kupu-kupu Kristal Ajaib': 'magical crystal butterfly',
  'Pohon Raksasa Tumbuh': 'giant growing tree', 'Monster Laut Purba': 'ancient sea monster',
};

// Deskripsi lokasi: sengaja TANPA kata pencahayaan (cahaya dikontrol dari pilihan Lighting).
export const ENV_EN: Record<string, string> = {
  'Old Warehouse': 'an abandoned old warehouse with dusty wooden floors, rusty metal shelves and scattered debris',
  'Abandoned Garage': 'an abandoned garage with a stained concrete floor and old tools hanging on the walls',
  'Attic': 'a dusty attic with wooden beams, old trunks and cobwebs',
  'Basement': 'a damp basement with concrete walls, exposed pipes and stacked boxes',
  'Beach': 'a sandy beach with driftwood, seashells and the ocean behind',
  'Forest': 'a dense forest with tall trees, mossy ground, ferns and mushrooms',
  'Junkyard': 'a junkyard with piles of scrap metal, old tires and broken machinery',
  'Studio': 'a clean photography studio with a seamless backdrop',
  'Ancient Ruins': 'ancient stone ruins with moss-covered pillars, crumbling walls and vines',
  'Open Field': 'a wide open grassy field with distant mountains',
  'Desk Setup': 'a tidy wooden desk with a task lamp, books and small plants',
  'Luxury Workshop': 'a luxury artisan workshop with marble counters and brass tools',
  'Mystical Forest': 'a mystical dark forest with twisted ancient trees, glowing mushrooms and purple-blue mist',
};

// ---------------------------------------------------------------------------
// Blueprint per niche. Placeholder: {obj} {objFull} {mat} {cond} {env}
// states[0..6] = keyframe; beats[i] = aksi dari states[i] ke states[i+1]
// joins[j] = metode transisi antara beat j dan beat j+1 (extend = lanjut klip yang sama, chain = klip baru dari frame akhir)
// ---------------------------------------------------------------------------
const BLUEPRINTS: Record<Niche, Blueprint> = {
  restoration: {
    states: [
      'the {objFull}, {cond}, fully assembled and untouched on a workbench',
      'the {obj}, still {cond}, with one small clean patch wiped on its surface',
      'every part of the {obj} separated and laid out in neat rows, all still dirty',
      'all parts of the {obj} clean and gleaming, laid out in neat rows',
      'the {obj} fully reassembled and clean but not yet polished',
      'the {obj} polished to a bright finish like new',
      'the fully restored {obj} on display, pristine and identical in shape to the start',
    ],
    beats: [
      { title: 'DISCOVERY', action: 'Slow push-in across the grime, rust and scratches while a gloved hand wipes one small patch to reveal the original {mat} underneath.', audio: 'quiet room tone and the soft scrape of a cloth' },
      { title: 'TEARDOWN', action: 'A precision screwdriver unscrews the {obj} and lifts it apart, placing screws, panels and parts one by one onto a mat.', audio: 'crisp metallic clicks and screws dropping into a tray' },
      { title: 'PARTS CLEANING', action: 'Each dirty part is scrubbed with a brush and soapy foam, rinsed, and the {mat} surface shines through.', audio: 'bristles scrubbing, foam fizzing and water trickling' },
      { title: 'REASSEMBLY', action: 'The clean parts are fitted and screwed back together step by step until the {obj} takes shape again.', audio: 'soft clicks and screws tightening' },
      { title: 'POLISH', action: 'A microfiber cloth and polishing compound buff the {mat} in slow circles as reflections sweep across the surface.', audio: 'gentle cloth rubbing with a faint squeak' },
      { title: 'FINAL REVEAL', action: 'A slow cinematic orbit around the finished {obj} while light glides over its flawless {mat} surface.', audio: 'a soft rising ambient tone', ownCamera: true },
    ],
    joins: ['chain', 'extend', 'chain', 'extend', 'chain'],
    oneClip: { action: 'In one continuous satisfying time-lapse, grime peels away from the {obj}, its {mat} gleams, and it ends as a pristine showcase piece.', audio: 'satisfying scrubbing that resolves into a bright chime' },
  },
  treasure: {
    states: [
      '{env}, with the {objFull} {cond} and completely out of sight',
      'an explorer standing at a spot marked by a faint carved symbol',
      'a carved arrow glowing faintly and pointing at the ground',
      'a deep pit with the edge of something hard just exposed',
      'a small glint of {mat} visible in the pit',
      'the {obj} half uncovered and glowing softly',
      'the {obj} held up fully visible, its {mat} markings glowing',
    ],
    beats: [
      { title: 'THE SEARCH', action: 'A wide slow shot follows an explorer sweeping a torch across the ground until they stop at a faint carved symbol.', audio: 'wind, soft footsteps and distant echoes' },
      { title: 'CLUE FOUND', action: 'A brush wipes dust from the carved symbol, revealing an arrow that glows and points downward.', audio: 'light brush strokes and a low mystical hum' },
      { title: 'EXCAVATION', action: 'A shovel and bare hands dig fast, soil flying and layers of earth peeling away to open a deep pit.', audio: 'shovel scrapes and soil crumbling' },
      { title: 'BREAKTHROUGH', action: 'The last layer of dirt crumbles away and a shaft of light catches a glint of {mat}.', audio: 'a tense low drone and falling pebbles' },
      { title: 'TREASURE SPOTTED', action: 'Dirt is brushed aside and the {obj} appears with a soft magical glow.', audio: 'a shimmering magical chime' },
      { title: 'TREASURE REVEAL', action: 'Hands lift the {obj} out of the pit while the camera pulls back in an epic reveal.', audio: 'a swelling orchestral hit and golden shimmer', ownCamera: true },
    ],
    joins: ['extend', 'chain', 'extend', 'extend', 'chain'],
    oneClip: { action: 'A cinematic dig: soil is cleared in fast motion until the {obj} is lifted out of the ground, glowing.', audio: 'digging sounds that build into a magical chime' },
  },
  construction: {
    states: [
      '{cond} at {env}, empty apart from a few survey stakes',
      'the outline of the {obj} marked on the ground with stakes and string',
      'a finished concrete foundation for the {obj}',
      'the walls of the {obj} complete, with no roof yet',
      'the {obj} with its roof installed and the exterior complete',
      'the interior of the {obj} finished, lights still off',
      'the completed {obj} glowing warmly, ready to open',
    ],
    beats: [
      { title: 'LAND SURVEY', action: 'A drone glides over the land while surveyors plant stakes and mark the outline of the {obj}.', audio: 'drone hum, wind and tapping stakes' },
      { title: 'FOUNDATION', action: 'An excavator digs trenches, steel bars are set and concrete pours in a smooth time-lapse.', audio: 'engine rumble and flowing concrete' },
      { title: 'STRUCTURE', action: 'Walls of {mat} rise course by course in a smooth time-lapse.', audio: 'construction ambience and stacking blocks' },
      { title: 'ROOFING', action: 'A crane lifts roof sections into place and the {mat} roofing is installed.', audio: 'crane motors and hammering' },
      { title: 'INTERIOR', action: 'A cutaway time-lapse shows painting, flooring and fittings being completed inside.', audio: 'soft tools and roller strokes' },
      { title: 'GRAND OPENING', action: 'The lights switch on and the finished {obj} glows warmly while the camera pulls back.', audio: 'a gentle swell of music and a soft electric click', ownCamera: true },
    ],
    joins: ['extend', 'extend', 'extend', 'extend', 'chain'],
    oneClip: { action: 'In one smooth time-lapse an empty lot becomes the finished {obj} that lights up at the end.', audio: 'construction sounds that resolve into a warm musical swell' },
  },
  'mini-world': {
    states: [
      '{cond} with a small empty patch where the tiny {objFull} will be built',
      'a clean flat base ready on {cond}',
      'a tiny foundation for the {obj} laid on the base',
      'the tiny walls of the {obj} complete',
      'the tiny {obj} with its roof on',
      'the tiny {obj} fully detailed with furniture and paint',
      'the finished miniature {obj} glowing with warm light',
    ],
    beats: [
      { title: 'LANDSCAPE SETUP', action: 'Tweezers clear a small patch and lay a flat base in a macro view.', audio: 'tiny scrapes and soft taps' },
      { title: 'TINY FOUNDATION', action: 'Miniature tools lay the {mat} foundation piece by piece.', audio: 'delicate clicks of tiny tools' },
      { title: 'WALLS', action: 'Tiny {mat} walls rise piece by piece, each placed and glued with tweezers.', audio: 'soft placing sounds and tiny taps' },
      { title: 'ROOF', action: 'A miniature roof is carefully lowered into place and pressed down.', audio: 'a gentle press and tiny clicks' },
      { title: 'DETAILING', action: 'Tiny furniture, paint and plants are added with tweezers and a fine brush.', audio: 'soft brush strokes and tiny placements' },
      { title: 'MINIATURE MASTERPIECE', action: 'Tiny lights switch on and the camera glides slowly around the finished miniature.', audio: 'a soft warm chime and quiet ambience', ownCamera: true },
    ],
    joins: ['extend', 'extend', 'extend', 'extend', 'chain'],
    oneClip: { action: 'In one smooth macro time-lapse the tiny {obj} is built piece by piece and lights up at the end.', audio: 'delicate tiny-tool sounds ending in a soft chime' },
  },
  luxury: {
    states: [
      '{cond} laid out on a workbench in {env}, the {objFull} not yet started',
      'a hand selecting the best piece from the {cond}',
      'precisely cut {mat} pieces arranged on the bench',
      'the rough form of the {obj} emerging from the pieces',
      'the {obj} assembled but with a matte, unfinished surface',
      'the {obj} polished to a mirror finish',
      'the finished {obj} on a pedestal under a soft spotlight',
    ],
    beats: [
      { title: 'RAW MATERIALS', action: 'A slow macro pass over the raw materials while an artisan hand selects the best piece.', audio: 'quiet workshop ambience and a soft touch' },
      { title: 'CUTTING', action: 'Precision tools cut and trim the {mat} with fine sparks and shavings.', audio: 'precise cutting and a light metallic ring' },
      { title: 'SHAPING', action: 'Artisan hands shape and form the pieces until the outline of the {obj} emerges.', audio: 'soft filing and smooth shaping sounds' },
      { title: 'ASSEMBLY', action: 'The parts are fitted together with fine, careful work.', audio: 'delicate clicks and tiny taps' },
      { title: 'POLISHING', action: 'A buffing wheel and cloth bring the {mat} to a mirror finish as light sweeps across it.', audio: 'a smooth buffing hum' },
      { title: 'LUXURY SHOWCASE', action: 'The finished {obj} rotates slowly on a pedestal as a soft spotlight sweeps over it.', audio: 'a soft elegant chime and quiet room tone', ownCamera: true },
    ],
    joins: ['chain', 'extend', 'extend', 'extend', 'chain'],
    oneClip: { action: 'In one elegant sequence raw materials are cut, shaped and polished into the finished {obj}, which rotates on a pedestal.', audio: 'workshop sounds resolving into an elegant chime' },
  },
  evolution: {
    states: [
      '{cond} resting completely still in {env}, the future {objFull}',
      'the first visible changes: faint glow, tiny cracks and slight movement',
      'an early form taking shape, small and fragile',
      'a mid-stage form with clear structure and growing size',
      'an advanced form, larger, with complex details',
      'a near-final form with sharpened details',
      'the final majestic form of the {obj}, fully evolved',
    ],
    beats: [
      { title: 'PRIMITIVE STATE', action: 'Faint pulses of light run through it as tiny cracks and subtle movement appear.', audio: 'a faint heartbeat and soft crackle' },
      { title: 'EARLY FORM', action: 'It stirs, grows and takes on a small early shape.', audio: 'soft organic cracking and a rising pulse' },
      { title: 'MID EVOLUTION', action: 'Its structure forms and grows visibly, the {mat} texture becoming more complex.', audio: 'organic stretching and a deepening pulse' },
      { title: 'ADVANCED FORM', action: 'It grows larger as complex details and a distinct silhouette emerge.', audio: 'low rumbling growth and shimmering textures' },
      { title: 'NEAR FINAL', action: 'Its details sharpen and the form settles into near completion.', audio: 'a swelling tone with a slow heartbeat' },
      { title: 'FINAL EVOLUTION', action: 'It rises into its final majestic form in a cinematic reveal.', audio: 'a powerful swelling orchestral note', ownCamera: true },
    ],
    joins: ['extend', 'extend', 'extend', 'extend', 'chain'],
    oneClip: { action: 'In one continuous shot it grows and transforms through its stages into the final majestic {obj}.', audio: 'a rising pulse that swells into a powerful final note' },
  },
};

// ---------------------------------------------------------------------------
// Viral hook: menimpa beat tertentu per niche (bukan menambah teks di atas teks lama)
// ---------------------------------------------------------------------------
const HOOKS: Record<ViralHook, HookDef> = {
  none: { beats: {} },
  'magnetic-mud': {
    open: {
      restoration: 'the {objFull} completely buried in thick black magnetic mud, only a faint shape visible, mud dripping slowly',
      treasure: 'the {objFull} completely buried in thick black magnetic mud, only a faint shape visible, mud dripping slowly',
    },
    beats: {
      restoration: { 0: { action: 'A hand pulls the {obj} out of the thick black mud; the mud stretches and peels off in satisfying chunks, revealing the dirty {mat} below.', state: 'the {obj} lifted out of the mud, still dirty and dripping', audio: 'thick squelching mud and slow wet peeling' } },
      treasure: { 2: { action: 'Hands pull the {obj} out of the thick black magnetic mud; the mud stretches and peels away in heavy chunks.', state: 'the {obj} half lifted from the mud pit', audio: 'thick squelching mud and slow wet peeling' } },
    },
  },
  'laser-cleaning': {
    beats: {
      restoration: { 2: { action: 'A red laser line sweeps over each part; rust vaporizes into thin smoke and bare {mat} appears. No water is used.', state: 'all parts laser-cleaned, bare and bright, laid out in neat rows', audio: 'a crisp laser sizzle and faint crackle' } },
      luxury: { 4: { action: 'A fine laser line glides across the {mat}, erasing every tool mark and leaving a flawless mirror surface.', audio: 'a soft laser hum' } },
    },
  },
  'exploded-float': {
    beats: {
      restoration: {
        1: { action: 'Every part of the {obj} lifts off and floats in mid-air in an exploded view, evenly spaced and slowly rotating.', state: 'all parts of the {obj} floating in mid-air in an exploded view, still dirty', audio: 'a soft whoosh and tiny metallic tinkles' },
        3: { action: 'The clean floating parts fly back together and snap into place in mid-air.', state: 'the {obj} fully reassembled, hovering in mid-air', audio: 'satisfying magnetic snaps' },
        5: { action: 'The finished {obj} slowly descends onto a pedestal while the camera orbits it.', state: 'the restored {obj} resting on a pedestal' },
      },
      construction: { 2: { action: 'Walls and beams of {mat} float in from all sides in an exploded view and snap together into the rising structure.', audio: 'soft whooshes and solid snaps' } },
      'mini-world': { 2: { action: 'Tiny {mat} wall pieces float in from all sides in an exploded view and snap together into walls.', audio: 'tiny whooshes and soft snaps' } },
    },
  },
  'chrome-dip': {
    beats: {
      restoration: {
        2: { action: 'Each part is dipped into a vat of liquid chrome and emerges as a flawless mirror-finish part, chrome dripping off.', state: 'all parts coated in mirror chrome, laid out in neat rows', audio: 'a thick liquid dip and soft drips' },
        5: { state: 'the fully restored {obj} with a mirror chrome finish, reflecting its surroundings' },
      },
      luxury: { 4: { action: 'The {obj} is dipped into liquid chrome and lifted out with a flawless mirror finish, chrome dripping off.', state: 'the {obj} in a flawless mirror chrome finish', audio: 'a thick liquid dip and soft drips' } },
    },
  },
  'pressure-wash': {
    beats: {
      restoration: { 2: { action: 'A high-pressure water jet blasts each part; caked dirt strips away in clean satisfying lines, revealing the {mat} underneath.', state: 'all parts clean, wet and dripping, laid out in neat rows', audio: 'a powerful water jet hiss, spray and dripping' } },
      construction: { 0: { action: 'A pressure washer blasts mud and debris off the lot in clean satisfying lines, exposing the ground, while surveyors mark the outline of the {obj}.', audio: 'a powerful water jet hiss and spray' } },
    },
  },
  'cut-in-half': {
    beats: {
      restoration: {
        1: { action: 'An angle grinder cuts the {obj} cleanly in half, sparks flying, revealing its inner structure in cross-section.', state: 'the {obj} cut in two halves with the interior visible, still dirty', audio: 'a grinder whine and spraying sparks' },
        2: { action: 'Both dirty halves are scrubbed clean inside and out until the inner {mat} details shine.', state: 'both halves of the {obj} clean, interior visible' },
        3: { action: 'The two clean halves are set side by side on stands with their interior facing the camera.', state: 'both clean halves standing side by side, interior facing the camera', audio: 'soft clinks of the halves being set onto stands' },
        5: { state: 'the cut-open {obj} displayed as two polished halves side by side, inner details visible' },
      },
      luxury: { 5: { action: 'A thin blade slices the finished {obj} in half, revealing the precision craftsmanship inside, while the camera glides in.', state: 'the finished {obj} cut in half, its precise interior visible', audio: 'a clean slicing sound and a soft chime' } },
      'mini-world': { 5: { action: 'A thin blade slices the finished miniature in half, revealing the tiny furnished interior while the camera glides in.', state: 'the miniature {obj} cut in half, tiny interior visible', audio: 'a clean slicing sound and a soft chime' } },
    },
  },
  'asmr-tapping': {
    beats: {
      restoration: {
        0: { audio: 'amplified fingertip tapping and fingernail scratching on the surface' },
        1: { audio: 'amplified screwdriver taps and each screw dropping, close-mic sound' },
        2: { audio: 'amplified brush scratching and tiny foam bubbles popping' },
        3: { audio: 'amplified clicks and snaps of parts fitting together' },
        4: { audio: 'amplified squeaky microfiber rubbing' },
        5: { audio: 'gentle knocking on the finished surface with a clean resonant tap' },
      },
      treasure: {
        0: { audio: 'amplified fingertip tapping on stone and soft scratching' },
        1: { audio: 'amplified brush strokes on carved stone with dust whispering' },
        2: { audio: 'amplified shovel scraping and soil crumbling' },
        3: { audio: 'amplified soil crumbling and tiny pebbles dropping' },
        4: { audio: 'amplified soft brushing across metal' },
        5: { audio: 'a light resonant knock on the revealed treasure' },
      },
    },
  },
  'time-reverse': {
    beats: {
      restoration: { 5: { action: 'A rewind effect: the pristine {obj} un-restores in reverse motion as dirt and rust creep back, then the clip snaps forward again to the clean result in a satisfying loop.', audio: 'a tape-rewind whirr and a bright snap' } },
      construction: { 5: { action: 'A rewind effect: the finished {obj} deconstructs in reverse motion back to the empty lot, then snaps forward to the finished building.', audio: 'a tape-rewind whirr and a warm swell' } },
      evolution: { 5: { action: 'A rewind effect: it rewinds through its earlier forms back to the start, then snaps forward into its final majestic form.', audio: 'a tape-rewind whirr and a powerful note' } },
    },
  },
};

// ---------------------------------------------------------------------------
// Utilitas
// ---------------------------------------------------------------------------
const SPANS: Record<number, [number, number][]> = {
  1: [[0, 5]],
  2: [[0, 2], [3, 5]],
  3: [[0, 1], [2, 3], [4, 5]],
  6: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]],
};

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const stripDot = (s: string) => s.replace(/[.\s]+$/, '');
const cleanMaterial = (m: string) => (m || 'Metal').replace(/\s*\([^)]*\)/g, '').trim() || 'Metal';

const TIPS: Record<SceneMethod, string> = {
  start: 'Buat klip BARU (teks-ke-video). Opsional: pakai gambar keyframe awal sebagai frame awal.',
  extend: 'Pakai EXTEND pada klip sebelumnya (bukan klip baru), lalu tempel prompt ini.',
  chain: 'Ambil FRAME TERAKHIR klip sebelumnya, jadikan frame awal klip BARU, lalu tempel prompt ini.',
};

interface Ctx { obj: string; objFull: string; mat: string; cond: string; env: string }
function fill(text: string, c: Ctx): string {
  return text
    .split('{objFull}').join(c.objFull)
    .split('{obj}').join(c.obj)
    .split('{mat}').join(c.mat)
    .split('{cond}').join(c.cond)
    .split('{env}').join(c.env);
}

// ---------------------------------------------------------------------------
// Generator
// ---------------------------------------------------------------------------
export function generateStoryboard(input: GeneratorInput): Storyboard {
  const niche = input.niche;
  const bp = BLUEPRINTS[niche];
  const numScenes = Math.max(1, Math.round(input.duration / 10));
  const spans = SPANS[numScenes] ?? SPANS[3];
  const notes: string[] = [];

  // Bahasa Inggris untuk nilai prompt
  const objKnown = input.objectName in OBJECT_EN;
  const condKnown = input.condition in CONDITION_EN;
  const obj = OBJECT_EN[input.objectName] ?? input.objectName;
  const cond = CONDITION_EN[input.condition] ?? input.condition ?? 'aged';
  const mat = cleanMaterial(input.material);
  const env = ENV_EN[input.environment] ?? input.environment;
  const ctx: Ctx = { obj, objFull: `${obj} (made of ${mat})`, mat, cond, env };

  if (!objKnown) notes.push('Nama objek tidak ada di kamus terjemahan. Untuk hasil terbaik tulis nama objek dalam bahasa Inggris (contoh: "rusty toy Porsche car").');
  if (!condKnown && input.condition) notes.push('Kondisi awal tidak ada di kamus terjemahan, dipakai apa adanya.');

  // Hook
  const hookKey = input.viralHook || 'none';
  const hookMeta = viralHooks.find((h) => h.value === hookKey);
  let hook: HookDef = HOOKS.none;
  if (hookKey !== 'none') {
    if (isHookCompatible(hookKey, niche)) hook = HOOKS[hookKey];
    else notes.push(`Hook "${hookMeta?.label ?? hookKey}" tidak cocok untuk niche ini sehingga diabaikan.`);
  }
  const ov = (beat: number): Override => hook.beats[niche]?.[beat] ?? {};
  const actionOf = (beat: number) => ov(beat).action ?? bp.beats[beat].action;
  const audioOf = (beat: number) => ov(beat).audio ?? bp.beats[beat].audio;
  const stateAfter = (beat: number) => ov(beat).state ?? bp.states[beat + 1];
  const stateBefore = (beat: number) => (beat === 0 ? hook.open?.[niche] ?? bp.states[0] : stateAfter(beat - 1));

  if (hookKey !== 'none' && hook !== HOOKS.none) {
    const beats = Object.keys(hook.beats[niche] ?? {}).map(Number).sort((a, b) => a - b);
    const hasOpen = !!hook.open?.[niche];
    if (beats.length || hasOpen) {
      const where = beats.map((b) => bp.beats[b].title).join(', ');
      notes.push(`Hook "${hookMeta?.label}" diterapkan di: ${[hasOpen ? 'OPENING' : '', where].filter(Boolean).join(', ')}.${numScenes < 6 ? ' Pada durasi < 60 detik, beat bisa digabung dalam satu klip.' : ''}`);
    }
  }

  // Metode per transisi (selang-seling otomatis)
  const methods: SceneMethod[] = [];
  let seg = 1;
  spans.forEach(([, last], i) => {
    if (i === 0) { methods.push('start'); return; }
    const prevEnd = spans[i - 1][1];
    let m: Join = bp.joins[prevEnd];
    if (m === 'extend' && seg >= MAX_EXTEND_CLIPS) m = 'chain';
    methods.push(m);
    seg = m === 'extend' ? seg + 1 : 1;
  });

  const style = input.style || 'Photorealistic';
  const camera = input.camera || 'Cinematic';
  const lighting = input.lighting || 'Natural';
  const detail = input.detailLevel || 'High Detail';
  const ratio = input.aspectRatio || '9:16';

  const scenes: Scene[] = spans.map(([a, b], i) => {
    const method = methods[i];
    const single = numScenes === 1;

    const startState = fill(stateBefore(a), ctx);
    const endState = fill(stateAfter(b), ctx);

    // Aksi + audio
    let action: string;
    let audio: string;
    if (single) {
      action = bp.oneClip.action;
      audio = bp.oneClip.audio;
      const firstOv = [0, 1, 2, 3, 4, 5].map(ov).find((o) => o.action);
      if (firstOv?.action) action = `${stripDot(action)}. Include this signature effect: ${lowerFirst(firstOv.action)}`;
    } else {
      const idx = Array.from({ length: b - a + 1 }, (_, k) => a + k);
      action = idx.map((k, n) => (n === 0 ? actionOf(k) : `Then ${lowerFirst(actionOf(k))}`)).join(' ');
      audio = idx.map(audioOf).join(', then ');
    }
    action = fill(action, ctx);
    audio = fill(audio, ctx);

    const skipCamera = bp.beats[b].ownCamera === true;
    const cameraLine = skipCamera ? '' : ` Camera: ${camera}.`;

    let prompt: string;
    if (method === 'start') {
      const settingLine = startState.includes(env) ? '' : ` Setting: ${env}.`;
      prompt =
        `${upperFirst(startState)}. ${action}` +
        `${settingLine}${cameraLine} Visual style: ${style}, ${lighting} lighting, ${detail}. Aspect ratio ${ratio}.` +
        ` Audio: ${audio}. The clip ends on: ${endState}.`;
    } else if (method === 'extend') {
      prompt =
        `Continue the same shot without a cut. ${action}` +
        ` Keep the ${obj}, the setting and the ${lighting} lighting unchanged.${cameraLine}` +
        ` Audio: ${audio}. The clip ends on: ${endState}.`;
    } else {
      prompt =
        `Starting from the provided first frame, ${lowerFirst(action)}` +
        ` Same ${obj}, same setting (${env}), same ${lighting} lighting.${cameraLine} Visual style: ${style}.` +
        ` Audio: ${audio}. The clip ends on: ${endState}.`;
    }

    const titles = Array.from({ length: b - a + 1 }, (_, k) => bp.beats[a + k].title);
    const title = single ? 'FULL TRANSFORMATION' : titles.join(' + ');
    const hookTag = hookKey !== 'none' && hook !== HOOKS.none && hookMeta ? ` [${hookMeta.icon} ${hookMeta.label}]` : '';

    const keyframe = (state: string) =>
      `${style} image of ${state}.${state.includes(env) ? '' : ` ${upperFirst(env)},`} ${lighting} lighting, ${detail}.`;

    return {
      id: i + 1,
      title: `${title}${hookTag}`,
      description: prompt.replace(/\s+/g, ' ').trim(),
      duration: 10,
      method,
      tip: TIPS[method],
      startFrame: keyframe(startState),
      endFrame: keyframe(endState),
    };
  });

  return {
    projectName: input.projectName || 'Untitled Project',
    totalDuration: input.duration,
    aspectRatio: ratio as AspectRatio,
    scenes,
    notes,
  };
}
