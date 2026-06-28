# AgriBridge Frontend

AgriBridge is a clean Next.js + React + TypeScript + Tailwind CSS skeleton for a trusted B2B agricultural trade platform. It connects farmers with commercial buyers and includes placeholders for quality officer and admin workflows.

The backend is not connected yet. All pages use mock data from `src/lib/mock-data.ts`, and future backend integration should start from the placeholder API layer in `src/lib/api.ts`.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Mock data and placeholder API functions

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful checks:

```bash
npm run type-check
npm run lint
npm run build
```

On Windows PowerShell, if `npm` is blocked by script execution policy, use `npm.cmd`:

```bash
npm.cmd install
npm.cmd run dev
```

## Folder Structure

```text
src/
  app/                 App Router pages and role routes
  components/
    auth/              Auth pages and shared auth UI
    landing/           Landing page sections
    layout/            AppHeader, PublicNavbar, DashboardSidebar, DashboardShell
    shared/            PageHeader, cards, badges, table, empty state
    ui/                Button, Input, Select, Textarea, FormField, Modal
  lib/                 API placeholders, mock data, navigation, auth placeholder, format helpers
  types/               Shared TypeScript domain types
```

See [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) for the short team guide.

## Available Pages

Public:

- `/`
- `/marketplace`
- `/marketplace/listing-1`
- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/auth/otp`
- `/login`
- `/register`

Farmer:

- `/farmer/dashboard`
- `/farmer/listings`
- `/farmer/listings/create`
- `/farmer/rfqs`
- `/farmer/deals`
- `/farmer/messages`
- `/farmer/profile`

Buyer:

- `/buyer/dashboard`
- `/buyer/browse-listings`
- `/buyer/rfqs`
- `/buyer/rfqs/create`
- `/buyer/deals`
- `/buyer/messages`
- `/buyer/profile`

Quality Officer:

- `/officer/dashboard`
- `/officer/inspections`
- `/officer/inspections/inspection-1`
- `/officer/inspections/inspection-1/report`

Admin:

- `/admin/dashboard`
- `/admin/users`
- `/admin/deals`
- `/admin/inspections`
- `/admin/disputes`
- `/admin/revenue`
- `/admin/settings`

## Mock Data

The project includes realistic placeholder data for:

- 5 farmers
- 5 buyers
- 8 listings
- 5 RFQs
- 6 deals with different statuses
- 4 inspection assignments
- 3 disputes
- Admin dashboard statistics

## Next Implementation Steps

- Add real authentication, session handling, and route protection.
- Replace `src/lib/api.ts` mock functions with backend endpoints.
- Add form validation and submit handlers.
- Implement listing, RFQ, quote, deal, inspection, dispute, and review mutations.
- Add file uploads for product images and inspection evidence.
- Connect realtime messaging and notifications.
- Integrate a real escrow or payment provider.
- Add tests for shared components, API adapters, and critical workflows.
