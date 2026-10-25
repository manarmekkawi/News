 async function getData(category ="business", search = "", page = 1) {
    let parameters =  new URLSearchParams({
        category: category,
        q: search,
        from: "2026-10-25",
        sortBy: "publishedAt",
        apiKey: "8d2d008d3e134243823076ba0f9c64e7",
        pageSize: 10,
        page: page
 
    });

    let response = await fetch(`https://newsapi.org/v2/top-headlines?${parameters.toString()}`);
     
    let myData = await response.json();

    console.log(myData);

    showData(myData, page);
 

}
 
function showData(data, currentPage){
    let numberOfPages = Math.ceil(data.totalResults / 10),
        news = data.articles,
        $dataContainer = $("#Data .row");

    $dataContainer.html("");
 
    if (news && news.length > 0 && data.totalResults > 0) {
         
        $("#noResultsMessage").hide();

        for(let item of news) {
            $dataContainer.append(cardComponent(item));
        }
       
        $("nav .pagination").html(preparePagination(currentPage, numberOfPages));
       
    } else {
         
        $("#noResultsMessage").show();
        $("nav .pagination").html("");
    }
}
function preparePagination(currentPage, totalPages) {
    let lis = `<li class="page-item ${(currentPage == 1)? 'disabled' : ''}"><a class="page-link" onclick="paginate(${(currentPage > 1)? (currentPage - 1) : 1})">Previous</a></li>`;

    for(let i = 1; i <=totalPages ;i++)
    {
        lis +=`
             <li class="page-item ${(currentPage == i)?'active': " "}"><a class="page-link" onclick="paginate(${i})">${i}</a></li>
        `;
    }

    lis +=`<li class="page-item ${(currentPage == totalPages)? 'disabled' : ''}"><a class="page-link" onclick="paginate(${(currentPage < totalPages)? (currentPage + 1) : totalPages})">Next</a></li>`;


    return lis;
}
function cardComponent(item){
    return`
     <div class="col-lg-4 mb-3">
                        <div class="item ">
                            <div class="card m-auto" style="max-width: 320px">
                                <img src="${item.urlToImage ?? 'images/default.jpeg'}" onerror="this.src = 'images/default.jpeg';" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h4 class="card-title">${(item.title ??"").slice(0, 20)}</h4>
                                    <p class="card-text"> ${(item.description ??"").slice(0, 150)}</p>
                                    <a href="${item.url}" target="_blank" class="btn-solid theme-primary"> See More</a> 
                                </div>
                            </div>
                        </div>
                     </div>`;
}

function paginate(pageNumber) {
    let category = $("#Category").val(),
        search = $("#Search").val();
    getData(category, search, pageNumber);
}
