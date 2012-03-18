<?php get_header(); ?>

<div id="content">
	<?php if ( have_posts() ) : ?>
		<?php if(is_search()): ?>
			<header class="search">
				<p><?php _e('Search Results for:', 'mcw-blue'); ?> &quot;<?php echo get_search_query(); ?>&quot;</p>
			</header>
		<?php endif; ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<article id="post-<?php the_ID(); ?>">
				<header>
					<h2><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
					<aside class="meta">
						<span class="date"><?php the_time(get_option('date_format')); ?></span> 
						<?php if(!is_single()): ?>
							&middot; <?php comments_popup_link(__('write a comment', 'mcw-blue'), __('one comment', 'mcw-blue'), __('% comments', 'mcw-blue')); ?>
						<?php endif; ?>
					</aside>
				</header>
				<div class="content">
					<?php the_content(); ?>
				</div>
			</article>
		<?php endwhile; ?>
		<div id="pagination">
			<div class="prev">
				<?php previous_posts_link(__('&larr; previous entries', 'mcw-blue')); ?>&nbsp;
			</div>
			<div class="next">
				&nbsp;<?php next_posts_link(__('next entries &rarr;', 'mcw-blue')); ?>
			</div>
		</div>
	<?php endif; ?>
	<?php if(is_single()): ?>
		<?php comments_template( '', true ); ?>
	<?php endif; ?>
</div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>