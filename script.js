/**
 * DONE: Update the text in the "Formatted Text" section as a user types in the textarea
 * TODO TOGETHER: Add a .bold, .italic classes to "Formatted Text" when the appropriate button is clicked
 * TODO: Add an .underline class to "Formatted Text" when Underline button is clicked
 * TODO: Toggle the align style for "Formatted Text" when the appropriate button is clicked
 */


 window.onload = () => {

  // initialising tooltip function in the bootstrap
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  popoverButton();
  updateDateTime();
 }


/**
 * Update the output text as a user types in the textarea
 * HINT: Use the onkeydown function inside HTML
 */
function updateText(){
  let inputText = document.getElementById("text-input").value;
  document.getElementById("text-output").innerText = inputText;

  popovertoggle();
  }
  
  /**
   * Toggle the bold class for the output text
   * HINT: Use the onclick function insite HTML
   * HINT: Look into using this keyword
   * HINT: Use the classList property
   * HINT: Toggle .active class for the button
   */
  function makeBold(elem){
    //CODE GOES HERE
    elem.classList.toggle("active");
    document.getElementById("text-output").classList.toggle("bold");
  }
  
  /**
   * Toggle the italic class for the output text
   */
  function makeItalic(elem){
    elem.classList.toggle("active");
    document.getElementById("text-output").classList.toggle("italic");
  }

  function fontSize(elem, fontType){
    // CODE GOES HERE
    let fontItems = document.getElementsByClassName("font");

    for (let i=0; i < fontItems.length; i++) {
      fontItems[i].classList.remove("active");
    }
    elem.classList.add("active");

    /** MY WAY OF DOING
    document.getElementById("text-output").className = `bg-light ${alignType}`
    */

    /* Alternate Way */
    document.getElementById("text-output").style.fontSize = fontType;
  }

  
  /**
   * Toggle the underline class for the output text
   * HINT: Toggle the .active class for the button
   * HINT: Use the classList property
   * HINT: Use contains, remove, and add functions
   */
  function makeUnderline(elem){
      //CODE GOES HERE
    elem.classList.toggle("active");
    let formattedText = document.getElementById("text-output").classList.contains("underline");
    if (formattedText) {
      document.getElementById("text-output").classList.remove("underline");
    } else {
      document.getElementById("text-output").classList.add("underline");
    }
  }
  
  /**
   * Toggle the style textAlign attribute
   * Toggle the active state for the align butttons
   * HINT: Use the style property of the element
   * HINT: Make sure to untoggle the active state for all other align buttons
   */
  function alignText(elem, alignType){
    // CODE GOES HERE
    let alignItems = document.getElementsByClassName("align");

    for (let i=0; i < alignItems.length; i++) {
      console.log(alignItems[i].classList.remove("active"));
    }
    elem.classList.add("active");

    /** MY WAY OF DOING
    document.getElementById("text-output").className = `bg-light ${alignType}`
    */

    /* Alternate Way */
    document.getElementById("text-output").style.textAlign = alignType;
  }

  /* Adding Emojo to the button and popover functionality*/
  function popoverButton() {
    var popovers = document.querySelectorAll('.popover');
    var popoverTriggers = document.querySelectorAll('.popover__trigger');

    for (var i = 0; i < popoverTriggers.length; i++) {
      popoverTriggers[i].addEventListener('click', function(event) {
        closeAllOthers(this.parentElement);
        this.parentElement.classList.toggle('popover--active');
        document.getElementById("popover-data").classList.toggle("popover-block");
        document.getElementById("popover-data-clock").classList.toggle("popover-block");
        // if (this.parentElement.classList.contains("popover--active")) {
        //   document.getElementById("popover-data").classList.remove("popover-block");
        //   document.getElementById("popover-data-clock").classList.remove("popover-block");
        // }else {
        //   document.getElementById("popover-data").classList.add("popover-block");
        //   document.getElementById("popover-data-clock").classList.add("popover-block");
        // }
      });
    }

    function closeAllOthers(ignore) {
      for (var i = 0; i < popovers.length; i++) {
        if ( popovers[i] !== ignore) {
          popovers[i].classList.remove('popover--active');	
        }
      }
    }

  }

  function popovertoggle() {
    document.getElementById("pop-emoji").classList.remove("popover--active");
    document.getElementById("popover-data").classList.add("popover-block");
    document.getElementById("pop-arrow").classList.remove("popover--active");
    document.getElementById("popover-data-clock").classList.add("popover-block");
  }

function emojiSelector(elem) {

  let TextArea = document.getElementById("text-input");
  let textToInsert = elem.value;

  TextArea.focus();
  document.execCommand('insertText', false /*no UI*/, textToInsert);
}


/* funtionality for numbered list */
// https://stackoverflow.com/questions/43198736/how-to-create-ordered-list-inside-text-area-using-javascript

var addListItem = function(elem) {
  var text = document.getElementById('text-input').value;

  if (elem.id === "bulletsList") {
    var exp = '\n' + '• ';
  }else {
    var exp = '\n' + (getLastNumber(text) + 1) + '.\xa0';
  }
  text = text.concat(exp);
  document.getElementById('text-input').value = text;
}

function getLastNumber(str){
  var list = str.split(/[\r\n]/g);
  var n = 0;
  list.forEach(function(s){
    if(/^\d+\./.test(s)){
      n = parseInt(s.substring(0, s.indexOf(".")));
    }
  });
  return n;
}

/* Date and time funtionality */

const updateDateTime = () => {
  let dt = document.getElementsByClassName("dt")
  dt[0].innerText = moment().format('LTS');
  dt[1].innerText = moment().format('l');
  dt[2].innerText = moment().format('lll');
  dt[3].innerText = moment().format('llll');
}

const insertDateTime = (format) => {
  let TextArea = document.getElementById("text-input");

  TextArea.focus();
  document.execCommand('insertText', false /*no UI*/, moment().format(format));
}

/* Save Text to file */
const saveTextAsFile = () => {
  let textToWrite = document.getElementById('text-input').value;
  console.log(textToWrite);

  let textFileAsBlob = new Blob([textToWrite], {type: 'text/plain'});
  let fileNameToSaveAs = document.getElementById('inputFileNameToSaveAs').value;

  let downloadLink = document.createElement('a');
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  downloadLink.href = URL.createObjectURL(textFileAsBlob);
  downloadLink.click();

  if (window.webkitURL != null) {
    downloadLink.href = URL.createObjectURL(textFileAsBlob);
  }else {
    downloadLink.href = URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
  }
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}