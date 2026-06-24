# AgriBridge Project Structure

This project uses a simple Next.js App Router structure. Keep it easy to follow: routes live in `app`, reusable UI lives in `components`, static images live in `public/images`, helpers live in `lib`, and shared TypeScript types live in `types`.

## `src/app`

Use `app/` for routes and route layouts. Route files should stay small. If a page gets large, move the page UI into a component and import it from the route.

Example:

```tsx
import { LoginPage } from "@/components/auth/LoginPage";

export default function AuthLoginRoute() {
  return <LoginPage />;
}
```

## `src/components/landing`

Landing page sections live here. The landing page is organized as a simple composition of section components like `HeroSection`, `HowItWorksSection`, `StatsSection`, `FAQSection`, and `Footer`.

## `src/components/auth`

Auth page components and obvious shared auth UI live here. Use this folder for login, register, forgot password, OTP, side panels, language switch UI, password inputs, and OTP inputs.

## `src/components/ui`

Generic reusable UI components live here, such as `Button`, `Input`, `Select`, `Textarea`, `FormField`, and `Modal`. Do not turn this into a large design system unless the app needs it.

## Images And Assets

Put static images in `public/images`:

- `public/images/brand`
- `public/images/landing`
- `public/images/auth`

Reference images with root paths like `/images/brand/agribridge-logo.png`.

## Add A New Page

Create the route in `src/app`. If the page is simple, keep it there. If it is large, create a matching component under `src/components/<area>` and import it from the route.

## Add A Reusable Component

Put general UI in `src/components/ui`. Put page-area components in folders like `src/components/landing` or `src/components/auth`.

## Avoid Messy Imports

Use the existing `@/*` alias for source imports. Prefer `@/components/auth/LoginPage` over long relative paths.

## Simple Rule

- `app/` = routes
- `components/` = reusable UI
- `public/images/` = static images
- `lib/` = helpers/constants/mock data
- `types/` = shared TypeScript types
