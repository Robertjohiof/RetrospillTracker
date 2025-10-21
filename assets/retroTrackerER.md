``` mermaid

---
title: ER database
---

erDiagram

    users {
        string id "PK"
        string role_id "FK"
        string name
        string email
        string password_hash
        string profile_picture "optional"
        string bio "optional"
        bool isActive "auto"
        datetime created_at "auto"
        datetime updated_at "auto"
    }

    r2{

    }

    roles {
        string id "PK"
        string role_name
    }

    sessions {
        string id "PK"
        string user_id "FK"
        string ip_address "optional"
        datetime created_at "auto"
        datetime updated_at "auto"
        datetime expires_at
        bool revoked
    }

    games {
        string id "PK"
        string developer_id "FK"
        string publisher_id "FK"
        string name
        string api_key
    }

    developers {
        string id "PK"
        string name
        string api_key
    }

    publishers {
        string id "PK"
        string name
        string api_key
    }

    genres {
        string id "PK"
        string name
    }

    game_genres {
        string game_id "FK"
        string genre_id "FK"
    }

    platforms {
        string id "PK"
        string name
        string manufacturer
        datetime release_year
    }

    game_platforms {
        string game_id "FK"
        string platform_id "FK"
    }

    user_game_lists {
        string id "PK"
        string user_id "FK"
        string game_id "FK"
        string status_id "FK"
        int score "optional"
        int hours_played "optional"
        datetime finished_at "optional"
        datetime updated_at "auto"
    }

    reviews {
        string id "PK"
        string user_id "FK"
        string game_id "FK"
        string title 
        string body
        int score
        datetime created_at "auto"
        datetime updated_at "auto"
    }

    comments {
        string id "PK"
        string user_id "FK"
        string review_id "FK"
        string body
        datetime created_at "auto"
    }

    collections {
        string id "PK"
        string user_id "FK"
        string title
        string description "optional"
        datetime created_at "auto"
    }

    collection_items {
        string id "PK"
        string collection_id "FK"
        string game_id "FK"
        int priority "optional"
    }

    status{
        string id "PK"
        string status_name
    }

    users ||--o{ games : "Has"
    users ||--o{ reviews : "Has"
    users ||--o{ user_game_lists : "Has"
    users ||--o{ collections : "Has"
    users ||--o{ comments : "Has"
    users }o--|| roles : "Has"
    users ||--o{ sessions : "Has"
    users |o--o| r2 : "profile picture"

    games }|--|{ developers : "Created by"
    games }|--|{ publishers : "Published by"
    games ||--|{ game_genres : "Has"
    games ||--o{ game_platforms : "Uses"
    games ||--o{ reviews : "Has"
    reviews ||--o{ comments : "Has"
    user_game_lists }o--|| status : "Has"

    collections ||--|{ collection_items : "Has"

    genres ||--o{ game_genres: "Has"

    platforms ||--o{ game_platforms : "Has"

    user_game_lists }o--o| games : "Has"
