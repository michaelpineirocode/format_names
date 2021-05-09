const SHEETNAME = "Sheet1" // the name of the sheet that the email addresses are being moved to
const FORMNAME = "Form Responses 1" // the name of the sheet with form responses
const EMAILCOL = 2 // the column that the email address is on the FORM SUBMIT sheet
const COL = 5 // the column where the names should be placed

function onFormSubmit(){
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(FORMNAME) // defines sheet
  let last_row = ss.getLastRow() 
  let content = ss.getRange(last_row, EMAILCOL).getValue() // gets the most recent email
  content = parseEmails(content) // parses the email into a name
  placeContent(content) // places the name into the sheet
}

function parseEmails(content){
  if (content.includes("'")) { // if there's a ', remove it
    content = content.replace("'", "")
  }
  let terms = content.split("@")[0].split(".") 
  if (terms.length > 2) { // if there are more than 2 "."s in the beginning, remove the middle term
    let domain = content.split("@")[1]
    content = terms[0] + "." + terms[2] + "@" + domain 
  }
  content = content.split("@")[0] // only consider the text prior to the domain
  content = content.replace(".", " ") // replace the period with a space
  content = content.toUpperCase() // convert to uppercase
  return content
}

function placeContent(content) {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETNAME)
  let last_row = findLastRow(COL) // find the last row in that column
  ss.getRange(last_row + 1, COL).setValue(content) // place the content in the next row of the column
}

function findLastRow(column){
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETNAME)
  let last_row = ss.getLastRow() // gets the sheets last row
  for (i=last_row; i > 0; i --) { // goes BACK from the SHEET's last row
    let cell = ss.getRange(i, column).getValue()
    if (cell != "") {
      return i // return the row number
    }
  } return 0 // if there are no entries already, return 0
}
