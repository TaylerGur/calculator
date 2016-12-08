
calculator.controller('contrCalc', function($scope, dataSeries){
    
    $scope.getLS = function(){
      
        var data = localStorage.getItem('data');
          if(data == null){
              return false;
          };
        var data = localStorage.getItem('data');
        var data = JSON.parse(data);
        return data;
    }
//    alert($scope.getLS());
//    $scope.onload = function(){
//        if($scope.getLS() != false){
//                alert("dd");
//
//        $scope.id_section = $scope.getLS.section;
//        arr_option = $('option').toArray();
//        alert($(arr_option[2]).attr(''));
//        $(arr_option[2]).attr('selected','selected');
//    
//    }
//    };
    $scope.data = dataSeries;

    $scope.index_width = 1;
    $scope.pos = 0;
    $scope.start_step = [false, true, true];
    $scope.dad_step = [true, false, true];
    $scope.finish_step = [true, true, false];
    $scope.save_data={};
    $scope.id_section = false;
//    $scope.id_section = $scope.data[1];
//    alert($scope.data[1].id_series);
//     $scope.save_data.id_section = false;
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
  
    
    
    $scope.changeSection = function(){
        $scope.save_data.section = $scope.id_section;
        $scope.wall_checked = false;
        $scope.floor_checked = false;
        $scope.save_data.floor_radio = null;
        $scope.save_data.wall_radio = null;
        if($scope.wall() == true ){
            $scope.wall_checked = true;
            $scope.save_data.wall_radio = 1;
        }
        if($scope.floor() == true){
            $scope.floor_checked = true;
            $scope.save_data.floor_radio = 1;
        }
    }

    $scope.purpose_checked = function(who){
        if($scope.floor_checked == false && who == 'wall') $scope.wall_checked = true;
        if($scope.wall_checked == false && who == 'floor') $scope.floor_checked = true;
    }

    $scope.wall_radio = function(event){
      $scope.save_data.wall_radio = event.currentTarget.value;
    }
    $scope.floor_radio = function(event){
       $scope.save_data.floor_radio = event.currentTarget.value;
    }
    $scope.seam_radio = function(event){
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
        $scope.save_data.wall_chacked = $scope.wall_checked;
        $scope.save_data.floor_chacked = $scope.floor_checked;
        $scope.save_data.my_pos = $scope.pos;
        var json_data = JSON.stringify($scope.save_data);
        localStorage.setItem('data', json_data);
        $scope.pos++;   

    }

    $scope.prev_step = function(){
        $scope.pos--;   
//        alert($scope.pos);
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
        
        var input_value = angular.element("<input id='value_width_wall"+ $scope.index_width +"' value='0.0'>");
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
     
     
     $scope.input_keyup = function(event){
//         angular.element(arr[i]).parent().css('border','1px solid #3a4e7a');
         
            if(isNaN($(event.currentTarget).val())){
                $(event.currentTarget).css('border', '1px solid red')
                
//                alert("Вы пытаетесь ввести не числовое значение!");
                    
                
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

});