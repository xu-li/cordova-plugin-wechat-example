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
            id: "check-installed",
            label: "是否安装了微信"
        },
        {
            id: "send-text",
            label: "发送Text消息给微信"
        },
        {
            id: "send-photo-local",
            label: "发送Photo消息给微信(本地图片)"
        },
        {
            id: "send-photo-remote",
            label: "发送Photo消息给微信(远程图片)"
        },
        {
            id: "send-link-thumb-local",
            label: "发送Link消息给微信(本地缩略图)"
        },
        {
            id: "send-link-thumb-remote",
            label: "发送Link消息给微信(远程缩略图)"
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

    $scope.handle = function (id) {
        share($scope.data.selectedScene, id);
    };
})

.controller('AboutCtrl', function($scope) {});
