const MENU_NAME = "Regular Expressions"

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu(MENU_NAME) 
      .addSubMenu(ui.createMenu('Sort')
          .addItem('Remove Middle Name', 'sortMiddleName')
          .addItem("Remove Apostrophe", "sortApostrophe")
          .addItem("Remove Middle Name and Apostrophe", "sortMiddleandApostrophe"))
      .addItem("Convert Email to F&L Names", "removeEmailDomain")
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
              name = [middlename[0], middlename[2]].join().replace(",", ".")
              names.push(name + "@" + content.split("@")[1]) // adds to a list
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
              name = [middlename[0], middlename[2]].join().replace(",", ".")
              names.push(name + "@" +content.split("@")[1]) // adds to a list
        }
      } 
      moveData(names)
    }
  }
}

function sortApostrophe() {
  var ui = SpreadsheetApp.getUi()
  var response = ui.prompt("Sort by Apostrophe", "Find by name?", ui.ButtonSet.YES_NO_CANCEL)
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
          let middlename = content.split("@")[0] // selects name prior to domain
          if (middlename.includes("'")) { // tests if there is an apostrophe
            names.push(content.replace("'", ""))
          }
        }
        moveData(names)
      }
      
      else {
          for (i=1; i < lastrow + 1; i++) { // loops through every row and gets 
            var content = ss.getRange(i, col_num).getValue()
            let middlename = content.split("@")[0] // selects name prior to domain
            let word_term = content.split("").splice(0, text.length).join("") // finds the corresponding letters to search in email
            if (middlename.includes("'") && word_term == text) {  // if the search and the fact it has a middle name lines up, add it
              names.push(content.replace("'", ""))
        }
      } 
      moveData(names)
    }
  }
}

function sortMiddleandApostrophe() {
  var ui = SpreadsheetApp.getUi()
  var response = ui.prompt("Sort by Apostrophe and Middle Name", "Find by name?", ui.ButtonSet.YES_NO_CANCEL)
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
          let middlename = content.split("@")[0] // selects name prior to domain
          if (middlename.includes("'") || middlename.split("@")[0].split(".").length > 2) { 
            names.push(content) // will push the raw name
          }
        }
        for (i=0; i < names.length; i++) {
          if (names[i].includes("'")) {
            names[i] = names[i].replace("'", "")
          }
          word_terms = names[i].split("@")[0].split(".")
          if (word_terms.length > 2) {
            names[i] = [word_terms[0] + "." + word_terms[2]].join("").replace(",", "") + "@" + names[i].split("@")[1]
          }
        }
          moveData(names)
      }
      
      else {
          for (i=1; i < lastrow + 1; i++) { // loops through every row and gets 
            var content = ss.getRange(i, col_num).getValue()
            let middlename = content.split("@")[0] // selects name prior to domain
            let word_term = content.split("").splice(0, text.length).join("") // finds the corresponding letters to search in email
            if (
              (middlename.includes("'") && word_term == text) || 
              (middlename.split("@")[0].split(".").length > 2 && word_term == text)) { 
              names.push(content)
        }
      } 
      for (i=0; i < names.length; i++) {
          if (names[i].includes("'")) {
            names[i].replace("'", "")
          }
          if (names[i].split("@")[0].split(".") > 2) {
            word_terms = names[i].split("@")[0].split(".")
            names[i] = [word_terms[0] + word_terms[2]].join("").replace(",", "")
          }
        }
          moveData(names)
      }
    }
  }


function removeEmailDomain() {
  var ui = SpreadsheetApp.getUi()
  var response = ui.prompt("Concert emails to first and last name", "Find by name?", ui.ButtonSet.YES_NO_CANCEL)
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
          let name = content.split("@")[0].split(".").join(" ").replace(",", "") // creates array of every name prior to domain name
          names.push(name)
          }
        moveData(names)
        }
      
      else {
          for (i=1; i < lastrow + 1; i++) { // loops through every row and gets 
            var content = ss.getRange(i, col_num).getValue()
            let middlename = content.split("@")[0].split(".") // creates array of every name prior to domain name
            
            let word_term = content.split("").splice(0, text.length).join("") // finds the corresponding letters to search in email
            if (word_term == text) {  // if the search and the fact it has a middle name lines up, add it
              let name = content.split("@")[0].split(".").join(" ").replace(",", "") // creates array of every name prior to domain name
              names.push(name)
        }
      } 
      moveData(names)
    }
  }
}

function moveData(names) {
  ui = SpreadsheetApp.getUi()
      if (names.length == 0) {
        ui.alert("No names matching the criteria were found.")
        return
      }
      let response = ui.alert(
        "The following cell(s) have been found and edited: " + names.join(", ") 
        + "\nSelect 'Yes' to create a new column. Select 'No' for more options", 
        ui.ButtonSet.YES_NO_CANCEL)
      
      if (response == ui.Button.CANCEL) {
        return
      }
      
      const ss = SpreadsheetApp.getActiveSheet()
      if (response == ui.Button.YES) {  // create a new column
        const finalColumn = ss.getLastColumn()
        for (i=1; i <= names.length; i++) {
          let cell = ss.getRange(i, finalColumn+1)
          cell.setValue(names[i-1])
        }  
      }
      else { // appending or overriding
        let response = ui.alert("Select 'Yes' to append a row. Select 'No' to override", ui.ButtonSet.YES_NO_CANCEL)
          if (response == ui.Button.CANCEL) {
            return;
          }
          
          if (response == ui.Button.YES) { // append
          let text = parseInt(ui.prompt("What column number would you like to append the names to?").getResponseText())
          let last_row = findLastRow(text)
          for (i=last_row + 1; i <= names.length + last_row; i++) {
            let cell = ss.getRange(i, text)
            cell.setValue(names[i-1-last_row])
          }
        }  
        else { // if they are overriding
          let text = parseInt(ui.prompt("What column number would you like to override?").getResponseText())
          let last_row = ss.getLastRow()
          for (i=1; i <= last_row; i++) {
            Logger.log(i)
            Logger.log(text)
            let cell = ss.getRange(i, text)
            cell.setValue(names[i-1])
          }
        }  
        }
      }

function findLastRow(col) { // finds the last row in any given column, not the last one overall
  ss = SpreadsheetApp.getActiveSheet()
  let last_row = ss.getLastRow() // gets the last row so that we have some form of constraint
  let content_row = 0 
  for (i=1; i <= last_row; i++) { // loop through each item in the column
    let cell = ss.getRange(i, col)
    if (cell.getValue() != "") {
      content_row = i // if the cell is not empty, update the index of the most recently filled cell
    }
  }
  return content_row
}

/*
This doesn't work right now because I am an imbecile who forgot that A1 notation can't simply be multiplied by 27
function convertA1toNum(a1) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz".split("") // list of all letters in the alphabet!
  let len = a1.length // length of the a1 notation (A, AA, AAA, AAAA)
  let col_num = 0
  if (len > 1) { // if the length is greater than 1, multiply out by 26
    col_num = (len - 1) * 26
  }
  let last_letter = a1.split("").splice(-1, 1)
  col_num += alphabet.indexOf(last_letter) + 1
  return col_num
}
*/
