# THE one and only Astronomy Explorer

High energy dashboard that integrates with NASA's Jet Propulsion Laboratory and explore the universe.

## The Features
- **Real-Time Data**: Retrieves the Astronomy Picture of the Day from the NASA's API.
- **Mission Voyager (Randomizer)**: Custom algorithm which randomly selects a day from NASA's more than 20 years old data.
- **Rocket Launcher**: Custom rocket animation which fires from one corner to another.
- **UI Design**: Utilizes Glassmorphism theme and a "Comic Sans" look for Mission Control feel.
- **Error Handling**: Automatically redirects to the previous day if there's an error in the NASA daily upload.

## Tech Stack
- **Frontend**: ES6+, HTML5, CSS3, vanilla JavaScript.
- **Build System**: [Vite](https://vitejs.dev/)
- **API**: [NASA Planetary APOD API](https://api.nasa.gov/)
- **Hosting Service**: [Vercel/Netlify]

## Installation & Usage
1. Fork the repository.
2. Run `npm install` to install the packages.
3. Create a `.env` file at the project root.
4. Place your NASA API Key:
   ```text
   VITE_NASA_API_KEY=your_api_key_here

Run npm run dev to launch the local server.
📡 Deployment
The project is fully deployed and can be viewed here:
[INSERT YOUR LIVE LINK HERE]
📝 Devlog Highlights
Solved pathing issues for assets in subfolder environments.
Implemented void offsetWidth logic to allow repeated rocket animations.
Integrated import.meta.env for secure API key management.


### Step 3: Insert your Live Link
After deploying to either Vercel or Netlify, return to this file and insert your live link where indicated (e.g., `[INSERT YOUR LIVE LINK HERE]`).

### Why this is a "Good" README (Rule #2):
1. **A Clear Title**: People understand immediately what it is.
2. **Feature List**: Highlights the work that went into building it (the rockets and the randomization function).
3. **Technical Stack**: It shows off that you have an understanding of which technologies you are using.
4. **Setup Instructions**: This step is crucial. Provides instructions to other developers on how to use your code (i.e., `.env` file).
5. **Formatting in Markdown**: Uses the correct formatting of headers (`#`), bold texts (`**`), and code blocks (```) for improved readability.

### How to save it to GitHub:
After saving the file within VS Code, enter the following commands in your terminal:
```bash
git add README.md
git commit -m "Added professional README"
git push