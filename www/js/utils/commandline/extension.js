
// * Create CommandLine namespace
var CommandLine = CommandLine || {};

// * Add input to CommandLine
CommandLine.Extension = function ( _manager ) {

    // * Constructor
    var manager = _manager;

    // * Public methods
    return {
        bindBtn:bindBtn
    };

    function bindBtn( widgetId, cmd ) {
        $( widgetId).unbind();
        $( widgetId).click( _getBindFunction(cmd) );
    }

    function _getBindFunction( cmd ) {
        return function() {
            manager.runCommand(cmd);
        }
    }
};

/*// Test:

 function printXX() { console.log( "inputing..."); }
 var input = new CommandLine._Input( "#xjx_input", printXX );
 */