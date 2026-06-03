// 全局变量
var deleteTimer = null;
var originalText = "";
var currentPosition = -1;

// 在文档加载完成后初始化事件
$(document).ready(function() {
    // 监听鼠标按下事件
    $axure('#u2').mousedown(function() {
        $axure.globalVariableProvider.setVariableValue('isMouseDown', true);
    });

    // 监听鼠标移动事件，更新currentX
    $(document).mousemove(function(e) {
        $axure.globalVariableProvider.setVariableValue('currentX', e.pageX);
    });

    // 监听鼠标进入A区域事件
    $axure('#u2').mouseenter(function() {
        if ($axure.globalVariableProvider.getVariableValue('isMouseDown') === true) {
            var enterX = $axure.globalVariableProvider.getVariableValue('currentX');
            $axure.globalVariableProvider.setVariableValue('enterX', enterX);
            
            // 记录原始文本
            originalText = $axure('#u12_input').val();
            currentPosition = -1;
            
            // 启动定时器
            if (deleteTimer) clearInterval(deleteTimer);
            deleteTimer = setInterval(function() {
                var currentX = $axure.globalVariableProvider.getVariableValue('currentX');
                var enterX = $axure.globalVariableProvider.getVariableValue('enterX');
                
                if (currentX < enterX) {
                    if (currentPosition < originalText.length - 1) {
                        currentPosition++;
                        $axure('#u12_input').val(originalText.substring(0, originalText.length - currentPosition - 1));
                    }
                } else {
                    if (currentPosition >= 0) {
                        currentPosition--;
                        $axure('#u12_input').val(originalText.substring(0, originalText.length - currentPosition - 1));
                    }
                }
            }, 100);
        }
    });

    // 监听鼠标松开事件
    $(document).mouseup(function() {
        $axure.globalVariableProvider.setVariableValue('isMouseDown', false);
        if (deleteTimer) {
            clearInterval(deleteTimer);
            deleteTimer = null;
        }
    });

    // 监听鼠标离开A区域事件
    $axure('#u2').mouseleave(function() {
        if (deleteTimer) {
            clearInterval(deleteTimer);
            deleteTimer = null;
        }
    });
}); 