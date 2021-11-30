This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Add `.env.local` in the root and specify:

- Relative path to SC apps, eg: `NEXT_PUBLIC_APPS_RELATIVE_PATH=../../SC`
- List of repos you want to view, eg: `NEXT_PUBLIC_APPS=diego-web tango-web-onboarding`

### Add new config

- Under `/config` create new config
- Include it in `/config/index.js` and `NEXT_PUBLIC_APPS` list

### Install and startup

`yarn && yarn dev`
