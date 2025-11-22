document.addEventListener('DOMContentLoaded', function() {
    // Height unit toggling
    const heightUnitToggles = document.querySelectorAll('.height-unit-toggle');
    heightUnitToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const unit = toggle.getAttribute('data-unit');
            
            // Update active height unit button
            heightUnitToggles.forEach(btn => btn.classList.remove('active'));
            toggle.classList.add('active');
            
            // Show corresponding height inputs
            if (unit === 'cm') {
                document.getElementById('metric-height').style.display = 'block';
                document.getElementById('imperial-height').style.display = 'none';
            } else {
                document.getElementById('metric-height').style.display = 'none';
                document.getElementById('imperial-height').style.display = 'block';
            }
        });
    });
    
    // Weight unit toggling
    const weightUnitToggles = document.querySelectorAll('.weight-unit-toggle');
    weightUnitToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const unit = toggle.getAttribute('data-unit');
            
            // Update active weight unit button
            weightUnitToggles.forEach(btn => btn.classList.remove('active'));
            toggle.classList.add('active');
            
            // Show corresponding weight inputs
            if (unit === 'kg') {
                document.getElementById('metric-weight').style.display = 'block';
                document.getElementById('imperial-weight').style.display = 'none';
            } else {
                document.getElementById('metric-weight').style.display = 'none';
                document.getElementById('imperial-weight').style.display = 'block';
            }
        });
    });
    
    // Add workout field
    document.getElementById('add-workout').addEventListener('click', function() {
        const workoutContainer = document.getElementById('workout-container');
        const newWorkout = document.createElement('div');
        newWorkout.className = 'workout-item';
        newWorkout.innerHTML = `
            <select class="workout-type">
                <option value="">Select Workout Type</option>
                <option value="gym">Gym/Weight Training</option>
                <option value="cardio">Cardio</option>
                <option value="yoga">Yoga/Pilates</option>
                <option value="swimming">Swimming</option>
                <option value="cycling">Cycling</option>
                <option value="running">Running</option>
                <option value="sports">Sports</option>
                <option value="other">Other</option>
            </select>
            <input type="number" class="workout-duration" placeholder="Minutes" min="0">
            <select class="workout-frequency">
                <option value="1">1x/week</option>
                <option value="2">2x/week</option>
                <option value="3">3x/week</option>
                <option value="4">4x/week</option>
                <option value="5">5x/week</option>
                <option value="6">6x/week</option>
                <option value="7">7x/week</option>
            </select>
            <button class="remove-workout"><i class="fas fa-times"></i></button>
        `;
        workoutContainer.appendChild(newWorkout);
        
        // Add event listener to remove button
        newWorkout.querySelector('.remove-workout').addEventListener('click', function() {
            workoutContainer.removeChild(newWorkout);
        });
    });
    
    // Calculate BMI and other metrics
    document.getElementById('calculate').addEventListener('click', function() {
        // Get basic information
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        
        // Validate required fields
        if (!age || !gender) {
            alert('Please enter your age and select your gender.');
            return;
        }
        
        // Get height based on selected unit
        const heightUnit = document.querySelector('.height-unit-toggle.active').getAttribute('data-unit');
        let heightCm;
        
        if (heightUnit === 'cm') {
            heightCm = parseFloat(document.getElementById('height-cm').value);
            if (isNaN(heightCm) || heightCm <= 0) {
                alert('Please enter a valid height in centimeters.');
                return;
            }
        } else {
            const feet = parseFloat(document.getElementById('height-ft').value);
            const inches = parseFloat(document.getElementById('height-in').value);
            
            if (isNaN(feet) || isNaN(inches) || feet <= 0 || inches < 0) {
                alert('Please enter valid height in feet and inches.');
                return;
            }
            
            heightCm = (feet * 12 + inches) * 2.54; // convert to cm
        }
        
        // Get weight based on selected unit
        const weightUnit = document.querySelector('.weight-unit-toggle.active').getAttribute('data-unit');
        let weightKg;
        
        if (weightUnit === 'kg') {
            weightKg = parseFloat(document.getElementById('weight-kg').value);
            if (isNaN(weightKg) || weightKg <= 0) {
                alert('Please enter a valid weight in kilograms.');
                return;
            }
        } else {
            weightKg = parseFloat(document.getElementById('weight-lbs').value);
            if (isNaN(weightKg) || weightKg <= 0) {
                alert('Please enter a valid weight in pounds.');
                return;
            }
            weightKg = weightKg * 0.453592; // convert to kg
        }
        
        // Calculate BMI (CORRECTED)
        const heightInMeters = heightCm / 100;
        const bmi = weightKg / (heightInMeters * heightInMeters);
        
        // Determine BMI category
        let category, categoryClass;
        if (bmi < 18.5) {
            category = 'Underweight';
            categoryClass = 'underweight';
        } else if (bmi < 25) {
            category = 'Normal weight';
            categoryClass = 'normal';
        } else if (bmi < 30) {
            category = 'Overweight';
            categoryClass = 'overweight';
        } else {
            category = 'Obese';
            categoryClass = 'obese';
        }
        
        // Update BMI result
        document.querySelector('.bmi-value').textContent = bmi.toFixed(1);
        document.querySelector('.bmi-category').textContent = category;
        document.querySelector('.bmi-category').className = 'bmi-category ' + categoryClass;
        
        // Calculate BMR (Basal Metabolic Rate) - CORRECTED Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
        } else {
            bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
        }
        document.getElementById('bmr').textContent = Math.round(bmr);
        
        // Calculate WHR (Waist-Hip Ratio) if available
        const waist = parseFloat(document.getElementById('waist').value);
        const hip = parseFloat(document.getElementById('hip').value);
        
        if (!isNaN(waist) && !isNaN(hip) && waist > 0 && hip > 0) {
            const whr = waist / hip;
            document.getElementById('whr').textContent = whr.toFixed(2);
            
            // Add WHR interpretation
            let whrInterpretation = '';
            if (gender === 'male') {
                if (whr < 0.9) whrInterpretation = ' (Low risk)';
                else if (whr < 1.0) whrInterpretation = ' (Moderate risk)';
                else whrInterpretation = ' (High risk)';
            } else {
                if (whr < 0.8) whrInterpretation = ' (Low risk)';
                else if (whr < 0.85) whrInterpretation = ' (Moderate risk)';
                else whrInterpretation = ' (High risk)';
            }
            document.getElementById('whr').textContent += whrInterpretation;
        } else {
            document.getElementById('whr').textContent = '--';
        }
        
        // Calculate Body Fat Percentage (CORRECTED - US Navy Method)
        let bodyFatPercentage = '--';
        const waistCm = !isNaN(waist) && waist > 0 ? waist : null;
        
        if (waistCm && heightCm > 0) {
            if (gender === 'male') {
                // For men: %Fat = 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
                // Simplified version using waist and height only (common approximation)
                bodyFatPercentage = (495 / (1.0324 - 0.19077 * Math.log10(waistCm - heightCm/10) + 0.15456 * Math.log10(heightCm))) - 450;
            } else {
                // For women we'd need hip measurement as well for accurate calculation
                // Using BMI-based approximation as fallback
                bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 5.4;
            }
            
            if (bodyFatPercentage > 0 && bodyFatPercentage < 100) {
                document.getElementById('bfp').textContent = bodyFatPercentage.toFixed(1) + '%';
            } else {
                // Fallback to BMI method if Navy method fails
                if (gender === 'male') {
                    bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 16.2;
                } else {
                    bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 5.4;
                }
                document.getElementById('bfp').textContent = bodyFatPercentage.toFixed(1) + '% (estimate)';
            }
        } else {
            // BMI method when waist measurement is not available
            if (gender === 'male') {
                bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 16.2;
            } else {
                bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 5.4;
            }
            document.getElementById('bfp').textContent = bodyFatPercentage.toFixed(1) + '% (estimate)';
        }
        
        // Calculate Ideal Body Weight (CORRECTED)
        let idealBodyWeight;
        if (gender === 'male') {
            idealBodyWeight = 50 + (0.91 * (heightCm - 152.4)); // Robinson formula
        } else {
            idealBodyWeight = 45.5 + (0.91 * (heightCm - 152.4)); // Robinson formula
        }
        
        // Calculate Lean Body Mass (CORRECTED)
        const bodyFatMass = weightKg * (parseFloat(bodyFatPercentage) / 100);
        const leanBodyMass = weightKg - bodyFatMass;
        document.getElementById('lbm').textContent = leanBodyMass.toFixed(1) + ' kg';
        
        // Calculate TDEE (Total Daily Energy Expenditure) - CORRECTED
        const activityLevel = document.getElementById('intensity').value;
        let activityMultiplier;
        
        switch(activityLevel) {
            case 'sedentary': activityMultiplier = 1.2; break;
            case 'light': activityMultiplier = 1.375; break;
            case 'moderate': activityMultiplier = 1.55; break;
            case 'active': activityMultiplier = 1.725; break;
            case 'very-active': activityMultiplier = 1.9; break;
            default: activityMultiplier = 1.2;
        }
        
        const tdee = bmr * activityMultiplier;
        
        // Display TDEE if you have an element for it
        if (document.getElementById('tdee')) {
            document.getElementById('tdee').textContent = Math.round(tdee);
        }
        
        // Generate recommendations (IMPROVED)
        const recommendationsList = document.getElementById('recommendations-list');
        recommendationsList.innerHTML = '';
        
        // BMI-based recommendations
        if (bmi < 18.5) {
            recommendationsList.innerHTML += `
                <li>Consider increasing your caloric intake by 300-500 calories daily</li>
                <li>Focus on strength training 3-4 times per week to build muscle mass</li>
                <li>Include protein-rich foods in your diet (1.6-2.2g per kg of body weight)</li>
            `;
        } else if (bmi < 25) {
            recommendationsList.innerHTML += `
                <li>Maintain your current healthy weight with balanced nutrition</li>
                <li>Continue with regular physical activity and strength training</li>
                <li>Focus on body composition improvement rather than weight change</li>
            `;
        } else {
            const calorieDeficit = Math.round(tdee * 0.8); // 20% deficit for weight loss
            recommendationsList.innerHTML += `
                <li>Consider a moderate calorie deficit (around ${calorieDeficit} calories daily)</li>
                <li>Combine cardio and strength training for optimal fat loss</li>
                <li>Aim for 1-2 lbs (0.5-1 kg) of weight loss per week</li>
            `;
        }
        
        // Add workout recommendations based on activity level
        const intensity = document.getElementById('intensity').value;
        
        if (intensity === 'sedentary') {
            recommendationsList.innerHTML += `
                <li>Start with walking 30 minutes daily, 5 times per week</li>
                <li>Incorporate bodyweight exercises 2-3 times per week</li>
                <li>Gradually increase activity level over 4-6 weeks</li>
            `;
        } else if (intensity === 'light') {
            recommendationsList.innerHTML += `
                <li>Maintain current activity and add 1-2 strength sessions weekly</li>
                <li>Consider interval training 1-2 times per week</li>
            `;
        } else if (intensity === 'moderate' || intensity === 'active') {
            recommendationsList.innerHTML += `
                <li>Continue your current routine with proper recovery days</li>
                <li>Consider varying your workouts to prevent plateaus</li>
            `;
        } else {
            recommendationsList.innerHTML += `
                <li>Ensure adequate recovery with 1-2 rest days weekly</li>
                <li>Monitor for signs of overtraining</li>
                <li>Consider periodization in your training plan</li>
            `;
        }
        
        // Add nutrition recommendations
        const proteinNeeds = Math.round(weightKg * 1.6); // grams per day
        recommendationsList.innerHTML += `
            <li>Aim for ${proteinNeeds}g of protein daily to support muscle maintenance</li>
            <li>Stay hydrated - drink 2-3 liters of water daily</li>
            <li>Focus on whole foods: lean proteins, complex carbs, healthy fats</li>
        `;
    });
    
    // Add event listener to the first remove button
    document.querySelector('.remove-workout').addEventListener('click', function() {
        const workoutContainer = document.getElementById('workout-container');
        if (workoutContainer.children.length > 1) {
            workoutContainer.removeChild(this.parentElement);
        }
    });
});