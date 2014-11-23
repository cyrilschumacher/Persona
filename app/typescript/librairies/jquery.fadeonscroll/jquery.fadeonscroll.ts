define(['jquery'], $ => {
    /**
     * @summary Apply an opacity on the content of an element after exceeding a limit.
     * @param {number} percentage   Percentage to which the animation is running.
     * @param {Object} options      Options.
     */
    $.fn.fadeOnScroll = function(percentage: number, options: Object) {
        var settings = $.extend({
            /**
             * @summary Opacity minimum.
             */
            opacityMin: 0,
            
            /**
             * @summary Opacity maximum.
             */
            opacityMax: 1,
            
            /**
             * @summary Element which will be used to apply the opacity.
             */
            element: this.find('*')
        }, options);
        
        // Opacity value by default.
        var opacity: number = settings.opacityMax;

        // Obtains the position of scroll and
        // computes the position compared to position of scroll.
        var scrollPosition: number = $(window).scrollTop();
        var positionByScroll: number = (this.height() * percentage) / 100;

        // If the position of scroll exceeds the position, we update the opacity.
        if (scrollPosition >= positionByScroll) {
            opacity = 1 - ((scrollPosition - positionByScroll) / positionByScroll);
        }

        // Checks if it doesn't exceeds the minimum and maximum opacity value.
        opacity = Math.min(Math.max(opacity, settings.opacityMin), settings.opacityMax);
        // Sets the opacity.
        settings.element.css('opacity', opacity);
    }
});