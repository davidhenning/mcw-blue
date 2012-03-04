			</div>
		</div>
		<footer>
			<?php if($sTweet = getLastQuoteFromTwitter('d_henning')): ?>
				<div id="tweet">
					<div class="centerWrapper">
						<q cite="http://twitter.com/#!/d_henning"><?php echo $sTweet; ?></q>
					</div>
				</div>
			<?php endif; ?>
			<div id="info">
				<div class="centerWrapper">
					<a href="http://www.wordpress.org/" target="_blank">WordPress</a> | Theme: <a href="https://github.com/MadCatme/mcw-blue" target="_blank">mcw[blue]</a>
				</div>
			</div>
		</footer>
		<?php wp_footer(); ?>
		<?php $options = get_option('mcw_theme_options'); echo $options['custom_footer']; ?>
	</body>
</html>