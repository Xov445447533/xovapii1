(function($) { 
    $.fn.glitch = function(options) {
        const defaults = {
            chars: '!<>-_\\/[]{}—=+*^?#________',
            charTime: 50,
            finalText: undefined,
            done: function() {
                console.log('done!');
            }
        };
        let settings = $.extend({}, defaults, options),
            $element = $(this),
            originalText = $element.text(),
            scrambledText = '';

        function randomChar() {
            return settings.chars[Math.floor(Math.random() * settings.chars.length)];
        }

        function scrambleText(text, index, char) {
            if (index > text.length - 1) return text;
            return text.substr(0, index) + char + text.substr(index + 1);
        }

        function scramble(index) {
            let deferred = $.Deferred(),
                delay = Math.floor(Math.random() * (1000 - 100) + 100),
                interval = Math.floor(Math.random() * settings.charTime);

            let intervalId = setInterval(function() {
                if (interval <= 0) {
                    clearInterval(intervalId);
                    deferred.resolve();
                    $element.text(scrambleText($element.text(), index, settings.finalText.charAt(index)));
                } else {
                    $element.text(scrambleText($element.text(), index, randomChar()));
                    interval--;
                }
            }, delay);

            return deferred.promise();
        }

        $element.text(new Array(originalText.length + 1).join(''));

        let promises = [];
        for (let i = 0; i < originalText.length; i++) {
            promises.push(scramble(i));
        }

        $.when.apply($, promises).then(function() {
            settings.done($element);
        });

        return this;
    };
})(jQuery);

$('#header').glitch({ charTime: 60 });