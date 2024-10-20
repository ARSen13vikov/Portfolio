// Cache selectors
const educationSelect = document.getElementById('education');
const networthSelect = document.getElementById('networth');
const casteSelect = document.getElementById('caste');
const musicalInstrumentCheckbox = document.getElementById('musicalInstrument');
const goodCookCheckbox = document.getElementById('goodCook');
const easygoingCharacterCheckbox = document.getElementById('easygoingCharacter');
const singsWellCheckbox = document.getElementById('singsWell');
const ageRadios = document.getElementsByName('age');
const gossipParentsCheckbox = document.getElementById('gossipParents');
const gossipCharacterCheckbox = document.getElementById('gossipCharacter');
const generalGossipCheckbox = document.getElementById('generalGossip');
const submitButton = document.getElementById('submit');
const finalPriceDisplay = document.getElementById('finalPrice');

// Initial price
let basePrice = 100;

submitButton.addEventListener('click', () => {
    let finalPrice = basePrice;

    // Education coefficient
    let educationCoefficient = 1;
    switch (educationSelect.value) {
        case 'bachelor':
            educationCoefficient = 1.5;
            break;
        case 'college':
            educationCoefficient = 1.2;
            break;
        case 'high_school':
            educationCoefficient = 1.05;
            break;
        case 'middle_school':
            educationCoefficient = 0.9;
            break;
    }
    finalPrice *= educationCoefficient;

    // Net worth coefficient
    let networthCoefficient = 1;
    switch (networthSelect.value) {
        case 'upper_class':
            networthCoefficient = 2;
            break;
        case 'middle_class':
            networthCoefficient = 1.5;
            break;
        case 'lower_class':
            networthCoefficient = 1.2;
            break;
    }
    finalPrice *= networthCoefficient;

    // Caste value addition
    let casteValue = 0;
    switch (casteSelect.value) {
        case 'brahmin':
            casteValue = 100;
            break;
        case 'kshatriya':
            casteValue = 50;
            break;
        case 'vaishya':
            casteValue = 20;
            break;
        case 'shudra':
            casteValue = 10;
            break;
        case 'untouchable':
            casteValue = -50;
            break;
    }
    finalPrice += casteValue;

    // Skills value addition
    if (musicalInstrumentCheckbox.checked) finalPrice += 10;
    if (goodCookCheckbox.checked) finalPrice += 20;
    if (easygoingCharacterCheckbox.checked) finalPrice += 15;
    if (singsWellCheckbox.checked) finalPrice += 10;

    // Age coefficient
    let ageCoefficient = 1;
    for (const radio of ageRadios) {
        if (radio.checked) {
            switch (radio.value) {
                case 'young':
                    ageCoefficient = 1.5;
                    break;
                case 'adult':
                    ageCoefficient = 1.2;
                    break;
                case 'mature':
                    ageCoefficient = 0.95;
                    break;
            }
        }
    }
    finalPrice *= ageCoefficient;

    // Reputation adjustments
    if (gossipParentsCheckbox.checked) finalPrice *= 0.85;
    if (gossipCharacterCheckbox.checked) finalPrice *= 0.90;
    if (generalGossipCheckbox.checked) finalPrice -= 20;

    // Display final price
    finalPriceDisplay.innerHTML = `$${finalPrice.toFixed(2)}`;
});
