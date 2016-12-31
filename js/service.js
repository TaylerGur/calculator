calculator.factory('dataSeries', function(){
    // type-series: 0 - стена, 1 - пол, 2 - стена и пол
    // type_tiles : 0 - кватратная (и диагональная), 1 - прямоугольная
    return [

        {
            id_series:0,
            name_series:"Абингтон",
            type_series:0,
            type_tiles:0,
            width:30,
            height:30,
            tiles:{
                wall:[
                    {id_tiles:0,  color:'red', src:"img/w1.jpg", price: 25},
                    {id_tiles:1,  color:'yelow', src:"img/w2.jpg", price: 26},
                    {id_tiles:2,  color:'green', src:"img/w3.jpg", price: 27},
                    {id_tiles:3,  color:'black', src:"img/w4.jpg", price: 28},
                    {id_tiles:4,  color:'brown', src:"img/w5.jpg", price: 29},
                    {id_tiles:5,  color:'pink', src:"img/w6.jpg", price: 28},
                    {id_tiles:7,  color:'gray', src:"img/w8.jpg", price: 25}
                    
                ]
            }
        },
        {
            id_series:1,
            name_series:"Ангдийский дефлт ",
            type_series:1,
            type_tiles:0,
            width:20,
            height:20,
            tiles:{
                floor:[

                    {id_tiles:8,  color:'yelow', src:"img/f1.jpg", price: 36},
                    {id_tiles:9,  color:'green', src:"img/f2.jpg", price: 35},
                    {id_tiles:10,  color:'black', src:"img/f3.jpg", price: 34},
                    {id_tiles:11,  color:'brown', src:"img/f4.jpg", price: 33},
                    {id_tiles:12,  color:'pink', src:"img/f5.jpg", price: 32},
                    {id_tiles:13,  color:'gray', src:"img/f6.jpg", price: 31}
                ]
            }
        },
        {
            id_series:2,
            name_series:"Бейкер-стрит",
            type_series:2,
            width:25,
            height:25,
            type_tiles:0,
            tiles:{
                floor:[
                    {id_tiles:21,  color:'yelow', src:"img/f1.jpg", price: 49},
                    {id_tiles:22,  color:'green', src:"img/f2.jpg", price: 46},
                    {id_tiles:23,  color:'black', src:"img/f3.jpg", price: 45},
                    {id_tiles:24,  color:'brown', src:"img/f4.jpg", price: 47},
                    {id_tiles:25,  color:'pink', src:"img/f5.jpg", price: 48},
                    {id_tiles:26,  color:'gray', src:"img/f6.jpg", price: 49}
                ],
                wall:[
                    {id_tiles:14,  color:'red', src:"img/w8.jpg", price: 48},
                    {id_tiles:15,  color:'yelow', src:"img/w9.jpg", price: 45},
                    {id_tiles:16,  color:'green', src:"img/w10.jpg", price: 44},
                    {id_tiles:17,  color:'black', src:"img/w11.jpg", price: 43},
                    {id_tiles:18,  color:'brown', src:"img/w12.jpg", price: 42},
                    {id_tiles:19,  color:'pink', src:"img/w13.jpg", price: 41},
                    {id_tiles:20,  color:'gray', src:"img/w14.jpg" , price: 45}
                 
                ]
            }
        },
         {
            id_series:3,
            name_series:"Бристоль",
            type_series:0,
             width:20,
            height:30,
            type_tiles:1,
            tiles:{
                wall:[
                    {id_tiles:28,  color:'red', src:"img/w1.jpg", price: 36},
                    {id_tiles:29,  color:'yelow', src:"img/w2.jpg", price: 35},
                    {id_tiles:30,  color:'green', src:"img/w3.jpg", price: 34},
                    {id_tiles:31,  color:'black', src:"img/w4.jpg", price: 33},
                    {id_tiles:32,  color:'brown', src:"img/w5.jpg", price: 32},
                    {id_tiles:33,  color:'pink', src:"img/w6.jpg", price: 31},
                    ]
            }
        },
        {
            id_series:4,
            name_series:"Каштан",
            type_series:1,
            width:10,
            height:20,
            type_tiles:1,
            tiles:{
                floor:[
                    {id_tiles:35,  color:'yelow', src:"img/f1.jpg", price:27},
                    {id_tiles:36,  color:'green', src:"img/f2.jpg", price:25},
                    {id_tiles:37,  color:'black', src:"img/f3.jpg", price:24},
                    {id_tiles:38,  color:'brown', src:"img/f4.jpg", price:23},
                    {id_tiles:39,  color:'pink', src:"img/f5.jpg", price:22},
                    {id_tiles:40,  color:'gray', src:"img/f6.jpg", price:21},
                    {id_tiles:41,  color:'gray', src:"img/f7.jpg", price: 16}
                ]
            }
        },
        {
            id_series:5,
            name_series:"Ричмонт",
            type_series:2,
            width:20,
            height:40,
            type_tiles:1,
            tiles:{
                floor:[
                      {id_tiles:42,  color:'yelow', src:"img/f1.jpg", price: 12},
                    {id_tiles:43,  color:'green', src:"img/f2.jpg", price: 13},
                    {id_tiles:44,  color:'black', src:"img/f3.jpg", price: 14},
                    {id_tiles:45,  color:'brown', src:"img/f4.jpg", price: 17},
                    {id_tiles:46,  color:'pink', src:"img/f5.jpg", price: 15},
                    {id_tiles:47,  color:'gray', src:"img/f6.jpg", price: 16},
                    {id_tiles:48,  color:'gray', src:"img/f8.jpg",  price: 17}
                ],
                wall:[
                   
                    {id_tiles:50,  color:'yelow', src:"img/w9.jpg", price: 36},
                    {id_tiles:51,  color:'green', src:"img/w10.jpg", price: 35},
                    {id_tiles:52,  color:'black', src:"img/w11.jpg", price: 34},
                    {id_tiles:53,  color:'brown', src:"img/w12.jpg", price: 33},
                    {id_tiles:54,  color:'pink', src:"img/w13.jpg", price: 32},
                    {id_tiles:55,  color:'gray', src:"img/w14.jpg",  price: 31}
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