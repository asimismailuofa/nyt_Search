$(document).ready(function () {

    $('#run-search').click(function (event) {

        event.preventDefault();

        var search = $('#search-term').val();
        //console.log(search);

        var num = $('#num-records-select').val();

        var start_year = $('#start-year').val();

        var end_year = $('#end-year').val();

        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

        url += '?' + $.param({
            'api-key': '0d40313a701b4dd89507b3f5eecdb578',
            'q': search,
            'begin_date': start_year + '0101',
            'end_date': end_year + '0101'
        });
        
        $.ajax({
            url: url,
            method: 'GET'
        }).then(function(res){
           // console.log(res.response);

            for(var i = 0; i < num; i++){
                var row = $('<div class="row"></div>');
                var fullCard = $('<div class="card"></div>');
                var head = $('<div class="card-header">' + res.response.docs[i].byline.original + '</div>')
                var card = $('<div class="card-body">' + res.response.docs[i].headline.main + '</div>');
                var link = $('<br /><a href="' + res.response.docs[i].web_url + '" >link</a>')
                fullCard.append(head);
                fullCard.append(card);
                card.append(link);
                row.append(fullCard);
                $('#well-section').append(row);
            }

        });

    });


    $('#clear-all').click(function(){
        $('#search-term').val('');
        //$('#num-records-select').val()
        $('#start-year').val('');
        $('#end-year').val('');
        $('#well-section').empty();


    });
});