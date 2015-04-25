<?php
/**
 * The footer nav menu template.
 *
 * @package     ChadLawson
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @since       1.0.0
 */
?>
<?php if ( has_nav_menu ( 'footer' ) ) : ?>

	<nav <?php hybrid_attr ( 'menu', 'footer' ); ?>>

		<span id="menu-footer-title" class="screen-reader-text">
			<?php
			// Translators: %s is the nav menu name. This is the nav menu title shown to screen readers.
			printf ( _x ( '%s', 'nav menu title', 'chad' ), hybrid_get_menu_location_name ( 'footer' ) );
			?>
		</span>

		<?php
		wp_nav_menu (
			array (
				'theme_location' => 'footer',
				'container' => '',
				'menu_id' => 'footer',
				'menu_class' => 'nav-menu footer',
				'fallback_cb' => '',
				'items_wrap' => '<div ' . hybrid_get_attr ( 'wrap', 'footer-menu' ) . '><ul id="%s" class="%s">%s</ul></div>',
			)
		);
		?>

	</nav><!-- #menu-footer -->

<?php

endif;
