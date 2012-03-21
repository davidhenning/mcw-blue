<div id="comments">
    <?php if(post_password_required()) : ?>
        <p class="nopassword"><?php _e('This post is password protected. Enter the password to view any comments.', 'mcw-blue'); ?></p>
    </div>
    <?php
            return;
        endif;
    ?>
    <?php if(have_comments()): ?>
        <h2>
            <?php
                printf( _n( 'One thought on &ldquo;%2$s&rdquo;', '%1$s thoughts on &ldquo;%2$s&rdquo;', get_comments_number(), 'mcw-blue' ),
                    number_format_i18n(get_comments_number()), get_the_title());
            ?>
        </h2>

        <?php if(get_comment_pages_count() > 1 && get_option('page_comments')): ?>
            <nav id="comment-nav-above">
                <h1><?php _e('Comment navigation', 'mcw-blue'); ?></h1>
                <div class="prev"><?php previous_comments_link( __('&larr; Older Comments', 'mcw-blue')); ?></div>
                <div class="next"><?php next_comments_link(__('Newer Comments &rarr;', 'mcw-blue')); ?></div>
            </nav>
        <?php endif;?>

        <ol>
            <?php
                wp_list_comments(array('callback' => function($comment, $args, $depth) { 
                    $GLOBALS['comment'] = $comment;
                ?>

                    <li>
                        <article id="comment-<?php comment_ID(); ?>">
                            <header>
                                <div class="vcard">
                                    <?php
                                        $avatar_size = 68;
                                        if($comment->comment_parent != '0') {
                                            $avatar_size = 39;
                                        }   
                                            
                                        echo get_avatar($comment, $avatar_size);

                                        printf(__('%1$s on %2$s <span class="says">said:</span>', 'mcw-blue'),
                                            sprintf('<span class="fn">%s</span>', get_comment_author_link()),
                                            sprintf('<a href="%1$s"><time pubdate datetime="%2$s">%3$s</time></a>',
                                                esc_url(get_comment_link( $comment->comment_ID)),
                                                get_comment_time('c'),
                                                sprintf(__('%1$s at %2$s', 'mcw-blue'), get_comment_date(), get_comment_time())
                                            )
                                        );
                                    ?>

                                    <?php edit_comment_link(__('Edit', 'mcw-blue' ), '<span class="edit">', '</span>'); ?>
                                </div>

                                <?php if($comment->comment_approved == '0'): ?>
                                    <em class="awaiting-moderation"><?php _e('Your comment is awaiting moderation.', 'mcw-blue'); ?></em>
                                <?php endif; ?>

                            </header>

                            <div class="content">
                                <?php comment_text(); ?>
                            </div>

                            <div class="reply">
                                <?php 
                                    comment_reply_link(array_merge($args, array(
                                        'reply_text' => __('Reply <span>&darr;</span>', 'mcw-blue'), 
                                        'depth' => $depth, 
                                        'max_depth' => $args['max_depth']
                                    )));
                                ?>
                            </div>
                        </article>
                    </li>

                <?php
                }));
            ?>
        </ol>

        <?php if(get_comment_pages_count() > 1 && get_option('page_comments')): ?>
            <nav id="comment-nav-below">
                <h1><?php _e('Comment navigation', 'mcw-blue'); ?></h1>
                <div class="prev"><?php previous_comments_link(__('&larr; Older Comments', 'mcw-blue')); ?></div>
                <div class="next"><?php next_comments_link(__('Newer Comments &rarr;', 'mcw-blue')); ?></div>
            </nav>
        <?php endif; ?>

    <?php
        elseif (!comments_open() && ! is_page() && post_type_supports(get_post_type(), 'comments')):
    ?>
        <p class="nocomments"><?php _e('Comments are closed.', 'mcw-blue'); ?></p>
    <?php endif; ?>

    <?php 
        
        $commenter = wp_get_current_commenter();
        $req = get_option( 'require_name_email' );
        $aria_req = ( $req ? " aria-required='true'" : '' );
        $required_text = sprintf( ' ' . __('Required fields are marked %s'), '<span class="required">*</span>' );
        $fields = array(
            'author' => '<p class="comment-form-author">' . '<label for="author">' . __( 'Name' ) . ($req ? '<span class="required">*</span>' : '') . '</label> ' . 
                        '<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '"' . $aria_req . '></p>',
            'email'  => '<p class="comment-form-email"><label for="email">' . __( 'Email' ) . ( $req ? '<span class="required">*</span>' : '' ) . '</label> ' . 
                        '<input id="email" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) . '"' . $aria_req . '></p>',
            'url'    => '<p class="comment-form-url"><label for="url">' . __( 'Website' ) . '</label>' .
                        '<input id="url" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) . '"></p>'
        );
      
        comment_form(array(
            'fields' => apply_filters('comment_form_default_fields', $fields),
            'comment_notes_before' => '',      
            'comment_notes_after' => '<p class="comment-notes">' . __( 'Your email address will not be published.' ) . ( $req ? $required_text : '' ) . '</p>'
        )); 

    ?>
</div>