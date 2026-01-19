# Google Calendar Integration Guide

> **Context**: This project uses a **Personal Google Account** (`benjaminrm14032018@gmail.com`) to manage availability and handle Google Meet logic, while ensuring users perceive communications as professional where possible.

## 1. Architecture Overview

- **Auth Provider**: Google Cloud Console Project (Personal Account).
- **Service Type**: Server-to-Server (Offline Access via Refresh Token).
- **Primary Calendar**: The personal Gmail calendar acts as the "Source of Truth" for availability.
- **Meeting Provider**: Google Meet (auto-generated links).
- **Notifications**:
  - **Invites:** Sent natively by Google Calendar (from `@gmail.com`).
  - **App Confirmations:** Sent via Resend (from `contacto@appcreatorbr.com`).

---

## 2. Implementation Components

### A. Authentication Client (`lib/google/calendar.ts`)
To interact with the API, we use a cached authenticated client.

**Requirements:**
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN` (Stored in `app_config` or env)

```typescript
import { google } from 'googleapis';

// 1. Setup OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_SITE_URL
);

// 2. Load Refresh Token (Long-lived)
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// 3. Export generic client
export const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
```

### B. Checking Availability (`/api/calendar/available-slots`)
Logic to find free time slots without exposing the entire calendar.

**Steps:**
1.  **Define Bounds**: Start/End of day (e.g., 9 AM - 6 PM Mexico City Time).
2.  **Query FreeBusy**: Ask Google for busy periods.
    ```typescript
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        timeZone: 'America/Mexico_City',
        items: [{ id: 'primary' }], // Uses the auth account's calendar
      },
    });
    ```
3.  **Generate Slots**: Create array of potential slots (e.g., every 30 mins).
4.  **Filter**: Remove slots that overlap with `busy` ranges returned by Google.

### C. Booking & Event Creation (`/api/calendar/create-event`)
Logic to actually schedule the meeting.

**Key Parameters for `events.insert`:**

| Parameter | Value | Purpose |
| :--- | :--- | :--- |
| `calendarId` | `'primary'` | Books on the personal calendar. |
| `sendUpdates` | `'all'` | **CRITICAL**: Triggers Google's native email invites to all attendees. |
| `conferenceData`| `{ createRequest: { requestId: '...', conferenceSolutionKey: { type: 'hangoutsMeet' } } }` | Generates the Google Meet link. |
| `attendees` | `[{ email: 'user@email.com' }, { email: 'contacto@appcreatorbr.com' }]` | Invites the user AND your professional email (so it appears on both calendars). |

```typescript
const event = {
  summary: `Discovery Call: ${userName}`,
  description: `Meeting with ${userEmail}.`,
  start: { dateTime: isoStart, timeZone: 'America/Mexico_City' },
  end: { dateTime: isoEnd, timeZone: 'America/Mexico_City' },
  attendees: [
    { email: userEmail },
    { email: 'contacto@appcreatorbr.com' } // Ensures professional calendar copy
  ],
  conferenceData: { ... } // See table above
};
```

---

## 3. Notification Strategy (The "Hybrid" Approach)

To maintain professionalism while using personal infrastructure:

1.  **The Calendar Invite (Functional)**:
    - **Sender**: `benjaminrm14032018@gmail.com` (Cannot be changed without Google Workspace).
    - **Purpose**: Adds to user's calendar, provides Meet link.
    - **User Perception**: Acceptable for "Google Calendar" interactions.

2.  **The Confirmation Email (Branding)**:
    - **Sender**: `contacto@appcreatorbr.com` (via Resend).
    - **Purpose**: "Thanks for booking", specific instructions, professional touch.
    - **Implementation**: Triggered immediately after the calendar API success response.

---

## 4. How to Reuse This Skill

To add booking functionality to another part of the app (e.g., "Premium Support Call"):

1.  **Frontend**:
    - Copy logic from `CalendarBooking.tsx`.
    - Allow custom duration selection (just change the `end` time calculation in the API).
2.  **Backend**:
    - The `available-slots` endpoint is generic; reuse it.
    - Create a new route (e.g., `create-support-event`) if you need different meeting metadata (different title, duration, or description).
3.  **Env**:
    - Ensure `GOOGLE_REFRESH_TOKEN` is valid. If auth fails, generate a new token via OAuth Playground.
