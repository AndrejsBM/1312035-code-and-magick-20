'use strict';

var WIZARD_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var fireballColor = setup.querySelector('.setup-fireball');
var fireballInput = setup.querySelector('[name="fireball-color"]');


var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
   .content
  .querySelector('.setup-similar-item');


var getRandomNumber = function (maxRandomNumber) {
  var randomNumber = Math.round(Math.random() * maxRandomNumber);

  return randomNumber;
};

var generateWizard = function () {
  var wizardArray = [];
  for (var i = 0; i < WIZARD_QUANTITY; i++) {
    wizardArray.push({
      name: WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length - 1)],
      coatColor: WIZARD_COAT_COLORS[getRandomNumber(WIZARD_COAT_COLORS.length - 1)],
      eyesColor: WIZARD_EYES_COLORS[getRandomNumber(WIZARD_EYES_COLORS.length - 1)]
    });
  }

  return wizardArray;
};

var wizardArray = generateWizard();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};


var fragment = document.createDocumentFragment();

for (var i = 0; i < wizardArray.length; i++) {
  fragment.appendChild(renderWizard(wizardArray[i]));
}

similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');


var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && userNameInput !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
  document.addEventListener('click', chooseCoatColor);
  document.addEventListener('click', chooseEyesColor);
  document.addEventListener('click', chooseFireballColor);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  document.removeEventListener('click', chooseCoatColor);
  document.removeEventListener('click', chooseEyesColor);
  document.removeEventListener('click', chooseFireballColor);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

var chooseCoatColor = function () {
  wizardCoat.addEventListener('click', function() {
    wizardCoat.style.fill = WIZARD_COAT_COLORS[getRandomNumber(WIZARD_COAT_COLORS.length)];
  });
};

var chooseEyesColor = function () {
  wizardEyes.addEventListener('click', function() {
    wizardEyes.style.fill = WIZARD_EYES_COLORS[getRandomNumber(WIZARD_EYES_COLORS.length)];
  });
};


var chooseFireballColor = function () {
    fireballColor.addEventListener('click', function() {
    fireballInput.value = WIZARD_FIREBALL_COLORS[getRandomNumber(WIZARD_FIREBALL_COLORS.length)];
    fireballColor.style.backgroundColor = fireballInput.value;
  });
};
