```
study-app/
├── front-end/
│   ├── public/
│   │   └── index.html          # Base HTML template
│   ├── src/
│   │   ├── App.tsx             # Main app (handles routing & auth)
│   │   ├── index.tsx           # React entry point
│   │   ├── supabaseClient.ts   # Supabase connection
│   │   ├── Login.tsx           # Login form
│   │   ├── Signup.tsx          # Signup form
│   │   └── Home.tsx            # Example protected page
│   ├── .env                    # Supabase keys
│   ├── package.json            # Dependencies for the front end
│   ├── tsconfig.json           # TypeScript config
│   └── vite.config.ts          # Vite config
│
├── README.md                   # Project overview
└── .gitignore                  # Global ignore (can include front-end/.env, etc.)
```
