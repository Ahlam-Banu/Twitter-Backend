package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

var db *sql.DB

// User struct represents a user
type User struct {
	ID        string   `json:"id"`
	Username  string   `json:"username"`
	Followers []string `json:"followers"`
	Following []string `json:"following"`
}

func initDB() {
	var err error
	db, err = sql.Open("mysql", "e2000599:nfkH8mAxcJE@tcp(mariadb.vamk.fi:3306)/e2000599_Follow")
	if err != nil {
		log.Fatal(err)
	}

	// Create users table if not exists
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS users (
		id TEXT PRIMARY KEY,
		username TEXT,
		followers TEXT,
		following TEXT
	)`)
	if err != nil {
		log.Fatal(err)
	}
}

func FollowHandler(w http.ResponseWriter, r *http.Request) {
	// Extract userID and followUserID from request parameters
	params := mux.Vars(r)
	userID := params["userID"]
	followUserID := params["followUserID"]

	// Check the HTTP method to determine the action (follow or unfollow)
	switch r.Method {
	case http.MethodPost: // Follow user
		err := FollowUser(userID, followUserID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(w, "User %s is now following user %s", userID, followUserID)
	case http.MethodDelete: // Unfollow user
		err := UnfollowUser(userID, followUserID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(w, "User %s unfollowed user %s", userID, followUserID)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// FollowUser adds the followUserID to the followers list of userID
func FollowUser(userID, followUserID string) error {
	// Retrieve current followers list of userID from the database
	var currentFollowers string
	err := db.QueryRow("SELECT followers FROM users WHERE id = ?", userID).Scan(&currentFollowers)
	if err != nil {
		return err
	}

	// Append followUserID to the followers list
	newFollowers := append(strings.Split(currentFollowers, ","), followUserID)
	// Convert the new followers list back to string
	newFollowersStr := strings.Join(newFollowers, ",")

	// Update the followers list in the database
	_, err = db.Exec("UPDATE users SET followers = ? WHERE id = ?", newFollowersStr, userID)
	if err != nil {
		return err
	}

	return nil
}

// UnfollowUser removes the followUserID from the followers list of userID
func UnfollowUser(userID, followUserID string) error {
	// Retrieve current followers list of userID from the database
	var currentFollowers string
	err := db.QueryRow("SELECT followers FROM users WHERE id = ?", userID).Scan(&currentFollowers)
	if err != nil {
		return err
	}

	// Remove followUserID from the followers list
	newFollowers := []string{}
	for _, follower := range strings.Split(currentFollowers, ",") {
		if follower != followUserID {
			newFollowers = append(newFollowers, follower)
		}
	}
	// Convert the new followers list back to string
	newFollowersStr := strings.Join(newFollowers, ",")

	// Update the followers list in the database
	_, err = db.Exec("UPDATE users SET followers = ? WHERE id = ?", newFollowersStr, userID)
	if err != nil {
		return err
	}

	return nil
}

// getUser retrieves user from the database
func getUser(userID string) (User, error) {
	var user User
	err := db.QueryRow("SELECT id, username, followers, following FROM users WHERE id = ?", userID).Scan(&user.ID, &user.Username, &user.Followers, &user.Following)
	return user, err
}

// updateUser updates user in the database
func updateUser(user User) error {
	_, err := db.Exec("UPDATE users SET followers = ?, following = ? WHERE id = ?", user.Followers, user.Following, user.ID)
	return err
}

// Rest of the code remains the same...

func main() {
	initDB()
	defer db.Close()

	r := mux.NewRouter()

	// Routes
	r.HandleFunc("/users/{userID}/follow/{followUserID}", FollowHandler).Methods("POST", "DELETE")

	log.Println("Follow Service is running...")
	log.Fatal(http.ListenAndServe(":8080", r))
}
