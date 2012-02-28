<!DOCTYPE html>
<html>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<script type="text/javascript" src="http://use.typekit.com/ukt0qwk.js"></script>
		<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
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
		<link href="<?php echo bloginfo('template_url'); ?>/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div class="centerWrapper">
			<nav>
				<a class="active" href="<?php echo esc_url( home_url( '/' ) ); ?>">weblog</a><a href="#">archiv</a><a href="#">fotos</a>
				<form action="<?php bloginfo('home'); ?>" method="get">
					<fieldset id="search">
						<input type="text" name="search" value="Suchen" onfocus="if (this.value == 'Suchen') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Suchen';}">
						<input type="submit" name="search">
					</fieldset>
				</form>
			</nav>
			<header>
				<p class="title">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>">madcats[welt]</a>
				</p>
			</header>
			<div id="main">