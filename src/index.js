const express = require("express");
const db = require("../config/db.js");
const router = require("./routes/router.js");
const cors = require("cors");
const bodyParser = require('body-parser');
const Question = require('./models/question.js');
const Answer = require('./models/answer.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); 

app.use(express.json());
app.use(bodyParser.json());

(async () => {
        try {
                await db.authenticate();

                Answer.belongsTo(Question);

                await db.sync({ alter: true });

        } catch (error) {
                console.error('Unable to connect to the database:', error);
        }
})();

app.use('/api', router);

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});
