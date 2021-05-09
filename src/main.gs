const SHEETNAME = "Sheet1"
const FORMNAME = "Form Responses 1"
const COL = 5

function onFormSubmit(){
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(FORMNAME)
  let last_row = ss.getLastRow()
  let content = ss.getRange(last_row, 2).getValue()
  content = parseEmails(content)
  placeContent(content)
}

function parseEmails(content){
  if (content.includes("'")) {
    content = content.replace("'", "")
  }
  let terms = content.split("@")[0].split(".")
  if (terms.length > 2) {
    let domain = content.split("@")[1]
    content = terms[0] + "." + terms[2] + "@" + domain 
  }
  content = content.split("@")[0]
  content = content.replace(".", " ")
  content = content.toUpperCase()
  return content
}

function placeContent(content) {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETNAME)
  let last_row = findLastRow(COL)
  ss.getRange(last_row + 1, COL).setValue(content)
}

function findLastRow(column){
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETNAME)
  let last_row = ss.getLastRow()
  for (i=last_row; i > 0; i --) { // goes BACK from the last row
    let cell = ss.getRange(i, column).getValue()
    if (cell != "") {
      return i
    }
  } return 0
}
