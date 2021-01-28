const express = require("express");
const router = express.Router();
const path = require("path");
const { getDate } = require("../lib/index");

// Inmemory database for all post
let board = {};
let id = 1;

// send all post on the board
router.get("/", (req, res) => {
	res.send(board).end();
	// res.sendFile(path.join(__dirname, "../", "index.html"));
});

// send specific post on the board
router.get("/:id", (req, res) => {
	const postId = req.params.id;
	if (board[postId] === undefined) {
		res.status(404).send("Cannot found the post").end();
	} else {
		res.status(200).send(board[postId]).end();
	}
});

// add new post on the board
router.post("/", (req, res) => {
	const { author, password, title, content } = req.body;
	if (author && password && title && content) {
		if (board[id] === undefined) {
			const date = getDate();
			const post = {
				author,
				createDate: date,
				modifyDate: date,
				password,
				title,
				content,
			};
			board[id] = post;
		}
		id++;
		res.status(200).send("Success").end();
	} else {
		res.status(400).send("Check your contents").end();
	}
});

// modify the post on the board
router.patch("/:id", (req, res) => {
	const { password } = req.body;
	const postId = req.params.id;

	if (board[postId] === undefined) {
		res.status(404).send("Cannot found the post").end();
	} else if (board[postId].password !== password) {
		res.status(400).send("Password is not matched").end();
	} else {
		board[postId] = {
			...board[postId],
			...req.body,
			modifyDate: getDate(),
		};
		res.status(201).send("Modify is done").end();
	}
});

// delete the post on the board
router.delete("/:id", (req, res) => {
	const { password } = req.body;
	const postId = req.params.id;

	if (board[postId] === undefined) {
		res.status(404).send("Cannot found the post").end();
	} else if (board[postId].password !== password) {
		res.status(400).send("Password is not matched").end();
	} else {
		const newBoard = {};
		for (let key in board) {
			if (key !== postId) {
				newBoard[key] = board[key];
			}
		}
		board = newBoard;
		res.status(200).send("Delete the post").end();
	}
});

module.exports = router;
