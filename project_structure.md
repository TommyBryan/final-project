```
study-app/
├── public/
│   └── index.html          # Base HTML template
├── src/
│   ├── App.tsx             # Main app (handles routing & auth session)
│   ├── index.tsx           # React entry point
│   ├── supabaseClient.ts   # Supabase connection
│   ├── Login.tsx           # Login form
│   ├── Signup.tsx          # Signup form
│   └── Home.tsx            # Example protected page (after login)
├── .env                    # Supabase keys (REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY)
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript config (if using TS)
└── README.md               # Project documentation
```
