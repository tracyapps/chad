<?php
/**
 * A template part for the default entry footer.
 *
 * @package     ChadLawson
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @since       1.1.0
 */
?>
<?php if ( has_term ( '', 'category' ) || has_term ( '', 'post_tag' ) ) : ?>

	<footer class="entry-footer">
		<?php
		hybrid_post_terms (
			array (
				'taxonomy' => 'category',
				'before' => '<p class="entry-meta categories"><div class="icon icon-folder icon-left icon-color-primary icon-sm" data-grunticon-embed></div>',
				'after' => '</p>',
			)
		);
		hybrid_post_terms (
			array (
				'taxonomy' => 'post_tag',
				'before' => '<p class="entry-meta tags"><div class="icon icon-tag icon-left icon-color-primary icon-sm" data-grunticon-embed></div>',
				'after' => '</p>',
			)
		);
		?>
	</footer><!-- .entry-footer -->

<?php

endif;
