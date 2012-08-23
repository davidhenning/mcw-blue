<div id="sidebar" class="widget-area" role="complementary">
	<?php if(is_single() && !is_page()): ?>
		<ul>
			<li>
				<h3><?php _e('share', 'mcw-blue'); ?></h3>
				<ul>
					<li>
						<a href="https://twitter.com/share" class="twitter-share-button" data-via="d_henning" data-lang="de">Twittern</a>
					</li>
					<li>
						<div class="g-plusone" data-size="medium" data-annotation="none"></div>
					</li>
					<li>
						<div class="fb-like" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false"></div>
					</li>
				</ul>
			</li>
		</ul>
	<?php endif; ?>
	<?php dynamic_sidebar(); ?> 
</div>