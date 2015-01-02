angular.module('starter.controllers', [])

.controller('DemoCtrl', function ($scope, $ionicPopup) {

    $scope.data = {
        selectedScene: 0,
        selectedSceneLabel: "会话"
    };

    $scope.scenes = [
        {
            label: "会话",
            value: 0
        },
        {
            label: "朋友圈",
            value: 1
        },
        {
            label: "收藏",
            value: 2
        }
    ];

    $scope.buttons = [
        {
            id: "send-text",
            label: "发送Text消息给微信"
        },
        {
            id: "send-photo",
            label: "发送Photo消息给微信"
        },
        {
            id: "send-link",
            label: "发送Link消息给微信"
        },
        {
            id: "send-music",
            label: "发送Music消息给微信"
        },
        {
            id: "send-video",
            label: "发送Video消息给微信"
        },
        {
            id: "send-app",
            label: "发送App消息给微信"
        },
        {
            id: "send-nongif",
            label: "发送非gif消息给微信"
        },
        {
            id: "send-gif",
            label: "发送gif消息给微信"
        },
        {
            id: "send-file",
            label: "发送文件消息给微信"
        },
        {
            id: "auth",
            label: "微信授权登录"
        },
        {
            id: "test-url",
            label: "测试URL长度"
        },
        {
            id: "open-profile",
            label: "打开Profile"
        },

        {
            id: "open-mp",
            label: "打开mp网页"
        },
        {
            id: "add-card",
            label: "添加单张卡券至卡包"
        },
        {
            id: "add-cards",
            label: "添加多张卡券至卡包"
        }
    ];

    $scope.$watch('data.selectedScene', function () {
        $scope.scenes.forEach(function (item) {
            if (item.value == $scope.data.selectedScene) {
                $scope.data.selectedSceneLabel = item.label;
            }
        });
    }, true);

    $scope.share = function (id) {
        var params = {
            scene: $scope.data.selectedScene
        };

        if (id == 'send-text') {
            params.text = "人文的东西并不是体现在你看得到的方面，它更多的体现在你看不到的那些方面，它会影响每一个功能，这才是最本质的。但是，对这点可能很多人没有思考过，以为人文的东西就是我们搞一个很小清新的图片什么的。”综合来看，人文的东西其实是贯穿整个产品的脉络，或者说是它的灵魂所在。";
        } else {
            params.message = {
                title: "[TEST]" + id,
                description: "[TEST]Sending from test application",
                thumb: "www/resources/res1thumb.png",
                mediaTagName: "TEST-TAG-001",
                messageExt: "这是第三方带的测试字段",
                messageAction: "<action>dotalist</action>",
                media: {}
            };

            switch (id) {
                case 'send-photo':
                params.message.thumb = "www/resources/res1thumb.png";
                params.message.media.type = Wechat.Type.IMAGE;
                params.message.media.image = "www/resources/res1.jpg";
                break;

                case 'send-link':
                params.message.thumb = "www/resources/res2.png";
                params.message.media.type = Wechat.Type.LINK;
                params.message.media.webpageUrl = "http://tech.qq.com/zt2012/tmtdecode/252.htm";
                break;

                case 'send-music':
                params.message.thumb = "www/resources/res3.jpg";
                params.message.media.type = Wechat.Type.MUSIC;
                params.message.media.musicUrl = "http://y.qq.com/i/song.html#p=7B22736F6E675F4E616D65223A22E4B880E697A0E68980E69C89222C22736F6E675F5761704C69766555524C223A22687474703A2F2F74736D7573696334382E74632E71712E636F6D2F586B30305156342F4141414130414141414E5430577532394D7A59344D7A63774D4C6735586A4C517747335A50676F47443864704151526643473444442F4E653765776B617A733D2F31303130333334372E6D34613F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D30222C22736F6E675F5769666955524C223A22687474703A2F2F73747265616D31342E71716D757369632E71712E636F6D2F33303130333334372E6D7033222C226E657454797065223A2277696669222C22736F6E675F416C62756D223A22E4B880E697A0E68980E69C89222C22736F6E675F4944223A3130333334372C22736F6E675F54797065223A312C22736F6E675F53696E676572223A22E5B494E581A5222C22736F6E675F576170446F776E4C6F616455524C223A22687474703A2F2F74736D757369633132382E74632E71712E636F6D2F586C464E4D313574414141416A41414141477A4C36445039536A457A525467304E7A38774E446E752B6473483833344843756B5041576B6D48316C4A434E626F4D34394E4E7A754450444A647A7A45304F513D3D2F33303130333334372E6D70333F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D3026616D703B73747265616D5F706F733D35227D";
                params.message.media.musicDataUrl = "http://stream20.qqmusic.qq.com/32464723.mp3";
                break;

                case 'send-video':
                params.message.thumb = "www/resources/res7.jpg";
                params.message.media.type = Wechat.Type.VIDEO;
                params.message.media.videoUrl = "http://v.youku.com/v_show/id_XNTUxNDY1NDY4.html";
                break;

                case 'send-app':
                params.message.thumb = "www/resources/res2.jpg";
                params.message.media.type = Wechat.Type.APP;
                params.message.media.extInfo = "<xml>extend info</xml>";
                params.message.media.url = "http://weixin.qq.com";
                break;

                case 'send-nongif':
                params.message.thumb = "www/resources/res5thumb.png";
                params.message.media.type = Wechat.Type.EMOTION;
                params.message.media.emotion = "www/resources/res5.jpg";
                break;

                case 'send-gif':
                params.message.thumb = "www/resources/res6thumb.png";
                params.message.media.type = Wechat.Type.EMOTION;
                params.message.media.emotion = "www/resources/res6.gif";
                break;

                case 'send-file':
                params.message.thumb = "www/resources/res2.jpg";
                params.message.media.type = Wechat.Type.FILE;
                params.message.media.file = "www/resources/iphone4.pdf";
                break;

                default:
                $ionicPopup.alert({
                    title: 'Not supported!',
                    template: 'Keep patient, young man.'
                });

                return ;
            }
        }

        Wechat.share(params, function () {
            alert("Success");
        }, function (reason) {
            alert("Failed: " + reason);
        });
    };
})

.controller('AboutCtrl', function($scope) {});
