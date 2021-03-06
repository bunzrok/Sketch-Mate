// Duplicates the current artboard right next to it.
// If there are other artboards nearby, they will be pushed away.
// You can have any layer selected, no need to select the artboard before duplication :)

function sendAction(commandToPerform) {
	try {
		[NSApp sendAction:commandToPerform to:nil from:doc]
	} catch(e) {
		log(e)
	}
};


var onRun = function (context) {

    // old school variable
    var doc = context.document;
    var selection = context.selection;


    // Make sure an artboard is selected
    var selectedArtboard = doc.currentPage().currentArtboard();
    doc.currentPage().deselectAllLayers();
    selectedArtboard.setIsSelected(true);
    var width = selectedArtboard.frame().width();

    artboards = doc.currentPage().artboards();

    // Move all artboards that are next to the selected one
    for (var i = 0; i < artboards.count(); i++) {
        // only move artboards on the same y position
        if (artboards[i] != selectedArtboard) {
            if (artboards[i].frame().y() == selectedArtboard.frame().y() && artboards[i].frame().x() > selectedArtboard.frame().x()) {
                var newX = artboards[i].frame().x() + width + 100;
                artboards[i].frame().setX(newX);
            }
        }

    }
    var action = doc.actionsController().actionWithID("MSCanvasActions");
    action.duplicate(nil);

}