```mermaid
sequenceDiagram
   participant User
   participant Frontend
   participant Backend
   participant Database

   User->>Frontend: Enter email & password
   Frontend->>Backend: POST /login (credentials)
   Backend->>Database: SELECT * FROM Users WHERE email=?
   Database-->>Backend: User record
   Backend-->> Database: Validate password
   alt Credentials valid
       Backend-->>Frontend: 200 OK + JWT Token
       Frontend-->>User: Redirect to dashboard
   else Invalid credentials
       Backend-->>Frontend: 401 Unauthorized
       Frontend-->>User: Show error message
   end
   ```
