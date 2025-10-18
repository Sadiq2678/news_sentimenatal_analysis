```markdown
# news_sentimenatal_analysis

A simple web app that displays the latest news with sentiment labels (positive / negative / neutral).
Backend: Django (API) — Frontend: React.

This README covers how to clone the project, set up the environment, run backend and frontend, and create an API key used by clients to access the API.

## Features
- Fetch and display latest news items
- Run sentiment analysis on news text and show sentiment on the UI
- Django backend serving API endpoints
- React frontend for browsing news

## Prerequisites
- Git
- Python 3.8+
- Node.js + npm (or yarn)

## Quick start (development)

1. Clone the repository
```bash
git clone https://github.com/Sadiq2678/news_sentimenatal_analysis.git
cd news_sentimenatal_analysis
```

2. Create and activate a Python virtual environment
- macOS / Linux:
```bash
python3 -m venv .venv
source .venv/bin/activate
```
- Windows (PowerShell):
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

3. Install Python dependencies
```bash
pip install -r requirements.txt
```

4. Apply Django migrations and (optionally) create a superuser
```bash
python manage.py migrate
python manage.py createsuperuser   # optional
```

5. Create an API key (see below for options). Save it to your environment (example: .env file).

6. Run the Django backend
```bash
python manage.py runserver
```
By default Django runs on http://127.0.0.1:8000

7. Start the React frontend
Adjust the folder name if your frontend is in a different directory (common folders: `frontend`, `client`, `react-app`).
```bash
cd frontend
npm install
npm start
```
The React dev server typically runs on http://localhost:3000

Open the frontend URL in your browser. The frontend should call the Django API to fetch news and sentiment.

## Creating an API key

You can create an API key in several ways. The project includes a small utility script at `scripts/generate_api_key.py` (see repository) to generate a strong key and optionally write it into a `.env` file.

Examples:

- Use the helper script (from project root):
  - Print a key:
    ```bash
    python3 scripts/generate_api_key.py
    ```
  - Generate and append to `.env`:
    ```bash
    python3 scripts/generate_api_key.py --write
    ```

- Or generate manually:
  ```bash
  python3 - <<'PY'
  import secrets
  print(secrets.token_urlsafe(32))
  PY
  ```

Store the generated key as an environment variable called `API_KEY` (or whichever variable your Django settings reference). Example `.env` entry:
```
API_KEY=your-generated-api-key-here
```

## Using the API key (client side)
When making requests to your API from the frontend, send the key in a header. Example header options:
- X-API-KEY: <your-key>
- Authorization: Api-Key <your-key>

Update your frontend API client to include the header in requests.

## Server-side (Django) usage
- Read the key in Django settings from the environment (example using os.environ or django-environ).
- Validate incoming requests by checking the header value against the configured `API_KEY`.
- For production, rotate keys periodically and store them securely (vault, secrets manager).

A simple middleware or decorator can be used to enforce the API key on protected endpoints.

## CORS & dev notes
- If frontend runs on a different port, ensure CORS is configured (install `django-cors-headers` and add allowed origins).
- If you want the React dev server to proxy the API, add a proxy setting in `package.json` or use environment variables.

## Project structure (example)
- backend/ or project root
  - manage.py
  - <django apps>/
- frontend/ (React app)
- scripts/ (helper scripts)
- requirements.txt
- README.md
- .env.example

## Production
- Build the React app: from `frontend` run `npm run build`
- Serve the static build via Django static files, Nginx, or host frontend separately.
- Use a production WSGI server (gunicorn/uWSGI) behind a reverse proxy.

## Troubleshooting
- If you get "Module not found": ensure virtualenv is activated and requirements installed.
- If ports 8000/3000 are busy: change ports (`python manage.py runserver 0.0.0.0:8080`, `npm start -- --port 3001`).

## Contributing
1. Fork
2. Create a feature branch
3. Add tests and documentation
4. Open a PR

## License
Add your project license (e.g., MIT) or include a LICENSE file.

## Contact
Maintainer: Sadiq2678 — https://github.com/Sadiq2678
```