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
			$sTwitterUrl = esc_url_raw('http://api.twitter.com/1/statuses/user_timeline.json?'.http_build_query($params), array('http'));
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