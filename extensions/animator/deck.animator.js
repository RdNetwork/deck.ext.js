/*!
Deck JS - deck.animator
Copyright (c) 2011-2015 Remi BARRAQUAND, Rémy DELANAUX, Maxime PIA
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module provides a support for animated SVG to the deck so as to create 
animation like in most presentation solution e.g powerpoint, keynote, etc.
Slides can include elements which then can be animated using the Animator.
*/

(function($, deck, undefined) {
    var $d = $(document);
       
    /*
        jQuery.deck('Init')
        */
    $d.bind('deck.init', function() {
        var opts = $[deck]('getOptions');
        var container = $[deck]('getContainer');

		/* The animator name is stored in the slide using the data field in the HTML */
		
        /* Go through all slides */
		/*
        $.each($[deck]('getSlides'), function(i, $el) {
            var $slide = $[deck]('getSlide',i);
            
            if( $slide.has("[class='deckjs-animated-element']").length>0 ) {
                $slide.data('animator') = $slide.data('dahu-animator');
            } else {
				$slide.data('animator') = undefined;
			}
        });
		*/
		
		
    })
	
    /* Update current slide number with each change event */
    .bind('deck.change', function(e, from, to) {
        var opts = $[deck]('getOptions');
        var $slideTo = $[deck]('getSlide', to);
        var $container = $[deck]('getContainer');
	
        /* Restart the animator in the slide */
		console.log("Parcours de l'animator");
        if( eval($slideTo.data('dahu-animator')) !== undefined ) {
			console.log("Reset de l'animator");
            eval($slideTo.data('dahu-animator')).restart();
        }
        console.log("Passage à la suivante");
    })
    
	.bind('deck.beforeChange', function(e, from, to) {
		var $slide = $[deck]('getSlide', from);
		
		/*
		 * If the animations of the current slide are not complete,
		 * we keep on doing them and we don't go to the next slide.
		 */
		var animator = eval($slide.data('dahu-animator'));
		console.log("beforeChange : début");
		console.log(animator)
		if ( animator !== undefined && (! animator.isCompleted()) ) {
			console.log("beforeChange : on ne passe pas !");
			e.preventDefault();
			if ( animator.cursor == 0 ) {
				animator.restart();
			} else {
				animator.next();
			} 
		}
		console.log("beforeChange : fin");
	});
	
		
})(jQuery, 'deck');