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
						<span class="icon-twitter"></span>
						<p>
							<q cite="http://twitter.com/#!/<?php echo $options['twitter_id']; ?>"><?php echo $sTweet; ?></q>
						</p>
					</div>
				</div>
			<?php endif; ?>
			<div id="info">
				<div class="centerWrapper">
					<p>
						<a href="http://www.wordpress.org/">WordPress</a> | Theme: <a href="https://github.com/MadCatme/mcw-blue">mcw[blue]</a>
						<span class="license">
							<a class="icon-creative-commons" href="http://creativecommons.org/licenses/by-sa/3.0/de/">Creatve Commons 3.0 BY-SA</a>
						</span>
					</p>
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

			if($options['gaugesid']) {
				$trackData .= " data-gaugesid='{$options['gaugesid']}'";
			}

			$trackData .= '></div>';

			echo $trackData;
		}
		?>
		<script src="<?php echo $jsUrl; ?>vendor/requirejs/requirejs-2.0.6.js" data-main="<?php echo $jsUrl; ?>hook.js"></script>
		<?php echo $options['custom_footer']; ?>
	</body>
</html>