window.app_translations = {

    init: function ($translateProvider) {

        $translateProvider

            // translations
            .translations('en', {
                BUTTON_CANCEL: "Cancel"
            })

            .translations('fr', {
                BUTTON_CANCEL: "Cancel.fr"
            })

            .translations('pt', {
                BUTTON_CANCEL: "Cancel.pt"
            })

            // available locales and mappings
            .registerAvailableLanguageKeys(['en', 'fr', 'pt'], {
                'en_US': 'en',
                'en_UK': 'en',
                'en_CA': 'en',
                'fr_CA': 'fr',
                'fr_BE': 'fr',
                'fr_CH': 'fr',
                'en_UK': 'en',
                'de_DE': 'en',
                'de_CH': 'en'
            })

            // get language from browser/device settings
            .determinePreferredLanguage()

            // if nothing matches use this fallback language
            .fallbackLanguage("pt");

    }
};
