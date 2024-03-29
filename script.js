// Assignment code here
var passwordOptions = document.getElementById('passwordOptions');
var passwordOptionsGo = document.getElementById('passwordOptionsGo');
var passwordLength = document.getElementById('passwordLengthCaption')
var slider = document.getElementById("passwordLengthSlider");
var passwordOptionsForm = document.getElementById('passwordOptionsForm')
var passwordSafetyBar = document.getElementById('progressBar')

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

function generateCharArray(x, y) {
  var a = [], char = x.charCodeAt(0), last = y.charCodeAt(0);
  for (; char <= last; ++char) {
      a.push(String.fromCharCode(char));
  }
  return a;
}


function generatePassword() {
    let useChars = document.getElementById('useChars')
    let useCaps = document.getElementById('useCaps')
    let useNums = document.getElementById('useNums')
    let alpha = generateCharArray('a', 'z')
    if (useNums.checked) { useNums = generateCharArray('0', '9') }
      else {useNums = ''};
    if (useCaps.checked) { useCaps =  generateCharArray('A', 'Z')}
      else {useCaps = ''};
    if (useChars.checked) { useChars = generateCharArray('!', '/'), 
      generateCharArray('[', '_'), generateCharArray(':', '@')}
      else {useChars = ''};
    let charSet = alpha.concat(useNums, useCaps, useChars)
    let random = charSet.sort(() => .5 - Math.random())
    let newPassword = random.slice(0, slider.value)
    console.log(newPassword.join(''))
    return newPassword.join('')
}

// Write password to the #password input
function writePassword() {
  passwordOptions.close();
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function updateSafetyBar() {
  let safetyBarMultiplier = 1
  let useChars = document.getElementById('useChars')
  let useCaps = document.getElementById('useCaps')
  let useNums = document.getElementById('useNums')
  if (useChars.checked) {safetyBarMultiplier *= 2}
  if (useCaps.checked) {safetyBarMultiplier *= 2}
  if (useNums.checked) {safetyBarMultiplier *= 2}
  let safetyBarValue = (slider.value * 3) * safetyBarMultiplier / 30.72
  passwordSafetyBar.style.width = safetyBarValue  + "%"
  console.log(safetyBarValue)

}


// Add event listener to generate button
passwordOptionsForm.addEventListener('change', updateSafetyBar);
slider.oninput = function() {passwordLength.innerHTML = this.value};
generateBtn.addEventListener("click", (event) => {
  passwordOptions.showModal();})
passwordOptionsGo.addEventListener('click', writePassword)