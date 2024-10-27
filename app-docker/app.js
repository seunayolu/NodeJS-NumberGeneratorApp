const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('views'));

mongoose.connect('mongodb://mongo:27017/nomcomboDB')
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Schema and Model
const ComboSchema = new mongoose.Schema({
    username: String,
    length: Number,
    count: Number,
    combinations: [String]
});

const Combo = mongoose.model('Combo', ComboSchema);

// Generate random combinations
function generateRandomCombos(length, count) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const combos = [];

    for (let i = 0; i < count; i++) {
        let str = '';
        for (let j = 0; j < length; j++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        combos.push(str);
    }

    return combos;
}

// API endpoint to generate or update combinations for a user
app.post('/generate', async (req, res) => {
    const { username, length, count } = req.body;

    // Generate new combinations
    const newCombinations = generateRandomCombos(length, count);

    try {
        // Find the user's record
        let userCombo = await Combo.findOne({ username });

        if (userCombo) {
            // User exists, update their record by adding new combinations
            await Combo.updateOne(
                { username },
                { 
                    $push: { combinations: { $each: newCombinations } },
                    $set: { length, count } // Update length and count to the latest values
                }
            );
            res.json({ message: "Combinations updated successfully!" });
        } else {
            // User does not exist, create a new record
            const newCombo = new Combo({ username, length, count, combinations: newCombinations });
            await newCombo.save();
            res.json({ message: "Combinations generated and saved successfully!" });
        }
    } catch (error) {
        console.error("Error saving combinations:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));