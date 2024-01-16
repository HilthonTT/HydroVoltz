# HydroVoltz Chat App

HydroVoltz is a chat application that enables you to communicate with friends via text and calls. It's built using Next.js 14 with real-time functionality powered by Pusher. The database is managed using MySQL through the Prisma ORM, styled with Tailwind CSS, and utilizes Clerk for authentication. Livekit is integrated for voice/video calls, and the logo is provided by logodust.

# Demonstration
![image](https://github.com/HilthonTT/HydroVoltz/assets/118371200/f495ab09-63b2-46a7-a788-cc50c1e28b97)
![image](https://github.com/HilthonTT/HydroVoltz/assets/118371200/269bcd54-11b6-4ba4-ba1e-28fcb5ab4517)

## Setup

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLERK_WEBHOOK_SECRET=

# Database
DATABASE_URL=

# Livekit Configuration
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=

# Site URL
NEXT_PUBLIC_SITE_URL=

# Pusher Configuration
PUSHER_APP_ID=
PUSHER_APP_SECRET=
NEXT_PUBLIC_PUSHER_CLUSTER=
NEXT_PUBLIC_PUSHER_APP_KEY=

# UploadThing Configuration
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# Stripe Configuration
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
```

```bash
git clone https://github.com/HilthonTT/HydroVoltz.git
cd HydroVoltz
```

```bash
npm install
# or
yarn install
```


```bash
npx prisma generate
npx prisma db push
```

```bash
npm run dev
# or
yarn dev
```
