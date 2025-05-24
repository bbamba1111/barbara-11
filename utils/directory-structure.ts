/**
 * This file provides an overview of the project's directory structure.
 * It's for documentation purposes only and is not used in the application.
 */

export const directoryStructure = {
  app: {
    "globals.css": "Global styles including Tailwind CSS configuration",
    "layout.tsx": "Root layout with navigation header",
    "page.tsx": "Home page with audit button",
    "join-us": {
      "page.tsx": "Join Us page with confetti and countdown",
    },
    "learn-more": {
      "page.tsx": "Learn More page with program details",
    },
    "my-results": {
      "page.tsx": "Previous audit results page",
    },
    api: {
      "send-email": {
        "route.ts": "API route for sending emails",
      },
    },
    actions: {
      "send-email.ts": "Server action for sending emails",
    },
  },
  components: {
    "beta-invitation.tsx": "Beta invitation component",
    "cherry-blossom-confetti.tsx": "Enhanced confetti animation",
    "countdown-timer.tsx": "Countdown to next event",
    "follow-up-popup.tsx": "Follow-up popup with confetti",
    "improved-description.tsx": "Improved program description",
    "nav-header.tsx": "Navigation header component",
    "previous-results.tsx": "Previous results component",
    "results-confetti.tsx": "Confetti for results page",
    "work-life-balance-audit.tsx": "Main audit component",
    ui: {
      "button.tsx": "Button component",
      "button-link.tsx": "Button link component",
      "card.tsx": "Card component",
      "dialog.tsx": "Dialog component",
      "progress.tsx": "Progress bar component",
      // Other UI components
    },
  },
  utils: {
    "audit-storage.ts": "Utilities for storing audit results",
    "generate-cherry-blossom-prompt.ts": "Generate prompts for Cherry Blossom",
    "generate-html.ts": "Generate HTML for audit results",
    "generate-pdf.ts": "Generate PDF for audit results",
    "directory-structure.ts": "This file - documentation of project structure",
  },
  public: {
    images: {
      "logo.png": "Make Time For More logo",
    },
  },
}
