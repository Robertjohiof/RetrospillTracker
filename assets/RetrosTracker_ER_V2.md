``` mermaid

---
config:
  layout: elk
---
erDiagram
	direction TB
	users {
		string user_id  "PK"  
		int role_id  "FK"  
		string name  ""  
		string slug  "auto"  
		string email  ""  
		string password_hash  ""  
		string profile_picture  "optional"  
		string bio  "optional"  
		bool isActive  "auto"  
		datetime created_at  "auto"  
		datetime updated_at  "auto"  
	}
	r2 {
	}
	roles {
		int role_id  "PK"  
		string role_name  ""  
	}
	sessions {
		string session_id  "PK"  
		string user_id  "FK"  
		string ip_address  "optional"  
		datetime created_at  "auto"  
		datetime updated_at  "auto"  
		datetime expires_at  ""  
		bool revoked  ""  
	}
	games {
		string game_id  "PK"  
		string name  ""  
		string slug  "auto"  
		string api_key  ""  
		datetime createdAt  "auto"  
		datetime updatedAt  "auto"  
	}
	games_developers {
		string game_id  "PK FK"  
		string developer_id  "PK FK"  
	}
	developers {
		string developer_id  "PK"  
		string name  ""  
		string slug  "auto"  
		string api_key  ""
        datetime updatedAt  "auto"  
	}
	genres {
		string genre_id  "PK"  
		string name
        string slug "auto"
        string api_key
        datetime updatedAt  "auto"  
	}
	games_genres {
		string game_id  "PK FK"  
		string genre_id  "PK FK"  
	}
	platforms {
		string platform_id  "PK"  
		string name
        string slug "auto"  
		string manufacturer  ""  
		datetime release_year  ""
        string api_key
        datetime updatedAt  "auto"  
	}
	games_platforms {
		string game_id  "PK FK"  
		string platform_id  "PK FK"  
	}
	reviews {
		string review_id  "PK"  
		string user_id  "FK"  
		string game_id  "FK"  
		string title  ""  
		string body  ""  
		int score  ""  
		datetime created_at  "auto"  
		datetime updated_at  "auto"  
	}

	collections {
		string collection_id  "PK"  
		string user_id  "FK"  
		datetime created_at  "auto"  
		bool isBacklog  "auto"  
		bool isPublic  "auto"  
		string name  "optional"  
		string description  "optional"  
	}
	collections_entries {
		string entry_id  "PK"  
		string game_id  "FK"  
		string collections_id  "FK"  
		int status_id  "FK"  
		int score  "optional"  
		int priority  "optional"  
		int hours_played  "optional"  
		datetime finished_at  "optional"  
	}
	status {
		int status_id  "PK"  
		string status_name  ""  
	}
	users||--o{reviews:"Has"
	users||--o{collections:"Has"
	users}o--||roles:"Has"
	users||--o{sessions:"Has"
	users|o--o|r2:"profile picture"
	games||--o{games_developers:"Created by"
	games_developers}o--||developers:"Created by"
	games||--o{games_genres:"Has"
	games_genres}o--||genres:"Has"
	games||--o{games_platforms:"Uses"
	games_platforms}o--||platforms:"Uses"
	games||--o{reviews:"Has"
	collections||--o{collections_entries:"Has"
	collections_entries||--o|status:"Has"
	games||--o{collections_entries:"Has"
