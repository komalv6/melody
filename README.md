🎀 Melody — Your Cute Music World

A simple and interactive web-based music player built using HTML, CSS, and JavaScript with a fully interactive UI across 7 pages. It features gamification, a music quiz, streak tracking, a rhythm tap game, and a curated daily picks page all tied together through a shared localStorage state system so your progress persists across every page..
This project allows users to play, pause, and navigate through songs with a clean and responsive interface.

<img width="1850" height="890" alt="image" src="https://github.com/user-attachments/assets/7724869d-25ee-4d05-9241-c3dc05ef977d" />
<img width="1866" height="889" alt="image" src="https://github.com/user-attachments/assets/880029ba-9ad4-432c-9484-069d2f0285bb" />
<img width="1884" height="894" alt="image" src="https://github.com/user-attachments/assets/fae57468-23ec-4d96-994f-735f6f843a30" />
<img width="1898" height="907" alt="image" src="https://github.com/user-attachments/assets/633c1417-5273-45a8-b4a6-fb45f1aac44b" />
<img width="939" height="809" alt="image" src="https://github.com/user-attachments/assets/37de89bb-ebd6-4811-b13e-3d81dc4c68ce" />
<img width="857" height="815" alt="image" src="https://github.com/user-attachments/assets/a32d2a05-563a-4a6a-9bb3-95ecfd05ba3d" />
<img width="1080" height="823" alt="image" src="https://github.com/user-attachments/assets/2f35a952-dedf-4833-8a13-9000ac9e54e1" />
<img width="1909" height="900" alt="image" src="https://github.com/user-attachments/assets/0dbcaca5-eda7-4c15-97d5-bae4bf042bbe" />


📁 File Structure

melody/

├── index.html        
├── player.html       
├── playlist.html     
├── picks.html       
├── streak.html      
├── quiz.html         
├── profile.html      
├── shared.css      
└── shared.js        

🗺️ Pages

🏠 index.html — Home
The central hub. Shows the full now-playing card, quick stats, feature navigation tiles, Song of the Day banner, mood selector, recently played carousel, and XP level card.

🎵 player.html — Now Playing
Dedicated player page with animated spinning album art, dual rotating rings, audio visualizer bars, full playback controls (play/pause, seek ±10s, prev/next), progress bar with scrubber, volume slider, and shuffle/autoplay/repeat toggles. Tap the album art for bonus vibes.

🎶 playlist.html — Playlist
Browse all 10 tracks with real-time search, genre filter chips (All, Lo-fi, Pop, Chill, Jazz, Dance), sort options (A→Z, shortest first, by genre), like buttons, and a live "NOW PLAYING" indicator. Click any track to jump straight to the player.

🔥 picks.html — Today's Top Picks
A daily-seeded featured song (changes each day), hot chart list with trending arrows, mood station selector (Happy / Chill / Late Night / Morning Boost), and new releases carousel. All picks are deterministically seeded by the current date so they feel fresh each day.

📅 streak.html — Streak & Rhythm Game
Monthly calendar heatmap showing active listening days, current streak counter with milestone badges (1 day → 30 days), weekly listening bar chart, goal progress tracker, and the Rhythm Tap mini-game — tap the glowing note before the timer runs out to build combo multipliers.

🧠 quiz.html — Music Quiz
8-question trivia rounds drawn from a pool of 15 questions about the app's tracks, artists, genres, and music theory. Features a per-question countdown timer, letter-labelled answer buttons, live feedback, answer review, scoring history, and XP rewards.

🌸 profile.html — Profile
Avatar picker (12 options), XP progress bar, 6 stat boxes (Songs Played, Day Streak, Minutes Listened, Quiz Correct, Art Taps, Badges), full badge showcase (12 badges), liked songs list, recently played list, and a data reset option.

🎮 Features
🎵 Music Playback

10 demo tracks (via SoundHelix MP3s) with graceful simulated-playback fallback if audio is blocked
Play, pause, seek ±10 seconds, previous/next
Draggable progress bar
Volume control with mute toggle
Shuffle, Autoplay, and Repeat modes
Keyboard shortcuts: Space (play/pause), ←/→ (prev/next), ↑/↓ (volume)

✨ Gamification

Vibe Points earned from playing songs (+5), listening time (+1/sec), art taps (+2), quiz answers (+10), combos
7 Level tiers: 
🌱 Sprout → 🌸 Bloom → 🌟 Star → 🦋 Flutter → 🎀 Dreamer → 💫 Nova → 🌙 Celestial

12 Badges with unlock conditions:
BadgeHow to earn :First NotePlay your first song, Hot StreakHit a ×5 combo in the rhythm game, Art LoverTap album art 10 times, Full JourneyPlay all 10 songs, Night OwlListen after 10pm, Vibe GemCollect 500 vibes, Combo MasterHit a ×15 combo, JukeboxPlay 5 different songs, ShufflerUse shuffle 3 times, Quiz AceGet 10 quiz answers correct, Week WarriorMaintain a 7-day streak, Music LoverLike 5 songs


📅 Streak System

Daily check-in via localStorage date tracking
Persistent calendar showing active listening days this month
Streak bonus points (streak × 5 on consecutive days)
Milestone badges at 1, 3, 7, 14, and 30 days

🎮 Rhythm Tap Mini-Game

10 note buttons in a 5×2 grid, each with a unique color and emoji
A random button glows — tap it before the 1.2-second timer drains
Correct hits build a combo multiplier; wrong taps or misses reset it
Best combo saves to your profile
Activates automatically when music is playing on the Streak page

🧠 Quiz System

15-question pool, 8 questions drawn randomly per round
15-second countdown timer per question (faster answers = more points)
Grade feedback (S / A / B / C) and full answer review after each round
Persistent score history across sessions

👩‍💻 Author

Komal

GitHub:
https://github.com/komalv6

📄 License
MIT — free to use, remix, and share. A credit back is always appreciated! 🌸

⭐ If you like this project, consider giving it a star on GitHub!
