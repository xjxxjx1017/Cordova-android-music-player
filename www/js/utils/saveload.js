
// * namespace
var SaveLoad = SaveLoad || {};

// * class
SaveLoad.SaveLoadHtmlLocalStorage = function () {

    // * constructor
    var STORAGE = window["localStorage"];

    // * public methods
    return {
        save: save,
        load: load,
        clear: clear
    };

    function save( key, value ) {
        localStorage.setItem( key, value );
    }
    function load( key ) {
        return STORAGE.getItem( key );
    }
    function clear() {
        localStorage.clear();
    }
};

// * class
SaveLoad.InputFieldSaver = function ( _widgetId ) {

    // * Constructor
    var widget = $(_widgetId);
    var KEY_PREFIX = "xjx_latest_input_";
    var key = KEY_PREFIX + _widgetId;

    var saveload = new SaveLoad.SaveLoadHtmlLocalStorage();
    var latest_input = saveload.load(key);

    if ( latest_input != null ) {
        widget.val( latest_input );
    }

    function saveInput() {
        saveload.save( key, widget.val() );
    }

    widget.keyup( saveInput );

    return {};
};
