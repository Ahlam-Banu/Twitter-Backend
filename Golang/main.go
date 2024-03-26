package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type User struct {
	ID        string   `json:"id"`
	Username  string   `json:"username"`
	Followers []string `json:"followers"`
	Following []string `json:"following"`
}

var users map[string]User

func init() {
	users = make(map[string]User)
}

func FollowHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	userID := params["userID"]
	followUserID := params["followUserID"]

	user, ok := users[userID]
	if !ok {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	alreadyFollowing := false
	for _, followedUserID := range user.Following {
		if followedUserID == followUserID {
			alreadyFollowing = true
			break
		}
	}

	if r.Method == http.MethodPost {
		if alreadyFollowing {
			http.Error(w, "Already following the user", http.StatusBadRequest)
			return
		}
		user.Following = append(user.Following, followUserID)
		users[userID] = user
		w.WriteHeader(http.StatusCreated)
	} else if r.Method == http.MethodDelete {
		if !alreadyFollowing {
			http.Error(w, "Not following the user", http.StatusBadRequest)
			return
		}
		var newFollowing []string
		for _, followedUserID := range user.Following {
			if followedUserID != followUserID {
				newFollowing = append(newFollowing, followedUserID)
			}
		}
		user.Following = newFollowing
		users[userID] = user
		w.WriteHeader(http.StatusNoContent)
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func FollowersHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	userID := params["userID"]

	user, ok := users[userID]
	if !ok {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	followers := user.Followers

	response, err := json.Marshal(followers)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func FollowingHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	userID := params["userID"]

	user, ok := users[userID]
	if !ok {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	following := user.Following

	response, err := json.Marshal(following)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/users/{userID}/follow/{followUserID}", FollowHandler).Methods("POST", "DELETE")
	r.HandleFunc("/users/{userID}/followers", FollowersHandler).Methods("GET")
	r.HandleFunc("/users/{userID}/following", FollowingHandler).Methods("GET")

	log.Println("Follow Service is running...")
	log.Fatal(http.ListenAndServe(":8080", r))
}
