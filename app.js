
const express = require('express');
const app = express();
const port = 5000;

// require env variables
require('dotenv').config();

// require middlewares
const bodyParser = require('body-parser');
const cors = require('cors');

//  apply middlewares
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



/************
* HANDLE MONGODB REQUESTS
*************/
// require mongoClient
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rqnu2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// use connect method to connect to the database
MongoClient.connect(url, function(err, client) {
	console.log('connection successful');
	// define database collections
	// SERVICE COLLECTION
	const servicesCollection = client.db(process.env.DB_NAME).collection('services');
	// REVIEW COLLECTION
	const reviewCollection = client.db(process.env.DB_NAME).collection('reviews');
	// ORDER COLLECTION
	const orderCollection = client.db(process.env.DB_NAME).collection('orders');
	// ADMIN COLLECTION
	const adminCollection = client.db(process.env.DB_NAME).collection('admins');



	/*********
	* handle GET requests
	**********/
	// root api 
	app.get('/', (req, res) => {
		res.send('Cleanex server is working');
	})

	// services api
	app.get('/services', (req, res) => {
		const { count } = req.query;
		if (count) {
			servicesCollection.find().sort({ _id: -1 }).limit(parseInt(count))
				.toArray((err, documents) => {
					res.send(documents);
					console.log('Latest '+ count +' services sent to client');
				})
		} else {
			servicesCollection.find({})
				.toArray((err, documents) => {
					res.send(documents);
					console.log('All services sent to client');
				})
		}
	});

	// orders api
	app.get('/orders', (req, res) => {
		orderCollection.find({})
			.toArray((err, documents) => {
				res.send(documents);
				console.log('Order list sent to client');
			})
	});

	// reviews api
	app.get('/reviews', (req, res) => {
		const { count } = req.query;
		if (count) {
			reviewCollection.find().sort({ _id: -1 }).limit(parseInt(count))
				.toArray((err, documents) => {
					res.send(documents);
					console.log('Latest '+ count +' reviews sent to client');
				})
		} else {
			reviewCollection.find({})
				.toArray((err, documents) => {
					res.send(documents);
					console.log('All reviews sent to client');
				})
		}
	});

	// admins api
	app.get('/admins', (req, res) => {
		adminCollection.find({})
			.toArray((err, documents) => {
				res.send(documents);
				console.log('Admin list sent to client');
			})
	})

	/**********
	* handle POST requests
	***********/
	// add service api
	app.post('/addService', (req, res) => {
		servicesCollection.insertOne(req.body)
			.then(result => {
				res.send(result);
				console.log(result);
			})
	})

	// book service api
	app.post('/seletedService', (req, res) => {
		const id = req.body[0];
		servicesCollection.find({"_id" : ObjectID(id)})
			.toArray((err, documents) => {
				res.send(documents)
				console.log('Selected Service sent to client');
			})
	})

	// make admin api
	app.post('/makeAdmin', (req, res) => {
		adminCollection.insertOne(req.body)
			.then(result => {
				res.send(result);
				console.log('Admin created successfully');
			})
	})

	// make admin api
	app.post('/book', (req, res) => {
		orderCollection.insertOne(req.body)
			.then(result => {
				res.send(result);
				console.log('New order booked successfully');
			})
	})

	// add review api
	app.post('/addReview', (req, res) => {
		reviewCollection.insertOne(req.body)
			.then(result => {
				res.send(result);
				console.log('Review added successfully');
			})
	})

	// update order status
	app.post('/updateOrder', (req, res) => {
		const { orderID, updatedStatus } = req.body;

		orderCollection.update(
			{ "orderID": orderID },
			{ $set: { "status": updatedStatus } }
		)
			.then(result => {
				res.send(result);
				console.log(result);
			})
	})
});


app.listen(process.env.PORT || port);

