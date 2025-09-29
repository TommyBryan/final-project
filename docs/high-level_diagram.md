---
config:
  theme: redux
  layout: elk
---
flowchart TD
    User["User"] -- Uses UI --> Frontend["React + HTML/CSS + TypeScript Front-end"]
    Frontend -- Sends API Requests --> Backend["Python + Flask Back-end"]
    Backend -- Reads/Writes Data --> Database[("SQL Database via SQLAlchemy")]
    Backend -- Containerized for Deployment --> Docker["Docker Container"]
     Frontend:::component
     Backend:::component
     Database:::component
     Docker:::component
