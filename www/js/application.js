
var Application = {
    initApplication: function () {
        new SaveLoad.InputFieldSaver( "#xjx_input" );

        var cmd = new CommandLine.Manager( "#xjx_input", "#xjx_display" );

        // * define print
        cmd.define( "print", printLine );
        function printLine( str ) {
            cmd.log( str );
        }

        // * define clear
        cmd.define( "clear", function () {
            cmd.clear();
        } );

        // * Create list for music
        var musicList = [];
        // * Scan SDcard for music
        new ExternalStorageSdcardAccess( fileHandler, errorHandler ).scanPath( "file:///storage/sdcard1/music/ACG" );
        function fileHandler( fileEntry ) {
            console.log( fileEntry.name + " | " + fileEntry.toURL() );
            cmd.log( fileEntry.name + " | " + fileEntry.toURL() );
            musicList.push( fileEntry.fullPath );
        }
        function errorHandler( fileError ) {
            console.log( "Error: " + fileError.code );
            cmd.log( "Error: " + fileError.code );
        }

        setTimeout( defineMusic, 2 * 1000 );

        function defineMusic() {
            // * Create music player
            var player = new MusicPlayer.Manager( musicList, cmd.log );
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
                player.shuffleList();
            }
            // * Define musiclist
            cmd.define( "musiclist", musiclist );
            function musiclist() {
                cmd.clear();
                player.showList();
            }
            // * Define musicinterval
            cmd.define( "musicinterval", musicinterval );
            function musicinterval() {
                player.setInterval( arguments[0] * 1000 || 0 );
            }
        }
    }
};