// ============================================================
//  WEDDING CONFIGURATION — Edit this file to update all details
//  across the entire invite in one place.
// ============================================================

export const weddingConfig = {
  // ── Couple ──────────────────────────────────────────────
  bride: {
    fullName: "Mansi Gupta",
    firstName: "Mansi",
    father: "Shri ABC Gupta",
    mother: "Smt. ABC Gupta",
    grandfather: "Shri ABC Gupta",
    grandmother: "Smt. ABC Gupta",
  },

  groom: {
    fullName: "Tanuj Goyal",
    firstName: "Tanuj",
    father: "Shri Anil Goyal",
    mother: "Smt. Anu Goyal",
    grandfather: "Late Shri Kanta Pershad Gupta",
    grandmother: "Late Smt. Susheela Devi",
  },

  // ── Wedding Date ─────────────────────────────────────────
  weddingDate: "2026-12-05T00:00:00",   // ISO format — used for countdown timer
  weddingDateDisplay: "5th December 2026",
  weddingDay: "Saturday",

  // ── Ceremonies ───────────────────────────────────────────
  ceremonies: {
    engagement: {
      title: "Engagement",
      titleHindi: "सगाई",
      date: "29th November 2026",
      day: "Sunday",
      time: "6:00 PM onwards",
      venue: "Rutba",
      address: "Vasundhara, Ghaziabad",
      mapUrl: "https://maps.google.com/?q=Rutba+CP-08+Sector+18+Vasundhara+Ghaziabad",
      /** Place your photo in /public and set the filename, e.g. "/engagement.jpg" */
      image: "",
    },
    mehendiSangeet: {
      title: "Mehendi & Ladies Sangeet",
      titleHindi: "मेहंदी व संगीत",
      date: "3rd December 2026",
      day: "Wednesday",
      time: "6:00 PM onwards",
      venue: "Vaishali Inn",
      address: "Vaishali, Ghaziabad",
      mapUrl: "https://maps.google.com/?q=Vaishali+Inn+Vaishali+Ghaziabad",
      /** Dress code / colour theme shown on the card so guests can plan their outfits */
      theme: "Multicolor",
      themeNote: "Wear your brightest, most vibrant festive colours!",
      /** Rendered as ONE swatch with a multicolour gradient — i.e. many colours on one outfit */
      themeSwatch: "linear-gradient(135deg, #7C3AED 0%, #DB2777 25%, #F97316 50%, #FACC15 75%, #0D9488 100%)",
      /** Place your photo in /public and set the filename, e.g. "/mehendi.jpg" */
      image: "",
    },
    haldi: {
      title: "Haldi Ceremony",
      titleHindi: "हल्दी",
      date: "4th December 2026",
      day: "Thursday",
      time: "11:00 AM onwards",
      venue: "Vaishali Inn",
      address: "Vaishali, Ghaziabad",
      mapUrl: "https://maps.google.com/?q=Vaishali+Inn+Vaishali+Ghaziabad",
      /** Dress code / colour theme shown on the card so guests can plan their outfits */
      theme: "Pink",
      themeNote: "Come dressed in shades of pink",
      /** Rendered as ONE swatch — soft-to-deep pink */
      themeSwatch: "linear-gradient(135deg, #F9D5E0 0%, #E8A0B0 45%, #C2185B 100%)",
      /** Place your photo in /public and set the filename, e.g. "/haldi.jpg" */
      image: "",
    },
    ghurChari: {
      title: "Ghur Chari",
      titleHindi: "घुड़चढ़ी",
      date: "5th December 2026",
      day: "Saturday",
      time: "5:00 PM onwards",
      venue: "Vaishali Inn",
      address: "Vaishali, Ghaziabad",
      mapUrl: "https://maps.google.com/?q=Vaishali+Inn+Vaishali+Ghaziabad",
      /** Place your photo in /public and set the filename, e.g. "/ghurchari.jpg" */
      image: "",
    },
    wedding: {
      title: "Wedding Ceremony",
      titleHindi: "विवाह",
      date: "5th December 2026",
      day: "Saturday",
      time: "7:00 PM onwards",
      venue: "Wedding Crown",
      address: "Sector 76, Noida",
      mapUrl: "https://maps.google.com/?q=Wedding+Crown+Sector+76+Noida",
      /** Place your photo in /public and set the filename, e.g. "/wedding.jpg" */
      image: "/a.jpg",
    },
  },

  // ── Photo Gallery ────────────────────────────────────────
  //  Replace these with your own photos: drop files in /public and use "/photo1.jpg" etc.
  gallery: [
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=80", caption: "A love story written in the stars" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80", caption: "Every moment with you is a treasure" },
    { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80", caption: "Together is our favourite place to be" },
    { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=900&q=80", caption: "You are my today and all of my tomorrows" },
    { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=900&q=80", caption: "In your arms I have found my home" },
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80", caption: "You complete me" },
    { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=80", caption: "Our journey together" },
    { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&q=80", caption: "Two hearts, one soul" },
  ],

  // ── Couple photo for the hero screen (place file in /public) ──
  couplePhoto: "/a.jpg",

  // ── Venues (for the Venue Details section) ───────────────
  venues: [
    {
      id: 3,
      name: "Rutba",
      address: "Sector 18, Vasundhara, Ghaziabad",
      events: ["Engagement"],
      dates: "29 November 2026",
      motif: "ring",
      color: "#B8860B",
      mapUrl: "https://maps.google.com/?q=Rutba+CP-08+Sector+18+Vasundhara+Ghaziabad",
    },
    {
      id: 1,
      name: "Vaishali Inn",
      address: "Sector-4, Vaishali, Ghaziabad",
      events: ["Mehendi & Sangeet", "Haldi Ceremony", "Ghur Chari"],
      dates: "3 – 5 Dec 2026",
      motif: "mehendi",
      color: "#2D6A4F",
      mapUrl: "https://maps.google.com/?q=Vaishali+Inn+Vaishali+Ghaziabad",
    },
    {
      id: 2,
      name: "Wedding Crown",
      address: "Sector 76, Noida",
      events: ["Wedding Ceremony"],
      dates: "5th December 2026",
      motif: "mandap",
      color: "#6B0F1A",
      mapUrl: "https://maps.google.com/?q=Wedding+Crown+Sector+76+Noida",
    },
  ],

  // ── Background Music ─────────────────────────────────────
  music: {
    /**
     * URL or local path to the background music file.
     * • Online URL  → "https://example.com/song.mp3"
     * • Local file  → place the file in the /public folder and use "/your-song.mp3"
     */
    src: "/music.mp3",
    /** Playback volume: 0.0 (silent) → 1.0 (full) */
    volume: 0.5,
  },

  // ── RSVP / Contact ───────────────────────────────────────
  rsvp: {
    whatsappNumber: "+919818335572",   // Country code + number, no + or spaces
    message: "Hello! I would like to confirm my attendance at Tanuj & Mansi's wedding on 5th December 2026.",
  },
} as const;

// Convenience shorthand
export const { bride, groom, ceremonies, venues, rsvp, gallery, couplePhoto, weddingDateDisplay, weddingDay, weddingDate } = weddingConfig;

/**
 * Shape shared by every ceremony entry — handy for generic components.
 * Dress-code fields are optional: only ceremonies with a theme define them.
 */
type CeremonyEntry = (typeof weddingConfig.ceremonies)[keyof typeof weddingConfig.ceremonies];
export type Ceremony = CeremonyEntry & {
  theme?: string;
  themeNote?: string;
  /** CSS background for a single fabric swatch (solid colour or gradient) */
  themeSwatch?: string;
};
