<?php 

add_action( 'wp_enqueue_scripts', 'getLinks');

function getLinks() {
    wp_enqueue_style( 'style', get_template_directory_uri() . '/assets/css/style.css' );
    wp_enqueue_style( 'normalize', get_template_directory_uri() . '/assets/css/normalize.css' ); 

    //wp_enqueue_script( 'nav_script', get_template_directory_uri() . '/assets/js/nav_script.js' );
}

add_theme_support('post-thumbnails');
add_theme_support('title-tag');
add_theme_support('custom-logo');

?>