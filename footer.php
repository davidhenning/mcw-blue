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
		<script type="text/javascript">
			jQuery(document).ready(function() {
				jQuery('article .content a:not([href*="madcatswelt"]):not([href*="d2a2u75mqv5jcj.cloudfront.net"])[href^="http"]:not([class*="noArrow"])').addClass('external').attr('title', 'Externer Link').attr('target', '_blank');
			});
		</script>
		<!-- Piwik -->
		<script type="text/javascript">
		var pkBaseURL = (("https:" == document.location.protocol) ? "https://analytics.madcatswelt.org/" : "http://analytics.madcatswelt.org/");
		document.write(unescape("%3Cscript src='" + pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
		</script><script type="text/javascript">
		try {
		var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", 1);
		piwikTracker.trackPageView();
		piwikTracker.enableLinkTracking();
		} catch( err ) {}
		</script><noscript><p><img src="http://analytics.madcatswelt.org/piwik.php?idsite=1" style="border:0" alt="" /></p></noscript>
		<!-- End Piwik Tracking Code -->
	</body>
</html>