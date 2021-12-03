/*************************************************************/
/*   FileCloseAll-NOSAVE.js                                   */
/*                                                            */
/*   Add a "Close All - NO SAVE" feature in the File menu     */
/*                                                            */
/*************************************************************/
 
#targetengine "FileCloseAll"
 
// THE MAIN PROCESS
// -----------------------------------------------
var fcaTitle = "Close All - NO SAVE";
 
var fcaHandlers = {
    'beforeDisplay' : function(ev)
        {
        ev.target.enabled = (app.documents.length>1);
        },
 
    'onInvoke' : function()
        {
        var doc;
        for( var i = app.documents.length-1 ; i>=0 ; i-- )
            {
            doc = app.documents[i];
            doc.close(SaveOptions.NO);
            }
        }
    };
 
 
// THE MENU INSTALLER
// -----------------------------------------------
var fcaMenuInstaller = fcaMenuInstaller||
(function(mnuTitle,mnuHandlers)
{
// 1. Create the script menu action
var mnuAction = app.scriptMenuActions.add(mnuTitle);
 
// 2. Attach the event listener
var ev;
for( ev in mnuHandlers )
    {
    mnuAction.eventListeners.add(ev,mnuHandlers[ev]);
    }
 
// 3. Create the menu item
var fileMenu = app.menus.item("$ID/Main").submenus.item("$ID/&File");
var refItem = fileMenu.menuItems.item("$ID/&Close");
 
fileMenu.menuItems.add(mnuAction,LocationOptions.after,refItem);
 
return true;
})(fcaTitle, fcaHandlers);
