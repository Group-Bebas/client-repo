$(document).ready(() => {
    let token = localStorage.getItem('token')
    if (!token) {
        window.location = './login.html'
    }
})

$(function(){
    let token = localStorage.getItem('token')
    console.log('token----->',token)
    let homePlace = 'jakarta'
    $.ajax({
        url: `http://localhost:3000/restaurant/searchHome/${homePlace}`,
        method: 'GET',
        headers: {token:token}
     })
     .done(data=>{
         let restaurants = data.restaurants
         console.log(restaurants[0].restaurant.name)
        $.each(restaurants, function( i ) {
            let resto = restaurants[i].restaurant
            $("#cards-template").append(`
            
            <div class="card" data-toggle="tooltip" data-placement="top" title="click to see details" onclick="window.location.href='${resto.menu_url}'">
                <div class="blurring dimmable image">
                <div class="ui dimmer">
                    <div class="content">
                    <div class="center">
                        <div class="ui inverted button">See Details</div>
                    </div>
                    </div>
                </div>
                <img src="${resto.featured_image}" style="height:250px; width:290px;">
                </div>
                <div class="content">
                <a class="header">${resto.name}</a>
                <div class="meta">
                    <span class="date">${resto.cuisines}</span>
                </div>
                <div class="description">
                    <p>${resto.location.address}</p>
                    <em><p>Average cost for two: Rp ${resto.average_cost_for_two}</p></em>
                </div>
                </div>
                <div class="extra content">
                <a>
                    <i class="star icon"></i>Rating: 
                    ${resto.user_rating.aggregate_rating}/5
                </a>
                </div>
            </div>
            
            `);
            
        });
     })
     .fail(err=>{
         console.log(err)
         console.log('FAILLLLLLL')
     })


    $('.special.cards .image').dimmer({
        on: 'hover'
    });

    $("select[name=sort]").change(function(){
        var selectedsort = $(".form-control option:selected").val();
        let sort;
        let order;
        if (selectedsort[0] === 'r' && selectedsort[2] === 'd') {
            sort = 'rating'
            order = 'desc'
        } else if (selectedsort[0] === 'r') {
            sort = 'rating'
            order = 'asc'
        } else if (selectedsort[0] === 'p' && selectedsort[2] === 'd') {
            sort = 'cost'
            order = 'desc'
        } else {
            sort = 'cost'
            order = 'asc'
        }
    
    // console.log(`sort:${sort}, order:${order}`)
    $("#search-form").submit(function(){
        let value = $('input[name=search]').val()
        let query = value.replace(' ', '-')
        // alert(query)
        
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/restaurant/location/${query}`,
            headers: {token:token}
        })
        .done(function(result) {
            let entity_id = result.data.entity_id
            let entity_type = result.data.entity_type
            console.log('done',query, result.data.entity_id, result.data.entity_type);
            $.ajax({
                url: `http://localhost:3000/restaurant/search/${entity_id}/${entity_type}/${sort}/${order}`,
                method: 'GET',
                headers: {token:token}
            })
            .done(data=>{
                let restaurants = data.restaurants
                console.log(restaurants[0].restaurant.name)
                $("#cards-template").empty()
               $.each(restaurants, function( i ) {
                   let resto = restaurants[i].restaurant
                   $("#cards-template").append(`
                   
                   <div class="card" data-toggle="tooltip" data-placement="top" title="click to see details" onclick="window.location.href='${resto.menu_url}'">
                       <div class="blurring dimmable image">
                       <div class="ui dimmer">
                           <div class="content">
                           <div class="center">
                               <div class="ui inverted button">See Details</div>
                           </div>
                           </div>
                       </div>
                       <img src="${resto.featured_image}" style="height:250px; width:290px;">
                       </div>
                       <div class="content">
                       <a class="header">${resto.name}</a>
                       <div class="meta">
                           <span class="date">${resto.cuisines}</span>
                       </div>
                       <div class="description">
                           <p>${resto.location.address}</p>
                           <em><p>Average cost for two: Rp ${resto.average_cost_for_two}</p></em>
                       </div>
                       </div>
                       <div class="extra content">
                       <a>
                           <i class="star icon"></i>Rating: 
                           ${resto.user_rating.aggregate_rating}/5
                       </a>
                       </div>
                   </div>
                   
                   `);
                   
               });
            })
            .fail(err=>{
                console.log('FAILLLLLLL')
                console.log(err)
            }) 
        })
        .fail(function(err) {
            console.log('fail', err)
        })

        
        event.preventDefault();
    })
    })



})
