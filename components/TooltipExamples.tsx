export const TOOLTIP_EXAMPLES = {
  // When user first opens browser/external app
  FLOATING_BUTTON: {
    title: "Quick Fill Button",
    message: "Tap here if autofill doesn't appear. This button gives you quick access to fill any form field.",
    arrowDirection: "down" as const,
  },

  // When user first sees business card
  BUSINESS_CARD: {
    title: "Your Business Card",
    message: "Tap to view full details, or use the buttons to quickly edit or copy information.",
    arrowDirection: "up" as const,
  },

  // When user first sees add button
  ADD_BUSINESS: {
    title: "Add Your Business",
    message: "Add your first business profile here. You can add multiple businesses and switch between them anytime.",
    arrowDirection: "down" as const,
  },

  // When copy sheet first appears
  COPY_SHEET: {
    title: "Business Info Ready",
    message: "Your business information has been copied! Paste it into any form field to fill it instantly.",
    arrowDirection: "up" as const,
  },

  // When user first sees settings
  SETTINGS_BUTTON: {
    title: "Settings",
    message: "Manage your default business, autofill preferences, and export your data here.",
    arrowDirection: "down" as const,
  },
};