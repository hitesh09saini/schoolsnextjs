const express = require('express');
const mysql = require('mysql');
const upload = require('./multer.middleware');
const { cloudinaryURl } = require('./cloudinary')
require('dotenv').config({
    path: '../.env'
})
const cors = require('cors')

const app = express();
const port = process.env.PORT;

const cloudinary = require('cloudinary')

// cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ssss9694#',
    database: 'CollegeId',
});

// Connect to the MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Create a table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS schools(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    contact TEXT,
    image TEXT,
    email VARCHAR(255) UNIQUE
  );
`;



connection.query(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table: ' + err.stack);
        return;
    }
    console.log('Table created or already exists');
});

// Express middleware to parse JSON
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}))
// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route to fetch all users
app.get('/getschools', (req, res) => {
    connection.query('SELECT * FROM schools', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// Route to add a new user
app.post('/newschool', upload.single('image'), async (req, res) => {
    const { body: schoolData, file } = req;

    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'File path does not exist!',
        });
    }

    try {
        const result = await cloudinaryURl(file.path);
        if (result.url) {
            // Check if email already exists
            connection.query(
                'SELECT * FROM schools WHERE email = ?',
                [schoolData.email],
                (selectErr, selectResults) => {
                    if (selectErr) {
                        console.error('Error checking existing email: ' + selectErr.stack);
                        res.status(500).send('Internal Server Error');
                        return;
                    }

                    if (selectResults.length > 0) {
                        // Email already exists, return a conflict response
                        res.status(409).json({
                            success: false,
                            message: 'Email already exists in the database.',
                        });
                    } else {
                        // Email does not exist, proceed with the insertion
                        connection.query(
                            'INSERT INTO schools SET ?',
                            { ...schoolData, image: result.url },
                            (insertErr, insertResults) => {
                                if (insertErr) {
                                    console.error('Error inserting new school: ' + insertErr.stack);
                                    res.status(500).send('Internal Server Error');
                                    return;
                                }
                                console.log(insertResults);
                                res.json({ id: insertResults.insertId, ...schoolData });
                            }
                        );
                    }
                }
            );
        } else {
            console.error('Unexpected Cloudinary response:', result);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error uploading image to Cloudinary: ' + error.message);
        res.status(500).send('Internal Server Error');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
