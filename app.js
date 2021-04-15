
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



	/*********
	* handle GET requests
	**********/
	// root api 
	app.get('/', (req, res) => {
		res.send('Cleanex server is working');
	})

	// services api
	app.get('/services', (req, res) => {
		servicesCollection.find({})
			.toArray((err, documents) => {
				res.send(documents);
				console.log('Service list sent to client');
			})
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
		reviewCollection.find({})
			.toArray((err, documents) => {
				res.send(documents);
				console.log('Reviews list sent to client');
			})
	});

	/**********
	* handle POST requests
	***********/


});


app.listen(process.env.PORT || port);




/***********
* discareded post requests
************/

// POST ORDER LIST
/*


	const orderList = [{
		buyerName: "Hamid Keramati",
		buyerEmail: "arif.dvm.hstu@gmail.com",
		ServiceID: "",
		ServiceName: "Laundry",
		paidWith: "Master Card",
		status: "Pending",
		orderDate: "",
		totalCost: 400
	}, {
		buyerName: "Hamid Keramati",
		buyerEmail: "arif.dvm.hstu@gmail.com",
		ServiceID: "",
		ServiceName: "Laundry",
		paidWith: "Visa Card",
		status: "Pending",
		orderDate: "",
		totalCost: 500
	}];
	const options = { orderd: true };


	app.post('/uploadOrders', (req, res) => {
		orderCollection.insertMany(orderList, options)
			.then(result => {
				res.send(result)
				console.log('insertedMany');
			})

	})*/

/*REVIEW LIST*/
/*

const reviewList = [{
		reviewerName: "Hamid Keramati",
		reviewerImg: "https://i.ibb.co/tcv9P7X/reviewer5.jpg",
		designation: "CEO",
		company: "Pet Nursing Aid",
		star: 5,
		review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
	}, {
		reviewerName: "Mohsen Mashayekhi",
		reviewerImg: "https://i.ibb.co/2sdb6jv/reviewer4.jpg",
		designation: "CEO",
		company: "Pet Nursing Aid",
		star: 4,
		review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
	}, {
		reviewerName: "Mohsen Diba",
		reviewerImg: "https://i.ibb.co/tsVLXHb/reviewer3.jpg",
		designation: "CEO",
		company: "Pet Nursing Aid",
		star: 3,
		review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
	}, {
		reviewerName: "Sahand Pirouzfar",
		reviewerImg: "https://i.ibb.co/YL6Xyx7/reviewer2.jpg",
		designation: "CEO",
		company: "Pet Nursing Aid",
		star: 2,
		review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
	}, {
		reviewerName: "Bairam Bayat",
		reviewerImg: "https://i.ibb.co/qm4T6t6/reviewer1.jpg",
		designation: "CEO",
		company: "Pet Nursing Aid",
		star: 5,
		review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
	}];
	const options = { orderd: true };*/

// SERVICE LIST
/*

	const serviceList = [{
		serviceName: "Plumbing Service",
		serviceDetails: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quibusdam",
		serviceIcon: "https://i.ibb.co/Ss7JfHc/icon-Plumbing.png",
		serviceCharge: 100
	}, {
		serviceName: "Office Cleaning",
		serviceDetails: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quibusdam",
		serviceIcon: "https://i.ibb.co/hgw8yQJ/icon-Office-Cleaning.png",
		serviceCharge: 200
	}, {
		serviceName: "Laundry Service",
		serviceDetails: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quibusdam",
		serviceIcon: "https://i.ibb.co/t4grKfv/icon-Laundry.png",
		serviceCharge: 300
	}, {
		serviceName: "Toilet Cleaning",
		serviceDetails: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quibusdam",
		serviceIcon: "https://i.ibb.co/vwgwzHJ/icon-Toilet.png",
		serviceCharge: 100
	}, {
		serviceName: "Window Cleaning",
		serviceDetails: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quibusdam",
		serviceIcon: "https://i.ibb.co/TWgXJPQ/icon-Window.png",
		serviceCharge: 200
	}, {
		serviceName: "Kitchen Cleaning",
		serviceDetails: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, quibusdam",
		serviceIcon: "https://i.ibb.co/bFfdF2X/icon-Kitchen.png",
		serviceCharge: 300
	}];

	const options = { orderd: true };


	app.post('/uploadServices', (req, res) => {
		servicesCollection.insertMany(serviceList, options)
		.then(result => {
			res.send(result)
			console.log('insertedMany');
		})

	})*/