requirejs(['ngI18next']);

module Application.Configuration {

    /**
     * @summary Persona internationalization configuration.
     * @author  Cyril Schumacher
     * @class
     */
    export class Internationalization {
        /**
         * @summary Constructor.
         * @param {any} $i18nextProvider i18next provider.
         */
        public constructor(private $i18nextProvider: any) {
            this._init($i18nextProvider);
        }

        /**
         * @summary Initialize i18next plugin.
         * @param {any} $i18nextProvider i18next provider.
         */
        private _init = ($i18nextProvider: any) => {
            $i18nextProvider.options = {
                debug: true,
                fallbackLng: 'dev',
                lng: 'dev',
                resGetPath: '/scripts/locales/__ns__-__lng__.json',
                useCookie: false,
                useLocalStorage: false
            };
        }
    }

    Internationalization.$inject = ['$i18nextProvider'];
}