var App = {
    isDeviceReady: false,
    isJQMReady: false,

    bootstrap: function () {
        var self = this;
        
        $(document).on("deviceready", function deviceReadyCallback() {
            $(document).off("deviceready", deviceReadyCallback);
            
            self.isDeviceReady = true;
            self.start();
        });
        
        $(document).on("mobileinit", function mobileInitCallback() {
            $(document).off("mobileinit", mobileInitCallback);
            
            self.isJQMReady = true;
            self.start();
        });
    },
    
    start: function () {
        if (!this.isDeviceReady || !this.isJQMReady) {
            return ;
        }
        
        this.bindFormEvents();
    },
    
    bindFormEvents: function () {
        $("#btnShare").click(function () {
            cordova.exec(function () {
                alert("Success");
            }, function (reason) {
                alert("Failed: " + reason);
            }, 'Weixin', 'share', [$("#demo").serializeObject()]);
        });
    }
};

App.bootstrap();

/**
 * @link http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
 */
(function($){
    $.fn.serializeObject = function(){

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);
