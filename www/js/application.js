
var Application = {
    initApplication: function () {
        new SaveLoad.InputFieldSaver( "#xjx_input" );
        var cmd = new CommandLine.Manager( "#xjx_input", "#xjx_display" );
        var cmdEx = new CommandLine.Extension( cmd );
        var musicList = [];
        // * ============================= basic ==================================

        // * Define clear screen
        cmd.define( "clear", function () {
            cmd.clear();
        } );

        cmd.define( "help", function () {
            cmd.log( " " );
            cmd.log( "^^^^^^^^^^^^^^^^" );
            cmd.log( "musiclist" );
            cmd.log( "musicplay id " );
            cmd.log( "musicstop" );
            cmd.log( "musicshuffle" );
            cmd.log( "musicinterval" );
            cmd.log( "pathscan path" );
            cmd.log( "pathclear" );
            cmd.log( "clear" );
            cmd.log( "help" );
            cmd.log( "start" );
            cmd.log( "HELP: vvvvvvvvvv" );
            cmd.log( " " );
        } );

        // * ============================= music player ==================================
        cmd.log( "Music player is ready.");
        // * Create music player
        var player = new MusicPlayer.Manager( cmd.log );
        // * Define musicplay
        cmd.define( "musicplay", musicplay );
        function musicplay() {
            cmd.log( "playing..... " + musicList[0] );
            player.playPause( arguments[0] - 1 );
        }
        // * Define musicstop
        cmd.define( "musicstop", musicstop );
        function musicstop() {
            cmd.log( "stop..... " + musicList[0] );
            player.stop();
        }
        // * Define musicshuffle
        cmd.define( "musicshuffle", musicshuffle );
        function musicshuffle() {
            cmd.log( "shuffle..... " );
            player.stop();
            player.shuffleList();
            musiclist();
        }
        // * Define musiclist
        cmd.define( "musiclist", musiclist );
        function musiclist() {
            player.showList();
        }
        // * Define musicinterval
        cmd.define( "musicinterval", musicinterval );
        function musicinterval() {
            player.setInterval( arguments[0] * 1000 || 0 );
        }

        // * ============================= storage ==================================

        // * Define pathclear
        cmd.define( "pathclear", function () {
            musicList = [];
            player.changeList( musicList );
        });

        // * Define pathscan
        cmd.define( "pathscan", function ( path ) {
            // * Scan SDcard for music
            cmd.log( "Scan >>START<<" );
            new ExternalStorageSdcardAccess( fileHandler, errorHandler ).scanPath( path );
            function fileHandler( fileEntry ) {
                console.log( fileEntry.name + " | " + fileEntry.toURL() );
                cmd.log( fileEntry.name + " | " + fileEntry.toURL() );
                musicList.push( fileEntry.fullPath );
            }
            function errorHandler( fileError ) {
                console.log( "Error: " + fileError.code );
                cmd.log( "Error: " + fileError.code );
            }
            setTimeout( function() {
                cmd.log( "Scan >>END<<" );
                player.changeList( musicList );
            }, 2 * 1000 );
        });

        cmd.define( "start", function ( ) {
            cmdEx.bindBtn( "#btn_a", "musicplay" );
            $("#btn_a").text( "PlayPause" );
            cmdEx.bindBtn( "#btn_b", "musicstop" );
            $("#btn_b").text( "Stop" );
            cmdEx.bindBtn( "#btn_c", "musicshuffle" );
            $("#btn_c").text( "Shuffle" );
            cmd.runCommand( "pathscan file:///storage/sdcard1/music/ACG" );
            setTimeout( function() {
                musiclist();
            }, 3 * 1000 );
        });

        function runDefault() {
            cmd.runCommand( "help" );
            cmd.log( 'Type "start" or "help".' );
            cmdEx.bindBtn( "#btn_a", "start" );
            $("#btn_a").text( "Start" );
            cmdEx.bindBtn( "#btn_b", "help" );
            $("#btn_b").text( "Help" );
            cmdEx.bindBtn( "#btn_c", " " );
            $("#btn_c").text( " " );
        }
        runDefault();
    }
};