
calculator.controller('contrCalc', function($scope, dataSeries, formData){
    $scope.data = dataSeries;
    $scope.formData = formData;
    $scope.save_data={};
    $scope.getLS = function(){

        var data = localStorage.getItem('data');
        if(data == null){

            return false;
        };
        var data = localStorage.getItem('data');
        var data = JSON.parse(data);
        return data;
    }
    if(!angular.isUndefined($scope.getLS().length_floor)) $scope.formData.val_length_f = $scope.getLS().length_floor;
    if(!angular.isUndefined($scope.getLS().width_floor)) $scope.formData.val_width_f = $scope.getLS().width_floor;
    if(!angular.isUndefined($scope.getLS().height_wall )) $scope.formData.val_height_w = $scope.getLS().height_wall;
    if(!angular.isUndefined($scope.getLS().width_wall1 )) $scope.formData.val_width_w1 = $scope.getLS().width_wall1;
    if(!angular.isUndefined($scope.getLS().width_wall2 )) $scope.formData.val_width_w2 = $scope.getLS().width_wall2;
    if(!angular.isUndefined($scope.getLS().width_wall3 )) $scope.formData.val_width_w3 = $scope.getLS().width_wall3;
    if(!angular.isUndefined($scope.getLS().width_wall4 )) $scope.formData.val_width_w4 = $scope.getLS().width_wall4;
    if(!angular.isUndefined(localStorage.getItem('pos') ) && localStorage.getItem('pos') != null) $scope.formData.pos = localStorage.getItem('pos');
    if(!angular.isUndefined($scope.getLS().floor_radio )) {
        $scope.formData.floor_radio_s = $scope.getLS().floor_radio;
        $scope.save_data.floor_radio = $scope.getLS().floor_radio;
    }
    if(!angular.isUndefined($scope.getLS().wall_radio )) { 
        
        $scope.formData.wall_radio_s = $scope.getLS().wall_radio;
        $scope.save_data.wall_radio = $scope.getLS().wall_radio;
    }
    if(!angular.isUndefined($scope.getLS().seam )){
        $scope.formData.seam_s = $scope.getLS().seam;  
        $scope.save_data.seam = $scope.getLS().seam;  
    } 

   
    if($scope.getLS().section != undefined) $scope.formData.id_section = $scope.getLS().section;

    $scope.select_LS = function(who,value){
        switch(who){
            case 'section' :
                if(value == $scope.formData.id_section){
                    return true; 
                }
                break;
            case 'wall' :
                if(value == $scope.formData.wall_radio_s){
                    return true; 
                    
                }
                break;
            case 'floor' :
                if(value == $scope.formData.floor_radio_s){
                    return true; 
                }
                break;
            case 'seam':
                if(value == $scope.formData.seam_s){
                    return true; 
                }
                break;
            default:
                return false;
        }
    }

    $scope.index_width = 1;
    $scope.step = [
        {
            id: 1,
            title: '"Сбор информации"'
        },
        {
            id: 2,
            title: '"Динамическое построение сеток"'
        },{
            id: 3,
            title: '"Ваш результат"'
        }
    ];


    $scope.sectionChange = function(){

        $scope.save_data.section = $scope.formData.id_section;
        $scope.wall_checked = false;
        $scope.floor_checked = false;
        $scope.save_data.seam=1.5;
        if($scope.wall()){
            $scope.save_data.wall_radio=1;
            $scope.wall_checked = true;
            if(!angular.isUndefined($scope.getLS().wall_checked)) $scope.wall_checked = $scope.getLS().wall_checked;


        }
        if($scope.floor()){
            $scope.save_data.floor_radio=1;
            $scope.floor_checked = true;
            if(!angular.isUndefined($scope.getLS().floor_checked)) $scope.floor_checked = $scope.getLS().floor_checked;
        }
    }


    $scope.wall = function(){
        if($scope.formData.id_section != ''){
            if($scope.data[$scope.formData.id_section].type_series == 0 || $scope.data[$scope.formData.id_section].type_series == 2 )return true;       
            return false;            
        }
    }
    $scope.floor = function(){
        if($scope.formData.id_section != false){
            if($scope.data[$scope.formData.id_section].type_series == 1 || $scope.data[$scope.formData.id_section].type_series == 2)return true;  
            return false;
        }
    }

    if(!angular.isUndefined($scope.getLS().floor_checked)) $scope.floor_checked = $scope.getLS().floor_checked; 
    if(!angular.isUndefined($scope.getLS().wall_checked )) $scope.wall_checked = $scope.getLS().wall_checked; 


    $scope.wall_radio = function(event){
        $scope.save_data.wall_radio = event.currentTarget.value;
    }
    $scope.floor_radio = function(event){
        $scope.save_data.floor_radio = event.currentTarget.value;
    }
    $scope.seam = function(event){
        $scope.save_data.seam = event.currentTarget.value;
    }

    $scope.valueS = function(event, who){
        if(who == 'valHW')$scope.save_data.height_wall = parseFloat(angular.element(event.currentTarget).next().html());
        if(who == 'valLF')$scope.save_data.length_floor = parseFloat(angular.element(event.currentTarget).next().html());
        if(who == 'valWF')$scope.save_data.width_floor = parseFloat(angular.element(event.currentTarget).next().html()); 
        if(who == 'valWW1')$scope.save_data.width_wall1 = parseFloat(angular.element(event.currentTarget).next().html());
    }


    $scope.next_step = function(){

        if($scope.formData.pos == 0){
            if($scope.formData.id_section === false){
                alert('Вы не выбрали секцию!');
                return;
            }
            if($scope.wall_checked != true && $scope.floor_checked != true){
                alert("Вы не выбрали назначение плитки!");
                return;
            }
            var arr = $('.ui-slider').toArray();

            for(i=0; i < arr.length; i++ ){

                var parent = angular.element(arr[i]).parent().parent().attr('ng-show');


                angular.element(arr[i]).parent().css('border','1px solid #3a4e7a');
                if( isNaN(angular.element(arr[i]).next().children().val()) && $scope[parent] == true) {
                    angular.element(arr[i]).parent().css('border','1px solid red');
                    alert("Вы пытаетесь ввести не числовое значение!");
                    return;
                }
                if(parseFloat(angular.element(arr[i]).next().children().val()) == 0 && $scope[parent] == true) {
                    angular.element(arr[i]).parent().css('border','1px solid red');
                    alert("Размер не может быть равен нулю");
                    return;
                }



                $scope.save_data[angular.element(arr[i]).attr('id').substr(7)] =  parseFloat(angular.element(arr[i]).next().children().val());
            }

            $scope.save_data.section = $scope.formData.id_section;
            $scope.save_data.wall_checked = $scope.wall_checked;
            $scope.save_data.floor_checked = $scope.floor_checked;
            
        }
        $scope.save_data.index_width = $scope.index_width;
        var json_data = JSON.stringify($scope.save_data);
        localStorage.setItem('data', json_data);
        if($scope.formData.pos == 0){
            $scope.step2();
        }
        $scope.formData.pos++;  
        localStorage.setItem('pos', $scope.formData.pos);
    }

    $scope.prev_step = function(){
        if($scope.formData.pos == 1){
            for( i = 0; i < 6; i++){
                angular.element("#" + $scope.list_id_show_map[i]).empty();
            }

        }
        $scope.formData.pos--;
        localStorage.setItem('pos', $scope.formData.pos);

        

    }
    $scope.max_count_width = function(){
        return !($scope.index_width < 4);
    };
    $scope.min_count_width = function(){
        return !($scope.index_width > 1);
    };

    $scope.delete_label = function(){
        if($scope.index_width>1){
            angular.element('#wall_list').children().eq($scope.index_width+1).remove();
            $scope.index_width--;
        }

    }

    $scope.add_label = function(){
        $scope.index_width++;
        var div = angular.element("<div class='label_slider'><div><h4>Ширина стены №"+ $scope.index_width       +"</h4></div>");

        var slide = angular.element("<div id='slider_width_wall"+ $scope.index_width +"'></div>");
        div.append(slide);
        function getIndex(index){
            this.index = index;
        }
        var Index = new getIndex($scope.index_width);
        var input_value = angular.element("<input id='value_width_wall"+ $scope.index_width +"' value='"+ $scope.formData['val_width_w' + $scope.index_width] +"'>");
        input_value.on('keyup', function(event){
            $(event.currentTarget).parent().prev().slider({
                min:0,
                step:0.1,
                value: $(event.currentTarget).val(),
                max: parseInt($(event.currentTarget).val()) * 2,
                slide: function(event,ui){
                    $("#value_width_wall" + $scope.index_width).val( ui.value);
                }
            });
        });    
        d = angular.element('<div></div>');
        input_value = d.append(input_value);
        div.append(input_value);
        angular.element('#wall_list').append(div);
        $('#slider_width_wall'+ $scope.index_width).slider({
            value:0,
            min:0,
            max:1000,
            step:0.1,
            v: $scope.index_width,
            slide: function(event,ui){
                $('#value_width_wall' + Index.index).val(ui.value);
//                alert($scope.index_width);
            }
        });

    }

    $scope.input_keyup = function(event, who){

        if(isNaN($(event.currentTarget).val())){
            $(event.currentTarget).css('border', '1px solid red');
            $(event.currentTarget).css('padding', '1px 0');
            $(event.currentTarget).css('outline', 'none');


            return;

        }
        else{
            $(event.currentTarget).css('border', '1px solid #3a4e7a');
        }
        $(event.currentTarget).parent().prev().slider({
            value:parseFloat($(event.currentTarget).val()),
            max: parseInt($(event.currentTarget).val()) * 2,
            slide: function(event,ui){

                $(who).val( ui.value);
            }
        });
    }
    $scope.destroy = function(){
        localStorage.removeItem('data');
        localStorage.removeItem('pos');

        window.location.reload();

    }    



    $scope.max = function(val){
        (val <= 0) ? val = 1000: val = val * 2;
        return val;
    }
    angular.element("#slider_width_wall1").slider({
        value: $scope.formData.val_width_w1,
        min:0,
        max: $scope.max($scope.formData.val_width_w1),
        step:0.1,
        slide: function(event,ui){
            $('#value_width_wall1').val(ui.value);
        }
    });
    angular.element("#slider_height_wall").slider({
        value: $scope.formData.val_height_w,
        min:0,
        max: $scope.max($scope.formData.val_height_w),
        step:0.1,
        slide: function(event,ui){
            $('#value_heigth_wall').val(ui.value);
        }
    });
    angular.element("#slider_length_floor").slider({
        value: $scope.formData.val_length_f,
        min:0,
        max: $scope.max($scope.formData.val_length_f),
        step:0.1,
        slide: function(event,ui){
            $('#value_length_floor').val(ui.value);
        }
    });
    angular.element("#slider_width_floor").slider({
        value: $scope.formData.val_width_f,
        min:0,
        max: $scope.max($scope.formData.val_width_f),
        step:0.1,
        slide: function(event,ui){
            $('#value_width_floor').val(ui.value);
        }
    });

    $scope.step2 = function(){
        if(!angular.isUndefined(localStorage.getItem('data'))){
            $scope.step2_data = JSON.parse(localStorage.getItem('data'));

            if($scope.step2_data.floor_checked == 1){
                $scope.show_map('f');
            }
            else{
                $scope.show_map('w');
            }
            //        $scope.carousel_list = function(){
            //            if()
            //        }; 


            $scope.counter_c = 0;

            $scope.left_carousel = function(){
                if($scope.counter_c > 0){
                    var counter  = parseInt(angular.element('.carousel_list > ul').css('left')) -152;
                    angular.element('.carousel_list > ul').css({
                        position:'relative',
                        left:parseInt(+154 + parseInt(angular.element('.carousel_list > ul').css('left'))) + 'px'
                    });
                    $scope.counter_c--; 
                }
            }
            $scope.right_carousel = function(){
                //        alert(angular.element('.carousel_list > ul').children().toArray().length);
                if($scope.counter_c < angular.element('.carousel_list > ul').children().toArray().length-4){
                    angular.element('.carousel_list > ul').css({
                        position:'relative',
                        left:parseInt(-154 + parseInt(angular.element('.carousel_list > ul').css('left'))) + 'px'
                    });
                    $scope.counter_c++;
                }    
            } 

            $scope.list_values = [$scope.step2_data.length_floor,$scope.step2_data.width_floor, $scope.step2_data.height_wall,$scope.step2_data.width_wall1,$scope.step2_data.width_wall2,$scope.step2_data.width_wall3,$scope.step2_data.width_wall4,];

            $scope.wah = [
                [$scope.step2_data.length_floor,$scope.step2_data.width_floor],
                [$scope.step2_data.height_wall,$scope.step2_data.width_wall1],
                [$scope.step2_data.height_wall,$scope.step2_data.width_wall2],
                [$scope.step2_data.height_wall,$scope.step2_data.width_wall3],
                [$scope.step2_data.height_wall,$scope.step2_data.width_wall4]

            ];

//            alert(angular.element('head').html());
            $scope.list_id_show_map = ['floor','wall1','wall2','wall3','wall4'];    
            for(i = 0; i < 5; i++){


                var parent = angular.element("#" + $scope.list_id_show_map[i]);
                var k_len = Math.ceil($scope.wah[i][0]/$scope.data[$scope.step2_data.section].height);
                var j_len = Math.ceil($scope.wah[i][1]/$scope.data[$scope.step2_data.section].width);
                parent.children(0).css('position', 'relative');
                
                
                if(( i < 1 && $scope.step2_data.floor_radio == 0) || ( i > 0 && $scope.step2_data.wall_radio == 0)){
                    var mas_class = ['map_y_d','map_label_d','axis_d', 'map_elem_d','map_x_d','eraser_d', 'map_label_d', 'axis_d'];
                    parent.append("<div><div class='" + mas_class[0] + "' ><div class='" + mas_class[1] + "'> Расположить плитку рядами </div><div class='" + mas_class[2] + "'></div></div><div  class='" + mas_class[3] + "'><div class='map_h'></div></div></div><div class='" + mas_class[4] + "'><div class='" + mas_class[5] + "'><div></div></div><div><div class='" + mas_class[6] +"'>Расположить плитку рядами</div><div class='" + mas_class[7] + "'> </div></div></div>");


                    

//                    alert('j_len - ' + j_len);
//                    alert('k_len - ' + k_len);
                    for(x = 0; x < j_len*2; x++){
                        parent.find('.map_x_d .axis_d').append('<div>X</div>');
                    }

                    for(y = 0; y < k_len*2; y++){
                        parent.find('.map_y_d .axis_d').append('<div>X</div>');
                    }

                    parent.find('.map_elem_d').css('width', ((j_len)*74) - ((j_len )* 10) + 10 + 'px');
//                    alert(angular.element('.map_elem_d').css('width', ((j_len)*74) - ((j_len )* 10) + 10 + 'px'));
//                    alert(((j_len)*74) - ((j_len )* 10) + 10 + 'px');
                    parent.find('.map_elem_d').css('margin-right','-50000px');
                    parent.find('.map_x_d').css('width', ((j_len+1)*74) - ((j_len )* 10)  - 13 + 'px');
                    parent.children(0).css('position', 'relative');

                    angular.element('head').find('style').append(' #'+ $scope.list_id_show_map[i] +' .map_h:after{width: '+ parseInt( 63.64 - ( ($scope.wah[i][1]%$scope.data[$scope.step2_data.section].width) * 100 / $scope.data[$scope.step2_data.section].width * 63.64 / 100  ))  +  'px' + '} #'+ $scope.list_id_show_map[i] + ' .map_h:before{ height: ' +  parseInt( 63.64 - ( ($scope.wah[i][0]%$scope.data[$scope.step2_data.section].height) * 100 / $scope.data[$scope.step2_data.section].height * 63.64 / 100  ))  +  'px' +'}');
//                    angular.element('head').find('style').append(' #'+ $scope.list_id_show_map[i] +' .map_h:after{width: '+ parseInt( 63.64 - ( ($scope.wah[i][1]%$scope.data[$scope.step2_data.section].width) * 100 / $scope.data[$scope.step2_data.section].width * 63.64 / 100  ))  +  'px' + '}');


                    for(j = 0; j < j_len * 2 + 1; j++){


                        var row = angular.element('<div>');

                        for(k = 0; k < k_len + 1; k++){
                            row.append("<div class='map_col_d'>");
                        }
                        row.addClass('map_rows_d');
                        parent.find('.map_elem_d').append(row);
                    }
                }
                else{
                    var mas_class = ['map_y_p','map_label_p','axis_p', 'map_elem_p','map_x_p','eraser_p', 'map_label_p', 'axis_p'];
//                    var mas_class = ['map_y_d','map_label_d','axis_d', 'map_elem_d','map_x_d','eraser_d', 'map_label_d', 'axis_d'];
                    parent.append("<div><div class='" + mas_class[0] + "' ><div class='" + mas_class[1] + "'> Расположить плитку рядами </div><div class='" + mas_class[2] + "'></div></div><div  class='" + mas_class[3] + "'><div class='map_h'></div></div></div><div class='" + mas_class[4] + "'><div class='" + mas_class[5] + "'><div></div></div><div><div class='" + mas_class[6] +"'>Расположить плитку рядами</div><div class='" + mas_class[7] + "'> </div></div></div>");
                
                     for(x = 0; x < j_len; x++){
                        parent.find('.map_x_p .axis_p').append('<div>X</div>');
                    }

                    for(y = 0; y < k_len; y++){
                        parent.find('.map_y_p .axis_p').append('<div>X</div>');
                    }
                    parent.find('.map_elem_p').css('width', ((j_len)*45) + 'px');
                    parent.find('.map_elem_p').css('margin-right','-50000px');
                    parent.find('.map_x_p').css('width', ((j_len)* 45)+ 60 + 'px');
                    

                    angular.element('head').find('style').append(' #'+ $scope.list_id_show_map[i] +' .map_h:after{width: '+ parseInt( 63.64 - ( ($scope.wah[i][1]%$scope.data[$scope.step2_data.section].width) * 100 / $scope.data[$scope.step2_data.section].width * 63.64 / 100  ))  +  'px' + '} #'+ $scope.list_id_show_map[i] + ' .map_h:before{ height: ' +  parseInt( 63.64 - ( ($scope.wah[i][0]%$scope.data[$scope.step2_data.section].height) * 100 / $scope.data[$scope.step2_data.section].height * 63.64 / 100  ))  +  'px' +'}');

                    for(j = 0; j < j_len; j++){


                        var row = angular.element('<div>');

                        for(k = 0; k < k_len; k++){
                            row.append("<div class='map_col_p'>");
                        }
                        row.addClass('map_rows_p');
                        parent.find('.map_elem_p').append(row);
                    }
                
                
                
                
                
                
                }
                


            }






        } 
    }
    //    if(localStorage.getItem('pos') == 1){
    //        
    //        $scope.step2_data = JSON.parse(localStorage.getItem('data'));
    //        $scope.carousel_list = $scope.step2_data.id_series; 
    //
    //        $scope.counter_c = 0;
    //
    //        $scope.left_carousel = function(){
    //            if($scope.counter_c > 0){
    //                var counter  = parseInt(angular.element('.carousel_list > ul').css('left')) -152;
    //                angular.element('.carousel_list > ul').css({
    //                    position:'relative',
    //                    left:parseInt(+154 + parseInt(angular.element('.carousel_list > ul').css('left'))) + 'px'
    //                });
    //                $scope.counter_c--; 
    //            }
    //        }
    //        $scope.right_carousel = function(){
    //            //        alert(angular.element('.carousel_list > ul').children().toArray().length);
    //            if($scope.counter_c < angular.element('.carousel_list > ul').children().toArray().length-4){
    //                angular.element('.carousel_list > ul').css({
    //                    position:'relative',
    //                    left:parseInt(-154 + parseInt(angular.element('.carousel_list > ul').css('left'))) + 'px'
    //                });
    //                $scope.counter_c++;
    //            }    
    //        }
    //    }

    $scope.show_map_v;
    $scope.show_map = function(v){
        $scope.counter_c = 0;
        angular.element('.carousel_list > ul').css({
            left:0
        });
        $scope.carousel_list = function(){
            if(v == 'f') return $scope.data[$scope.step2_data.section].tiles.floor;
            return $scope.data[$scope.step2_data.section].tiles.wall;
        }
        $scope.show_map_v = v;
        //        $scope.step2();
    }
    if(localStorage.getItem('pos') == 1){
        $scope.step2();
    }
});