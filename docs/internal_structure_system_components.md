%% ER Diagram for Study App (Supabase/Postgres)
erDiagram
    USER {
        int id PK
        varchar username "unique, not null"
        varchar email "unique, not null"
        varchar password_hash "not null"
    }

    TOPIC {
        int id PK
        varchar title "not null"
        text description
        int created_by FK "references USER.id"
    }

    SESSION {
        int id PK
        varchar title "not null"
        text content
        int topic_id FK "references TOPIC.id"
    }

    INDEX_CARD {
        int id PK
        varchar front "not null"
        varchar back "not null"
        int session_id FK "references SESSION.id"
    }

    PROGRESS {
        int id PK
        int user_id FK "references USER.id"
        int index_card_id FK "references INDEX_CARD.id"
        varchar status "enum: not started, in progress, completed"
        timestamp updated_at
    }

    %% Relationships
    USER ||--o{ TOPIC : creates
    TOPIC ||--o{ SESSION : contains
    SESSION ||--o{ INDEX_CARD : includes
    USER ||--o{ PROGRESS : tracks
    INDEX_CARD ||--o{ PROGRESS : has

