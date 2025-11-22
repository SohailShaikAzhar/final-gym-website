document.addEventListener('DOMContentLoaded', function() {
    // Calculate diet and nutrition
    document.getElementById('calculate-diet').addEventListener('click', function() {
        // Get user information
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const activity = parseFloat(document.getElementById('activity').value);
        const goal = document.getElementById('goal').value;
        
        // Validate required fields
        if (!age || !gender || !height || !weight || !activity || !goal) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        
        // Calculate TDEE (Total Daily Energy Expenditure)
        const tdee = bmr * activity;
        
        // Adjust calories based on goal
        let dailyCalories;
        switch(goal) {
            case 'weight_loss':
                dailyCalories = tdee - 500; // 500 calorie deficit for weight loss
                break;
            case 'weight_gain':
                dailyCalories = tdee + 500; // 500 calorie surplus for weight gain
                break;
            case 'muscle_building':
                dailyCalories = tdee + 300; // 300 calorie surplus for muscle building
                break;
            case 'healthy_lifestyle':
            case 'weight_maintain':
            default:
                dailyCalories = tdee; // Maintenance calories
        }
        
        // Calculate macronutrients based on goal
        let proteinPercentage, carbPercentage, fatPercentage;
        
        switch(goal) {
            case 'weight_loss':
                proteinPercentage = 0.40; // 40% protein
                carbPercentage = 0.30;    // 30% carbs
                fatPercentage = 0.30;     // 30% fat
                break;
            case 'muscle_building':
                proteinPercentage = 0.30; // 30% protein
                carbPercentage = 0.45;    // 45% carbs
                fatPercentage = 0.25;     // 25% fat
                break;
            case 'weight_gain':
                proteinPercentage = 0.25; // 25% protein
                carbPercentage = 0.50;    // 50% carbs
                fatPercentage = 0.25;     // 25% fat
                break;
            case 'healthy_lifestyle':
            case 'weight_maintain':
            default:
                proteinPercentage = 0.25; // 25% protein
                carbPercentage = 0.50;    // 50% carbs
                fatPercentage = 0.25;     // 25% fat
        }
        
        // Calculate grams for each macronutrient
        // Protein: 4 calories per gram
        // Carbs: 4 calories per gram
        // Fat: 9 calories per gram
        const proteinGrams = Math.round((dailyCalories * proteinPercentage) / 4);
        const carbGrams = Math.round((dailyCalories * carbPercentage) / 4);
        const fatGrams = Math.round((dailyCalories * fatPercentage) / 9);
        
        // Calculate other nutrition goals
        const sugarGrams = Math.round(dailyCalories * 0.1 / 4); // Max 10% of calories from sugar
        const fiberGrams = Math.round(weight * 0.014); // 14g per 1000 calories (approx)
        const sodiumMg = 2300; // Standard recommendation
        const waterLiters = (weight * 0.033).toFixed(1); // 33ml per kg of body weight
        
        // Update UI with results
        document.getElementById('calories').textContent = Math.round(dailyCalories);
        document.getElementById('carbs').textContent = carbGrams + 'g';
        document.getElementById('protein').textContent = proteinGrams + 'g';
        document.getElementById('fats').textContent = fatGrams + 'g';
        document.getElementById('sugar').textContent = sugarGrams + 'g';
        document.getElementById('fiber').textContent = fiberGrams + 'g';
        document.getElementById('sodium').textContent = sodiumMg + 'mg';
        document.getElementById('water').textContent = waterLiters + 'L';
        
        // Generate diet recommendations based on goal
        const recommendationsList = document.getElementById('diet-recommendations');
        recommendationsList.innerHTML = '';
        
        switch(goal) {
            case 'weight_loss':
                recommendationsList.innerHTML = `
                    <li>Focus on creating a calorie deficit of 300-500 calories per day</li>
                    <li>Prioritize protein intake to preserve muscle mass while losing fat</li>
                    <li>Include plenty of fiber-rich foods to promote satiety</li>
                    <li>Consider intermittent fasting or time-restricted eating</li>
                    <li>Stay hydrated and limit sugary beverages</li>
                    <li>Combine diet with regular exercise for best results</li>
                `;
                break;
                
            case 'weight_gain':
                recommendationsList.innerHTML = `
                    <li>Focus on calorie-dense but nutrient-rich foods</li>
                    <li>Eat frequent, smaller meals throughout the day</li>
                    <li>Include healthy fats like nuts, seeds, and avocados</li>
                    <li>Consider protein shakes or smoothies for extra calories</li>
                    <li>Combine with strength training to ensure weight gain is muscle, not fat</li>
                    <li>Don't skip vegetables - they provide essential micronutrients</li>
                `;
                break;
                
            case 'muscle_building':
                recommendationsList.innerHTML = `
                    <li>Consume adequate protein (1.6-2.2g per kg of body weight)</li>
                    <li>Time protein intake around workouts (before and after)</li>
                    <li>Ensure slight calorie surplus to support muscle growth</li>
                    <li>Focus on compound exercises in your workout routine</li>
                    <li>Get sufficient sleep (7-9 hours) for recovery and muscle growth</li>
                    <li>Consider creatine supplementation for enhanced performance</li>
                `;
                break;
                
            case 'healthy_lifestyle':
                recommendationsList.innerHTML = `
                    <li>Focus on whole, minimally processed foods</li>
                    <li>Include a variety of colorful fruits and vegetables</li>
                    <li>Choose healthy fats from sources like olive oil, nuts, and fish</li>
                    <li>Stay hydrated with water throughout the day</li>
                    <li>Practice mindful eating and listen to your hunger cues</li>
                    <li>Combine balanced nutrition with regular physical activity</li>
                `;
                break;
                
            case 'weight_maintain':
            default:
                recommendationsList.innerHTML = `
                    <li>Monitor your weight regularly and adjust calories as needed</li>
                    <li>Maintain a balanced diet with all food groups</li>
                    <li>Continue with your current activity level</li>
                    <li>Focus on nutrient density rather than just calories</li>
                    <li>Allow for occasional treats while maintaining overall balance</li>
                    <li>Listen to your body's hunger and fullness signals</li>
                `;
        }
    });
});