<?php get_header(); ?>

<div id="content">
    <article id="archive">
        <header>
            <h2>Archiv</h2>
        </header>
        <div class="content">
            <?php                   
                $months = $wpdb->get_results("SELECT DISTINCT DATE_FORMAT(post_date, '%Y') AS year, DATE_FORMAT(post_date, '%m') AS month FROM " . $wpdb->posts . " WHERE post_status = 'publish' AND post_type = 'post' ORDER BY post_date ASC", ARRAY_A);
                
                $lastYear = 0;
                
                foreach($months as $month) {
                    if($lastYear == 0) {
                        echo '<ul id="year_'.$month['year'].'" class="list year"><li class="title"><h2>'.$month['year'].'</h2></li>';
                    } elseif($lastYear != $month['year']) {
                        echo '</ul><ul id="year_'.$month['year'].'" class="list year"><li class="title"><h2>'.$month['year'].'</h2></li>';
                    }
                    
                    echo '<li><a href="'.get_month_link($month['year'], $month['month']).'">'.$wp_locale->get_month($month['month']).'</a></li>';
                    
                    $lastYear = $month['year'];
                }
                
                echo '</ul>';
            ?>
        </div>
    </article>
</div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>