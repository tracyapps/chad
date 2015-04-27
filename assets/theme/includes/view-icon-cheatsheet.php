<?php
/**
 * dialog view for icon cheatsheet
 */
?>

<div id="icon_cheatsheet-insert-dialog-body">
	<div class="wrap" style="padding:25px; overflow: hidden;">
		<p>Below are the available icons to add to the content. Copy the icon name and paste into the icon
			shortcode.</p>

		<p>

		<h2><strong>Example:</strong> [icon icon="<i>brain</i>" size="<i>100px</i>" align="<i>right</i>"] <strong>(you
				can replace the values in italics)</strong></h2></p>
		<hr/>
		<?php
		$the_icon_path = get_template_directory() . '/images/png/';
		$the_icon_url = get_template_directory_uri() . '/images/png/';
		$the_icon_array = array_diff( scandir( $the_icon_path ), array( '..', '.' ) );
		$the_icon_array = array_map( function ( $e ) {
			return pathinfo( $e, PATHINFO_FILENAME );
		}, $the_icon_array );

		foreach( $the_icon_array as $the_icon ) : ?>
			<div class="icon category-icon"
				 style="width: 165px; height: 1.5em; float: left; padding: 2px; margin-right: 20px; margin-bottom: 2px; border:1px solid #ccc;">
				<img src="<?php echo esc_url( $the_icon_url ) . esc_html( $the_icon ); ?>.png"
					 style="width: 20px; height: auto; float:left; margin-right:5px;">
				<?php esc_html_e( $the_icon ); ?>
			</div>
		<?php endforeach; ?>
		<br clear="both">
	</div>
</div>