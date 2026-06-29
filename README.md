# People Watching Club

The web front-end and Cloud Functions for the People Watching Club.

## Hosting & domain
- **Firebase project id:** `people-watching-club`
- **Custom domain:** [thepeoplewatchingclub.com](https://thepeoplewatchingclub.com)
- Default Firebase Hosting URL: https://people-watching-club.web.app/

## Front-end
- The site is a single static page: `public/index.html`.
- The Firebase **web app config / `apiKey` is embedded directly in
  `public/index.html`** (this is a public client identifier, safe to commit).

## Cloud Functions
This repo also contains the **email-notification Cloud Function** under
[`functions/`](functions/). It listens for new Firestore documents (members,
RSVPs, field notes) and emails a notification.

- The Gmail app password is provided at runtime via the Firebase secret
  `GMAIL_APP_PASSWORD` — it is **never** stored in this repo.

## Layout
```
public/        Static site (index.html)
functions/     Firestore-triggered email notification Cloud Functions
firebase.json  Hosting + Functions config
```
