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

function sortMiddleName() { // going to try lazy computing
  var ui = SpreadsheetApp.getUi()
  var response = ui.prompt("Sort by Middle Name", "Find by name?", ui.ButtonSet.YES_NO_CANCEL)
  var text = response.getResponseText()

  if (response.getSelectedButton() == ui.Button.CANCEL) {
    return
  } 
  
  else { 
      // gets the column number of where to search
      const col_num = parseInt(ui.prompt("Column Number", "Enter the column to search", ui.ButtonSet.OK).getResponseText())
      const ss = SpreadsheetApp.getActiveSheet()
      const lastrow = ss.getLastRow() // gets the last row indexed FROM ONE 1
      let names = []
      
      if (response.getSelectedButton() == ui.Button.NO) {
        for (i=1; i < lastrow + 1; i++) { // loops through every row and gets 
          var content = ss.getRange(i, col_num).getValue()
          let middlename = content.split("@")[0].split(".") // creates array of every name prior to domain name
          if (middlename.length > 2) { // tests if there are more than two terms
            names.push(content)
          }
        }
        moveData(names)
      }
      
      else {
          for (i=1; i < lastrow + 1; i++) { // loops through every row and gets 
            var content = ss.getRange(i, col_num).getValue()
            let middlename = content.split("@")[0].split(".") // creates array of every name prior to domain name
            let word_term = content.split("").splice(0, text.length).join("") // finds the corresponding letters to search in email
            if (middlename.length > 2 && word_term == text) {  // if the search and the fact it has a middle name lines up, add it
              names.push(content) // adds to a list
        }
      } 
      moveData(names)
    }
  }
}

function sortApostrophe() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert('You clicked the second menu item!');
}

function moveData(names) {
  ui = SpreadsheetApp.getUi()
      if (names.length == 0) {
        ui.alert("No names matching the criteria were found.")
        return
      }
      response = ui.alert(
          "The following email address(es) have been found: " + names.join(", ") + "\nWould you like to add to a new column?", 
          ui.ButtonSet.YES_NO_CANCEL)
      
      if (response.getSelectedButton == ui.Button.CANCEL) {
        return
      }
      else {

      }
}













