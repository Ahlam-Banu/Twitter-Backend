package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func initDB() {
	// Connect to MariaDB database
	var err error
	db, err = sql.Open("mysql", "e2102970:KzdSPp6dy6a@tcp(localhost:3306)/e2102970_Go")
	if err != nil {
		log.Fatal(err)
	}

	// Check if the database connection is successful
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

// Example function to create a new user in the database
func createUser(username string) error {
	_, err := db.Exec("INSERT INTO test1 (id, username) VALUES (?, ?)", generateUUID(), username)
	if err != nil {
		return err
	}
	return nil
}

// Example function to follow a user
func followUser(followerID string, followeeID string) error {
	_, err := db.Exec("INSERT INTO test2 (follower_id, followee_id) VALUES (?, ?)", followerID, followeeID)
	if err != nil {
		return err
	}
	return nil
}

// Example function to generate UUID
func generateUUID() string {
	// Implement UUID generation logic here
	return "generated_uuid"
}
