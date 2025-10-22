```
study-app/
├── front-end/
│   ├── public/
│   │   └── index.html          # Base HTML template
│   ├── src/
│   │   ├── App.jsx             # Main app (handles routing & auth)
│   │   ├── index.jsx           # React entry point
│   │   ├── supabaseClient.ts   # Supabase connection
│   │   ├── Login.jsx           # Login form
│   │   ├── Signup.jsx          # Signup form
│   │   └── Home.jsx            # Example protected page
│   ├── .env                    # Supabase keys
│   ├── package.json            # Dependencies for the front end
│   ├── tsconfig.json           # TypeScript config
│   └── vite.config.ts          # Vite config
│
├── README.md                   # Project overview
└── .gitignore                  # Global ignore (can include front-end/.env, etc.)
```
