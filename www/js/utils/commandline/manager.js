
// * Create CommandLine namespace
var CommandLine = CommandLine || {};

// * Add input to CommandLine
CommandLine.Manager = function ( _inputWidgetId, _displayWidgetId ) {

    // * Constructor
    var display = new CommandLine._Display( _displayWidgetId );
    var core = new CommandLine._Core( _defaultHandler );
    new CommandLine._Input( _inputWidgetId, runCommand );
    var countCmd = 0;

    // * Public methods
    return {
        define:core.setHandler,
        runCommand:runCommand,
        log:log,
        clear:display.clear
    };

    function log( str ) {
        display.addString( str );
    }

    function runCommand ( str ) {
        display.addString( "> " + countCmd++ + ": " + str );
        core.runCommand( str );
    }

    function _defaultHandler() {
        log( "Command not found. by CommandLine:Manager:_defaultHandler")
    }
};

/*
// Test:

var cmd = new CommandLine.Manager( "#xjx_input", "#xjx_display" );

// * define print
function printLine( str ) {
cmd.log( str );
}
cmd.define( "print", printLine );

// * define clear
cmd.define( "clear", function () {
cmd.clear();
} );

*/

