<?php
/**
 * The primary nav menu template.
 *
 * @package     ChadLawson
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @since       1.0.0
 */
?>
<?php if ( has_nav_menu ( 'primary' ) ) : ?>

	<nav <?php hybrid_attr ( 'menu', 'primary' ); ?>>

		<span id="menu-primary-title" class="screen-reader-text">
			<?php
			// Translators: %s is the nav menu name. This is the nav menu title shown to screen readers.
			printf ( _x ( '%s', 'nav menu title', 'chad' ), hybrid_get_menu_location_name ( 'primary' ) );
			?>
		</span>

		<?php
		wp_nav_menu (
			array (
				'theme_location' => 'primary',
				'container' => '',
				'menu_id' => 'primary',
				'menu_class' => 'nav-menu primary',
				'fallback_cb' => '',
				'items_wrap' => '<div ' . hybrid_get_attr ( 'wrap', 'primary-menu' ) . '><ul id="%s" class="%s">%s</ul></div>',
			)
		);
		?>

	</nav><!-- #menu-primary -->

<?php
endif;
