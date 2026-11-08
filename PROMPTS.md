### Prompt 1

Build a high-fidelity, functional prototype of the touchscreen console on a treadmill. Build
only the on-screen UI. Do not model or simulate the physical machine, frame, hardware, or
belt. Attached are our Milestone 3 slides (PDF) and our low-fidelity wireframe (index.html,
styles.css, script.js).

Follow the "Task 2 - Layout" slides in the PDF for the screens and flows: the home screen with
Workouts / Start / Sign In tiles, quick start, sign in with phone or manual login, and the
workout screen with the video, side speed/incline controls, and clock. Also apply the changes
from the "Task 2 - Feedback Changes" slides:

- Users 1-5's requested changes (phone-pad hint on login, Start button after login, partial
  help popup, combined Start/Pause button, collapsible biometrics).
- From the low-fi wireframe, reuse only the goal + difficulty presets and the map list
  (with favorites for signed-in users).
- Where the wireframe and the sketches disagree, follow the sketches.

Power button:

- A clearly labeled "Power off" button in the top bar on every screen.
- It asks for confirmation, then ends any workout, signs the user out, and shows a dark screen
  with a "Power on" button that returns to Home.

Workouts:

- Heart rate and calories are simulated from speed and incline (as in the low-fi script.js),
  with a small "simulated" label.
- Guests can work out fully. The summary screen offers to sign in to save the workout.

Tech stack:

- Next.js with Tailwind CSS, deployed on Vercel.
- Database: Neon Postgres in production. When no DATABASE_URL is set, fall back
  automatically to a local JSON file so I can run and test everything locally with no setup.
  Keep both behind one small data layer.
- Login: a simple custom username/password system (hashed passwords, session cookie).
- Phone sign-in: The console shows a QR code that opens a mobile /pair page. The user signs
  in there, and the console then signs in as that user. Pairing codes expire.
- Videos: YouTube embeds that pause when the workout pauses. Put the video IDs in one config
  file.

Save user profiles, workout history, and favorite maps. Show real error states (wrong
password, expired pairing code, video fails to load, failed save).

Style: dark, high-contrast, large touch targets, a landscape 16:10 screen, with polished
micro-interactions. Keep it simple; no other APIs or features. Include a README with local
setup and Vercel/Neon deployment steps.
