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