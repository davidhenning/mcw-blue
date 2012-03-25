<?php

load_theme_textdomain('mcw-blue', TEMPLATEPATH.'/languages');

if(!is_admin()) {
	wp_deregister_script('jquery');
}

if(function_exists('register_sidebar')) {
	register_sidebar(array(
		'before_widget' => '<ul><li id="%1$s" class="widget %2$s">',
		'after_widget' => '</li></ul>',
		'before_title' => '<h3 class="widgettitle">',
		'after_title' => '</h3>',
	));
}

add_filter('nav_menu_css_class' , 'highlightHome' , 10 , 2);
add_action('widgets_init', 'themeCleanUp');
add_filter('the_generator','removeGenerator');
remove_filter('the_title', 'capital_P_dangit');
remove_filter('the_content', 'capital_P_dangit');
remove_filter('comment_text', 'capital_P_dangit');
remove_filter('the_title', 'capital_P_dangit', 11);
remove_filter('the_content', 'capital_P_dangit', 11);
remove_filter('comment_text', 'capital_P_dangit', 11);

function themeCleanUp() {
	global $wp_widget_factory;
	remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
}

function removeGenerator(){
	return false;
}


function highlightHome($classes, $item) {
	if(is_home() && $item->title == 'weblog') { 
		$classes[] = "current-menu-item";
	}
	
	return $classes;
}

function getLastQuoteFromTwitter($sTwitterId = null) {
	if($sTwitterId !== null && strlen($sTwitterId) > 0) {
		if(($aTweets = get_transient('twitter-quote')) === false) {
			$aParams = array(
				'screen_name'=> $sTwitterId, 
				'trim_user'=> true, 
				'include_entities'=> false, 
				'include_rts' => true
			);

			$iTwitterTransientExpire = 900;
			$sTwitterUrl = esc_url_raw('http://api.twitter.com/1/statuses/user_timeline.json?'.http_build_query($aParams), array('http'));
			$aResponse = wp_remote_get($sTwitterUrl, array('User-Agent' => 'WordPress'));
			$iResponseCode = wp_remote_retrieve_response_code($aResponse);
			
			if($iResponseCode == 200) {
				$aTweets = json_decode(wp_remote_retrieve_body($aResponse), true);
				
				if(!is_array($aTweets) || isset($aTweets['error'])) {
					$iTwitterTransientExpire = 300;
					$aTweets = null;
				}
			}

			set_transient('section-twitter', $aTweets, $iTwitterTransientExpire);

			if($aTweets !== null) {
				return $aTweets[0]['text'];
			}
		}
	}

	return null;
}

add_action('admin_init', 'themeOptionsInit');
add_action('admin_menu', 'themeOptionsAddPage');

function themeOptionsInit(){
	register_setting('mcw_options', 'mcw_theme_options', 'mcwValidateOptions');
}

function themeOptionsAddPage() {
	add_theme_page('Optionen', 'Optionen', 'edit_theme_options', 'theme_options', 'mcwThemeOptionsPage');
}

function mcwThemeOptionsPage() {
	if(!isset($_REQUEST['settings-updated'])) {
		$_REQUEST['settings-updated'] = false;
	}

	?>

	<div class="wrap">
		<?php screen_icon(); ?><h2>Theme-Optionen für <?php bloginfo('name'); ?></h2> 

		<?php if($_REQUEST['settings-updated'] !== false): ?>
			<div class="updated fade">
				<p><strong>Einstellungen gespeichert!</strong></p>
			</div>
		<?php endif; ?>

		<form method="post" action="options.php">
			<?php settings_fields('mcw_options'); ?>
			<?php $options = get_option('mcw_theme_options'); ?>

			<table class="form-table">
				<tr valign="top">
					<th scope="row">TypeKit JavaScript Code</th>
					<td><textarea id="mcw_theme_options[typekit]" class="large-text" cols="50" rows="10" name="mcw_theme_options[typekit]"><?php echo esc_textarea($options['typekit']); ?></textarea></td>
				</tr>
				<tr valign="top">
					<th scope="row">Custom Footer</th>
					<td><textarea id="mcw_theme_options[custom_footer]" class="large-text" cols="50" rows="10" name="mcw_theme_options[custom_footer]"><?php echo esc_textarea($options['custom_footer']); ?></textarea></td>
				</tr>
				<tr valign="top">
					<th scope="row">Twitter ID</th>
					<td><input id="mcw_theme_options[twitter_id]" class="regular-text" type="text" name="mcw_theme_options[twitter_id]" value="<?php esc_attr_e( $options['twitter_id'] ); ?>" /></td>
				</tr>
				<tr valign="top">
					<th scope="row">CDN URL</th>
					<td><input id="mcw_theme_options[cdn_url]" class="regular-text" type="text" name="mcw_theme_options[cdn_url]" value="<?php esc_attr_e( $options['cdn_url'] ); ?>" /></td>
				</tr>
				<tr valign="top">
					<th scope="row">Developer mode</th>
					<td>
						<input type="hidden" name="mcw_theme_options[dev_mode]" value="0" />
						<input id="mcw_theme_options[dev_mode]" type="checkbox" name="mcw_theme_options[dev_mode]" value="1" <?php if($options['dev_mode'] == '1') { echo 'checked="checked"'; } ?> />
					</td>
				</tr>
			</table>

			<!-- submit -->
			<p class="submit"><input type="submit" class="button-primary" value="Einstellungen speichern" /></p>
		</form>
	</div>

	<?php
}

function mcwValidateOptions($sInput) {
	return $sInput;
}