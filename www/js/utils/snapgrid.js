var SnapGrid = function () {

    // * need initialization
    var $container;
    var $box;
    var $snap_grid;
    var gridRows;
    var gridColumns;

    // * internal
    var containerPaddingPct = 0.2;
    var gridPaddingPct = 0.5;
    var fullPct = 100;
    var gridWidthPct;
    var gridHeightPct;
    var gridWidth;
    var gridHeight;
    var gridPaddingX;
    var gridPaddingY;
    var i, x, y;

    // * Public functions and properties
    return {
        initialize: function ( countRow, countColumn, nameContainer, nameDraggable, classNameGeneratedGrids ) {
            gridRows = countRow;
            gridColumns = countColumn;
            $container = $( nameContainer );
            $box = $( nameDraggable );
            $snap_grid = $( classNameGeneratedGrids );
            // * Initialize
            _updateWindowSizeParam();
            _createGrids();
            _initializeBox();
            _initialDraggable();
            _applySnap();
            _makeContainerASquare();
            $(window).on("resize", _applySnap);
        }
    };


    function _makeContainerASquare() {
        var c = $($container[0]);
        var w = $container[0].scrollWidth;
        var h = $container[0].scrollHeight;
        var r = h;//w > h ? h : w;
        var wPct = r / c.parent().width() * 100;
        c.width( wPct + "%" );
        //var hPct = r / c.parent().height() * 100;
        //c.height( hPct + "%" );
    }

    function _updateWindowSizeParam() {
        _makeContainerASquare();
        gridWidthPct = ( fullPct - containerPaddingPct * 2 ) / gridColumns - containerPaddingPct;
        gridHeightPct = ( fullPct - containerPaddingPct * 2 ) / gridRows - containerPaddingPct;
        gridWidth = $container[0].scrollWidth * gridWidthPct * 0.01;
        gridHeight = $container[0].scrollHeight * gridHeightPct * 0.01;
        gridPaddingX = $container[0].scrollWidth * gridPaddingPct * 0.01;
        gridPaddingY = $container[0].scrollHeight * gridPaddingPct * 0.01;
    }

    function _createGrids() {
        //loop through and create the grid (a div for each cell). Feel free to tweak the variables above
        for (i = 0; i < gridRows * gridColumns; i++) {
            x = containerPaddingPct + Math.floor(i % gridColumns) * gridWidthPct;
            y = containerPaddingPct + Math.floor(i / gridColumns) * gridHeightPct;
            $("<div class=" + $snap_grid + "/>").css({
                position: "absolute",
                border: "1px solid #454545",
                width: ( gridWidthPct - gridPaddingPct * 2 ) + '%',
                height: ( gridHeightPct - gridPaddingPct * 2 ) + '%',
                left: (x + gridPaddingPct) + '%',
                top: (y + gridPaddingPct) + '%'
            }).prependTo($container);
        }
    }

    //ensure that the box widths/heights reflect the variables above
    function _initializeBox() {
        TweenLite.set( $box, {
            width: gridWidthPct + '%',
            height: gridHeightPct + '%'
        });
    }

    //the update() function is what creates the Draggable according to the options selected (snapping).
    function _initialDraggable() {
        Draggable.create( $box, {
            bounds: $container,
            type: "x,y",
            onDragEnd: _applySnap
        });
    }

    function _applySnap() {
        _updateWindowSizeParam();
        $box.each(function (index, element) {
            TweenLite.to(element, 0.5, {
                x: ( Math.round(element._gsTransform.x / gridWidth) * gridWidth + gridPaddingX),
                y: ( Math.round(element._gsTransform.y / gridHeight) * gridHeight + gridPaddingY),
                delay: 0.1,
                ease: Power2.easeInOut
            });
        });
    }
};