package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func FollowersHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	userID := params["userID"]

	user, err := getUser(userID)
	if err != nil {
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

	user, err := getUser(userID)
	if err != nil {
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

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	// Implement logic to create a new user
}

func DeleteUserHandler(w http.ResponseWriter, r *http.Request) {
	// Implement logic to delete a user
}

func UsersHandler(w http.ResponseWriter, r *http.Request) {
	// Implement logic for /users route
}

func RootHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Welcome to Follow Service")
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", RootHandler)
	r.HandleFunc("/users/{userID}/followers", FollowersHandler).Methods("GET")
	r.HandleFunc("/users/{userID}/following", FollowingHandler).Methods("GET")
	r.HandleFunc("/users", CreateUserHandler).Methods("POST")
	r.HandleFunc("/users/{userID}", DeleteUserHandler).Methods("DELETE")

	log.Println("Follow Service is running...")
	log.Fatal(http.ListenAndServe(":8080", r))
}
