<article id="post-<?php the_ID(); ?>">
	<header>
		<h2><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
		<aside class="meta">
			<span class="date"><?php the_time(get_option( 'date_format' )); ?></span> &middot; <?php comments_popup_link('Schreib einen Kommentar', 'Ein Kommentar', '% Kommentare'); ?>
		</aside>
	</header>
	<div class="content">
		<?php the_content(); ?>
	</div>
</article>