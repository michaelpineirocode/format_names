const MENU_NAME = "Regular Expressions"

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu(MENU_NAME) 
      .addSubMenu(ui.createMenu('Sort')
          .addItem('Middle Name', 'sortMiddleName')
          .addItem("Apostrophe", "sortApostrophe"))
      .addToUi();
}

function sortMiddleName() { // lazy approach
  var ui = SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  var response = ui.prompt("Sort by Middle Name", "Find by letter?", ui.ButtonSet.YES_NO_CANCEL)
  Logger.log(response.getSelectedButton())
  if (response.getSelectedButton() == ui.Button.CANCEL) {
    return 0
  } 
  else if (response.getSelectedButton() == ui.Button.NO) {
      // gets the column number of where to search
      const col_num = parseInt(ui.prompt("Column Number", "Enter the column to search", ui.ButtonSet.OK).getResponseText())
      const ss = SpreadsheetApp.getActiveSheet()
      const lastrow = ss.getLastRow() // gets the last row indexed FROM ONE 1
      for (i=1; i < lastrow + 1; i++) { // loops through every row and gets 
        var content = ss.getRange(i, col_num).getValue()
        let middlename = content.split("@")[0].split(".") // creates array of every name prior to domain name
        if (middlename.length > 2) { // tests if there are more than two terms
          
        }
      }
  } 
  else { // finds all middle names by the given letter

  }
}

function sortApostrophe() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert('You clicked the second menu item!');
}
