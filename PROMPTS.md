Each of these prompts had some back and forth with claude when making plans, but only the main prompt was preserved.

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

### Prompt 2

Update the working across the app to be consistent and easy to understand. Each button on the main page should have a clear reason to pick it, and the little descriptions should not be there. each button has simple text and an icon, just like milestone3 task 2.

### Prompt 3

update the UI across this app to match what is found in the home page. The buttons and information should be clear enough that there is no need for any descriptions or extra text. It can just be the main text and an optional icon. Refer to the milestone3 document to understand how styling should look. Some areas to pay close attention to are the workouts page that show the workout difficulties. Have these buttons displayed in a cleaner and more intentional way instead of being pushed to the left. The actual workout page should have the information on the sides of the screen, but the boxes shouldnt be so big. the text in the top right corner saying "in motion" is unnecessary. make changes like these across the app.

### Prompt 4

update the flow of choosing and starting a workout so the screens connect in a more natural way. After choosing a workout and difficulty, let the user pick a map instead of always opening Forest Trail. keep their choices when moving between these screens, and have the back buttons return to the screen they came from. Before the workout has started, let them go back and change their choices without having to end the workout. Show the selected workout and difficulty alongside the map name so they know what they picked. Keep the styling simple and consistent with the home page, just like milestone3 task 2

### Prompt 5

update the flow of ending and saving a workout so the user always knows what is happening. When the end workout or power off confirmation is open, pause the workout and only resume it if they cancel and it was running before. On the summary page, make it clear when the workout is saving, saved, or failed to save, and let them retry if it fails. If a guest leaves without saving, ask if they want to sign in and save or discard the workout. After signing in, make sure their workout history and favorite maps are loaded right away. Keep the buttons and messages simple and consistent with the rest of the app

### Prompt 6

update the phone login flow so each step is clear and easy to follow. After scanning the QR code, show the sign in form only if the user isnt already signed in on their phone. Once signed in, replace the form with their account name and an Approve console button. After approval, show a simple connected screen telling them to return to the treadmill. On the console, load their profile and return them to where they were, including the workout summary if they signed in to save. Show how much time is left before the QR code expires, and replace expired codes with a clear Generate new code button. Handle invalid or already used links with a simple message explaining how to scan a fresh code. Keep the phone page focused on connecting, without the console navigation or power controls.
