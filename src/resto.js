$(function(){
    let homePlace = 'jakarta'
    $.ajax({
        url: `http://localhost:3000/restaurant/searchHome/${homePlace}`,
        method: 'GET'
     })
     .done(data=>{
         let restaurants = data.restaurants
         console.log(restaurants[0].restaurant.name)
        $.each(restaurants, function( i ) {
            let resto = restaurants[i].restaurant
            $("#cards-template").append(`
            
            <div class="card">
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


    $('.special.cards .image').dimmer({
        on: 'hover'
    });

    $("#search-form").submit(function(){
        let value = $('input[name=search]').val()
        let query = value.replace(' ', '-')
        // alert(query)
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/restaurant/location/${query}`
        })
        .done(function(result) {
            let entity_id = result.data.entity_id
            let entity_type = result.data.entity_type
            console.log('done',query, result.data.entity_id, result.data.entity_type);
            $.ajax({
                url: `http://localhost:3000/restaurant/search/${entity_id}/${entity_type}`,
                method: 'GET'
            })
            .done(data=>{
                let restaurants = data.restaurants
                console.log(restaurants[0].restaurant.name)
                $("#cards-template").empty()
               $.each(restaurants, function( i ) {
                   let resto = restaurants[i].restaurant
                   $("#cards-template").append(`
                   
                   <div class="card">
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
