const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv").config();
const axios = require("axios");

const app = express();
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

// CORS
app.use(cors())

// Public index.html
app.use(express.static('public'))

// API endpoint to fetch restaurants data
const restaurantsRequest = {
	method: "GET",
	url: API_URL + "/businesses/search",
	params: { location: "San Jose, CA 95127", term: "restaurants" },
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
};

app.get("/api/restaurants/category/:category", async (req, res) => {
	const category = req.params.category
	restaurantsRequest.params.categories = category
	try {
		const response = await axios.request(restaurantsRequest);
		res.json(response.data);
	} catch (error) {
		console.log("Error fetching data:", error);
		res.status(500).json({ error: "Error fetching data" });
	}
});

// API endpoint to fetch categories data
const categoriesRequest = {
	method: "GET",
	url: API_URL + "/categories",
	params: { locale: "en_US", term: "categories" },
	headers: {
		Accept: "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
};

app.get("/api/categories", async (_, res) => {
	try {
		const response = await axios.request(categoriesRequest);
		res.json(response.data);
	} catch (error) {
		console.log("Error fetching data:", error);
		res.status(500).json({ error: "Error fetching data" });
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
