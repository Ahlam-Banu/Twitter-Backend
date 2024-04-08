package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func initDB() {
	var err error
	db, err = sql.Open("mysql", "e2102970:KzdSPp6dy6a@tcp(localhost:3306)/e2102970_Go")
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MariaDB database")
}

func closeDB() {
	if db != nil {
		db.Close()
		fmt.Println("Closed database connection")
	}
}

type User struct {
	ID        string   `json:"id"`
	Username  string   `json:"username"`
	Followers []string `json:"followers"`
	Following []string `json:"following"`
}

func getUser(userID string) (User, error) {
	// Implement logic to fetch user data from the database
	// Here you would execute a SQL query to retrieve user data based on the provided userID

	// For demonstration purposes, let's assume we have a hard-coded user
	user := User{
		ID:        userID,
		Username:  "example_user",
		Followers: []string{"follower1", "follower2"},
		Following: []string{"following1", "following2"},
	}

	return user, nil
}
