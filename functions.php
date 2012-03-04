<?php

if(function_exists('register_sidebar')) {
	register_sidebar(array(
		'before_widget' => '<ul><li id="%1$s" class="widget %2$s">',
		'after_widget' => '</li></ul>',
		'before_title' => '<h3 class="widgettitle">',
		'after_title' => '</h3>',
	));
}

add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);

function special_nav_class($classes, $item) {
	if(is_home() && $item->title == 'weblog') { 
		$classes[] = "current-menu-item";
	}
	
	return $classes;
}

function getLastQuoteFromTwitter($sTwitterId = null) {
	if($sTwitterId !== null) {
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

add_action('admin_init', 'theme_options_init');
add_action('admin_menu', 'theme_options_add_page');

function theme_options_init(){
	register_setting('mcw_options', 'mcw_theme_options', 'mcw_validate_options');
}

function theme_options_add_page() {
	add_theme_page('Optionen', 'Optionen', 'edit_theme_options', 'theme_options', 'mcw_theme_options_page');
}

function mcw_theme_options_page() {
	global $select_options, $radio_options;

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
	        <th scope="row">typekit</th>
	        <td><textarea id="mcw_theme_options[typekit]" class="large-text" cols="50" rows="10" name="mcw_theme_options[typekit]"><?php echo esc_textarea($options['typekit']); ?></textarea></td>
	      </tr>
	      <tr valign="top">
	        <th scope="row">Custom Footer</th>
	        <td><textarea id="mcw_theme_options[custom_footer]" class="large-text" cols="50" rows="10" name="mcw_theme_options[custom_footer]"><?php echo esc_textarea($options['custom_footer']); ?></textarea></td>
	      </tr>
	    </table>

	    <!-- submit -->
	    <p class="submit"><input type="submit" class="button-primary" value="Einstellungen speichern" /></p>
	  </form>
	</div>

	<?php
}

function mcw_validate_options($sInput) {
	return $sInput;
}