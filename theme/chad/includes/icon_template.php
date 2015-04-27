<?php
/**
 * template to display the icon chooser in admin
 */
$the_icon_path = get_template_directory_uri() . '/images/png/';
$cb_id = $this->get_element_id() . '-' . esc_attr( sanitize_text_field( $data_row[ 'value' ] ) );

?>
<div class="fm-option category-icon"
	 style="width: 60px; height: 50px; float: left; padding: 5px; margin-right: 20px; margin-bottom: 20px; border:1px solid #ccc;">

	<input
		class="fm-element"
		type="radio"
		value="<?php echo esc_attr( $data_row[ 'name' ] ); ?>"
		name="<?php echo esc_attr( $this->get_form_name() ); ?>"
		id="<?php echo esc_attr( $cb_id ); ?>"
		<?php echo $this->get_element_attributes(); ?>
		<?php echo $this->option_selected( $data_row[ 'name' ], $value, "checked" ); ?>
		/>
	<label for="<?php echo esc_attr( $cb_id ); ?>" class="fm-option-label">
		<?php
		echo '<img src="' . $the_icon_path;
		echo esc_attr( $data_row[ 'name' ] );
		echo '.png" style="width: 40px; height: auto; float:right;" />';
		?>
	</label>


</div>