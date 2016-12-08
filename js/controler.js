
calculator.controller('contrCalc', function($scope, dataSeries){
    $scope.data = dataSeries;
    $scope.val_length_f = 0;
    $scope.val_width_f = 0;
    $scope.val_height_w = 0;
    $scope.val_width_w1 = 0;
    $scope.val_width_w2 = 0;
    $scope.val_width_w3 = 0;
    $scope.val_width_w4 = 0;
    $scope.floor_radio_s = 1;
    $scope.wall_radio_s = 1;
    $scope.seam_s = 1.5;

    $scope.id_section = false;
    $scope.getLS = function(){

        var data = localStorage.getItem('data');
        if(data == null){

            return false;
        };
        var data = localStorage.getItem('data');
        var data = JSON.parse(data);
        return data;
    }
    if($scope.getLS().length_floor != undefined) $scope.val_length_f = $scope.getLS().length_floor;
    if($scope.getLS().width_floor != undefined) $scope.val_width_f = $scope.getLS().width_floor;
    if($scope.getLS().height_wall != undefined) $scope.val_height_w = $scope.getLS().height_wall;
    if($scope.getLS().width_wall1 != undefined) $scope.val_width_w1 = $scope.getLS().width_wall1;
    if($scope.getLS().width_wall2 != undefined) $scope.val_width_w2 = $scope.getLS().width_wall2;
    if($scope.getLS().width_wall3 != undefined) $scope.val_width_w3 = $scope.getLS().width_wall3;
    if($scope.getLS().width_wall4 != undefined) $scope.val_width_w4 = $scope.getLS().width_wall4;
    if($scope.getLS().floor_radio != undefined) $scope.floor_radio_s = $scope.getLS().floor_radio;
    if($scope.getLS().wall_radio != undefined) { $scope.wall_radio_s = $scope.getLS().wall_radio;}

    if($scope.getLS().seam != undefined) $scope.seam_s = $scope.getLS().seam;



    if($scope.getLS().section != undefined) $scope.id_section = $scope.getLS().section;




    $scope.select_LS = function(who,value){

        if(who == 'section'){
            if(value == $scope.id_section){
                return true; 
            }
            else{
                return false;
            }
        }
        if(who == "wall"){

            if(value == $scope.wall_radio_s){


                return true;
            }
            else{

                return false;
            }
        }
        if(who == "floor"){
            if(value == $scope.floor_radio_s){


                return true;
            }
            else{
                return false;
            }
        }
        if(who == "seam"){

            if(value == $scope.seam_s){

                return true;
            }
            else{
                return false;
            }
        }



    }








    $scope.index_width = 1;
    $scope.pos = 0;
    $scope.start_step = [false, true, true];
    $scope.dad_step = [true, false, true];
    $scope.finish_step = [true, true, false];
    $scope.save_data={};

    $scope.save_data.seam=1.5;
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



        $scope.save_data.section = $scope.id_section;
        $scope.wall_checked = false;
        $scope.floor_checked = false;
        $scope.save_data.seam=1.5;
        if($scope.wall()){
            $scope.save_data.wall_radio=1;
            $scope.wall_checked = true;
            if($scope.getLS().wall_checked != undefined){
                if( $scope.getLS().wall_checked){
                    $scope.wall_checked = true;
                }
                else{
                    $scope.wall_checked = false;
                }
            }


        }

        if($scope.floor()){
            $scope.save_data.floor_radio=1;
            $scope.floor_checked = true;
            if($scope.getLS().floor_checked != undefined ){
                if($scope.getLS().floor_checked){
                    $scope.floor_checked = true;
                }
                else{
                    $scope.floor_checked = false;
                }
            }



        }
    }

    $scope.wall = function(){
        if($scope.id_section != ''){
            if($scope.data[$scope.id_section].type_series == 0 || $scope.data[$scope.id_section].type_series == 2 ){

                return true;    
            }
            else{

                return false;
            }
        }


    }
    $scope.floor = function(){
        if($scope.id_section != false){
            if($scope.data[$scope.id_section].type_series == 1 || $scope.data[$scope.id_section].type_series == 2 ){


                return true;    
            }
            else{

                return false;
            }
        }

    }




    if($scope.getLS().floor_checked != undefined) $scope.floor_checked = $scope.getLS().floor_checked; 
    if($scope.getLS().wall_checked != undefined) $scope.wall_checked = $scope.getLS().wall_checked; 




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

        if($scope.pos == 0){
            if($scope.id_section == false){
                alert('Вы не выбрали секцию!');
                return;
            }
            if($scope.wall_checked != true && $scope.floor_checked != true){
                alert("Вы не выбрали назначение плитки!");
                return;
            }




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

        $scope.save_data.section = $scope.id_section;
        $scope.save_data.wall_checked = $scope.wall_checked;
        $scope.save_data.floor_checked = $scope.floor_checked;
        $scope.save_data.my_pos = $scope.pos;
        var json_data = JSON.stringify($scope.save_data);
        localStorage.setItem('data', json_data);
        $scope.pos++;   

    }

    $scope.prev_step = function(){
        $scope.pos--;   

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

        var input_value = angular.element("<input id='value_width_wall"+ $scope.index_width +"' value='"+ $scope['val_width_w' + $scope.index_width] +"'>");
        input_value.on('keyup', function(event){
            $(event.currentTarget).parent().prev().slider({
                min:0,
                step:0.1,
                value: $(event.currentTarget).val(),
                max: parseInt($(event.currentTarget).val()) * 2,
                slide: function(event,ui){

                    $(event.currentTarget).next().children(0).val( ui.value);
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
            slide: function(event,ui){
                $('#value_width_wall' + $scope.index_width).val(ui.value);
            }
        });

    }













    $scope.input_keyup = function(event){


        if(isNaN($(event.currentTarget).val())){
            $(event.currentTarget).css('border', '1px solid red')


            return;

        }
        else{
            $(event.currentTarget).css('border', '1px solid #3a4e7a');
        }
        $(event.currentTarget).parent().prev().slider({
            value:parseFloat($(event.currentTarget).val()),
            max: parseInt($(event.currentTarget).val()) * 2,
            slide: function(event,ui){
                $(event.currentTarget).next().children(0).val( ui.value);
            }
        });
    }
    $scope.destroy = function(){
        localStorage.removeItem('data');

        window.location.reload();

    }    

});