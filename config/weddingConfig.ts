// ============================================================
//  WEDDING CONFIGURATION — Edit this file to update all details
//  across the entire invite in one place.
// ============================================================

export const weddingConfig = {
  // ── Couple ──────────────────────────────────────────────
  bride: {
    fullName: "Mansi Gupta",
    firstName: "Mansi",
    father: "Shri Rajesh Gupta",
    mother: "Smt. Sunita Gupta",
    grandfather: "Late Shri Ram Prasad Gupta",
    grandmother: "Smt. Savitri Gupta",
  },

  groom: {
    fullName: "Tanuj Goyal",
    firstName: "Tanuj",
    father: "Shri Suresh Goyal",
    mother: "Smt. Rekha Goyal",
    grandfather: "Late Shri Mohan Lal Goyal",
    grandmother: "Smt. Kamla Goyal",
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
      time: "11:00 AM onwards",
      venue: "Vaishali Inn",
      address: "Vaishali, Ghaziabad",
      mapUrl: "https://maps.google.com/?q=Vaishali+Inn+Vaishali+Ghaziabad",
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
    },
    ghurChari: {
      title: "Ghur Chari",
      titleHindi: "घुड़चढ़ी",
      date: "5th December 2026",
      day: "Saturday",
      time: "5:00 PM onwards",
      venue: "Wedding Crown",
      address: "Sector 76, Noida",
      mapUrl: "https://maps.google.com/?q=Wedding+Crown+Sector+76+Noida",
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
    },
  },

  // ── Venues (for the Venue Details section) ───────────────
  venues: [
    {
      id: 1,
      name: "Vaishali Inn",
      address: "Vaishali, Ghaziabad",
      events: ["Engagement", "Mehendi & Sangeet", "Haldi Ceremony"],
      dates: "29 Nov – 4 Dec 2026",
      emoji: "🌿",
      color: "#2D6A4F",
      mapUrl: "https://maps.google.com/?q=Vaishali+Inn+Vaishali+Ghaziabad",
    },
    {
      id: 2,
      name: "Wedding Crown",
      address: "Sector 76, Noida",
      events: ["Ghur Chari", "Wedding Ceremony"],
      dates: "5th December 2026",
      emoji: "👑",
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
    whatsappNumber: "919999999999",   // Country code + number, no + or spaces
    message: "Hello! I would like to confirm my attendance at Mansi & Tanuj's wedding on 5th December 2026. 🎊",
  },
} as const;

// Convenience shorthand
export const { bride, groom, ceremonies, venues, rsvp, weddingDateDisplay, weddingDay, weddingDate } = weddingConfig;
