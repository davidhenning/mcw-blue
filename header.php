<!DOCTYPE html>
<html>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width; initial-scale=1; user-scaleable=0; maximum-scale=1;">
		<?php $options = get_option('mcw_theme_options'); echo $options['typekit']; ?>
		<title>
			<?php
			/*
			 * Print the <title> tag based on what is being viewed.
			 */
			global $page, $paged;
		
			wp_title( '|', true, 'right' );
		
			// Add the blog name.
			bloginfo( 'name' );
		
			// Add the blog description for the home/front page.
			$site_description = get_bloginfo( 'description', 'display' );
			if ( $site_description && ( is_home() || is_front_page() ) )
				echo " | $site_description";
		
			// Add a page number if necessary:
			if ( $paged >= 2 || $page >= 2 )
				echo ' | ' . sprintf( __( 'Page %s', 'twentyeleven' ), max( $paged, $page ) );
		
			?>
		</title>
		<link href="<?php bloginfo('template_url'); ?>/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css">
		<link href="<?php bloginfo('template_url'); ?>/stylesheets/jquery.lightbox-0.5.css" media="screen, projection" rel="stylesheet" type="text/css">
		<?php
			/* We add some JavaScript to pages with the comment form
			 * to support sites with threaded comments (when in use).
			 */
			if ( is_singular() && get_option( 'thread_comments' ) )
				wp_enqueue_script( 'comment-reply' );
		
			/* Always have wp_head() just before the closing </head>
			 * tag of your theme, or you will break many plugins, which
			 * generally use this hook to add elements to <head> such
			 * as styles, scripts, and meta tags.
			 */
			wp_head();

			if($options['cdn_url'] && $options['dev_mode'] == '0') {
				$cdnUrl = $options['cdn_url']."wp-content/themes/".get_option('template')."/js/production/";
			}
		?>
	</head>
	<body data-cdn-url="<?php echo $cdnUrl; ?>">
		<nav>
			<div class="centerWrapper">
				<?php wp_nav_menu(array('container' => false)); ?>
				<form action="<?php bloginfo('home'); ?>" method="get">
					<fieldset id="search">
						<input type="text" name="s" placeholder="<?php _e('Search', 'mcw-blue'); ?>">
						<input type="submit" name="search">
					</fieldset>
				</form>
			</div>
		</nav>
		<header>
			<div class="centerWrapper">
				<p class="title">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo('name'); ?></a>
				</p>
			</div>
		</header>
		<div class="centerWrapper">
			<div id="main">