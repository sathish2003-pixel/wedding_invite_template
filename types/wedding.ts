export type ThemeName =
  | "rose-gold"
  | "royal-blue"
  | "emerald"
  | "midnight"
  | "blush"
  | "saffron";

export type LanguageCode = "en" | "hi" | "ta" | "te" | "kn" | "ml";

export type PlanType = "free" | "premium" | "premium_plus";

export type TemplateNumber = 1 | 2 | 3 | 4 | 5 | 6;

export interface ThemeColors {
  primary: string;
  accent: string;
  bg: string;
  dark: string;
  name: string;
  description: string;
}

export interface EventData {
  name: string;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  mapsLink: string;
  dressCode: string;
}

export interface WeddingFormData {
  brideName: string;
  groomName: string;
  brideFamily: string;
  groomFamily: string;
  loveStory: string;
  couplePhoto: string;
  hashtag: string;
  customMessage: string;
  language: LanguageCode;
  events: EventData[];
  gallery: string[];
  template: TemplateNumber;
  colorTheme: ThemeName;
  musicEnabled: boolean;
  musicTrack: string | null;
  rsvpEnabled: boolean;
  rsvpDeadline: string;
  plan: PlanType;
  slug: string;
}

export interface WeddingDocument extends WeddingFormData {
  _id: string;
  meta: {
    createdAt: string;
    expiresAt: string | null;
    views: number;
    coupleEmail: string;
    isPublished: boolean;
  };
}

export interface RSVPData {
  guestName: string;
  guestCount: number;
  mealPreference?: "veg" | "non-veg";
  message: string;
}

export interface RSVPDocument extends RSVPData {
  _id: string;
  weddingSlug: string;
  submittedAt: string;
}

export interface MusicTrack {
  id: string;
  name: string;
  artist: string;
  movie: string;
}

export interface BuilderStore extends WeddingFormData {
  currentStep: 1 | 2 | 3 | 4 | 5;
  isPublishing: boolean;
  isPublished: boolean;
  publishedUrl: string | null;

  setField: <K extends keyof WeddingFormData>(
    key: K,
    value: WeddingFormData[K]
  ) => void;
  setStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  addEvent: () => void;
  removeEvent: (index: number) => void;
  updateEvent: (
    index: number,
    field: keyof EventData,
    value: string
  ) => void;
  togglePhoto: (url: string) => void;
  reorderPhotos: (from: number, to: number) => void;
  setTheme: (theme: ThemeName) => void;
  setTemplate: (template: TemplateNumber) => void;
  publish: () => Promise<void>;
  reset: () => void;
}
