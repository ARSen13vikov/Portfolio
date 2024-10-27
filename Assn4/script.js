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
const resultMessage = document.getElementById('resultMessage');

submitButton.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const startingBid = Number(document.getElementById('startingBid').value);
  const loveLetter = document.getElementById('loveLetter').value;

  if (!name || !startingBid) {
    resultMessage.textContent = "Please enter a name and starting bid.";
    return;
  }
    
// Initial price
  let price = startingBid;
    
// Education coefficient
  price *= Number(educationSelect.value);
    
// Net worth coefficient
  price *= Number(networthSelect.value);
    
// Caste value addition
  price += Number(casteSelect.value);
    
// Skills value addition
  const skills = [musicalInstrumentCheckbox, goodCookCheckbox, easygoingCharacterCheckbox, singsWellCheckbox];
  const skillValues = [10, 20, 15, 10];
  price += skills
    .map((checkbox, index) => (checkbox.checked ? skillValues[index] : 0))
    .reduce((acc, val) => acc + val, 0);
    
// Age coefficient
  const selectedAge = Array.from(ageRadios).find(radio => radio.checked);
  if (selectedAge) {
    price *= Number(selectedAge.value);
  }
    
// Reputation adjustments
  if (gossipParentsCheckbox.checked) price *= 0.85;
  if (gossipCharacterCheckbox.checked) price *= 0.90;
  if (generalGossipCheckbox.checked) price -= 20;
    
// Display final price
  finalPriceDisplay.innerHTML = `$${price.toFixed(2)}`;
  resultMessage.innerHTML = `Your price for ${name} is $${price.toFixed(2)}. <br><br> Love letter: ${loveLetter}`;
});

