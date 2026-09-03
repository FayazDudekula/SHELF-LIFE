// ==========================================
// SHELFSAFE - SMART FOOD ADVISOR
// Educational rule-based shelf-life estimator
// ==========================================


const foodData = {

    banana: {
        name: "Banana",
        baseShelfLife: 5,
        idealTemp: 13,
        idealHumidity: 90,
        technology: "Controlled Temperature Storage",
        riskFactor: "High temperature accelerates ripening, browning and softening.",
        preservation: "Cool and controlled storage with suitable humidity."
    },

    mango: {
        name: "Mango",
        baseShelfLife: 7,
        idealTemp: 13,
        idealHumidity: 90,
        technology: "Controlled Atmosphere Storage",
        riskFactor: "Improper temperature and humidity can accelerate ripening.",
        preservation: "Controlled temperature and humidity can slow deterioration."
    },

    tomato: {
        name: "Tomato",
        baseShelfLife: 8,
        idealTemp: 15,
        idealHumidity: 90,
        technology: "Controlled Temperature and Humidity Storage",
        riskFactor: "Improper temperature can increase quality deterioration.",
        preservation: "Suitable temperature, humidity and ventilation."
    },

    potato: {
        name: "Potato",
        baseShelfLife: 30,
        idealTemp: 10,
        idealHumidity: 90,
        technology: "Cool, Dark and Ventilated Storage",
        riskFactor: "Light and high temperature can cause sprouting and quality loss.",
        preservation: "Cool, dark, dry and well-ventilated storage."
    },

    bread: {
        name: "Bread",
        baseShelfLife: 5,
        idealTemp: 25,
        idealHumidity: 60,
        technology: "Moisture-Barrier Packaging",
        riskFactor: "Excess moisture can encourage mold growth.",
        preservation: "Clean, dry storage with suitable moisture-barrier packaging."
    },

    milk: {
        name: "Milk",
        baseShelfLife: 7,
        idealTemp: 4,
        idealHumidity: 60,
        technology: "Pasteurization + Refrigerated Storage",
        riskFactor: "Temperature abuse can accelerate microbial growth.",
        preservation: "Maintain continuous refrigeration and hygienic handling."
    }

};


// ==========================================
// PRESERVATION TECHNOLOGY DATABASE
// ==========================================

const technologyData = {

    refrigeration: {
        name: "Refrigeration",
        icon: "🌡️",
        principle: "Uses low temperature to slow microbial growth and many chemical and enzymatic changes.",
        foods: "Milk, vegetables, fruits, meat and other perishable foods.",
        benefit: "Slows deterioration and helps maintain freshness and quality.",
        limitation: "Does not completely stop microbial or enzymatic activity.",
        example: "Milk stored in a refrigerator."
    },

    controlledAtmosphere: {
        name: "Controlled Atmosphere",
        icon: "🌬️",
        principle: "Controls the levels of oxygen, carbon dioxide and other gases around the food.",
        foods: "Fruits and vegetables, especially products stored for longer periods.",
        benefit: "Can slow respiration, ripening and some quality changes.",
        limitation: "Requires controlled storage conditions and specialized equipment.",
        example: "Long-term storage of apples and other fruits."
    },

    map: {
        name: "Modified Atmosphere Packaging",
        icon: "📦",
        principle: "Changes the gas composition inside a food package to slow deterioration.",
        foods: "Fresh produce, meat, bakery products and other packaged foods.",
        benefit: "Helps reduce oxidation and can slow microbial growth.",
        limitation: "Effectiveness depends on suitable packaging materials and gas conditions.",
        example: "Packaged fresh-cut vegetables."
    },

    freezing: {
        name: "Freezing",
        icon: "❄️",
        principle: "Uses very low temperature to greatly slow microbial and enzymatic activity.",
        foods: "Meat, fish, vegetables, fruits, prepared foods and many other products.",
        benefit: "Provides a major extension of storage life while helping retain quality.",
        limitation: "Freezing and thawing can affect texture in some foods.",
        example: "Frozen vegetables stored in a freezer."
    },

    drying: {
        name: "Drying",
        icon: "☀️",
        principle: "Removes moisture from food and reduces the water available for microbial growth and reactions.",
        foods: "Grains, fruits, vegetables, spices, herbs and many other products.",
        benefit: "Reduces moisture availability and improves storage stability.",
        limitation: "Can change colour, texture, flavour and some nutrients if not properly controlled.",
        example: "Dried fruits or dehydrated vegetables."
    }

};


// ==========================================
// HELPER FUNCTIONS
// ==========================================

function clamp(value, minimum, maximum) {

    return Math.min(
        Math.max(value, minimum),
        maximum
    );

}


function getTemperatureScore(
    temperature,
    idealTemperature
) {

    const difference =
        Math.abs(
            temperature - idealTemperature
        );

    return clamp(
        100 - (difference * 4),
        20,
        100
    );

}


function getHumidityScore(
    humidity,
    idealHumidity
) {

    const difference =
        Math.abs(
            humidity - idealHumidity
        );

    return clamp(
        100 - (difference * 1.2),
        20,
        100
    );

}


function getStorageScore(
    food,
    storage
) {

    if (food === "milk") {

        return storage === "refrigerated"
            ? 100
            : 40;

    }


    if (food === "bread") {

        if (storage === "dry") {
            return 100;
        }

        if (storage === "room") {
            return 85;
        }

        return 60;

    }


    if (
        food === "banana" ||
        food === "mango" ||
        food === "tomato"
    ) {

        if (storage === "room") {
            return 90;
        }

        if (storage === "refrigerated") {
            return 80;
        }

        return 50;

    }


    if (food === "potato") {

        return storage === "dry"
            ? 100
            : 70;

    }


    return 70;

}


function getRisk(score) {

    if (score >= 80) {

        return {
            level: "LOW",
            className: "low"
        };

    }


    if (score >= 60) {

        return {
            level: "MEDIUM",
            className: "medium"
        };

    }


    return {
        level: "HIGH",
        className: "high"
    };

}


function getStorageName(storage) {

    const names = {

        refrigerated:
            "Refrigerated Storage",

        room:
            "Room Temperature Storage",

        dry:
            "Cool / Dry Storage",

        freezer:
            "Freezer Storage"

    };

    return names[storage] || storage;

}


// ==========================================
// LEARN MORE - FOOD PRODUCTS
// ==========================================

function showFoodDetails(foodKey) {

    const food =
        foodData[foodKey];

    const detailsBox =
        document.getElementById(
            "food-details"
        );


    if (
        !food ||
        !detailsBox
    ) {
        return;
    }


    detailsBox.innerHTML = `

        <div class="food-detail-content">

            <div class="food-detail-header">

                <span class="detail-icon">
                    🍎
                </span>

                <div>

                    <h3>
                        ${food.name}
                    </h3>

                    <p>
                        Food preservation information
                    </p>

                </div>

            </div>


            <div class="detail-grid">

                <div class="detail-item">

                    <strong>
                        Typical Shelf Life
                    </strong>

                    <span>
                        ${food.baseShelfLife} days
                    </span>

                </div>


                <div class="detail-item">

                    <strong>
                        Recommended Temperature
                    </strong>

                    <span>
                        ${food.idealTemp}°C
                    </span>

                </div>


                <div class="detail-item">

                    <strong>
                        Recommended Humidity
                    </strong>

                    <span>
                        ${food.idealHumidity}% RH
                    </span>

                </div>


                <div class="detail-item">

                    <strong>
                        Preservation Technology
                    </strong>

                    <span>
                        ${food.technology}
                    </span>

                </div>

            </div>


            <div class="detail-warning">

                <strong>
                    ⚠ Deterioration Risk
                </strong>

                <p>
                    ${food.riskFactor}
                </p>

            </div>


            <div class="detail-preservation">

                <strong>
                    ✓ Recommended Preservation
                </strong>

                <p>
                    ${food.preservation}
                </p>

            </div>

        </div>

    `;


    detailsBox.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


// ==========================================
// TECHNOLOGY DETAILS
// ==========================================

function getTechnologyKey(text) {

    const cleanText =
        text
            .toLowerCase()
            .trim();


    if (
        cleanText.includes(
            "refrigeration"
        )
    ) {
        return "refrigeration";
    }


    if (
        cleanText.includes(
            "controlled atmosphere"
        )
    ) {

        return "controlledAtmosphere";

    }


    if (
        cleanText.includes(
            "modified atmosphere"
        )
    ) {

        return "map";

    }


    if (
        cleanText.includes(
            "freezing"
        )
    ) {

        return "freezing";

    }


    if (
        cleanText.includes(
            "drying"
        )
    ) {

        return "drying";

    }


    return null;

}


function showTechnologyDetails(
    technologyKey
) {

    const technology =
        technologyData[
            technologyKey
        ];


    const detailsBox =
        document.getElementById(
            "technology-details"
        );


    if (
        !technology ||
        !detailsBox
    ) {
        return;
    }


    detailsBox.innerHTML = `

        <div class="technology-detail-content">

            <div class="technology-detail-header">

                <span class="technology-detail-icon">
                    ${technology.icon}
                </span>

                <div>

                    <span class="technology-detail-label">
                        TECHNOLOGY DETAILS
                    </span>

                    <h3>
                        ${technology.name}
                    </h3>

                    <p>
                        Learn how this preservation technology
                        helps extend food shelf life.
                    </p>

                </div>

            </div>


            <div class="technology-detail-grid">

                <div class="technology-detail-item">

                    <strong>
                        🔬 Principle
                    </strong>

                    <p>
                        ${technology.principle}
                    </p>

                </div>


                <div class="technology-detail-item">

                    <strong>
                        🍎 Suitable Foods
                    </strong>

                    <p>
                        ${technology.foods}
                    </p>

                </div>


                <div class="technology-detail-item">

                    <strong>
                        ✅ Main Benefit
                    </strong>

                    <p>
                        ${technology.benefit}
                    </p>

                </div>


                <div class="technology-detail-item">

                    <strong>
                        ⚠ Limitation
                    </strong>

                    <p>
                        ${technology.limitation}
                    </p>

                </div>

            </div>


            <div class="technology-example">

                <strong>
                    📌 Example
                </strong>

                <p>
                    ${technology.example}
                </p>

            </div>

        </div>

    `;


    detailsBox.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


// ==========================================
// CREATE TECHNOLOGY DETAILS AREA
// ==========================================

function setupTechnologyDetails() {

    const technologyTable =
        document.querySelector(
            ".technology-table"
        );


    if (!technologyTable) {
        return;
    }


    let detailsBox =
        document.getElementById(
            "technology-details"
        );


    if (!detailsBox) {

        detailsBox =
            document.createElement(
                "div"
            );

        detailsBox.id =
            "technology-details";

        detailsBox.className =
            "technology-details";


        technologyTable.insertAdjacentElement(
            "afterend",
            detailsBox
        );

    }


    const technologyRows =
        technologyTable.querySelectorAll(
            ".technology-row:not(.technology-header)"
        );


    technologyRows.forEach(
        function (row) {

            const firstCell =
                row.querySelector(
                    "div"
                );


            if (!firstCell) {
                return;
            }


            const technologyKey =
                getTechnologyKey(
                    firstCell.textContent
                );


            if (!technologyKey) {
                return;
            }


            row.dataset.technology =
                technologyKey;


            row.setAttribute(
                "role",
                "button"
            );


            row.setAttribute(
                "tabindex",
                "0"
            );


            row.addEventListener(
                "click",
                function () {

                    showTechnologyDetails(
                        this.dataset.technology
                    );

                }
            );


            row.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        showTechnologyDetails(
                            this.dataset.technology
                        );

                    }

                }
            );

        }
    );

}


// ==========================================
// SMART ADVISOR
// ==========================================

function analyzeFood() {

    const foodSelect =
        document.getElementById(
            "food"
        );

    const temperatureInput =
        document.getElementById(
            "temperature"
        );

    const humidityInput =
        document.getElementById(
            "humidity"
        );

    const storageSelect =
        document.getElementById(
            "storage"
        );

    const recommendationBox =
        document.getElementById(
            "recommendation"
        );


    if (
        !foodSelect ||
        !temperatureInput ||
        !humidityInput ||
        !storageSelect ||
        !recommendationBox
    ) {

        return;

    }


    const foodKey =
        foodSelect.value;

    const temperature =
        Number(
            temperatureInput.value
        );

    const humidity =
        Number(
            humidityInput.value
        );

    const storage =
        storageSelect.value;


    if (
        !foodKey ||
        Number.isNaN(
            temperature
        ) ||
        Number.isNaN(
            humidity
        )
    ) {

        recommendationBox.innerHTML = `

            <div class="advisor-empty">

                <h3>
                    ⚠ Please complete all fields
                </h3>

                <p>
                    Select a food product and enter temperature
                    and humidity values before running the analysis.
                </p>

            </div>

        `;

        return;

    }


    const food =
        foodData[foodKey];


    // ==========================================
    // CONDITION SCORES
    // ==========================================

    const temperatureScore =
        getTemperatureScore(
            temperature,
            food.idealTemp
        );


    const humidityScore =
        getHumidityScore(
            humidity,
            food.idealHumidity
        );


    const storageScore =
        getStorageScore(
            foodKey,
            storage
        );


    // ==========================================
    // OVERALL FRESHNESS SCORE
    // ==========================================

    const freshnessScore =
        Math.round(

            (temperatureScore * 0.40) +

            (humidityScore * 0.30) +

            (storageScore * 0.30)

        );


    // ==========================================
    // ESTIMATED SHELF LIFE
    // ==========================================

    const estimatedShelfLife =
        Math.max(

            1,

            Math.round(

                food.baseShelfLife *
                (freshnessScore / 100)

            )

        );


    // ==========================================
    // SHELF-LIFE RETENTION
    // ==========================================

    const retention =
        Math.round(

            (
                estimatedShelfLife /
                food.baseShelfLife
            ) * 100

        );


    const risk =
        getRisk(
            freshnessScore
        );


    // ==========================================
    // FIND WEAKEST CONDITION
    // ==========================================

    const conditions = [

        {
            name: "Temperature",
            score: temperatureScore
        },

        {
            name: "Humidity",
            score: humidityScore
        },

        {
            name: "Storage",
            score: storageScore
        }

    ];


    conditions.sort(
        (a, b) =>
            a.score - b.score
    );


    const weakestCondition =
        conditions[0];


    // ==========================================
    // RECOMMENDATION
    // ==========================================

    let recommendation = "";


    if (
        freshnessScore >= 85
    ) {

        recommendation = `

            Conditions are close to the recommended range.
            Continue maintaining the current storage conditions.

        `;

    }

    else if (
        freshnessScore >= 70
    ) {

        recommendation = `

            The food is under reasonably suitable conditions,
            but improving
            ${weakestCondition.name.toLowerCase()}
            could help maintain quality for longer.

        `;

    }

    else if (
        freshnessScore >= 50
    ) {

        recommendation = `

            Storage conditions need improvement.
            Focus first on
            ${weakestCondition.name.toLowerCase()}
            control to reduce deterioration.

        `;

    }

    else {

        recommendation = `

            ⚠ The current conditions may significantly reduce
            product quality and shelf life.
            Immediate improvement of
            ${weakestCondition.name.toLowerCase()}
            is recommended.

        `;

    }


    // ==========================================
    // DISPLAY RESULT
    // ==========================================

    recommendationBox.innerHTML = `

        <div class="result-header">

            <div>

                <span class="result-label">
                    SMART ADVISOR RESULT
                </span>

                <h3>
                    ${food.name}
                </h3>

            </div>


            <div class="risk-badge ${risk.className}">

                ${risk.level} RISK

            </div>

        </div>


        <div class="result-main">

            <div class="shelf-life-card">

                <span>
                    Estimated Shelf Life
                </span>

                <strong>
                    ${estimatedShelfLife}
                </strong>

                <small>
                    days
                </small>

            </div>


            <div class="freshness-card">

                <span>
                    Freshness Score
                </span>

                <strong>
                    ${freshnessScore}%
                </strong>

                <div class="freshness-bar">

                    <div
                        class="freshness-fill"
                        style="width:${freshnessScore}%"
                    ></div>

                </div>

            </div>


            <div class="retention-card">

                <span>
                    Shelf-Life Retention
                </span>

                <strong>
                    ${retention}%
                </strong>

            </div>

        </div>


        <div class="condition-analysis">

            <h4>
                Condition Analysis
            </h4>


            <div class="condition-row">

                <span>

                    Temperature

                    <b>
                        ${Math.round(
                            temperatureScore
                        )}%
                    </b>

                </span>


                <div class="condition-bar">

                    <div
                        style="width:${temperatureScore}%"
                    ></div>

                </div>

            </div>


            <div class="condition-row">

                <span>

                    Humidity

                    <b>
                        ${Math.round(
                            humidityScore
                        )}%
                    </b>

                </span>


                <div class="condition-bar">

                    <div
                        style="width:${humidityScore}%"
                    ></div>

                </div>

            </div>


            <div class="condition-row">

                <span>

                    Storage

                    <b>
                        ${Math.round(
                            storageScore
                        )}%
                    </b>

                </span>


                <div class="condition-bar">

                    <div
                        style="width:${storageScore}%"
                    ></div>

                </div>

            </div>

        </div>


        <div class="prediction-chart">

            <h4>
                Shelf-Life Prediction Trend
            </h4>

            ${createPredictionChart(
                food.baseShelfLife,
                estimatedShelfLife
            )}

        </div>


        <div class="advisor-recommendation">

            <h4>
                💡 Recommendation
            </h4>

            <p>
                ${recommendation}
            </p>


            <div class="recommended-technology">

                <strong>
                    Recommended Technology:
                </strong>

                <span>
                    ${food.technology}
                </span>

            </div>

        </div>


        <div class="analysis-note">

            <strong>
                Educational Estimate:
            </strong>

            This result is a rule-based estimate based on the
            selected food and entered storage conditions.
            It is not a laboratory-validated shelf-life prediction.

        </div>

    `;


    recommendationBox.scrollIntoView({

        behavior: "smooth",

        block: "nearest"

    });

}


// ==========================================
// SIMPLE PREDICTION GRAPH
// ==========================================

function createPredictionChart(
    baseShelfLife,
    estimatedShelfLife
) {

    const width = 700;

    const height = 240;


    const points = [];


    const totalPoints = 7;


    for (
        let i = 0;
        i < totalPoints;
        i++
    ) {

        const progress =
            i /
            (totalPoints - 1);


        const value =
            estimatedShelfLife *
            (1 - progress);


        const x =
            50 +
            (progress * 600);


        const y =
            40 +
            (
                (
                    1 -
                    value /
                    Math.max(
                        baseShelfLife,
                        1
                    )
                ) * 150
            );


        points.push({

            x: x,

            y: y,

            value:
                Math.max(
                    0,
                    value
                )

        });

    }


    const linePoints =
        points

            .map(
                point =>
                    `${point.x},${point.y}`
            )

            .join(" ");


    const circles =
        points

            .map(
                point => `

                    <circle
                        cx="${point.x}"
                        cy="${point.y}"
                        r="4"
                    ></circle>

                `
            )

            .join("");


    return `

        <div class="chart-container">

            <svg
                viewBox="0 0 ${width} ${height}"
                class="prediction-svg"
                role="img"
                aria-label="Estimated shelf life trend"
            >

                <line
                    x1="50"
                    y1="40"
                    x2="50"
                    y2="190"
                    class="chart-axis"
                />


                <line
                    x1="50"
                    y1="190"
                    x2="650"
                    y2="190"
                    class="chart-axis"
                />


                <polyline
                    points="${linePoints}"
                    class="prediction-line"
                    fill="none"
                />


                ${circles}


                <text
                    x="50"
                    y="220"
                    class="chart-label"
                >
                    Start
                </text>


                <text
                    x="610"
                    y="220"
                    class="chart-label"
                >
                    Time
                </text>


                <text
                    x="55"
                    y="30"
                    class="chart-label"
                >
                    ${estimatedShelfLife} days
                </text>


                <text
                    x="570"
                    y="30"
                    class="chart-label"
                >
                    Deterioration
                </text>

            </svg>

        </div>

    `;

}


// ==========================================
// PAGE INITIALIZATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ==========================================
        // SMART ADVISOR BUTTON
        // ==========================================

        const advisorButton =
            document.getElementById(
                "advisor-button"
            );


        if (advisorButton) {

            advisorButton.addEventListener(
                "click",
                analyzeFood
            );

        }


        // ==========================================
        // ENTER KEY SUPPORT
        // ==========================================

        const advisorInputs = [

            document.getElementById(
                "temperature"
            ),

            document.getElementById(
                "humidity"
            )

        ];


        advisorInputs.forEach(
            function (input) {

                if (input) {

                    input.addEventListener(
                        "keydown",
                        function (event) {

                            if (
                                event.key === "Enter"
                            ) {

                                analyzeFood();

                            }

                        }
                    );

                }

            }
        );


        // ==========================================
        // LEARN MORE BUTTONS
        // ==========================================

        const learnButtons =
            document.querySelectorAll(
                ".learn-more"
            );


        learnButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const food =
                            this.dataset.food;


                        showFoodDetails(
                            food
                        );

                    }
                );

            }
        );


        // ==========================================
        // TECHNOLOGY DETAILS
        // ==========================================

        setupTechnologyDetails();


    }
);
// ==========================================
// SHELFSAFE - DATA-ASSISTED PREDICTION ENGINE
// Step 14C
// Educational sample-data prediction
// ==========================================

function getDatasetPrediction(foodName, temperature, humidity, storage) {

    if (
        typeof predictionDataset === "undefined" ||
        !Array.isArray(predictionDataset)
    ) {
        return null;
    }

    const matchingRecords = predictionDataset.filter(record =>
        record.food.toLowerCase() === foodName.toLowerCase()
    );

    if (matchingRecords.length === 0) {
        return null;
    }

    let weightedShelfLife = 0;
    let totalWeight = 0;

    matchingRecords.forEach(record => {

        const temperatureDifference =
            Math.abs(temperature - record.temperature);

        const humidityDifference =
            Math.abs(humidity - record.humidity);

        const storageDifference =
            storage.toLowerCase() === record.storage.toLowerCase()
                ? 0
                : 2;

        const distance =
            (temperatureDifference / 10) +
            (humidityDifference / 30) +
            storageDifference;

        const weight =
            1 / (1 + distance);

        weightedShelfLife +=
            record.shelfLife * weight;

        totalWeight += weight;
    });

    if (totalWeight === 0) {
        return null;
    }

    const predictedShelfLife =
        weightedShelfLife / totalWeight;

    return {
        shelfLife: Math.max(
            1,
            Math.round(predictedShelfLife)
        ),
        recordsUsed: matchingRecords.length
    };
}


// ==========================================
// DISPLAY DATA-ASSISTED PREDICTION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const advisorButton =
        document.getElementById("advisor-button");

    if (!advisorButton) {
        return;
    }

    advisorButton.addEventListener("click", function () {

        setTimeout(function () {

            const foodSelect =
                document.getElementById("food");

            const temperatureInput =
                document.getElementById("temperature");

            const humidityInput =
                document.getElementById("humidity");

            const storageSelect =
                document.getElementById("storage");

            const recommendationBox =
                document.getElementById("recommendation");

            if (
                !foodSelect ||
                !temperatureInput ||
                !humidityInput ||
                !storageSelect ||
                !recommendationBox
            ) {
                return;
            }

            const foodKey =
                foodSelect.value;

            const food =
                foodData[foodKey];

            if (!food) {
                return;
            }

            const temperature =
                Number(temperatureInput.value);

            const humidity =
                Number(humidityInput.value);

            const storage =
                storageSelect.value;

            const prediction =
                getDatasetPrediction(
                    food.name,
                    temperature,
                    humidity,
                    storage
                );

            if (!prediction) {
                return;
            }

            const oldPrediction =
                document.getElementById(
                    "data-prediction-card"
                );

            if (oldPrediction) {
                oldPrediction.remove();
            }

            const predictionCard =
                document.createElement("div");

            predictionCard.id =
                "data-prediction-card";

            predictionCard.className =
                "data-prediction-card";

            predictionCard.innerHTML = `

                <div class="data-prediction-header">

                    <span>
                        📊 DATA-ASSISTED PREDICTION
                    </span>

                </div>

                <div class="data-prediction-content">

                    <div>

                        <strong>
                            ${prediction.shelfLife} days
                        </strong>

                        <p>
                            Estimated shelf life from
                            similar sample conditions
                        </p>

                    </div>

                    <div class="prediction-records">

                        <strong>
                            ${prediction.recordsUsed}
                        </strong>

                        <span>
                            sample records used
                        </span>

                    </div>

                </div>

                <div class="data-prediction-note">

                    This prediction uses the educational
                    SHELFSAFE sample dataset and is not
                    a laboratory-validated shelf-life model.

                </div>
            `;

            recommendationBox.appendChild(
                predictionCard
            );

        }, 100);

    });

});


// ==========================================
// END OF STEP 14C
// ==========================================
// ==========================================
// SHELFSAFE - PREDICTION COMPARISON
// Step 14D
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const advisorButton =
        document.getElementById("advisor-button");

    if (!advisorButton) {
        return;
    }

    advisorButton.addEventListener("click", function () {

        setTimeout(function () {

            const foodSelect =
                document.getElementById("food");

            const recommendationBox =
                document.getElementById("recommendation");

            if (!foodSelect || !recommendationBox) {
                return;
            }

            const foodKey =
                foodSelect.value;

            const food =
                foodData[foodKey];

            if (!food) {
                return;
            }

            const predictionCard =
                document.getElementById(
                    "data-prediction-card"
                );

            if (!predictionCard) {
                return;
            }

            // Remove an older comparison
            const oldComparison =
                document.getElementById(
                    "prediction-comparison"
                );

            if (oldComparison) {
                oldComparison.remove();
            }

            // Find predicted shelf life
            const predictionText =
                predictionCard.querySelector("strong");

            if (!predictionText) {
                return;
            }

            const predictedShelfLife =
                parseInt(
                    predictionText.textContent
                );

            if (Number.isNaN(predictedShelfLife)) {
                return;
            }

            const normalShelfLife =
                food.baseShelfLife;

            const reduction =
                Math.max(
                    0,
                    Math.round(
                        (
                            (
                                normalShelfLife -
                                predictedShelfLife
                            ) /
                            normalShelfLife
                        ) * 100
                    )
                );

            const comparison =
                document.createElement("div");

            comparison.id =
                "prediction-comparison";

            comparison.className =
                "prediction-comparison";

            comparison.innerHTML = `

                <div class="comparison-title">
                    📈 SHELF-LIFE COMPARISON
                </div>

                <div class="comparison-grid">

                    <div class="comparison-item">

                        <span>
                            Normal Shelf Life
                        </span>

                        <strong>
                            ${normalShelfLife} days
                        </strong>

                    </div>


                    <div class="comparison-item">

                        <span>
                            Data-Assisted Prediction
                        </span>

                        <strong>
                            ${predictedShelfLife} days
                        </strong>

                    </div>


                    <div class="comparison-item">

                        <span>
                            Estimated Reduction
                        </span>

                        <strong>
                            ${reduction}%
                        </strong>

                    </div>

                </div>

                <p class="comparison-note">

                    The comparison shows how the
                    entered storage conditions may
                    affect estimated shelf life compared
                    with the typical value in SHELFSAFE.

                </p>

            `;

            recommendationBox.appendChild(
                comparison
            );

        }, 250);

    });

});


// ==========================================
// END OF STEP 14D
// ==========================================