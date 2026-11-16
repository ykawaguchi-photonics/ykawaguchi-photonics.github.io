// Field animations shown on the site. Generated from saved simulation data by
// photonics-simulation-toolkit/scripts/blog_figures/field_animations.py --theme aiaka
// (vermilion = Re{Hz} > 0, indigo = Re{Hz} < 0). Captions state only what that data shows.
import heroMp4 from "../assets/animations/topological_hero.mp4?url";
import heroWebm from "../assets/animations/topological_hero.webm?url";
import heroPoster from "../assets/animations/topological_hero_poster.png";
import ringMp4 from "../assets/animations/ring_add_drop.mp4?url";
import ringWebm from "../assets/animations/ring_add_drop.webm?url";
import ringPoster from "../assets/animations/ring_add_drop_poster.png";

export const clips = {
  topological: {
    mp4: heroMp4,
    webm: heroWebm,
    poster: heroPoster,
    en: "Valley-Hall domain wall driven by a σ− circularly polarized dipole: light leaves to the right only. Re{Hz} over one optical period, 2D FDTD (Meep).",
    ja: "バレーホール型ドメイン壁を σ− 円偏光ダイポールで励振。光は右方向にだけ伝搬する。Re{Hz} の 1 光周期、2D FDTD (Meep)。",
  },
  ring: {
    mp4: ringMp4,
    webm: ringWebm,
    poster: ringPoster,
    en: "Add-drop ring resonator from the toolkit, R = 5 µm. On resonance (left, 1369.3 nm) light builds up in the ring and leaves through the drop port; off resonance (right, 1330.6 nm) it passes straight through.",
    ja: "ツールキットのアドドロップ型リング共振器（R = 5 µm）。共振時（左, 1369.3 nm）は光がリングに溜まり drop ポートへ、非共振時（右, 1330.6 nm）はそのまま through へ抜ける。",
  },
};
export type ClipName = keyof typeof clips;
