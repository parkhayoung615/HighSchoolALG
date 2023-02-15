console.clear();

// 기존 버튼형 슬라이더
$('.slider-1 > .page-btns > div').click(function () {
    var $this = $(this);
    var index = $this.index();

    $this.addClass('active');
    $this.siblings('.active').removeClass('active');

    var $slider = $this.parent().parent();

    var $current = $slider.find(' > .slides > div.active');

    var $post = $slider.find(' > .slides > div').eq(index);

    $current.removeClass('active');
    $post.addClass('active');
});

// 좌/우 버튼 추가 슬라이더
$('.slider-1 > .side-btns > div').click(function () {
    var $this = $(this);
    var $slider = $this.closest('.slider-1');

    var index = $this.index();
    var isLeft = index == 0;

    var $current = $slider.find(' > .page-btns > div.active');
    var $post;

    if (isLeft) {
        $post = $current.prev();
    }
    else {
        $post = $current.next();
    };

    if ($post.length == 0) {
        if (isLeft) {
            $post = $slider.find(' > .page-btns > div:last-child');
        }
        else {
            $post = $slider.find(' > .page-btns > div:first-child');
        }
    };

    $post.click();
});

setInterval(function () {
    $('.slider-1 > .side-btns > div').eq(1).click();
}, 3000000);





let textInput = document.querySelector('.textInput');

let lengthWOblank = document.querySelector('.lengthWOblank');
let lengthWblank = document.querySelector('.lengthWblank');

$(document).ready(function () {
    // 글자수세기(공백포함)
    lengthWblank.innerHTML = `${textInput.value.length} 자 / ${byteCounter(textInput.value, 1)} Byte`;

    // 글자수세기(공백미포함)
    // 공백과 줄바꿈을 제외해야 합니다. 이때 정규식을 사용합니다. 
    // \s 는 줄바꿈, 공백 또는 탭과 같은 글자가 포함되어 있지 않은 문자를 말합니다.
    // + 는 1개 이상의 것을 의미합니다. 글자가 2개 연속있거나, 줄바꿈이 3개 연속있거나 하는 것들을 모두 가리킵니다.
    // g 는 global 을 의미하고, textInput.value에 있는 모든 \s+ 를 말합니다.
    // 즉, /\s+/g를 ""로 replace 해줍니다.
    // Byte세기는 위와 같이 함수를 정의하여 사용할 겁니다.

    // lengthWOblank.innerHTML = `${textInput.value.replace(/\s+/g, "").length} 자 / ${byteCounter(textInput.value.replace(/\s+/g, ""), 0)} Byte`;

})




function byteCounter(text, blank = 0) {
    // blank === 0 -> 공백 미포함  ,  blank !== 1 -> 공백 포함
    let byte = 0;
    // byte 를 0으로 두고, 한글자씩 체크하면서 한자 한문 한글이면 2를 올려주고, 그 외는 1을 올려주겠습니다.
    if (blank == 0) {
        // 공백 미포함일 때는, 미리 줄바꿈과 공백을 빈칸으로 처리합니다.
        text = text.replace(/\s+/g, "");
    }

    for (let i = 0; i < text.length; i++) {
        // 정규식.test() 함수는 인수가 정규식을 만족하는지 판단하여 true or false 값을 반환합니다.
        // 한글표현 정규식 : ㄱ-ㅎㅏ-ㅣ가-힣
        // 한자표현 정규식 : 一-龥
        // 일본어표현 정규식 : ぁ-ゔァ-ヴー々〆〤
        // 이 모든것을 /[]/ 안에 포함시켜서 연달아 써주면 "or" 처리됩니다.
        // 한, 중, 일 언어라면, byte를 2 더해주고, 아니라면 1을 더해주고, 최종적으로 byte를 return 합니다.
        if (/[ㄱ-ㅎㅏ-ㅣ가-힣一-龥ぁ-ゔァ-ヴー々〆〤]/.test(text[i])) {
            byte = byte + 2
        } else {
            byte++
        }
    }
    return byte
}



$(function () {
    $('.tabcontent > div').hide();
    
    $('.tabnav a').click(function () {
        $('.tabcontent > div').hide().filter(this.hash).fadeIn();
        $('.tabnav a').removeClass('active');
        $(this).addClass('active');
        return false;
    }).filter(':eq(0)').click();
});