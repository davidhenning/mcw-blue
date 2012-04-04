			</div>
		</div>
		<footer>
			<?php 
			$options = get_option('mcw_theme_options');
			$jsUrl = get_bloginfo('template_url');
			$jsUrl .= ($options['dev_mode'] == '1') ? '/js/source/' : '/js/production/';
			if($sTweet = getLastQuoteFromTwitter($options['twitter_id'])): ?>
				<div id="tweet">
					<div class="centerWrapper">
						<q cite="http://twitter.com/#!/<?php echo $options['twitter_id']; ?>"><?php echo $sTweet; ?></q>
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
		<?php 
		if($options['gaid'] || $options['piwikurl']) {
			$trackData = '<div';

			if($options['gaid']) {
				$trackData .= " data-gaid='{$options['gaid']}'";
			}

			if($options['piwikurl']) {
				$trackData .= " data-piwikurl='{$options['piwikurl']}'";
			}

			$trackData .= '></div>';

			echo $trackData;
		}
		?>
		<script src="<?php echo $jsUrl; ?>libs/require/require.js" data-main="<?php echo $jsUrl; ?>mcw"></script>
		<?php echo $options['custom_footer']; ?>
	</body>
</html>