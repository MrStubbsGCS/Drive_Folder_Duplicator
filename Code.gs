function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Drive Folder Duplicator')
  .addItem('Duplicate Folder', 'duplicate')
  .addToUi();
}
/*
open folder
create fileiterator
copy all files to new folder
create folder iterator
repeat
*/

function duplicate() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("FolderData");
  var copyURL = sheet.getRange(2,1).getDisplayValue();
  var destinationURL = sheet.getRange(4, 1).getDisplayValue();
  var folder = DriveApp.getFolderById(getIdFromUrl(copyURL));
  var destination = DriveApp.getFolderById(getIdFromUrl(destinationURL));
  destination = destination.createFolder(folder.getName())
  copyFolderContent(folder, destination);
  
}
function copyFolderContent(folder, destination){
  var fileIt = folder.getFiles();
  while (fileIt.hasNext()){
    var curFile = fileIt.next();
    curFile.makeCopy(curFile.getName(), destination);
  }
  var folderIt = folder.getFolders();
  while (folderIt.hasNext()){
    var curFolder = folderIt.next();
    var newDestination = destination.createFolder(curFolder.getName());
    copyFolderContent(curFolder, newDestination);
  }
}
function getIdFromUrl(url) {
  return url.match(/[-\w]{25,}/)[0];
}
