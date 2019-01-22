
//-------------------------
//aタグ無効
//-------------------------
/*
    $(document).on('click', '#menu a', function(event) {
      return false;
    });
    $(document).on('click', '#workMenu a', function(event) {
      return false;
    });
    */



/*

スタートを押して200秒立つまでは80秒かけて100%になる。
200秒経過後は60秒かけて100%になる

*/

$(document).ready(function() {
    var counters = [];
    $('.meterArea').each(function(i){
        var _self = $(this);
        var _idx = i;
        var mw = 500;
        var options = {
          "maxWidth": mw,
          "nowWidth": _self.children(".meter").data("width"),
          "countMax": 80,
          "thisCount": _self.children(".meter").text(),
          "addWidth": mw/100,
          "addtime": 0,
          "nowtime": 0,
          "countTimer": ""
        };
        counters.push(options);

        $(this).children(".btn").click(function(){
            $(this).toggleClass("stopcss");
            //一時停止
            if(_self.children(".btn").hasClass("active")){
                clearInterval(counters[_idx].countTimer);
                _self.children(".btn").removeClass("active");
            }else{
                timer(_self.children(".meter"),_idx);
                _self.children(".btn").addClass("active");
            }
        });

    });

    //タイマー処理
    function timer(obj,idx){


            counters[idx].countTimer = setInterval(function(){
              var p = counters[idx];
                var totalTime =  parseFloat($(".totalCount").text());

                //1秒当たりの上がり幅を%で算出
                if($(".startCount").text() <= 200){
                    p.addtime = 100/80;

                        
                    
                }else{
                    p.addtime = 100/60;

                }
                


                p.nowtime = p.nowtime + p.addtime;
                if(p.nowtime >= 100){ p.nowtime = 100; }
                obj.text(p.nowtime.toFixed(2)+"%")
                
                p.nowWidth = Math.floor(p.nowtime) * p.addWidth;
                obj.css({width:p.nowWidth});
                obj.data("width",p.nowWidth);


                //累計時間計算
                totalTime = totalTime + p.addtime;
                $(".totalCount").text(totalTime.toFixed(2)+"%");

                //指定値に到達したら終了
                if(p.nowtime >= 100){
                    clearInterval(p.countTimer);
                    obj.addClass("end");
                    obj.parents().children(".btn").remove();
                    

                    
                }
            },1000);
    }

    var countTimer2="";
    $(".start").click(function(){
      $(".btn").toggleClass("btnnone");//一時停止中はボタンを非表示
      if(!$(this).hasClass("first")){//停止中のCSS付与
          $(this).toggleClass("stopcss");
      }
        
      if(countTimer2){
        clearInterval(countTimer2);
        countTimer2="";

        // 稼働中だったものを全停止
        $('.meterArea').each(function(i){
          clearInterval(counters[i].countTimer)
        });
          
          $(this).text("ReStart");

      }else{
        startTimer($(".startCount"));
          $(this).text("stop");

        // 稼働中だったものの再スタート
        $('.meterArea').each(function(i){
            if(counters[i].nowtime!=0 && $(this).children(".btn").hasClass("active") && !$(this).children(".meter").hasClass("end")){
            timer($(this).children(".meter"),i);
          }
        });
      }
    });
    function startTimer(obj){

        var thisCount = obj.text(),
            countMax = 1000;



        countTimer2 = setInterval(function(){
            var totalTime = 0;
            var countNext = thisCount++;
            obj.text(countNext);
            
            if(countNext >= 10){
                $(".speedup").addClass("speedup_visible");
            }
            
            
            //累計時間計算
            /*$('.meterArea').each(function(i){
                totalTime = totalTime + counters[i].nowtime;
            });
            $(".totalCount").text(Math.floor(totalTime,1)+"%");*/

            //指定値に到達したら終了
            if(countNext >= countMax){
                clearInterval(countTimer);
            }

        },1000);
    }
    
    //起動時はボタンのみ表示、スタート後コンテンツ表示
    $(".start").one("click", function(){
        $(".visibleArea").css("display","block");
        $(this).text("stop");
        $(this).removeClass("first");
        
    });


});
