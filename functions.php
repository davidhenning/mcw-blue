<?php

if(function_exists('register_sidebar')) {
	register_sidebar(array(
		'before_widget' => '<ul><li id="%1$s" class="widget %2$s">',
    'after_widget' => '</li></ul>',
    'before_title' => '<h3 class="widgettitle">',
    'after_title' => '</h3>',
	));
}