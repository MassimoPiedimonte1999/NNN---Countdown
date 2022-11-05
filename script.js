this.addEventListener("DOMContentLoaded", function() {
    const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAKKniwEAAAAATWc40N4IQKncKxk7p7CqTXGp4PI%3DjjC0uR5twNvvIYnYPutnXsMPAF31XAu4oYC0Y5Y1ox8kdLcvSV";
    let dayOfMonth = new Date().getDate();

    /**
     <div class="carousel-item active">
        <div class="tweet-wrap">
            <div class="tweet-header">
                <img src="https://pbs.twimg.com/profile_images/1573707054824521729/VwW6iYe5_400x400.jpg" alt="" class="avator">
                <div class="tweet-header-info">
                    Massimo Piedimonte <span>@_superserio_</span>
                    <p>🔥 If you're tired of using outline styles for secondary buttons, a soft solid background based on the text color can be a great alternative.</p>
                </div>
            </div>
        </div>
    </div>
     */

    function createBox(text, isActive) {
        const carouselItem = document.createElement('div');
        carouselItem.innerHTML = 
        '<div class="carousel-item '+ (isActive ? "active" : "") +'"> <div class="tweet-wrap"> \
        <div class="tweet-header"> <img \
        src="https://pbs.twimg.com/profile_images/1573707054824521729/VwW6iYe5_400x400.jpg" \
        alt="" class="avator"> <div class="tweet-header-info"> \
        Massimo Piedimonte <span>@_superserio_</span> \
        <p>'+text+'</p></div></div></div></div>';

        document.getElementById('carousel-inner').appendChild(carouselItem);
    }

    (async () => {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/users/1164562334351798272/tweets?exclude=replies,retweets', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + BEARER_TOKEN
            },
            exclude: ['replies', 'retweets']
        });

        const myJson = await response.json(); 

        var countDownDate = new Date("Dec 1, 2022 00:00:00").getTime();

        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerHTML   = days;
            document.getElementById("hrs").innerHTML    = hours;
            document.getElementById("mins").innerHTML   = minutes;
            document.getElementById("ms").innerHTML     = seconds;

            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "ROAR";
            }
        }, 1000);

        for(let i = 0; i < dayOfMonth; i++) {
            createBox(myJson.data[i].text, i === 0);
        }
    })();
});