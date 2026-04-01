# REZIIZI PROJECT

> **ახალი ჩატი / სწრაფი ორიენტაცია:** გადახედე **[`AGENTS.md`](AGENTS.md)** (სად რა წერია, რა ეტაპზე ვართ, გაშვება). შემდეგ აქ ქვემოთ — **`## CURRENT WORK`**.

---

## MASTER FEATURE LIST

1. User System
2. Authentication
3. Profile Page
4. Avatar System
5. Friends / Following System
6. Posts System
7. Post Feed
8. Reactions System
9. Comments System
10. Video System
11. Media Upload System (images/videos)
12. Notifications
13. Chat / Messaging System
14. Search
15. Categories / Tags
16. Trending System
17. Algorithm / Ranking
18. Admin Panel
19. Moderation System
20. Reports System
21. Ban / Restriction System
22. Statistics Dashboard
23. Advertisement System
24. Monetization System
25. Settings Page
26. Privacy Settings
27. Security
28. API Layer
29. Database Structure
30. Caching System
31. Logging System
32. Error Handling System
33. UI Design System
34. Theme System (Dark/Light)
35. Mobile Responsiveness
36. Performance Optimization
37. Deployment System
38. Environment Configuration (.env)
39. Backup System
40. Versioning System
41. Testing System
42. SEO Optimization
43. Accessibility (A11Y)
44. Localization (Languages)
45. Email System (verification/reset)
46. Push Notifications
47. File Storage System
48. Rate Limiting System
49. Anti-Spam System
50. Future Features
51. Legal / Privacy (Terms & Privacy)

---

## VERSIONS

### REZIIZI v1 (MVP)

2. Authentication
1. User System
6. Posts System
7. Post Feed (pagination / load more)
8. Reactions System
3. Profile Page
25. Settings Page (password change, delete account, logout)
33. UI Design System
35. Mobile Responsiveness
51. Legal / Privacy (Terms & Privacy link on auth)

---

### REZIIZI v2

9. Comments System
12. Notifications
14. Search
15. Categories / Tags
16. Trending System
13. Chat / Messaging System
34. Theme System (Dark/Light)

---

### REZIIZI v3

18. Admin Panel
19. Moderation System
20. Reports System
21. Ban / Restriction System
22. Statistics Dashboard
23. Advertisement System
17. Algorithm / Ranking

---

## CURRENT WORK

**REZIIZI v1 scaffold:** completed — Vite + React + TypeScript, routes and placeholder pages (see repo `src/`). **Next:** Supabase schema + RLS, then wire Auth, posts, feed pagination, reactions per feature breakdown.

**Focus:** **1. User System** + **2. Authentication** (Supabase integration).

---

## FEATURE BREAKDOWN

### 1. User System 🔄 (IN PROGRESS)

#### 📌 Description
User system manages all users in the platform.

---

#### ✅ v1 (MVP)
- user has id
- user has email
- user has password

---

#### 🚀 Future (v2+)
- username
- avatar
- bio

---

#### ⚙️ Logic
- user is created during signup
- user is linked to posts

---

#### 🗄️ Database
Table: users
- id
- email
- password

---

#### 🛠️ Notes
- keep simple

---

#### 🧱 Implementation

Frontend:
- React
- simple form (signup/login)

Backend:
- Supabase Auth

Files:
- /src/pages/Auth.jsx
- /src/components/AuthForm.jsx

Flow:
1. user enters email/password
2. send request to Supabase
3. user gets session

UI:
- input: email
- input: password
- button: login/signup

---

### 2. Authentication ❌

#### 📌 Description
Authentication handles user login and access.

---

#### ✅ v1 (MVP)
- signup (email/password)
- login (email/password)
- logout
- basic validation
- Terms & Privacy link → **51. Legal / Privacy** (on login/register UI)

---

#### 🚀 Future (v2+)
- Google login
- email verification
- password reset

---

#### ⚙️ Logic
- user signs up → account created
- user logs in → session starts
- user stays logged in

---

#### 🗄️ Database (planned)
(uses users table)

---

#### 🛠️ Notes
- keep simple

---

#### 🧱 Implementation (2. Authentication)

- Supabase login / register
- Terms & Privacy link → **51. Legal / Privacy**

Frontend:
- React form (login/signup)

Backend:
- Supabase Auth

Files:
- /src/pages/Auth.jsx
- /src/components/AuthForm.jsx

Flow:
1. user inputs email/password
2. send to Supabase
3. receive session

UI:
- email input
- password input
- login button
- link to Terms & Privacy (see feature 51)

---

### 3. Profile Page ❌

#### 📌 Description
User profile page displaying user info.

---

#### ✅ v1 (MVP)
- show email
- show user posts

---

#### 🚀 Future (v2+)
- username
- bio
- followers count

---

#### ⚙️ Logic
- fetch user data
- fetch user posts

---

#### 🗄️ Database (planned)
users
posts

---

#### 🛠️ Notes
- simple layout

---

#### 🧱 Implementation (3. Profile Page)

Frontend:
- React page

Backend:
- Supabase fetch user data

Files:
- /src/pages/Profile.jsx

Flow:
1. get user data
2. display posts

UI:
- user email
- post list

---

### 4. Avatar System ❌

#### 📌 Description
User profile image system.

---

#### ✅ v1 (MVP)
- default avatar only

---

#### 🚀 Future (v2+)
- upload avatar
- change avatar

---

#### ⚙️ Logic
- default image if none

---

#### 🗄️ Database (planned)
avatar_url

---

#### 🛠️ Notes
- delay upload feature

---

#### 🧱 Implementation (4. Avatar System)

Frontend:
- show default avatar

Backend:
- none (v1)

Files:
- /src/components/Avatar.jsx

Flow:
1. show default image

UI:
- profile image

---

### 5. Friends / Following System ❌

#### 📌 Description
Users can follow other users.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- follow/unfollow
- followers list

---

#### ⚙️ Logic
- user A follows user B

---

#### 🗄️ Database (planned)
follows table

---

#### 🛠️ Notes
- skip in MVP

---

#### 🧱 Implementation (5. Friends / Following System)

Frontend:
- none (v1)

Backend:
- none

Files:
- none

Notes:
- skip for MVP

---

### 6. Posts System ❌

#### 📌 Description
Users can create and manage posts.

---

#### ✅ v1 (MVP)
- create post (text)
- delete own post

---

#### 🚀 Future (v2+)
- edit post
- media posts

---

#### ⚙️ Logic
- post linked to user

---

#### 🗄️ Database (planned)
posts table

---

#### 🛠️ Notes
- text only first

---

#### 🧱 Implementation (6. Posts System)

Frontend:
- post creation form

Backend:
- Supabase table: posts

Files:
- /src/components/PostForm.jsx

Flow:
1. user writes post
2. save to DB

UI:
- textarea
- submit button

---

### 7. Post Feed ❌

#### 📌 Description
Main page showing posts.

---

#### ✅ v1 (MVP)
- list of posts
- newest first
- pagination / load more (batches, e.g. limit 10)

---

#### 🚀 Future (v2+)
- sorting options
- personalized feed

---

#### ⚙️ Logic
- fetch posts in pages (offset/limit or cursor)
- append older batches on “Load more” or infinite scroll

---

#### 🗄️ Database (planned)
posts

---

#### 🛠️ Notes
- simple feed

---

#### 🧱 Implementation (7. Post Feed)

Frontend:
- list posts

Backend:
- fetch posts from Supabase (paginated query)

Files:
- /src/pages/Home.jsx

Flow:
1. load initial posts (limit 10)
2. user scrolls or clicks “Load more”
3. fetch next batch

UI:
- post cards
- “Load more” (or infinite scroll)

---

### 8. Reactions System ❌

#### 📌 Description
Users react to posts.

---

#### ✅ v1 (MVP)
- 👍 / 👎 reactions

---

#### 🚀 Future (v2+)
- more reaction types

---

#### ⚙️ Logic
- one reaction per user per post
- calculate score

---

#### 🗄️ Database (planned)
reactions table

---

#### 🛠️ Notes
- core feature

---

#### 🧱 Implementation (8. Reactions System)

Frontend:
- like/dislike buttons

Backend:
- reactions table

Files:
- /src/components/ReactionButtons.jsx

Flow:
1. click reaction
2. save in DB

UI:
- 👍 👎 buttons

---

### 9. Comments System ❌

#### 📌 Description
Users can comment on posts.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- add comment
- delete comment

---

#### ⚙️ Logic
- comment linked to post

---

#### 🗄️ Database (planned)
comments table

---

#### 🛠️ Notes
- move to v2

---

#### 🧱 Implementation (9. Comments System)

Frontend:
- none (v1)

Backend:
- none

Notes:
- v2 feature

---

### 10. Video System ❌

#### 📌 Description
Users can upload videos.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- upload video
- play video

---

#### ⚙️ Logic
- video linked to post

---

#### 🗄️ Database (planned)
media table

---

#### 🛠️ Notes
- skip for now

---

#### 🧱 Implementation (10. Video System)

Frontend:
- none (v1)

Backend:
- none

Notes:
- later

---

### 11. Media Upload System ❌

#### 📌 Description
Upload images/videos for posts.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- upload images
- upload videos

---

#### ⚙️ Logic
- file stored in storage
- linked to post

---

#### 🗄️ Database (planned)
media table (url, type, post_id)

---

#### 🛠️ Notes
- skip in MVP

---

#### 🧱 Implementation (11. Media Upload System)

Frontend:
- none (v1)

Backend:
- none

Notes:
- later

---

### 12. Notifications ❌

#### 📌 Description
Notify users about activity.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- new reactions
- new comments

---

#### ⚙️ Logic
- event triggers notification

---

#### 🗄️ Database (planned)
notifications table

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (12. Notifications)

Frontend:
- none (v1)

Backend:
- none

Notes:
- later

---

### 13. Chat / Messaging System ❌

#### 📌 Description
User-to-user messaging.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- send message
- chat threads

---

#### ⚙️ Logic
- messages linked between users

---

#### 🗄️ Database (planned)
messages table

---

#### 🛠️ Notes
- complex → later

---

#### 🧱 Implementation (13. Chat / Messaging System)

Frontend:
- none (v1)

Backend:
- none

Notes:
- later

---

### 14. Search ❌

#### 📌 Description
Search posts or users.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- search posts
- search users

---

#### ⚙️ Logic
- query database

---

#### 🗄️ Database (planned)
users, posts

---

#### 🛠️ Notes
- basic search later

---

#### 🧱 Implementation (14. Search)

Frontend:
- none (v1)

Backend:
- none

Notes:
- later

---

### 15. Categories / Tags ❌

#### 📌 Description
Organize posts with tags.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- assign tags
- filter by tag

---

#### ⚙️ Logic
- post has tags

---

#### 🗄️ Database (planned)
tags table

---

#### 🛠️ Notes
- later feature

---

#### 🧱 Implementation (15. Categories / Tags)

Frontend:
- none (v1)

Backend:
- none

Notes:
- later

---

### 16. Trending System ❌

#### 📌 Description
Show trending posts.

---

#### ✅ v1 (MVP)
- simple score-based sort

---

#### 🚀 Future (v2+)
- time-based trending

---

#### ⚙️ Logic
- high score = trending

---

#### 🗄️ Database (planned)
uses posts + reactions

---

#### 🛠️ Notes
- basic version only

---

#### 🧱 Implementation (16. Trending System)

Frontend:
- sort posts by score

Backend:
- calculate score

Files:
- Home.jsx

Flow:
1. sort posts

UI:
- trending list

---

### 17. Algorithm / Ranking ❌

#### 📌 Description
Ranking system for feed.

---

#### ✅ v1 (MVP)
- score = likes - dislikes

---

#### 🚀 Future (v2+)
- advanced ranking

---

#### ⚙️ Logic
- calculate score

---

#### 🗄️ Database (planned)
reactions

---

#### 🛠️ Notes
- simple first

---

#### 🧱 Implementation (17. Algorithm / Ranking)

Frontend:
- none (direct logic)

Backend:
- score = likes - dislikes

Flow:
1. calculate score

Notes:
- simple MVP

---

### 18. Admin Panel ❌

#### 📌 Description
Admin control interface.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- manage users
- manage posts

---

#### ⚙️ Logic
- admin role access

---

#### 🗄️ Database (planned)
users role field

---

#### 🛠️ Notes
- v3

---

#### 🧱 Implementation (18. Admin Panel)

Frontend:
- none (v1)

Backend:
- none

Notes:
- v3

---

### 19. Moderation System ❌

#### 📌 Description
Content moderation.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- remove content

---

#### ⚙️ Logic
- admin action

---

#### 🗄️ Database (planned)
reports

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (19. Moderation System)

Frontend:
- none

Backend:
- none

Notes:
- later

---

### 20. Reports System ❌

#### 📌 Description
Users report content.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- report button

---

#### ⚙️ Logic
- report saved

---

#### 🗄️ Database (planned)
reports table

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (20. Reports System)

Frontend:
- none

Backend:
- none

Notes:
- later

---

### 21. Ban / Restriction System ❌

#### 📌 Description
Restrict users.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- ban user

---

#### ⚙️ Logic
- block access

---

#### 🗄️ Database (planned)
user status

---

#### 🛠️ Notes
- admin feature

---

#### 🧱 Implementation (21. Ban / Restriction System)

Frontend:
- none (v1)

Backend:
- none

Notes:
- admin feature later

---

### 22. Statistics Dashboard ❌

#### 📌 Description
Platform analytics.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- user stats
- post stats

---

#### ⚙️ Logic
- aggregate data

---

#### 🗄️ Database (planned)
various tables

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (22. Statistics Dashboard)

Frontend:
- none (v1)

Backend:
- none

Notes:
- later

---

### 23. Advertisement System ❌

#### 📌 Description
Display ads.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- ad blocks

---

#### ⚙️ Logic
- show ads in feed

---

#### 🗄️ Database (planned)
ads table

---

#### 🛠️ Notes
- v3

---

#### 🧱 Implementation (23. Advertisement System)

Frontend:
- none (v1)

Backend:
- none

Notes:
- v3

---

### 24. Monetization System ❌

#### 📌 Description
Earn money from platform.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- ads revenue

---

#### ⚙️ Logic
- linked with ads

---

#### 🗄️ Database (planned)
payments

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (24. Monetization System)

Frontend:
- none (v1)

Backend:
- none

Notes:
- later

---

### 25. Settings Page ❌

#### 📌 Description
User settings.

---

#### ✅ v1 (MVP)
- change password (Supabase flow)
- delete account
- logout
- basic settings (as needed for MVP)

---

#### 🚀 Future (v2+)
- profile edit

---

#### ⚙️ Logic
- update user data
- password change via Supabase
- account deletion via Supabase
- session end on logout

---

#### 🗄️ Database (planned)
users

---

#### 🛠️ Notes
- simple

---

#### 🧱 Implementation (25. Settings Page)

Frontend:
- simple settings page

Backend:
- Supabase Auth (password update, sign out, account delete)

Files:
- /src/pages/Settings.jsx

Flow:
1. user opens settings
2. can change password (Supabase)
3. can log out
4. can delete account

UI:
- basic inputs
- password change
- logout button
- delete account (confirm)

---

### 26. Privacy Settings ❌

#### 📌 Description
Control user privacy.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- profile visibility

---

#### ⚙️ Logic
- restrict access

---

#### 🗄️ Database (planned)
privacy fields

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (26. Privacy Settings)

Frontend:
- none (v1)

Backend:
- none

Notes:
- later

---

### 27. Security ❌

#### 📌 Description
Protect system.

---

#### ✅ v1 (MVP)
- password validation

---

#### 🚀 Future (v2+)
- advanced security

---

#### ⚙️ Logic
- prevent abuse

---

#### 🗄️ Database (planned)
users

---

#### 🛠️ Notes
- expand later

---

#### 🧱 Implementation (27. Security)

Frontend:
- basic validation

Backend:
- Supabase auth protection

Notes:
- simple security

---

### 28. API Layer ❌

#### 📌 Description
Backend API.

---

#### ✅ v1 (MVP)
- basic endpoints

---

#### 🚀 Future (v2+)
- structured API

---

#### ⚙️ Logic
- handle requests

---

#### 🗄️ Database (planned)
all tables

---

#### 🛠️ Notes
- needed for backend

---

#### 🧱 Implementation (28. API Layer)

Frontend:
- direct Supabase calls

Backend:
- Supabase handles API

Notes:
- no custom API yet

---

### 29. Database Structure ❌

#### 📌 Description
Database schema.

---

#### ✅ v1 (MVP)
- users
- posts
- reactions

---

#### 🚀 Future (v2+)
- expand tables

---

#### ⚙️ Logic
- relational structure

---

#### 🗄️ Database (planned)
core tables

---

#### 🛠️ Notes
- very important

---

#### 🧱 Implementation (29. Database Structure)

Frontend:
- none

Backend:
- Supabase tables

Tables:
- users
- posts
- reactions

Notes:
- core structure

---

### 30. Caching System ❌

#### 📌 Description
Improve performance.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- cache data

---

#### ⚙️ Logic
- reduce DB calls

---

#### 🗄️ Database (planned)
cache layer

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (30. Caching System)

Frontend:
- none

Backend:
- none

Notes:
- later optimization

---

### 31. Logging System ❌

#### 📌 Description
Track system events.

---

#### ✅ v1 (MVP)
- console logs

---

#### 🚀 Future (v2+)
- log storage

---

#### ⚙️ Logic
- log actions

---

#### 🗄️ Database (planned)
logs

---

#### 🛠️ Notes
- simple first

---

#### 🧱 Implementation (31. Logging System)

Frontend:
- console logs

Backend:
- basic logs

Notes:
- simple debugging

---

### 32. Error Handling System ❌

#### 📌 Description
Handle errors.

---

#### ✅ v1 (MVP)
- basic error messages

---

#### 🚀 Future (v2+)
- global handling

---

#### ⚙️ Logic
- catch errors

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- improve later

---

#### 🧱 Implementation (32. Error Handling System)

Frontend:
- show error messages

Backend:
- catch errors

UI:
- alert / message

Notes:
- simple first

---

### 33. UI Design System ❌

#### 📌 Description
Design consistency.

---

#### ✅ v1 (MVP)
- basic styles

---

#### 🚀 Future (v2+)
- design system

---

#### ⚙️ Logic
- reusable components

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- simple UI first

---

#### 🧱 Implementation (33. UI Design System)

Frontend:
- basic styles (CSS)

Files:
- /src/styles.css

Notes:
- minimal design

---

### 34. Theme System ❌

#### 📌 Description
Light/Dark mode.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- theme switch

---

#### ⚙️ Logic
- toggle theme

---

#### 🗄️ Database (planned)
user preference

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (34. Theme System)

Frontend:
- none (v1)

Backend:
- none

Notes:
- later

---

### 35. Mobile Responsiveness ❌

#### 📌 Description
Mobile-friendly UI.

---

#### ✅ v1 (MVP)
- responsive layout

---

#### 🚀 Future (v2+)
- optimize mobile UX

---

#### ⚙️ Logic
- CSS responsive

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- important

---

#### 🧱 Implementation (35. Mobile Responsiveness)

Frontend:
- responsive CSS

Notes:
- mobile friendly layout

---

### 36. Performance Optimization ❌

#### 📌 Description
Improve speed.

---

#### ✅ v1 (MVP)
- basic optimization

---

#### 🚀 Future (v2+)
- advanced tuning

---

#### ⚙️ Logic
- optimize queries

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (36. Performance Optimization)

Frontend:
- basic optimization

Backend:
- none

Notes:
- later tuning

---

### 37. Deployment System ❌

#### 📌 Description
Deploy app online.

---

#### ✅ v1 (MVP)
- basic deploy

---

#### 🚀 Future (v2+)
- CI/CD

---

#### ⚙️ Logic
- deploy build

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- use Vercel

---

#### 🧱 Implementation (37. Deployment System)

Frontend:
- deploy via Vercel

Backend:
- Supabase hosted

Notes:
- simple deploy

---

### 38. Environment Configuration ❌

#### 📌 Description
Manage environment variables.

---

#### ✅ v1 (MVP)
- .env file

---

#### 🚀 Future (v2+)
- multiple environments

---

#### ⚙️ Logic
- store secrets

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- required later

---

#### 🧱 Implementation (38. Environment Configuration)

Frontend:
- .env file

Backend:
- Supabase keys

Files:
- .env

Notes:
- store secrets

---

### 39. Backup System ❌

#### 📌 Description
Data backup.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- automated backups

---

#### ⚙️ Logic
- save snapshots

---

#### 🗄️ Database (planned)
backups

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (39. Backup System)

Frontend:
- none

Backend:
- Supabase backup

Notes:
- later

---

### 40. Versioning System ❌

#### 📌 Description
Track versions.

---

#### ✅ v1 (MVP)
- manual versioning

---

#### 🚀 Future (v2+)
- automated versioning

---

#### ⚙️ Logic
- track changes

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- simple first

---

#### 🧱 Implementation (40. Versioning System)

Frontend:
- Git

Notes:
- manual versioning

---

### 41. Testing System ❌

#### 📌 Description
Test application functionality.

---

#### ✅ v1 (MVP)
- manual testing

---

#### 🚀 Future (v2+)
- automated tests

---

#### ⚙️ Logic
- test features manually

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- simple first

---

#### 🧱 Implementation (41. Testing System)

Frontend:
- manual testing

Notes:
- test features manually

---

### 42. SEO Optimization ❌

#### 📌 Description
Improve search engine visibility.

---

#### ✅ v1 (MVP)
- basic meta tags

---

#### 🚀 Future (v2+)
- advanced SEO

---

#### ⚙️ Logic
- optimize pages

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- later improvement

---

#### 🧱 Implementation (42. SEO Optimization)

Frontend:
- basic meta tags

Notes:
- simple SEO

---

### 43. Accessibility (A11Y) ❌

#### 📌 Description
Make app usable for all users.

---

#### ✅ v1 (MVP)
- basic accessibility

---

#### 🚀 Future (v2+)
- full accessibility support

---

#### ⚙️ Logic
- accessible UI

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- improve later

---

#### 🧱 Implementation (43. Accessibility)

Frontend:
- semantic HTML

Notes:
- basic accessibility

---

### 44. Localization (Languages) ❌

#### 📌 Description
Support multiple languages.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- multi-language support

---

#### ⚙️ Logic
- switch language

---

#### 🗄️ Database (planned)
translations

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (44. Localization)

Frontend:
- none (v1)

Notes:
- later

---

### 45. Email System ❌

#### 📌 Description
Email verification and password reset.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- email verification
- password reset

---

#### ⚙️ Logic
- send email

---

#### 🗄️ Database (planned)
email tokens

---

#### 🛠️ Notes
- important later

---

#### 🧱 Implementation (45. Email System)

Frontend:
- none (v1)

Backend:
- Supabase (later)

Notes:
- later

---

### 46. Push Notifications ❌

#### 📌 Description
Real-time notifications.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- push alerts

---

#### ⚙️ Logic
- send notification

---

#### 🗄️ Database (planned)
notifications

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (46. Push Notifications)

Frontend:
- none

Backend:
- none

Notes:
- later

---

### 47. File Storage System ❌

#### 📌 Description
Store uploaded files.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- file storage integration

---

#### ⚙️ Logic
- store files in cloud

---

#### 🗄️ Database (planned)
file URLs

---

#### 🛠️ Notes
- needed for media

---

#### 🧱 Implementation (47. File Storage System)

Frontend:
- none

Backend:
- Supabase storage (later)

Notes:
- needed for media

---

### 48. Rate Limiting System ❌

#### 📌 Description
Prevent spam requests.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- request limits

---

#### ⚙️ Logic
- limit user actions

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- security feature

---

#### 🧱 Implementation (48. Rate Limiting System)

Frontend:
- none

Backend:
- none

Notes:
- later

---

### 49. Anti-Spam System ❌

#### 📌 Description
Detect and block spam.

---

#### ✅ v1 (MVP)
- not included

---

#### 🚀 Future (v2+)
- spam detection

---

#### ⚙️ Logic
- filter content

---

#### 🗄️ Database (planned)
spam flags

---

#### 🛠️ Notes
- later

---

#### 🧱 Implementation (49. Anti-Spam System)

Frontend:
- none

Backend:
- none

Notes:
- later

---

### 50. Future Features ❌

#### 📌 Description
Ideas for future expansion.

---

#### ✅ v1 (MVP)
- none

---

#### 🚀 Future (v2+)
- new ideas

---

#### ⚙️ Logic
- add later

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- placeholder

---

#### 🧱 Implementation (50. Future Features)

Frontend:
- none

Backend:
- none

Notes:
- placeholder

---

### 51. Legal / Privacy (Terms & Privacy) ❌

#### 📌 Description
Legal pages for users: Terms of Service and Privacy Policy.

---

#### ✅ v1 (MVP)
- simple static page (or two pages)
- link from registration / login
- show Terms & Privacy text for compliance / transparency

---

#### 🚀 Future (v2+)
- versioning, updates, locale-specific legal text

---

#### ⚙️ Logic
- static content; no user data in DB for v1

---

#### 🗄️ Database (planned)
-

---

#### 🛠️ Notes
- keep copy minimal; update when product grows

---

#### 🧱 Implementation (51. Legal / Privacy)

Frontend:
- static React route(s)

Backend:
- none (v1)

Files:
- /src/pages/Legal.jsx (or Terms.jsx + Privacy.jsx)

Flow:
1. simple static page
2. link from registration/login
3. show Terms & Privacy

UI:
- readable text layout
- links from auth screens

---

## RULES

- Work on one feature at a time
- Always update feature before coding
- Do not skip steps
- Keep everything numbered

---

## JOURNAL

ერთი სამუშაო ჟურნალი — ყველა მნიშვნელოვანი ჩანაწერი: **`JOURNAL.md`** (თარიღი, რა გაკეთდა, შემდეგი ნაბიჯები).

---

## PROJECT SETUP

Frontend:
- React (Vite)

Backend:
- Supabase

Tools:
- Cursor
- Git

---

## FIRST STEP

Goal:
- Create basic app structure

Includes:
- React app setup
- simple homepage
