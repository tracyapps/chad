/**
 * javascript for icon cheatsheet
 */

(function() {

	// Register plugin
	tinymce.create( 'tinymce.plugins.icon_cheatsheet', {

		init: function( editor, url ) {

			// Add the icon cheatsheet button
			editor.addButton( 'icon_cheatsheet', {
				text: 'Icon cheat sheet',
				//icon: 'icons dashicons-edit',
				tooltip: 'The list of icons',
				cmd: 'create_icon_cheatsheet'
			} );

			// Called when we click the icon cheatsheet button
			editor.addCommand( 'create_icon_cheatsheet', function() {
				// Calls the pop-up modal
				editor.windowManager.open( {
					// Modal settings
					title: 'Icon Cheatsheet',
					width: jQuery( window ).width() * 0.7,
					// minus head and foot of dialog box
					height: (jQuery( window ).height() - 36 - 50) * 0.7,
					inline: 1,
					id: 'icon_cheatsheet-insert-dialog',
					buttons: [
						{
							text: 'Close',
							id: 'icon_cheatsheet-button-cancel',
							onclick: 'close'
						}
					],
				} );

				appendInsertDialog();

			} );

		}

	} );

	tinymce.PluginManager.add( 'icon_cheatsheet', tinymce.plugins.icon_cheatsheet );

	function appendInsertDialog() {
		var dialogBody = jQuery( '#icon_cheatsheet-insert-dialog-body' ).append( '' );

		// Get the form template from WordPress
		jQuery.post( ajaxurl, {
			action: 'icon_cheatsheet_insert_dialog'
		}, function( response ) {
			template = response;

			dialogBody.children( '.loading' ).remove();
			dialogBody.append( template );
			jQuery( '.spinner' ).hide();
		} );
	}
})();