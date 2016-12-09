calculator.factory('dataSeries', function(){
    // type-series: 0 - стена, 1 - пол, 2 - стена и пол
    // type_tiles : 0 - кватратная (и диагональная), 1 - прямоугольная
    return [

        {
            id_series:0,
            name_series:"English",
            type_series:0,
            tiles:{
                floor:[
                    {id_tiles:0, type_tiles:0, color:'red', width:37.5, height:20},
                    {id_tiles:1, type_tiles:1, color:'red', width:37.5, height:20}
                ],
                wall:[
                    {id_tiles:2, type_tiles:0, color:'red', width:37.5, height:20},
                    {id_tiles:3, type_tiles:1, color:'red', width:37.5, height:20}
                ]
            }
        },
        {
            id_series:1,
            name_series:"Rus",
            type_series:1,
            tiles:{
                floor:[
                    {id_tiles:0, type_tiles:1, color:'red', width:37.5, height:20},
                    {id_tiles:1, type_tiles:0, color:'red', width:37.5, height:20}
                ],
                wall:[
                    {id_tiles:2, type_tiles:0, color:'red', width:37.5, height:20},
                    {id_tiles:3, type_tiles:0, color:'red', width:37.5, height:20}
                ]
            }
        },
        {
            id_series:2,
            name_series:"Ukraine",
            type_series:2,
            tiles:{
                floor:[
                    {id_tiles:0, type_tiles:1, color:'red', width:37.5, height:20},
                    {id_tiles:1, type_tiles:1,color:'red', width:37.5, height:20}
                ],
                wall:[
                    {id_tiles:2, type_tiles:0, color:'red', width:37.5, height:20},
                    {id_tiles:3, type_tiles:1 ,color:'red', width:37.5, height:20}
                ]
            }
        }
    ];


});
calculator.factory('formData', function(){
    return {
        val_length_f : 0,
        val_width_f : 0,
        val_height_w : 0,
        val_width_w1 : 0,
        val_width_w2 : 0,
        val_width_w3 : 0,
        val_width_w4 : 0,
        floor_radio_s : 1,
        wall_radio_s : 1,
        seam_s : 1.5,
        id_section : false,
        start_step : [false, true, true],
        dad_step : [true, false, true],
        finish_step : [true, true, false],
        pos : 0
    };
});