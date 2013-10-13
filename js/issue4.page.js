/**
 * @param {String}
 *            title
 * @returns {Presentation}
 */
function Presentation(title) {
    this._title = title;
    this._slides = [];
    this._index = -1;
    this._$place = undefined;
    this._$visibleBuffer = undefined;
    this._$hiddenBuffer = undefined;
    this._$control = undefined;
    this._$navigation = undefined;
    this._$next = undefined;
    this._$prev = undefined;
    this._isBusy = false;
    this._fadeOut = 700;
    this._fadeIn = 700;
}

Presentation.prototype._populateNavigation = function() {
    var that = this;
    var templateItem = $('#l-template-nav-item').html();
    for ( var i = 0; i < that._slides.length; i++) {
        var slide = that._slides[i];
        $(templateItem.replace('TITLE', slide.title).replace('INDEX', i)).appendTo(that._$navigation);
    }
};

Presentation.prototype.attach = function(placeDom) {
    var that = this;
    that._$place = $(placeDom);
    that._$place.html($('#l-template-presentation').clone().html());

    that._$visibleBuffer = $('.l-screen-1', that._$place);
    that._$hiddenBuffer = $('.l-screen-2', that._$place);
    that._$control = $('.l-control', that._$place);
    that._$currentIndex = $('.l-current', that._$place);
    that._$navigation = $('.l-navigation', that._$place);
    that._$navigation.on('click', '.l-nav-item', function(e) {
        that.setIndex($(this).attr('index'));
    });
    that._$next = $('.l-next', that._$place).on('click', function() {
        that.next();
    });
    that._$prev = $('.l-prev', that._$place).on('click', function() {
        that.prev();
    });
    that._populateNavigation();
    that.setIndex(0);
    return that;
};

Presentation.prototype.getTitle = function() {
    return this._title;
};

Presentation.prototype.getIndex = function() {
    return this._index;
};

Presentation.prototype.getSlide = function(index) {
    return this._slides[index];
};

Presentation.prototype.setIndex = function(index) {
    var that = this;
    if (that._isBusy){
        return that;
    }
    if (index >= that._slides.length) {
        index = that._slides.length - 1;
    }
    if (index < 0) {
        index = 0;
    }
    if (that._index == index) {
        return that;
    }
    that._index = index;
    that._$hiddenBuffer.html(that._slides[index].$dom.html());
    that._$currentIndex.text(index);
    that.update();
    return that;
};

Presentation.prototype.update = function() {
    var that = this;
    that._isBusy = true;
    that._$visibleBuffer.stop().fadeOut(that._fadeOut, function() {
        that._$hiddenBuffer.fadeIn(that._fadeIn, function() {
            that._isBusy = false;
            var $currentVisible = that._$visibleBuffer;
            that._$visibleBuffer = that._$hiddenBuffer;
            that._$hiddenBuffer = $currentVisible;
        });
    });
    return that;
};

Presentation.prototype.next = function() {
    return this.setIndex(this.getIndex() + 1);
};

Presentation.prototype.prev = function() {
    return this.setIndex(this.getIndex() - 1);
};

Presentation.prototype.addSlide = function(title, dom) {
    this._slides.push({
        title : title,
        $dom : $(dom)
    });
    return this;
};

function PresentationFactory() {
}

/**
 * @param $dom
 * @return {Presentation}
 */
PresentationFactory.prototype.parse = function(dom) {
    var $dom = $(dom);
    var $title = $('>h1', $dom);
    var result = new Presentation($title.text());
    var $slides = $('>ul', $dom).children();
    $slides.each(function() {
        result.addSlide($('>h2', this).text(), $('>div', this));
    });
    return result;
};

$(function() {
    console.log('Run 4');
    var $presentations = $('.l-presentations');
    var presentationFactory = new PresentationFactory();
    $presentations.children().each(function() {
        presentationFactory.parse(this).attach($('<div/>').appendTo(document.body));
    });
});