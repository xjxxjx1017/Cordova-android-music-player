
// * Namespace
var MusicPlayer = MusicPlayer || {};

MusicPlayer.EXTENSIONS = ['.mp3', '.wav', '.m4a'];

// * Class
MusicPlayer._Core = function( _logger, _onFinishedCallback ) {

    // * Constructor
    var media;
    var isPlaying = false;
    var logger = _logger || _defaultLogger;
    var onFinishedCallback = _onFinishedCallback;

    // * Public methods
    return {
        playPause:playPause,
        stop:stop,
        checkValid:checkValid
    };

    function playPause( path ) {
        if (media == null)
            _initMedia(path);

        if (isPlaying == false) {
            logger( "MusicPlayer: play... " + path );
            media.play();
            // * Might be useful later:
            // mediaTimer = setInterval( func, interval );
            // clearInterval( mediaTimer );
        }
        else {
            logger( "MusicPlayer: pause..." );
            media.pause();
        }
        isPlaying = !isPlaying;
    }

    function stop() {
        if (media != null) {
            logger( "MusicPlayer: stop..." );
            media.stop();
            media.release();
        }
        media = null;
        isPlaying = false;
    }

    function checkValid( fileName ) {
       return _hasExtension( fileName, MusicPlayer.EXTENSIONS );
    }

    function _initMedia( path ) {
        logger( "MusicPlayer: init..." );
        media = new Media( path, _onInitMediaSuccess, _onInitMediaError, _onStatusChanged );
    }

    function _hasExtension(fileName, exts) {
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }

    function _onInitMediaSuccess() {
        logger( "MusicPlayer: init successed..." );
        if (media != null)
            media.release();
    }

    function _onStatusChanged( status ) {
        if ( status == Media.MEDIA_STOPPED ) {
            onFinishedCallback();
        }
    }

    function _onInitMediaError( error ) {
        logger( 'Unable to read the media file. Error: ' + error.code );
    }

    function _defaultLogger( s ) {
        console.log( s );
    }

};

/*
    // Test:
    musicList = [ "somepath2mp3" ];
    cmd.log( "playing..... " + musicList[0] );
    var player = new MusicPlayer._Core( musicList, cmd.log );
    player.playPause();
 */