const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://packageboy-app.netlify.app"
    ]
}));
app.use(express.json());
// middleware

// mongo db
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@mongo-app.q62fegx.mongodb.net/?retryWrites=true&w=majority&appName=mongo-app";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongo-app.q62fegx.mongodb.net/?retryWrites=true&w=majority&appName=mongo-app`;
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const usersCollection = client.db('delivery-app').collection('users');
        const bookingsCollection = client.db('delivery-app').collection('bookings');
        const reviewsCollection = client.db('delivery-app').collection('reviews');


        // api for users
        app.post('/users', async (req, res) => {
            const query = req.body;
            const result = await usersCollection.insertOne(query);
            res.send(result)
        })

        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

        app.get('/user', async (req, res) => {
            const email = req.query.email;
            if (!email) {
                return res.status(400).send({ message: "Email is required" });
            }

            const query = { email: email };
            const user = await usersCollection.findOne(query);

            if (user) {
                res.send(user);
            } else {
                res.status(404).send({ message: "User not found" });
            }
        });

        app.patch('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: { userType: req.body.userType },
            };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        // api for users

        // api for booking
        app.post('/bookings', async (req, res) => {
            const query = req.body;
            const result = await bookingsCollection.insertOne(query);
            res.send(result);
        })

        app.get('/bookings', async (req, res) => {
            const email = req.query.email;
            let query = {}
            if (email) {
                query = { email: email };
            }
            const bookings = await bookingsCollection.find(query).toArray();
            res.send(bookings)

        })

        app.delete('/bookings/:id', async(req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await bookingsCollection.deleteOne(filter);
            res.send(result);
        })



        app.patch('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: req.body,
            };
            const result = await bookingsCollection.updateOne(filter, updateDoc);
            res.send(result);
        });
        // api for booking

        // api for reviews
        app.post('/reviews', async (req, res) => {
            const query = req.body;
            const result = await reviewsCollection.insertOne(query);
            res.send(result)
        })

        app.get('/reviews', async (req, res) => {
            const result = await reviewsCollection.find().toArray();
            res.send(result);
        })
        // api for reviews

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// mongo db

app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})