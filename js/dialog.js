let $loginBtn = $('#loginBtn'),
    $loginModal = $('#loginModal'),
    $loginModalBack = $('#loginModalBack'),
    $loginCloseBtn = $('#loginCloseBtn'),
    $window = $(window);


// 点击显示modal框,背景
$loginBtn.click(function(ev) {
    $loginModal.css("display", "block");
    $loginModalBack.css('display', 'block');
    $loginModal.css('opacity', '1');


    $loginModal.css({
        left: ($window.outerWidth() - $loginModal.outerWidth()) / 2,
        top: ($window.outerHeight() - $loginModal.outerHeight()) / 2
    })

});

$loginCloseBtn.click(function(ev) {
    // 只触发一次
    // 监听transitionend
    $loginModal.css("opacity", 0).one('transitionend', function(ev) {
        $loginModal.css({
            display: "none",
        });
        $loginModalBack.css("display", "none");
    });
});
let $modalHeader = $loginModal.find('.modal-header'),
    $document = $(document);

// 鼠标
// 让down中的this变为 modal，  因为接下来我们要操作的是整个模态框

let move = function(ev) {

    let $this = $(this);
    let curL = ev.pageX - this.startX + this.startL,
        curT = ev.pageY - this.startY + this.startT;

    // 边界判断
    let
        minL = 0,
        minT = 0,
        maxL = $window.outerWidth() - $this.outerWidth(),
        maxT = $window.outerHeight() - $this.outerHeight();
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
    console.log(curT, curL);
    $this.css({
        left: curL,
        top: curT
    });
}
let up = function(ev) {
    // 这里的this任然是modal
    $document.off('mousemove', this._move);
    $document.off('mouseup', this._up);
}
let down = function(ev) {

    // this是原生js的header
    // dom中的方法是modal-header
    // 最好让this变为整个modal；
    // down.bind($loginModal.get(0))
    let $this = $(this);
    // 将位置信息当做自定义属性
    this.startX = ev.pageX;
    this.startY = ev.pageY;
    this.startL = parseFloat($this.css('left'));
    this.startT = parseFloat($this.css('top'));

    // 确保move, up 方法中的this是 modal
    this._move = move.bind(this);
    this._up = up.bind(this);
    $document.on('mousemove', this._move);
    $document.on('mouseup', this._up);


}




$modalHeader.on('mousedown', down.bind($loginModal.get(0)));