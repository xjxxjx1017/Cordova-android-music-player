
// * Create CommandLine namespace
var MusicPlayer = MusicPlayer || {};

// * Add input to CommandLine
MusicPlayer.Manager = function ( _musicList, _logger ) {

    // * Constructer
    var musicList = [];
    var core = new MusicPlayer._Core( _logger, _onFinished );
    var curPlayingId = 0;
    var timeOut = 10 * 1000;
    var isPlayerRunning = false;
    _logger( "Checking file list..." );
    _musicList.forEach( function( n ) {
        if ( core.checkValid( n ) ){
            musicList.push( n );
        }
        else {
            _logger( "Inalid file: " + n );
        }
    } );
    core.stop();

    // * Public methods
    return {
        playPause:playPause,
        playNext:playNext,
        stop:stop,
        shuffleList:shuffleList,
        showList:showList,
        setInterval:setInterval
    };

    function playPause( _playId ) {
        var playId = _playId | curPlayingId;
        if ( playId >= musicList.length || playId < 0 )
            playId = curPlayingId;
        curPlayingId = playId;
        core.playPause( musicList[ playId ] );
        isPlayerRunning = true;
    }

    function playNext() {
        core.stop();
        curPlayingId++;
        if ( curPlayingId >= musicList.length )
            curPlayingId = 0;
        playPause( musicList[ curPlayingId ] );
        isPlayerRunning = true;
    }

    function stop() {
        core.stop();
        isPlayerRunning = false;
    }

    function shuffleList() {
        musicList = ThirdParty.shuffleArray( musicList );
    }

    function showList() {
        var count = 1;
        _logger( "Total: " + musicList.length );
        musicList.forEach( function(n, i) {
            var ss = i == curPlayingId ? "> " : "";
            ss += count++ + ": " + n;
            _logger( ss );
        });
    }

    function setInterval( interval ) {
        _logger( "Interval between musics has been set to " + interval * 0.001 + "s" );
        timeOut = interval;
    }

    function _onFinished() {
        // * Check whether it's manually paused.
        if ( isPlayerRunning )
        {
            setTimeout( playNext, timeOut );
            isPlayerRunning = false;
        }
    }
};

/*

// Test:
 var player = new MusicPlayer.Manager( musicList, cmd.log );
 player.playPause();

 */