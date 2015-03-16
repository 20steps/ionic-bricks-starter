window.app_config = {

    init: function (bricksKernel) {
        // Bricks General
        bricksKernel.setProperty('bricks.project.code', 'LCB');
        bricksKernel.setProperty('bricks.api.host', 'pages.pages.20steps.de');
        //bricksKernel.setProperty('bricks.api.host', '20steps.pages.20steps.localhost.com');
        //bricksKernel.setProperty('bricks.api.debug', true);

        // Control Brick
        bricksKernel.setProperty('bricks.basic.control.googleanalytics.ua', 'UA-1657614-2');
        bricksKernel.setProperty('bricks.basic.control.googleanalytics.ecommerce.enabled', true);

        // Custom settings
        bricksKernel.setProperty('bricks.custom.lc.schools.project.code', 'lcw');
        bricksKernel.setProperty('bricks.custom.lc.youtube.api.key', 'AIzaSyDXplmXBXHaHDreR9TSDIFM6tfYjsWVS94');
        bricksKernel.setProperty('bricks.custom.lc.youtube.channel.id', 'UCOMIufUHnWv2cVn4AR7g1Cw');
        bricksKernel.setProperty('bricks.custom.lc.youtube.playlist.id', 'PLzX2puFtyG3XgbxxvdGyNJVfHavHZne1l');
    }
};
