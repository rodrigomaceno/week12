$(document).ready(() => {
    let pizzas;
    
    $.get('http://localhost:3000/pizzas', data => {
        pizzas = data
    }).done(() => buildInfoList())


    const buildInfoList = () => {
        $('#content').empty();
        pizzas.forEach(pizza => {
            
            $('#content').append(
            `<div id="pizza${pizza.id}" class="info-box"> 
            
            ${pizza.name}<div id="toppings">${pizza.toppings}</div>
                <div class="row">

                    <div class="col-sm btn-update">
                        <button id="update" class="btn btn-secondary" onclick="">Update</button>
                    </div>

                    <div class="col-sm right">
                        <button id="remove" class="btn btn-danger" onclick="">Delete</button>
                    
                    </div>
                </div>  
            </div>`
            )
            $(`#pizza${pizza.id}`).find("#remove").click(function () {
                removeItem(pizza.id)
                
        })
            $(`#pizza${pizza.id}`).find("#update").click(function () {
                updateItem(pizza.id)
            
        })
            
        })
    }

    $('#myForm').submit((event) =>{
        event.preventDefault()
        let formData = {
            name : $('#pizza').val(),
            toppings: $('#topping').val()
        }

        $.post('http://localhost:3000/pizzas', formData, data => {console.log(data)})

        $('#myForm').trigger('reset')
        buildInfoList()
    })

    const removeItem = id => {
        $.ajax({
            url: `http://localhost:3000/pizzas/${id}`,
            type: 'DELETE',
            success: function(){
                buildInfoList()
            }
        })
    }

        const updateItem = id => {
            let newpizza;

            $.get('http://localhost:3000/pizzas', id => {
            
            newpizza = id[0].name
            
            })
        
            $('#content').append(
                ` <form id="changes">
                    <div class="confirmation">Enter your new toppings
                        <input type="text" class="bar" id="newText">
                        <button id="confirm-btn" type="submit" class="btn btn-primary">Confirm</button>
                    </div>  
                    </form>
                `
                )
            
                $('#changes').submit((event) => {
                    event.preventDefault()
                
                    const change = {
                    
                    name : `${newpizza}`,
                    toppings : $(`#newText`).val()
                }

                
                $.ajax({
                    url: `http://localhost:3000/pizzas/${id}`,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(change)
            
                    })
                    $(`#confirm-btn`).click(function () {
                
                    $('#changes').trigger('reset')
                  
                 });
        
            });    
        };
    
    }
);
