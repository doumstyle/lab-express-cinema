const router = require('express').Router();
const Movies = require("../models/Movie.model");
const mongoose = require("mongoose");
const Movie = require("../models/Movie.model");

router.get("/movies", (req, res) => {
	Movies.find()
		.then((dbResponse) => {
			console.log("Database response:", dbResponse);
			res.render("movies.hbs", {
				movies: dbResponse,
				css: "movies",
			});
		})
		.catch((e) => console.error(e));
});

router.get("/movies/:id", (req, res, next) => {
	console.log(req.params);
	const isValidId = mongoose.isValidObjectId(req.params.id);
	const id = req.params.id;
	if (isValidId) {
		Movies.findById(id)
			.then((movie) => {
				console.log(movie);
				// res.send("To be continued...");
				res.render("moviesDetails.hbs", {
					movie: movie,
					css: "movieDetails",
				});
			})
			.catch((e) => console.error(e));
	} else {
		next();
	}
});


module.exports = router;