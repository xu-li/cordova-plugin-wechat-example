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
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
