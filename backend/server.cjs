// server.cjs - Updated to include /health-check endpoint

// Import necessary modules
require('dotenv').config();
const express = require('express'); // Express.js for building the web server
const cors = require('cors');     // CORS to allow cross-origin requests from your frontend
const multer = require('multer');   // Multer for handling multipart/form-data (file uploads)
const fs = require('fs').promises;  // Node.js File System module for reading files
const path = require('path');       // Node.js Path module for handling file paths

// Initialize Express app
const app = express();
const port = 3000; // Port for the backend server

// Middleware setup
app.use(cors()); // Enable CORS for all routes, allowing your frontend to connect
app.use(express.json()); // Enable parsing of JSON request bodies

// Multer storage configuration for image uploads
// We'll store images temporarily in memory for direct use with the API
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Google Gemini API Configuration
// IMPORTANT: The apiKey will be provided by the Canvas environment at runtime.
// DO NOT hardcode your API key here for security reasons.
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY; // Using a more specific name
const FRONTEND_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Update the URLs to use this new environment variable
const TEXT_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_GEMINI_API_KEY}`;
const VISION_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_GEMINI_API_KEY}`;

/**
 * Converts a Blob (File) object to a Base64 string suitable for Gemini API.
 * @param {Buffer} buffer - The buffer of the image file.
 * @param {string} mimeType - The MIME type of the image (e.g., 'image/jpeg', 'image/png').
 * @returns {string} Base64 encoded string of the image.
 */
function bufferToBase64(buffer, mimeType) {
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

/**
 * Handles the food analysis request.
 * Receives an image, sends it to Gemini Vision model for analysis,
 * and returns identified food, calories, and macronutrients.
 */
app.post('/analyze-food', upload.single('image'), async (req, res) => {
    // Check if an image file was uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded.' });
    }

    try {
        const mimeType = req.file.mimetype;
        const base64ImageData = req.file.buffer.toString('base64');

        // Construct the prompt for the Gemini Vision model
        const prompt = "Analyze the food in this image. Identify the main food item, estimate its total calories, and provide a breakdown of macronutrients (protein, carbohydrates, fat) in grams. Be concise and provide numerical estimates. Format the output as plain text, for example: 'Identified Food: Chicken Salad, Estimated Calories: 350 kcal, Protein: 40g, Carbohydrates: 15g, Fat: 15g'. If multiple items, try to estimate for the most prominent one or a typical serving.";

        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: mimeType,
                                data: base64ImageData
                            }
                        }
                    ]
                }
            ],
            // Add generation config for safety settings if needed
            generationConfig: {
                stopSequences: [],
                maxOutputTokens: 200,
                temperature: 0.2,
                topP: 0.8,
                topK: 10,
            }
        };

        // Make the API call to Gemini Vision model
        const geminiResponse = await fetch(VISION_MODEL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // Check for HTTP errors from the Gemini API
        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error('Gemini API Error Response:', errorText);
            throw new Error(`Gemini API HTTP error! Status: ${geminiResponse.status}, Details: ${errorText}`);
        }

        const geminiResult = await geminiResponse.json();
        console.log('Gemini Raw Response:', JSON.stringify(geminiResult, null, 2));

        // Extract the generated text response
        const generatedText = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            console.warn('Gemini response did not contain text content:', geminiResult);
            return res.status(500).json({ error: 'Could not get analysis from AI. Please try again.' });
        }

        // Parse the generated text to extract structured information
        // This is a simple regex-based parsing; more robust parsing might be needed for variations.
        const identifiedFoodMatch = generatedText.match(/Identified Food: (.*?)(?:,|$)/);
        const caloriesMatch = generatedText.match(/Estimated Calories: (.*?)(?:,|$)/);
        const proteinMatch = generatedText.match(/Protein: (.*?)(?:,|$)/);
        const carbsMatch = generatedText.match(/Carbohydrates: (.*?)(?:,|$)/);
        const fatMatch = generatedText.match(/Fat: (.*?)(?:,|$)/);

        const analysisResults = {
            identifiedFood: identifiedFoodMatch ? identifiedFoodMatch[1].trim() : 'N/A',
            estimatedCalories: caloriesMatch ? caloriesMatch[1].trim() : 'N/A',
            protein: proteinMatch ? proteinMatch[1].trim() : 'N/A',
            carbohydrates: carbsMatch ? carbsMatch[1].trim() : 'N/A',
            fat: fatMatch ? fatMatch[1].trim() : 'N/A',
        };

        res.json(analysisResults);

    } catch (error) {
        console.error('Error during food analysis:', error.message);
        res.status(500).json({ error: 'Failed to analyze food: ' + error.message });
    }
});

/**
 * Handles the food search request.
 * Receives a food query and quantity, and uses Gemini Text model
 * to provide mock nutrition data.
 */
app.post('/search-food', async (req, res) => {
    const { searchTerm, quantity } = req.body;

    if (!searchTerm || !quantity) {
        return res.status(400).json({ error: 'Food item and quantity are required.' });
    }

    try {
        const prompt = `Provide the nutritional facts for "${quantity} of ${searchTerm}". Specifically, I need:
        - Food Item (as a string)
        - Quantity (as a string, e.g., "1 cup", "200g")
        - Calories (integer, in kcal)
        - Protein (integer, in grams)
        - Carbohydrates (integer, in grams)
        - Fat (integer, in grams)
        - Fiber (integer, in grams)
        - Sugar (integer, in grams)
        - Sodium (integer, in mg)
        - Vitamin C (integer, in mg)
        - Calcium (integer, in mg)
        - Iron (integer, in mg)

        Format the response as a JSON object strictly following this schema:
        {
          "foodItem": "string",
          "quantity": "string",
          "calories": "number",
          "protein": "number",
          "carbohydrates": "number",
          "fat": "number",
          "fiber": "number",
          "sugar": "number",
          "sodium": "number",
          "vitaminC": "number",
          "calcium": "number",
          "iron": "number"
        }
        Do not include any other text or formatting outside the JSON. Ensure all values are numbers where specified.
        If you cannot find exact data, provide reasonable estimates.`;

        const payload = {
            contents: [{
                role: "user",
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                responseMimeType: "application/json",
                // This schema is a hint; the model tries to follow but might not always perfectly
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        "foodItem": { "type": "STRING" },
                        "quantity": { "type": "STRING" },
                        "calories": { "type": "NUMBER" },
                        "protein": { "type": "NUMBER" },
                        "carbohydrates": { "type": "NUMBER" },
                        "fat": { "type": "NUMBER" },
                        "fiber": { "type": "NUMBER" },
                        "sugar": { "type": "NUMBER" },
                        "sodium": { "type": "NUMBER" },
                        "vitaminC": { "type": "NUMBER" },
                        "calcium": { "type": "NUMBER" },
                        "iron": { "type": "NUMBER" }
                    },
                    "propertyOrdering": ["foodItem", "quantity", "calories", "protein", "carbohydrates", "fat", "fiber", "sugar", "sodium", "vitaminC", "calcium", "iron"]
                },
                stopSequences: [],
                maxOutputTokens: 500,
                temperature: 0.1, // Lower temperature for more factual, less creative output
                topP: 0.9,
                topK: 10,
            }
        };

        const geminiResponse = await fetch(TEXT_MODEL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error('Gemini API Error Response (Search):', errorText);
            throw new Error(`Gemini API HTTP error! Status: ${geminiResponse.status}, Details: ${errorText}`);
        }

        const geminiResult = await geminiResponse.json();
        console.log('Gemini Raw Response (Search):', JSON.stringify(geminiResult, null, 2));

        const generatedJsonString = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedJsonString) {
            console.warn('Gemini response did not contain JSON content for search:', geminiResult);
            return res.status(500).json({ error: 'Could not get nutrition facts from AI. Please try again.' });
        }

        // Parse the JSON string from Gemini
        const nutritionData = JSON.parse(generatedJsonString);
        res.json(nutritionData);

    } catch (error) {
        console.error('Error during food search:', error.message);
        res.status(500).json({ error: 'Failed to search food: ' + error.message });
    }
});


/**
 * Handles the diet plan generation request.
 * Receives user preferences and uses Gemini Text model to generate a diet plan.
 */
app.post('/get-diet-plan', async (req, res) => {
    const { userName, userAge, dietGoal, dailyProteinNeeded } = req.body;

    if (!userAge || !dietGoal) {
        return res.status(400).json({ error: 'Age and Diet Goal are required for a diet plan.' });
    }

    try {
        let prompt = `Generate a personalized diet plan for ${userName ? userName : 'a user'} who is ${userAge} years old and wants to "${dietGoal}".`;

        if (dailyProteinNeeded) {
            prompt += ` They aim for approximately ${dailyProteinNeeded}g of protein per day.`;
        }

        prompt += `
        The plan should be for one typical day, include 3 meals (Breakfast, Lunch, Dinner) and 1-2 snacks.
        For each meal and snack, suggest 1-2 specific food items or simple meal ideas.
        Include a brief introductory and concluding remark.
        The tone should be encouraging and helpful.
        `;

        const payload = {
            contents: [{
                role: "user",
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                stopSequences: [],
                maxOutputTokens: 800, // Increased token limit for more detailed plan
                temperature: 0.7, // Higher temperature for more creative/varied plan
                topP: 0.9,
                topK: 10,
            }
        };

        const geminiResponse = await fetch(TEXT_MODEL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error('Gemini API Error Response (Diet Plan):', errorText);
            throw new Error(`Gemini API HTTP error! Status: ${geminiResponse.status}, Details: ${errorText}`);
        }

        const geminiResult = await geminiResponse.json();
        console.log('Gemini Raw Response (Diet Plan):', JSON.stringify(geminiResult, null, 2));

        const dietPlanText = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!dietPlanText) {
            console.warn('Gemini response did not contain text content for diet plan:', geminiResult);
            return res.status(500).json({ error: 'Could not generate a diet plan from AI. Please try again.' });
        }

        res.json({ dietPlan: dietPlanText });

    } catch (error) {
        console.error('Error during diet plan generation:', error.message);
        res.status(500).json({ error: 'Failed to generate diet plan: ' + error.message });
    }
});

/**
 * NEW: Handles the health check request from a selfie image.
 * Receives a selfie, sends it to Gemini Vision model for a general visual assessment,
 * and returns whether the person appears "Healthy", "Unhealthy", or "Needs Improvement".
 */
app.post('/health-check', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No selfie image uploaded.' });
    }

    try {
        const mimeType = req.file.mimetype;
        const base64ImageData = req.file.buffer.toString('base64');

        // Carefully crafted prompt for non-medical visual assessment
        const prompt = `Analyze the person in this selfie image. Based *solely* on their visual appearance related to general wellness (e.g., skin health, alertness of eyes, overall vitality, and general presentation), determine if they appear to be in a 'Healthy' state, an 'Unhealthy' state, or a state where they 'Need Improvement'.
        
        IMPORTANT: This analysis is purely for demonstration and entertainment. Do NOT provide any medical advice, diagnosis, or personal health recommendations. Do NOT make any claims about actual health conditions.
        
        Respond with a JSON object strictly following this schema:
        {
          "assessment": "string",
          "note": "string"
        }
        The 'assessment' field must be one of: 'Healthy', 'Unhealthy', 'Needs Improvement', or 'Cannot Determine'.
        The 'note' field should be a very brief, non-diagnostic observation about the visual appearance, or an explanation if 'Cannot Determine'.
        Example: {\"assessment\": \"Healthy\", \"note\": \"Clear skin, vibrant appearance.\"}`;

        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: mimeType,
                                data: base64ImageData
                            }
                        }
                    ]
                }
            ],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        "assessment": { "type": "STRING" },
                        "note": { "type": "STRING" }
                    },
                    "propertyOrdering": ["assessment", "note"]
                },
                maxOutputTokens: 200,
                temperature: 0.4, // Slightly higher temperature for more varied notes
                topP: 0.8,
                topK: 10,
            }
        };

        const geminiResponse = await fetch(VISION_MODEL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error('Gemini API Error Response (Health Check):', errorText);
            throw new Error(`Gemini API HTTP error! Status: ${geminiResponse.status}, Details: ${errorText}`);
        }

        const geminiResult = await geminiResponse.json();
        console.log('Gemini Raw Response (Health Check):', JSON.stringify(geminiResult, null, 2));

        const generatedJsonString = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedJsonString) {
            console.warn('Gemini response did not contain JSON content for health check:', geminiResult);
            return res.status(500).json({ error: 'Could not get health assessment from AI. Please try again.' });
        }

        const healthAssessment = JSON.parse(generatedJsonString);
        res.json(healthAssessment);

    } catch (error) {
        console.error('Error during health check:', error.message);
        res.status(500).json({ error: 'Failed to perform health check: ' + error.message });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`FoodSnap AI Backend server running on http://127.0.0.1:${port}`);
    console.log('Ensure your frontend fetches from this address.');
    console.log('Remember that the Google API Key is automatically injected by the Canvas environment.');
});
