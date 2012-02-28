<?php get_header(); ?>

<div id="content">
	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<?php get_template_part('post'); ?>
		<?php endwhile; ?>
		<div id="pagination">
			<div class="prev">
				<?php previous_posts_link('&larr; Vorherige Eintr&auml;ge'); ?>&nbsp;
			</div>
			<div class="next">
				&nbsp;<?php next_posts_link('N&auml;chste Eintr&auml;ge &rarr;',''); ?>
			</div>
		</div>
	<?php endif; ?>
</div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>